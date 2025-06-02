import "../styles/globals.css";
import { AuthProvider } from "../lib/auth";
import NavBar from "../components/navbar/NavBar";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <NavBar />
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
