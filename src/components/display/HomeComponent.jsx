import React, { useEffect, useRef, useLayoutEffect, useState } from 'react';
import styles from './HomeComponent.module.css'; 
import gitBranches from '../../assets/gitBranches.webp';
import rxjsLogo from '../../assets/rxjs-logo.webp';
import i18n from '../../assets/i18njs.webp';

const HomeComponent = () => {
  const sectionRefs = useRef([]);
  const [visibleSections, setVisibleSections] = useState([]);

  const handleIntersection = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setVisibleSections((prev) => [...prev, entry.target.id]); // Añadimos el ID de la sección visible
        entry.target.classList.add(styles.visible);
      } else {
        setVisibleSections((prev) => prev.filter((id) => id !== entry.target.id)); // Removemos el ID de la sección no visible
        entry.target.classList.remove(styles.visible);
      }
    });
  };

  // Usamos useLayoutEffect para asegurar que el DOM esté completamente actualizado antes de ejecutar el observer
  useLayoutEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.25, // El elemento será visible cuando el 25% esté en el viewport
    });

    // Aseguramos que las referencias no estén vacías antes de observarlas
    sectionRefs.current.forEach((section) => {
      if (section) {
        observer.observe(section);
      }
    });

    // Limpiar el observer cuando el componente se desmonte
    return () => {
      sectionRefs.current.forEach((section) => {
        if (section) {
          observer.unobserve(section);
        }
      });
    };
  }, []); // Solo se ejecuta una vez al montar el componente

  return (
    <div className={styles.homeContainer}>
      <header className={styles.header}>
        <h1 className={styles.title} ref={(el) => sectionRefs.current.push(el)}>
          Bienvenido a la Página de Inicio
        </h1>

        {/* Botones de navegación */}
        <nav>
          <ul className={styles.navList}>
            <li><a href="#welcomeSection" className={styles.navButton}>Bienvenida</a></li>
            <li><a href="#charlasSection" className={styles.navButton}>Charlas</a></li>
            <li><a href="#footer" className={styles.navButton}>Contacto</a></li>
          </ul>
        </nav>
      </header>

      <section id="welcomeSection" className={styles.welcomeSection} ref={(el) => sectionRefs.current.push(el)}>
        <p className={styles.welcomeText}>
          ¡Gracias por visitar nuestra página! Explora nuestras funcionalidades y encuentra lo que necesitas.
        </p>
        <button className={styles.primaryButton} onClick={() => alert('¡Bienvenido!')}>
          Empezar
        </button>
      </section>

      {/* Sección de Charlas */}
      <section id="charlasSection" className={styles.charlasSection}>
        <div className={styles.charla} ref={(el) => sectionRefs.current.push(el)} id="charla1">
          <img src={gitBranches} alt="Charla 1" />
          <div className={styles.charlaText}>
            <h2>Charla 1: Git Branches</h2>
            <p>
              En esta charla, aprenderás cómo funcionan los branches de Git y cómo usarlos para desarrollar tus proyectos.
              Aprenderás a crear y manejar ramas, a fusionar ramas, y a utilizar ramas para desarrollar funcionalidades.
              También aprenderás a utilizar GitHub para colaborar en proyectos y a manejar tus commits.
              ¡Esta es una charla muy importante para que puedas desarrollar tus proyectos de manera efectiva!
            </p>
          </div>
        </div>

        <div className={styles.charla} ref={(el) => sectionRefs.current.push(el)} id="charla2">
          <img src={rxjsLogo} alt="Charla 2" />
          <div className={styles.charlaText}>
            <h2>Charla 2: Introducción a RXJS</h2>
            <p>
              Introducción a RXJS, una librería de JavaScript que te permite trabajar con flujos de datos de manera sencilla y eficiente.
              Aprenderás a utilizar Observables, Subject, y Operators para manejar eventos y flujos de datos en tu aplicación.
              RXJS es una herramienta poderosa que te permitirá desarrollar aplicaciones reactivas y escalables.
            </p>
          </div>
        </div>

        <div className={styles.charla} ref={(el) => sectionRefs.current.push(el)} id="charla3">
          <img src={i18n} alt="Charla 3" />
          <div className={styles.charlaText}>
            <h2>Charla 3: Introducción a I18N</h2>
            <p>
              En esta charla, aprenderás cómo internacionalizar tu aplicación para llegar a una audiencia global.
              Aprenderás a utilizar librerías como i18next y react-i18next para manejar traducciones y localizaciones en tu aplicación.
              También aprenderás a manejar formatos de fechas, números y monedas para diferentes regiones.
              ¡Esta es una charla muy importante para que puedas llegar a usuarios de todo el mundo!
            </p>
          </div>
        </div>
      </section>

      <footer id="footer" className={styles.footer} ref={(el) => sectionRefs.current.push(el)}>
        <p>&copy; {new Date().getFullYear()} Mi Aplicación. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default HomeComponent;
