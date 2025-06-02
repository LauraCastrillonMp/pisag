import { useState, useEffect } from "react";
import Hamburger from "./Hamburger";
import styles from "../../styles/NavBar.module.css";
import { useSession } from "../../lib/auth";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Nav() {
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const { session, logout } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/auth/login");
  };

  const toggleHamburger = () => {
    setHamburgerOpen(!hamburgerOpen);
  };

  const navListClasses = `${styles.navList} ${
    hamburgerOpen ? styles.navListMobileOpen : styles.navListMobileClosed
  }`;

  return (
    <div className={styles.navigation}>
      <ul className={navListClasses}>
        <li className={styles.navItem}><Link href="/">Inicio</Link></li>
        <li className={styles.navItem}><Link href="/gallery">Galería</Link></li>
        <li className={styles.navItem}><Link href="/noticias">Noticias</Link></li>
        <li className={styles.navItem}><Link href="/tests">Tests</Link></li>

        {session && session.user ? (
          <>
            {session.user.role === "admin" && (
              <li className={styles.navItem}><Link href="/admin">Dashboard</Link></li>
            )}
            <li className={styles.navItem}><Link href="#" onClick={handleLogout}>Cerrar sesión</Link></li>
            <li className={styles.navItem}><Link href="/profile">Perfil</Link></li>
          </>
        ) : (
          <>
            <li className={styles.navItem}><Link href="/auth/login">Iniciar sesión</Link></li>
            <li className={styles.navItem}><Link href="/auth/register">Registrarse</Link></li>
          </>
        )}
      </ul>

      <div className={styles.hamburger} onClick={toggleHamburger}>
        <Hamburger isOpen={hamburgerOpen} />
      </div>
    </div>
  );
}
