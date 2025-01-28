import React, { Component } from 'react';
import { getAlumnosCursoProfesorAsync, updateEstadoAlumnoProfesorAsync } from '../../services/ProfesorService';

export default class AlumnosProfesorCurso extends Component {
    state = {
        cursos: null,
        alumnos: null,
        filtroCurso: '',
        filtroEstado: '', // 'true' para activo, 'false' para inactivo
        filtroCorreo: ''
    };

    componentDidMount = () => {
        this.loadAlumnosCursoProfesor();
    };

    loadAlumnosCursoProfesor = () => {
        getAlumnosCursoProfesorAsync().then((response) => {
            let cursosProfe = [];
            let alumnosProfe = [];
            response.forEach((element) => {
                cursosProfe.push(element.curso);
                alumnosProfe.push(element.alumnos);
            });

            this.setState({
                cursos: cursosProfe,
                alumnos: alumnosProfe
            });
        });
    };

    handleFiltroCursoChange = (event) => {
        this.setState({ filtroCurso: event.target.value });
    };

    handleFiltroEstadoChange = (event) => {
        this.setState({ filtroEstado: event.target.value });
    };

    handleFiltroCorreoChange = (event) => {
        this.setState({ filtroCorreo: event.target.value });
    };

    handleEstadoChange = (idAlumno, nuevoEstado) => {
        // Llama al endpoint para actualizar el estado del alumno
        updateEstadoAlumnoProfesorAsync(idAlumno, nuevoEstado)
            .then(() => {
                // Volver a cargar la lista de alumnos tras la actualización
                this.loadAlumnosCursoProfesor();
            })
            .catch((error) => {
                console.error('Error actualizando el estado del alumno:', error);
            });
    };

    render() {
        const { cursos, alumnos, filtroCurso, filtroEstado, filtroCorreo } = this.state;

        // Filtrar los alumnos según los filtros seleccionados
        const alumnosFiltrados = alumnos
            ? alumnos.flat().filter((alumno) => {
                  const cumpleCurso =
                      !filtroCurso || alumno.alumno.idCurso.toString() === filtroCurso;
                  const cumpleEstado =
                      !filtroEstado || alumno.alumno.estadoUsuario.toString() === filtroEstado;
                  const cumpleCorreo =
                      !filtroCorreo ||
                      alumno.alumno.email.toLowerCase().includes(filtroCorreo.toLowerCase());

                  return cumpleCurso && cumpleEstado && cumpleCorreo;
              })
            : [];

        return (
            <div>
                <h1>Alumnos Profesor Curso</h1>
                {cursos && alumnos ? (
                    <>
                        {/* Filtros */}
                        <div style={{ marginBottom: '20px' }}>
                            <label htmlFor="filtroCurso">Filtrar por Curso:</label>
                            <select
                                id="filtroCurso"
                                value={filtroCurso}
                                onChange={this.handleFiltroCursoChange}
                            >
                                <option value="">Todos</option>
                                {cursos.map((curso, index) => (
                                    <option key={index} value={curso.idCurso}>
                                        {curso.idCurso} - {curso.nombre}
                                    </option>
                                ))}
                            </select>

                            <label htmlFor="filtroEstado" style={{ marginLeft: '20px' }}>
                                Filtrar por Estado:
                            </label>
                            <select
                                id="filtroEstado"
                                value={filtroEstado}
                                onChange={this.handleFiltroEstadoChange}
                            >
                                <option value="">Todos</option>
                                <option value="true">Activo</option>
                                <option value="false">Inactivo</option>
                            </select>

                            <label htmlFor="filtroCorreo" style={{ marginLeft: '20px' }}>
                                Filtrar por Correo:
                            </label>
                            <input
                                type="text"
                                id="filtroCorreo"
                                value={filtroCorreo}
                                onChange={this.handleFiltroCorreoChange}
                                placeholder="Buscar correo..."
                                className="form form-control"
                            />
                        </div>

                        {/* Tabla */}
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Correo</th>
                                    <th>Curso</th>
                                    <th>Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {alumnosFiltrados.map((alumno, index) => (
                                    <tr key={index}>
                                        <td>{alumno.alumno.email}</td>
                                        <td>
                                            {alumno.alumno.idCurso} - {alumno.alumno.curso}
                                        </td>
                                        <td>
                                            <select
                                                name="estadoUsuario"
                                                id="EstadoUsuario"
                                                value={alumno.alumno.estadoUsuario}
                                                onChange={(e) =>
                                                    this.handleEstadoChange(
                                                        alumno.alumno.idUsuario,
                                                        e.target.value === 'true'
                                                    )
                                                }
                                            >
                                                <option value="true">Activo</option>
                                                <option value="false">Inactivo</option>
                                            </select>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>
                ) : (
                    <h2>Cargando Alumnos Profesor Curso...</h2>
                )}
            </div>
        );
    }
}
