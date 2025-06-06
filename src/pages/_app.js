import "../styles/globals.css";
import { AuthProvider } from "../lib/auth";
import NavBar from "../components/layout/navbar/NavBar";
import Footer from "../components/layout/Footer";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <NavBar />
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
