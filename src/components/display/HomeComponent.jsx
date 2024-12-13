import React from 'react';
import styles from './HomeComponent.module.css'; // Archivo CSS modular

const HomeComponent = () => {
  return (
    <div className={styles.homeContainer}>
      <header className={styles.header}>
        <h1 className={styles.title}>Bienvenido a la Página de Inicio</h1>
      </header>

      <section className={styles.welcomeSection}>
        <p className={styles.welcomeText}>
          ¡Gracias por visitar nuestra página! Explora nuestras funcionalidades y encuentra lo que necesitas.
        </p>
        <button className={styles.primaryButton} onClick={() => alert('¡Bienvenido!')}>
          Empezar
        </button>
      </section>

      <footer className={styles.footer}>
        <p>&copy; {new Date().getFullYear()} Mi Aplicación. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default HomeComponent;
