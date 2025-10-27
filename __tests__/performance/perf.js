import http from 'k6/http';
import { check, sleep } from 'k6';
import { Trend, Rate, Counter } from 'k6/metrics';

export const reqDur = new Trend('req_duration_ms');
export const failedRate = new Rate('failed_requests_rate');
export const failedCount = new Counter('failed_requests_count');

export const options = {
  vus: __ENV.K6_VUS ? parseInt(__ENV.K6_VUS) : 5,
  duration: __ENV.K6_DURATION || '30s',
  thresholds: {
    req_duration_ms: ['p(95)<1000'],
    failed_requests_rate: ['rate<0.05'], // allow small % locally
  },
};

const BASE = __ENV.BASE_URL || 'http://localhost:3000';
const AUTH_TOKEN = __ENV.K6_AUTH_TOKEN || null;
const USER = __ENV.K6_USER || null;
const PASS = __ENV.K6_PASS || null;

export const PAGES = [
  '/',
  '/noticias',
  '/foros',
  '/multimedia',
  '/conocimiento',
  '/api/news',
  '/api/forums/threads',    
  '/api/quizzes/sections',
];

// attempt login (if USER/PASS provided) and return headers with cookie or auth
export function getAuthHeaders() {
  const headers = { 'User-Agent': 'k6-performance' };

  if (AUTH_TOKEN) {
    headers['Authorization'] = `Bearer ${AUTH_TOKEN}`;
    return headers;
  }

  if (USER && PASS) {
    // Try common API login endpoints; adapt if your API differs.
    const loginPaths = ['/api/auth/login', '/api/auth', '/auth/login'];
    for (const p of loginPaths) {
      try {
        const res = http.post(`${BASE}${p}`, JSON.stringify({ email: USER, password: PASS }), {
          headers: { 'Content-Type': 'application/json' },
          redirects: 0,
        });
        // If server set cookies, include them
        const setCookie = res.headers['Set-Cookie'] || res.headers['set-cookie'];
        if (setCookie) {
          headers['Cookie'] = Array.isArray(setCookie) ? setCookie.join('; ') : setCookie;
          return headers;
        }
        // If response contains token
        if (res && res.body) {
          try {
            const body = JSON.parse(res.body);
            if (body?.token) {
              headers['Authorization'] = `Bearer ${body.token}`;
              return headers;
            }
          } catch (e) { /* ignore non-json */ }
        }
      } catch (e) {
        // login path failed — try next
      }
    }
  }

  return headers;
}

export const AUTH_HEADERS = getAuthHeaders();

export default function () {
  for (const path of PAGES) {
    const url = `${BASE}${path}`;
    const params = { headers: AUTH_HEADERS, tags: { page: path } };

    const res = http.get(url, params);
    reqDur.add(res.timings.duration);

    // accept 200, 304, 302 (redirect to login) as "reachable" for navigation pages
    const ok = check(res, {
      'status 200/304/302': (r) => [200, 304, 302].includes(r.status),
      'body exists': (r) => !!r.body,
      'has content-type': (r) => !!r.headers['Content-Type'] || !!r.headers['content-type'],
    });

    if (!ok) {
      failedCount.add(1);
      failedRate.add(1);
      console.error(`FAIL ${res.status} ${path} len=${res.body ? res.body.length : 0}`);
      // small snippets for API debugging (avoid huge dumps)
      if (res.body && res.body.length < 2000) {
        console.error(`  body: ${res.body}`);
      }
    } else {
      failedRate.add(0);
    }

    sleep(0.5);
  }
}