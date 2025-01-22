import React, { Component } from 'react';
import { getComentariosCharla, createComentario } from '../../../services/Comentarios'; // Asegúrate de importar la función de crear comentario
import ComentariosList from './ComentariosList';
import styles from '../modules/ComentariosComponent.module.css';

export default class ComentariosComponent extends Component {
  state = {
    comentarios: [],
    nuevoComentario: {
      idComentario: 0,
      idCharla: 0,
      idUsuario: 0,
      contenido: "",
      fecha: new Date(),
    },
  };

  componentDidMount() {
    const id = this.props.charlaId;
    this.loadComentarios(id);
    console.log('ComentariosComponent mounted');
  }

  componentDidUpdate(prevProps) {
    if (prevProps.charlaId !== this.props.charlaId) {
      this.loadComentarios(this.props.charlaId);
    }
  }

  loadComentarios(id) {
    getComentariosCharla(id).then((response) => {
      console.log('response', response);
      this.setState({
        comentarios: response,
      });
    });
  }

  agregarComentario = () => {
    const { nuevoComentario, comentarios } = this.state;
    const idCharla = this.props.charlaId;
  
    // Asegúrate de que el contenido no esté vacío
    if (nuevoComentario.contenido.trim()) {
      // Asegúrate de que el idCharla es válido
      if (idCharla && idCharla !== 0) {
        // Crear el comentario con los valores correctos
        const comentario = {
          ...nuevoComentario,
          idCharla: idCharla,  // Asegúrate de que este ID sea correcto
          idComentario: nuevoComentario.idComentario || 0, // Este ID es autogenerado por el servidor
          idUsuario: nuevoComentario.idUsuario || 0, // Si es necesario, este ID puede ser asignado por el backend
        };
  
        // Llamar a la función para crear el comentario en la base de datos
        createComentario(comentario).then((response) => {
          console.log('Comentario creado:', response);
          
          // Aquí puedes manejar el ID de usuario si es devuelto por el servidor
          this.setState({
            comentarios: [...comentarios, response], // Agregar el comentario creado al estado
            nuevoComentario: {
              idComentario: 0, // Este ID es autogenerado
              idCharla: idCharla, // Asegúrate de que este ID sea correcto
              idUsuario: response.idUsuario || 0, // Este ID es recibido del servidor
              contenido: "", // Limpiar el contenido después de agregar el comentario
              fecha: new Date(), // Actualizar la fecha
            }
          });
        }).catch(error => {
          console.error('Error creando comentario:', error);
        });
      } else {
        console.error('ID de charla no válido');
      }
    } else {
      console.error('El contenido del comentario no puede estar vacío');
    }
  };
  
  

  manejarCambioComentario = (e) => {
    const { value } = e.target;
    this.setState({
      nuevoComentario: {
        ...this.state.nuevoComentario,
        contenido: value, // Actualizar el contenido con lo que se escribe en el textarea
      },
    });
  };

  render() {
    const { comentarios, nuevoComentario } = this.state;

    return (
      <div className={styles.comentariosContainer}>
        {/* Formulario para agregar un nuevo comentario */}
        <div className={styles.comentarioForm}>
          <div className={styles.comentarioInput}>
            <img
              src={`https://i.pravatar.cc/150?img=1`} // Cambiar por el avatar del usuario actual
              alt="Avatar"
              className={styles.avatar}
            />
            <textarea
              className={styles.comentarioTextarea}
              rows="3"
              placeholder="Escribe un comentario..."
              value={nuevoComentario.contenido} // Aquí se muestra el contenido actualizado
              onChange={this.manejarCambioComentario} // Actualiza el estado con el contenido del textarea
            ></textarea>
          </div>
          <button className={styles.btnPublicar} onClick={this.agregarComentario}>
            Publicar
          </button>
        </div>

        {/* Lista de comentarios */}
        {this.state.comentarios.length > 0 && <ComentariosList comentarios={comentarios} />}
      </div>
    );
  }
}
