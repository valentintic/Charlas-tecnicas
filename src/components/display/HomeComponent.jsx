import React, { useEffect, useRef, useLayoutEffect, useState } from 'react';
import styles from './HomeComponent.module.css'; 
import gitBranches from '../../assets/gitBranches.webp';
import rxjsLogo from '../../assets/rxjs-logo.webp';
import i18n from '../../assets/i18njs.webp';

const HomeComponent = () => {
  const sectionRefs = useRef([]);
  const [visibleSections, setVisibleSections] = useState([]);
  const [navVisible, setNavVisible] = useState(true); // Controlar visibilidad del nav

  const handleIntersection = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (!visibleSections.includes(entry.target.id)) {
          setVisibleSections((prev) => [...prev, entry.target.id]);
        }
        entry.target.classList.add(styles.visible);
        entry.target.classList.remove(styles.hidden);

        if (entry.target.id === 'presentacion') {
          setNavVisible(true);
        }
      } else {
        // Cuando la sección no es visible, añadimos la clase 'hidden'
        setVisibleSections((prev) => prev.filter((id) => id !== entry.target.id));
        entry.target.classList.remove(styles.visible);
        entry.target.classList.add(styles.hidden);

        // Si la primera sección deja de ser visible, ocultamos el nav
        if (entry.target.id === 'presentacion') {
          setNavVisible(false);
        }
      }
    });
  };

  // Usamos useLayoutEffect para asegurar que el DOM esté completamente actualizado antes de ejecutar el observer
  useLayoutEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.35, // El elemento será visible cuando el 35% esté en el viewport
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
  }, [visibleSections]); // Dependemos de visibleSections para evitar referencias duplicadas

  return (
    <div className={styles.homeContainer}>
      <header className={styles.header}>
        <h1 className={styles.title}>Bienvenido a Nuestro Proyecto</h1>
      </header>

      {/* Contenedor del nav con animación */}
      <nav className={`${styles.nav} ${navVisible ? styles.visible : styles.hidden}`}>
        <ul className={`${styles.navList} ${navVisible ? styles.visible : styles.hidden}`}>
          <li><a href="#presentacion" className={styles.navButton}>Presentación</a></li>
          <li><a href="#charlas" className={styles.navButton}>Charlas</a></li>
          <li><a href="#rondas" className={styles.navButton}>Rondas</a></li>
          <li><a href="#info" className={styles.navButton}>Información</a></li>
          <li><a href="#contact" className={styles.navButton}>Contacto</a></li>
        </ul>
      </nav>

      <section id="presentacion" className={styles.welcomeSection} ref={(el) => sectionRefs.current.push(el)}>
        <p className={styles.welcomeText}>
          ¡Gracias por visitar nuestra página! Explora nuestras funcionalidades y encuentra lo que necesitas.
        </p>
        <a href='#charlas' className={styles.primaryButton}>
          Empezar
        </a>
      </section>

      {/* Sección de Charlas */}
      <section id="charlas" className={styles.charlasSection}>
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

      <section id="rondas" className={styles.rondasSection} ref={(el) => sectionRefs.current.push(el)}>
        <h2>Rondas de Discusión</h2>
        <p>
          Participa en nuestras rondas para discutir temas clave en tecnología.
        </p>
      </section>

      <section id="info" className={styles.infoSection} ref={(el) => sectionRefs.current.push(el)}>
        <h2>Información Adicional</h2>
        <p>
          Nuestro equipo está compuesto por expertos en diversas áreas tecnológicas.
        </p>
      </section>

      <section id="contact" className={styles.contactSection} ref={(el) => sectionRefs.current.push(el)}>
        <h2>Contacto</h2>
        <p>
          ¿Tienes alguna pregunta? Escríbenos a contacto@nuestroproyecto.com
        </p>
      </section>

      <footer id="footer" className={styles.footer} ref={(el) => sectionRefs.current.push(el)}>
        <p>&copy; {new Date().getFullYear()} Mi Aplicación. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default HomeComponent;
