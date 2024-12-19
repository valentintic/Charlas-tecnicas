import React, { useState, useEffect } from 'react';
import styles from './ProfesorComponent.module.css';
import { useNavigate } from 'react-router-dom';
import ProfesorService from './../../services/ProfesorService';

const ProfesorComponent = () => {
  const [rondas, setRondas] = useState([]); // Inicializamos como un array vacío
  const [alumnos, setAlumnos] = useState([]); // Inicializamos como un array vacío
  const [nuevoCurso, setNuevoCurso] = useState('');
  const [formVisible, setFormVisible] = useState(false);
  const [nuevaRonda, setNuevaRonda] = useState({
    idRonda: 0,
    idCursoUsuario: 0,
    fechaPresentacion: '',
    fechaCierre: '',
    duracion: 0,
    descripcionModulo: '',
    fechaLimiteVotacion: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    cargarDatosIniciales();
  }, []);

  const cargarDatosIniciales = async () => {
    try {
      const rondasData = await ProfesorService.fetchRondas();
      if (Array.isArray(rondasData)) {
        setRondas(rondasData);
      } else {
        setRondas([]); // En caso de que no sea un array, asignamos un array vacío
      }

      const alumnosData = await ProfesorService.fetchAlumnos();
      if (Array.isArray(alumnosData)) {
        setAlumnos(alumnosData); // Verificamos si la respuesta es un array antes de actualizar el estado
      } else {
        setAlumnos([]); // Si no es un array, asignamos un array vacío
      }
    } catch (error) {
      console.error('Error al cargar los datos iniciales:', error);
      setRondas([]);
      setAlumnos([]); // En caso de error, asignamos un array vacío también a alumnos
    }
  };

  const gestionarRonda = async (accion, id, datosActualizados) => {
    try {
      await ProfesorService.gestionarRonda(accion, id, datosActualizados);
      cargarDatosIniciales();
    } catch (error) {
      console.error(`Error al ${accion} la ronda:`, error);
    }
  };

  const handleCrearRonda = () => {
    setFormVisible(true); // Muestra el formulario para crear una nueva ronda
  };

  const handleSubmitRonda = async () => {
    try {
      await ProfesorService.gestionarRonda('crear', 0, nuevaRonda); // Llamamos a la función de creación
      setFormVisible(false); // Oculta el formulario
      cargarDatosIniciales(); // Recarga los datos
    } catch (error) {
      console.error('Error al crear la ronda:', error);
    }
  };

  const handleChange = (e) => {
    setNuevaRonda({
      ...nuevaRonda,
      [e.target.name]: e.target.value
    });
  };

  const cambiarEstadoCharla = async (id, idEstado) => {
    try {
      await ProfesorService.cambiarEstadoCharla(id, idEstado);
      cargarDatosIniciales();
    } catch (error) {
      console.error('Error al cambiar el estado de la charla:', error);
    }
  };

  const modificarEstadoAlumno = async (idUsuario, estado) => {
    try {
      await ProfesorService.modificarEstadoAlumno(idUsuario, estado);
      cargarDatosIniciales();
    } catch (error) {
      console.error('Error al modificar el estado del alumno:', error);
    }
  };

  const crearCurso = async () => {
    try {
      await ProfesorService.crearCurso(nuevoCurso);
      setNuevoCurso('');
      cargarDatosIniciales();
    } catch (error) {
      console.error('Error al crear el curso:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Gestión del Profesor</h1>

      <section className={styles.section}>
        <h2>Rondas</h2>
        <ul className={styles.list}>
          {Array.isArray(rondas) && rondas.length > 0 ? (
            rondas.map((ronda) => (
              <li key={ronda.id} className={styles.item}>
                {ronda.nombre}
                <button onClick={() => gestionarRonda('eliminar', ronda.id)}>Eliminar</button>
              </li>
            ))
          ) : (
            <li>No hay rondas disponibles.</li>
          )}
        </ul>
        <button onClick={handleCrearRonda} className={styles.button}>Crear Ronda</button>
      </section>

      {formVisible && (
        <section className={styles.section}>
          <h2>Crear Ronda</h2>
          <form onSubmit={handleSubmitRonda}>
            <div>
              <label>Fecha de Presentación:</label>
              <input
                type="datetime-local"
                name="fechaPresentacion"
                value={nuevaRonda.fechaPresentacion}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Fecha de Cierre:</label>
              <input
                type="datetime-local"
                name="fechaCierre"
                value={nuevaRonda.fechaCierre}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Duración (en minutos):</label>
              <input
                type="number"
                name="duracion"
                value={nuevaRonda.duracion}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Descripción del Módulo:</label>
              <input
                type="text"
                name="descripcionModulo"
                value={nuevaRonda.descripcionModulo}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Fecha Límite de Votación:</label>
              <input
                type="datetime-local"
                name="fechaLimiteVotacion"
                value={nuevaRonda.fechaLimiteVotacion}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className={styles.button}>Crear</button>
          </form>
        </section>
      )}

      <section className={styles.section}>
        <h2>Alumnos</h2>
        <ul className={styles.list}>
          {Array.isArray(alumnos) && alumnos.length > 0 ? (
            alumnos.map((alumno) => (
              <li key={alumno.id} className={styles.item}>
                {alumno.nombre} - Estado: {alumno.estado}
                <button onClick={() => modificarEstadoAlumno(alumno.id, 'activo')}>Activar</button>
                <button onClick={() => modificarEstadoAlumno(alumno.id, 'inactivo')}>Desactivar</button>
              </li>
            ))
          ) : (
            <li>No hay alumnos disponibles.</li>
          )}
        </ul>
      </section>

      <section className={styles.section}>
        <h2>Crear Curso</h2>
        <input
          type="text"
          value={nuevoCurso}
          onChange={(e) => setNuevoCurso(e.target.value)}
          placeholder="Nombre del curso"
          className={styles.input}
        />
        <button onClick={crearCurso} className={styles.button}>Crear Curso</button>
      </section>
    </div>
  );
};

export default ProfesorComponent;
