import React, { Component } from 'react';
import styles from './FooterComponent.module.css';

export default class FooterComponent extends Component {
  render() {
    return (
      <footer className={styles.footerContainer}>
        <p className={styles.footerText}>
          © {new Date().getFullYear()} - Todos los derechos reservados.
        </p>
      </footer>
    );
  }
}
