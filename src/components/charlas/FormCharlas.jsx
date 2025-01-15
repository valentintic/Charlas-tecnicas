import React, { Component } from 'react';
import { getRondas } from '../../services/Rondas';
import { getCharlaById, createCharla, uploadCharlasImg, updateCharla } from '../../services/CharlasApi';
import styles from './FormCharlas.module.css';
import withParams from '../../withParams';
import { getAlumnoId } from '../../services/UsuariosService';
import Charlas from '../../models/charlas';
import { Navigate } from 'react-router-dom';

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
    redirect: false,
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

  postFormCharlas = async () => {
  try {
    const id = await getAlumnoId();
    console.log(id);

    if (!id) {
      throw new Error('No se pudo obtener el ID del alumno');
    }

    const charla = new Charlas();
    charla.idCharla = parseInt(this.state.charla.idCharla);
    charla.titulo = this.state.charla.titulo;
    charla.descripcion = this.state.charla.descripcion;
    charla.tiempo = parseInt(this.state.charla.tiempo);
    charla.fechaPropuesta = this.state.charla.fechaPropuesta;
    charla.idEstadoCharla = 2;
    charla.idUsuario = id;
    charla.idRonda = parseInt(this.state.charla.idRonda);
    charla.imagenCharla = this.state.charla.imagenCharla;

    console.log(charla);  
    const charlaResponse = await createCharla(charla);

    if (charlaResponse && charlaResponse.idCharla) {
      await this.postImagenCharla(charla.idCharla)
      this.setState({
        redirect: true
        });
    } else {
      console.error('El ID de la charla no está presente en la respuesta.');
    }
  } catch (error) {
    console.error('Error al crear la charla:', error);
  }
};

  
  
  
  

putFormCharlas = async () => {
  try {
    const id = await getAlumnoId();
    if (!id) {
      throw new Error('No se pudo obtener el ID del alumno');
    }

    const charla = new Charlas();
    charla.idCharla = parseInt(this.state.charla.idCharla);
    charla.titulo = this.state.charla.titulo;
    charla.descripcion = this.state.charla.descripcion;
    charla.tiempo = parseInt(this.state.charla.tiempo);
    charla.fechaPropuesta = this.state.charla.fechaPropuesta;
    charla.idEstadoCharla = 2;
    charla.idUsuario = id;
    charla.idRonda = parseInt(this.state.charla.idRonda);
    charla.imagenCharla = this.state.charla.imagenCharla;

    console.log(charla);
    const charlaResponse = await updateCharla(charla);
    console.log(charlaResponse);

    if (charlaResponse) {
      await this.postImagenCharla(charla.idCharla).then(() => {
        this.setState({
          redirect: true
          });
        }
      );
    } else {
      console.error('El ID de la charla no está presente en la respuesta.');
    }
  } catch (error) {
    console.error('Error al actualizar la charla:', error);
  }
};


  postImagenCharla = async (id) => {
    
    const reader = new FileReader();
    reader.onloadend = async () => {
      const fileContent = reader.result.split(',')[1]; // Extraer el contenido Base64 del archivo
      const payload = {
        fileName: this.state.imagenArchivo.name,
        fileContent,
      };
  
      try {
        const response = await uploadCharlasImg(id, payload);
        console.log('Imagen subida con éxito:', response);
      } catch (error) {
        console.error('Error subiendo la imagen:', error);
      }
    };
  
    reader.readAsDataURL(this.state.imagenArchivo);
  };
  
  

  render() {
    if (this.state.isLoading) {
      return <div>Loading...</div>;
    } else if (this.state.redirect) {
      return <Navigate to="/charlas" />;
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

          <div className="mb-3">
            <label htmlFor="imagenCharla" className={styles.formLabel}>
              Imagen de la Charla
            </label>
            <input
              type="file"
              name="imagenCharla"
              id="imagenCharla"
              onChange={(e) => this.setState({ imagenArchivo: e.target.files[0] })}
              className={styles.formInput}
            />
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
