import React, { Component } from 'react';
import styles from './HomeComponent.module.css'; // Asegúrate de tener este archivo CSS

export default class HomeComponent extends Component {
  render() {
    return (
      <div className={styles.homeContainer}>
        <header className={styles.header}>
          <h1 className={styles.title}>Bienvenido a la Página de Inicio</h1>
        </header>

        <section className={styles.welcomeSection}>
          <p className={styles.welcomeText}>
            ¡Gracias por visitar nuestra página! Aquí puedes encontrar información relevante y acceder a diferentes funcionalidades.
          </p>
          <button className={styles.primaryButton}>Empezar</button>
        </section>
      </div>
    );
  }
}
