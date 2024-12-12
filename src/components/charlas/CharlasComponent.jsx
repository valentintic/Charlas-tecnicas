import React, { Component } from 'react';
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
      console.log("Charlas", response);
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
                return (
                  <div key={charla.idCharla} className={`col-md-4 mb-4 ${styles.colMd4}`}>
                    <div
                      className={`${styles.card} ${this.state.clickedId === charla.idCharla ? styles.clicked : ''}`}
                      onClick={() => this.handleCardClick(charla.idCharla)}
                    >
                      <div
                        className={styles.cardImgTop}
                        style={{ backgroundImage: `url(${imageUrl})` }}
                      />
                      <div className={styles.cardBody}>
                        <h5 className={styles.cardTitle}>{charla.titulo}</h5>
                      </div>
                      <div className={`${styles.cardInfo} ${this.state.clickedId === charla.idCharla ? styles.show : ''}`}>
                        <p><strong>Tiempo:</strong> {charla.tiempo}</p>
                        <p><strong>Fecha Propuesta:</strong> {charla.fechaPropuesta}</p>
                        <p><strong>Estado:</strong> {charla.idEstadoCharla}</p>
                        <p><strong>Ronda:</strong> {charla.idRonda}</p>
                        {this.state.clickedId === charla.idCharla && (
                          <div className={styles.cardButtons}>
                            <button className="btn btn-primary">Ver más</button>
                            <button className="btn btn-secondary">Inscribirse</button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            : null}
        </div>
      </div>
    );
  }
}
