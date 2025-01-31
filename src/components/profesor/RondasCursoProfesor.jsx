// src/components/profesor/RondasCursoProfesor.jsx
import React, { Component } from 'react';
import RondasList from './RondasList';
import RondaDetails from './RondaDetails';
import { getRondasProfesorAsync } from '../../services/ProfesorService';  
import styles from './RondasCursoProfesor.module.css';

export default class RondasCursoProfesor extends Component {
  state = {
    rondas: [],
    selectedRondaId: null,
  };

  getRondasProfesor = () => {
    getRondasProfesorAsync().then((response) => {
      if (Array.isArray(response) && response.length > 0) {
        console.log("Rondas del profesor:", response);  
        this.setState({
          rondas: response,
        });
      } else {
        console.log("No se encontraron rondas o la respuesta no es un array válido");
        this.setState({ rondas: [] });  
      }
    });
  };

  componentDidMount() {
    this.getRondasProfesor();  
  }

  handleRondaClick = (idRonda) => {
    this.setState({ selectedRondaId: idRonda });
  };

  render() {
    const { rondas, selectedRondaId } = this.state;
    return (
      <div className={styles.container}>
        <h1>Rondas del Curso</h1>
        {rondas.length === 0 ? (
          <p>No se han encontrado rondas</p>
        ) : (
          <RondasList rondas={rondas} onRondaClick={this.handleRondaClick} />
        )}
        {selectedRondaId && <RondaDetails idRonda={selectedRondaId} />}
      </div>
    );
  }
}
