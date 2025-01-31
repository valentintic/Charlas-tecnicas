import React, { Component } from 'react';
import { getAlumnosCursoProfesorAsync, updateEstadoAlumnoProfesorAsync } from '../../services/ProfesorService';
import './AlumnosProfesorCurso.css';

export default class AlumnosProfesorCurso extends Component {
    state = {
        cursos: null,
        alumnos: null,
        filtroCurso: '',
        filtroEstado: '',
        filtroCorreo: '',
        currentPage: 1,
        alumnosPerPage: 15
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
                alumnos: alumnosProfe.flat(),
                currentPage: 1
            });
        });
    };

    handleFiltroCursoChange = (event) => this.setState({ filtroCurso: event.target.value, currentPage: 1 });
    handleFiltroEstadoChange = (event) => this.setState({ filtroEstado: event.target.value, currentPage: 1 });
    handleFiltroCorreoChange = (event) => this.setState({ filtroCorreo: event.target.value, currentPage: 1 });

    handleEstadoChange = (idAlumno, nuevoEstado) => {
        updateEstadoAlumnoProfesorAsync(idAlumno, nuevoEstado)
            .then(() => {
                this.loadAlumnosCursoProfesor();
            })
            .catch((error) => {
                console.error('Error actualizando el estado del alumno:', error);
            });
    };

    handlePageChange = (newPage) => {
        this.setState({ currentPage: newPage });
    };

    render() {
        const { cursos, alumnos, filtroCurso, filtroEstado, filtroCorreo, currentPage, alumnosPerPage } = this.state;

        const alumnosFiltrados = alumnos
            ? alumnos.filter((alumno) => {
                const cumpleCurso = !filtroCurso || alumno.alumno.idCurso.toString() === filtroCurso;
                const cumpleEstado = !filtroEstado || alumno.alumno.estadoUsuario.toString() === filtroEstado;
                const cumpleCorreo =
                    !filtroCorreo || alumno.alumno.email.toLowerCase().includes(filtroCorreo.toLowerCase());

                return cumpleCurso && cumpleEstado && cumpleCorreo;
            })
            : [];

        // Paginar alumnos
        const indexOfLastAlumno = currentPage * alumnosPerPage;
        const indexOfFirstAlumno = indexOfLastAlumno - alumnosPerPage;
        const alumnosFiltradosPaginados = alumnosFiltrados.slice(indexOfFirstAlumno, indexOfLastAlumno);
        const totalPages = Math.ceil(alumnosFiltrados.length / alumnosPerPage);

        return (
            <div className="container">
                <h1 className="title">Alumnos Profesor Curso</h1>
                {cursos && alumnos ? (
                    <>
                        {/* Filtros */}
                        <div className="filtersContainer">
                            <div className="filterGroup">
                                <label htmlFor="filtroCurso">Filtrar por Curso:</label>
                                <select id="filtroCurso" value={filtroCurso} onChange={this.handleFiltroCursoChange}>
                                    <option value="">Todos</option>
                                    {cursos.map((curso, index) => (
                                        <option key={index} value={curso.idCurso}>
                                            {curso.idCurso} - {curso.nombre}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="filterGroup">
                                <label htmlFor="filtroEstado">Filtrar por Estado:</label>
                                <select id="filtroEstado" value={filtroEstado} onChange={this.handleFiltroEstadoChange}>
                                    <option value="">Todos</option>
                                    <option value="true">Activo</option>
                                    <option value="false">Inactivo</option>
                                </select>
                            </div>

                            <div className="filterGroup">
                                <label htmlFor="filtroCorreo">Filtrar por Correo:</label>
                                <input
                                    type="text"
                                    id="filtroCorreo"
                                    value={filtroCorreo}
                                    onChange={this.handleFiltroCorreoChange}
                                    placeholder="Buscar correo..."
                                    className="form-input"
                                />
                            </div>
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
                                {alumnosFiltradosPaginados.map((alumno, index) => (
                                    <tr key={index}>
                                        <td>{alumno.alumno.email}</td>
                                        <td>
                                            {alumno.alumno.idCurso} - {alumno.alumno.curso}
                                        </td>
                                        <td>
                                            <select
                                                name="estadoUsuario"
                                                value={alumno.alumno.estadoUsuario}
                                                onChange={(e) =>
                                                    this.handleEstadoChange(
                                                        alumno.alumno.idUsuario,
                                                        e.target.value
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

                        {/* Paginación */}
                        <div className="paginationContainer">
                            <button
                                onClick={() => this.handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="paginationButton"
                            >
                                ⬅ Anterior
                            </button>

                            <span className="paginationInfo">
                                Página {currentPage} de {totalPages}
                            </span>

                            <button
                                onClick={() => this.handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages || totalPages === 0}
                                className="paginationButton"
                            >
                                Siguiente ➡
                            </button>
                        </div>
                    </>
                ) : (
                    <h2>Cargando Alumnos Profesor Curso...</h2>
                )}
            </div>
        );
    }
}
