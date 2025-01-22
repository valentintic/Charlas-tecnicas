import React, { Component } from 'react';
import { getRondasCurso } from '../../services/Rondas';
import CharlasComponent from '../charlas/components/CharlasComponent';
import styles from './Rondas.module.css'; // Importa el archivo CSS

export default class RondasComponent extends Component {
  state = {
    rondas: [],
    selectedRondaId: null,
    isCharlasVisible: false,
  };

  formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${day}/${month}/${year}`;
  }

  getRondasCurso = () => {
    getRondasCurso().then((response) => {
      this.setState({
        rondas: response,
      });
    });
  };

  componentDidMount() {
    this.getRondasCurso();
  }

  handleRondaClick = (idRonda) => {
    this.setState((prevState) => ({
      selectedRondaId: idRonda,
      isCharlasVisible: prevState.selectedRondaId === idRonda ? !prevState.isCharlasVisible : true,
    }));
  };

  render() {
    return (
      <div className={styles.container}>
        <h1>Rondas</h1>
        <div>
          {this.state.rondas.map((ronda) => {
            const formattedDatePresentacion = this.formatDate(new Date(ronda.fechaPresentacion));
            return (
              <div key={ronda.idRonda} className={styles.rondaItem}>
                <div
                  className={styles.dateBox}
                  onClick={() => this.handleRondaClick(ronda.idRonda)}
                >
                  <span className={styles.dateText}>{<h3>{formattedDatePresentacion}</h3>}</span>
                  <span
                    className={styles.arrow}
                    style={{
                      transform: this.state.selectedRondaId === ronda.idRonda && this.state.isCharlasVisible
                        ? 'rotate(180deg)' // Flecha hacia arriba
                        : 'rotate(0deg)', // Flecha hacia abajo
                    }}
                  >
                    &#9660; {/* Flecha hacia abajo */}
                  </span>
                </div>
                <div
                  className={`${styles.charlasContainer} ${this.state.selectedRondaId === ronda.idRonda && this.state.isCharlasVisible ? styles.showCharlas : ''}`}
                >
                  {this.state.selectedRondaId === ronda.idRonda && this.state.isCharlasVisible && (
                    <CharlasComponent idRonda={ronda.idRonda} />
                  )}
                </div>
              </div>
            );
          }).reverse()}
        </div>
      </div>
    );
  }
}
