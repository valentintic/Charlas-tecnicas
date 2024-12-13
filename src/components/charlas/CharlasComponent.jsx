import React, { Component } from 'react';
import { motion } from 'framer-motion';
import { getCharlas } from '../../services/CharlasApi';
import DefaultImage from '../../assets/Default_imaget.webp';
import styles from './Charlas.module.css';

export default class CharlasComponent extends Component {
  state = {
    charlas: null,
    clickedId: null,
  };

  componentDidMount() {
    getCharlas().then((response) => {
      this.setState({ charlas: response });
    });
  }

  handleCardClick = (id) => {
    this.setState((prevState) => ({
      clickedId: prevState.clickedId === id ? null : id,
    }));
  };

  render() {
    return (
      <div className={styles.container}>
        <h1>Charlas</h1>
        <div className="row">
          {this.state.charlas
            ? this.state.charlas.map((charla) => {
                const imageUrl = charla.imagenUrl || DefaultImage;
                const isOpen = this.state.clickedId === charla.idCharla;

                return (
                  <div
                    key={charla.idCharla}
                    className={`col-md-4 mb-4 ${styles.colMd4}`}
                  >
                    <motion.div
                      className={`${styles.card} ${
                        isOpen ? styles.clicked : ''
                      }`}
                      onClick={() => this.handleCardClick(charla.idCharla)}
                      initial={{ scale: 1 }}
                      animate={{
                        scale: isOpen ? 2.5 : 1,
                        x: isOpen ? '50vw' : 0,
                        y: isOpen ? '50vh' : 0,
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      <motion.div
                        className={styles.cardImgTop}
                        style={{ backgroundImage: `url(${imageUrl})` }}
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      />
                      <div className={styles.cardBody}>
                        <h5 className={styles.cardTitle}>{charla.titulo}</h5>
                      </div>

                      <motion.div
                        className={`${styles.cardInfo} ${
                          isOpen ? styles.show : ''
                        }`}
                        initial={{ opacity: 0 }}
                        animate={{
                          opacity: isOpen ? 1 : 0,
                          y: isOpen ? 0 : 20,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <p>
                          <strong>Tiempo:</strong> {charla.tiempo}
                        </p>
                        <p>
                          <strong>Fecha Propuesta:</strong> {charla.fechaPropuesta}
                        </p>
                        <p>
                          <strong>Estado:</strong> {charla.idEstadoCharla}
                        </p>
                        <p>
                          <strong>Ronda:</strong> {charla.idRonda}
                        </p>
                        {isOpen && (
                          <div className={styles.cardButtons}>
                            <button className="btn btn-primary">Ver más</button>
                            <button className="btn btn-secondary">Inscribirse</button>
                          </div>
                        )}
                      </motion.div>
                    </motion.div>
                  </div>
                );
              })
            : null}
        </div>
      </div>
    );
  }
}
