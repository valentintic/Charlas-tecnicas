import React, { Component } from 'react';
import { getRondas } from '../../services/Rondas';
import { getCharlaById, createCharla } from '../../services/CharlasApi';
import styles from './FormCharlas.module.css';
import withParams from '../../withParams';
import { getUserProfile } from '../../services/UsuariosService';
import Charlas from '../../models/charlas';

class FormCharlas extends Component {
  state = {
    charla: {
      idCharla: 0,
      titulo: '',
      descripcion: '',
      tiempo: '',
      fechaPropuesta: this.formatDate(new Date()),
      idUsuario: '',
      idEstadoCharla: '',
      idRonda: '',
      imagenCharla: '', // Asegúrate de que este campo esté en el estado si lo necesitas
    },
    ronda: [],
    isLoading: true,
  };

  handleChange = (e) => {
    this.setState({
      charla: {
        ...this.state.charla,
        [e.target.name]: e.target.value,
      },
    });
  };

  fetchCharlaById = (id) => {
    getCharlaById(id)
      .then((response) => {
        this.setState({
          charla: {
            ...response.charla,
            fechaPropuesta: this.formatDate(new Date(response.fechaPropuesta)),
          },
          isLoading: false,
        });
      })
      .catch((error) => {
        console.error('Error fetching charla by ID:', error);
        this.setState({ isLoading: false });
      });
  };

  // Método para obtener todas las rondas
  getAllRondas = () => {
    getRondas().then((response) => {
      this.setState({
        ronda: response,
      });
    });
  };

  componentDidMount() {
    this.getAllRondas();

    const { id } = this.props.params;
    if (id) {
      this.fetchCharlaById(id);
    } else {
      this.setState({ isLoading: false });
    }
  }

  componentDidUpdate(prevProps, newProps) {
    const { id } = this.props.params;
    if (id !== prevProps.params.id) {
      this.fetchCharlaById(id);
    }
  }

  formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  postFormCharlas = () => {
    // Crear la instancia de Charlas
    const charla = new Charlas(
      this.state.charla.idCharla,
      this.state.charla.titulo,
      this.state.charla.descripcion,
      this.state.charla.tiempo,
      this.state.charla.fechaPropuesta,
      '', // Se asignará más tarde
      this.state.charla.idEstadoCharla,
      this.state.charla.idRonda,
      this.state.charla.imagenCharla
    );

    // Obtener el perfil del usuario y asignarlo a la charla
    getUserProfile().then((response) => {
      charla.idUsuario = response.idUsuario;

      // Luego de asignar el idUsuario, enviar la charla a la API
      createCharla(charla).then((response) => {
        console.log(response);
        console.log('Charla creada:', charla);
      });
    });
  };

  putFormCharlas = () => {
    console.log(this.state.charla);
  };

  render() {
    if (this.state.isLoading) {
      return <div>Loading...</div>;
    }

    return (
      <div className={styles.formContainer}>
        <h1>{this.state.charla.idCharla ? 'Update' : 'Create'} Charla</h1>
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
              )).reverse()}
            </select>
          </div>

          {this.props.params.id ? (
            <button className="btn btn-primary" onClick={this.putFormCharlas}>Update</button>
          ) : (
            <button className="btn btn-primary" onClick={this.postFormCharlas}>Create</button>
          )}
        </form>
      </div>
    );
  }
}

export default withParams(FormCharlas);
