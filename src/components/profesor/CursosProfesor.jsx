// src/components/profesor/CursosProfesor.jsx
import React, { Component } from 'react';
import CursosList from './CursosList'; // Componente para mostrar los cursos
import { getCursosProfesorAsync } from '../../services/ProfesorService';  // Importamos el servicio
import styles from './CursosProfesor.module.css';  // El CSS específico de este componente

export default class CursosProfesor extends Component {
  state = {
    cursos: [],                // Listado de cursos
    selectedCursoId: null,     // ID del curso seleccionado
  };

  // Función para obtener los cursos del profesor
  getCursosProfesor = () => {
    getCursosProfesorAsync().then((response) => {
      if (Array.isArray(response) && response.length > 0) {
        console.log("Cursos del profesor:", response);  // Verificamos si los cursos se obtienen correctamente
        this.setState({
          cursos: response,   // Guardamos los cursos en el estado
        });
      } else {
        console.log("No se encontraron cursos o la respuesta no es un array válido");
        this.setState({ cursos: [] });  // Si no hay cursos, establecemos el array vacío
      }
    }).catch((error) => {
      console.error('Error al obtener los cursos:', error);  // Manejo de errores
    });
  };

  // Al montar el componente, obtenemos los cursos del profesor
  componentDidMount() {
    this.getCursosProfesor();
  }

  // Función para manejar el clic en un curso
  handleCursoClick = (idCurso) => {
    this.setState({ selectedCursoId: idCurso });  // Establecemos el ID del curso seleccionado
  };

  render() {
    const { cursos } = this.state;

    return (
      <div className={styles.container}>
        <h1>Cursos del Profesor</h1>
        {cursos.length === 0 ? (
          <p>No se han encontrado cursos</p>  // Si no hay cursos, mostramos un mensaje
        ) : (
          <CursosList cursos={cursos} onCursoClick={this.handleCursoClick} />  // Mostramos el listado de cursos
        )}
      </div>
    );
  }
}
