import React, { Component } from 'react';
import { getRondas } from '../../services/Rondas';
import styles from './FormCharlas.module.css';

export default class FormCharlas extends Component {
  state = {
    charla: {
      idCharla: 0,
      titulo: '',
      descripcion: '',
      tiempo: '',
      fechaPropuesta: this.formatDate(new Date()), // Formatea la fecha actual
      idUsuario: '',
      idEstadoCharla: '',
      idRonda: '',
    },
    ronda: [],
  };

  handleChange = (e) => {
    this.setState({
      charla: {
        ...this.state.charla,
        [e.target.name]: e.target.value,
      },
    });
  };

  getAllRondas = () => {
    getRondas().then((response) => {
      this.setState({
        ronda: response,
      });
    });
  };

  postFormCharlas = () => {
    console.log(this.state.charla);
  };

  componentDidMount() {
    this.getAllRondas();
  }

  // Función para formatear la fecha en el formato adecuado (YYYY-MM-DD)
  formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Asegura que el mes tenga dos dígitos
    const day = String(date.getDate()).padStart(2, '0'); // Asegura que el día tenga dos dígitos
    return `${year}-${month}-${day}`;
  }

  render() {
    return (
      <div className={styles.formContainer}>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-3">
            <label htmlFor="titulo" className={styles.formLabel}>
              Titulo
            </label>
            <input
              type="text"
              name="titulo"
              id="titulo"
              onChange={this.handleChange}
              value={this.state.charla.titulo}
              className={styles.formInput}
              placeholder="Enter the title"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="descripcion" className={styles.formLabel}>
              Descripcion
            </label>
            <input
              type="text"
              name="descripcion"
              id="descripcion"
              onChange={this.handleChange}
              value={this.state.charla.descripcion}
              className={styles.formInput}
              placeholder="Enter the description"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="tiempo" className={styles.formLabel}>
              Tiempo
            </label>
            <input
              type="text"
              name="tiempo"
              id="tiempo"
              onChange={this.handleChange}
              value={this.state.charla.tiempo}
              className={styles.formInput}
              placeholder="Enter the time"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="fechaPropuesta" className={styles.formLabel}>
              Fecha Propuesta
            </label>
            <input
              type="date"
              name="fechaPropuesta"
              id="fechaPropuesta"
              onChange={this.handleChange}
              value={this.state.charla.fechaPropuesta}
              className={styles.formInput}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="idRonda" className={styles.formLabel}>
              Ronda
            </label>
            <select
              name="idRonda"
              id="idRonda"
              onChange={this.handleChange}
              value={this.state.charla.idRonda}
              className={styles.formSelect}
            >
              {this.state.ronda.map((ronda) => (
                <option key={ronda.idRonda} value={ronda.idRonda}>
                  {ronda.fechaPresentacion}
                </option>
              ))}
            </select>
          </div>

          <button className="btn btn-primary" onClick={this.postFormCharlas}>
            Create
          </button>
        </form>
      </div>
    );
  }
}
