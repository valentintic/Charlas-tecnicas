import React, { Component } from 'react';
import { getCharlasCursoProfesor, getRondasProfesorAsync, updateEstadoCharlaProfesorAsync } from '../../services/ProfesorService';
import './UpdateEstadoCharlaAlumnosProfesor.css';

export default class UpdateEstadoCharlaAlumnosProfesor extends Component {
    state = {
        charlas: [],
        rondasProfesor: [],
        filtroTitulo: '',
        filtroIdRonda: '',
        filtroUsuario: '',
        filtroEstado: '',
        currentPage: 1,
        itemsPerPage: 20
    };

    componentDidMount = () => {
        this.loadCharlasCursoProfesor();
        this.loadRondasProfesor();
    };

    loadCharlasCursoProfesor = () => {
        getCharlasCursoProfesor().then((response) => {
            this.setState({ charlas: response });
        });
    };

    loadRondasProfesor = () => {
        getRondasProfesorAsync().then((response) => {
            this.setState({ rondasProfesor: response });
        });
    };

    handleFiltroChange = (event) => {
        this.setState({ [event.target.name]: event.target.value, currentPage: 1 });
    };

    handleEstadoChange = (idCharla, nuevoEstado) => {
        updateEstadoCharlaProfesorAsync(idCharla, nuevoEstado).then(() => {
            this.setState((prevState) => {
                const charlasActualizadas = prevState.charlas.map((charla) =>
                    charla.idCharla === idCharla ? { ...charla, idEstadoCharla: nuevoEstado } : charla
                );
                return { charlas: charlasActualizadas };
            });
        });
    };

    handlePageChange = (newPage) => {
        this.setState({ currentPage: newPage });
    };

    render() {
        const { charlas, rondasProfesor, filtroTitulo, filtroIdRonda, filtroUsuario, filtroEstado, currentPage, itemsPerPage } = this.state;

        const charlasFiltradas = charlas.filter((charla) => {
            const cumpleTitulo = !filtroTitulo || charla.titulo.toLowerCase().includes(filtroTitulo.toLowerCase());
            const cumpleIdRonda = !filtroIdRonda || charla.idRonda.toString() === filtroIdRonda;
            const cumpleUsuario = !filtroUsuario || charla.usuario.toLowerCase().includes(filtroUsuario.toLowerCase());
            const cumpleEstado = !filtroEstado || charla.idEstadoCharla === parseInt(filtroEstado);

            return cumpleTitulo && cumpleIdRonda && cumpleUsuario && cumpleEstado;
        });

        // Paginación
        const totalPages = Math.ceil(charlasFiltradas.length / itemsPerPage);
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const charlasPaginadas = charlasFiltradas.slice(indexOfFirstItem, indexOfLastItem);

        return (
            <div className="container">
                <h1 className="title">Charlas - Estado</h1>

                {/* Filtros */}
                <div className="filtersContainer">
                    <div className="filterGroup">
                        <label htmlFor="filtroTitulo">Título:</label>
                        <input 
                            type="text" 
                            name="filtroTitulo" 
                            value={filtroTitulo} 
                            onChange={this.handleFiltroChange} 
                            placeholder="Buscar por título..." 
                            className="input" 
                        />
                    </div>

                    <div className="filterGroup">
                        <label htmlFor="filtroIdRonda">Ronda:</label>
                        <select 
                            name="filtroIdRonda" 
                            value={filtroIdRonda} 
                            onChange={this.handleFiltroChange} 
                            className="select"
                        >
                            <option value="">Todas las rondas</option>
                            {rondasProfesor.map((ronda) => (
                                <option key={ronda.idRonda} value={ronda.idRonda}>
                                    {ronda.descripcionModulo} - {ronda.idRonda}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="filterGroup">
                        <label htmlFor="filtroUsuario">Usuario:</label>
                        <input 
                            type="text" 
                            name="filtroUsuario" 
                            value={filtroUsuario} 
                            onChange={this.handleFiltroChange} 
                            placeholder="Buscar usuario..." 
                            className="input" 
                        />
                    </div>

                    <div className="filterGroup">
                        <label htmlFor="filtroEstado">Estado:</label>
                        <select 
                            name="filtroEstado" 
                            value={filtroEstado} 
                            onChange={this.handleFiltroChange} 
                            className="select"
                        >
                            <option value="">Todos los estados</option>
                            <option value="1">Propuesta</option>
                            <option value="2">Aceptada</option>
                        </select>
                    </div>
                </div>

                {/* Tabla */}
                <table className="table">
                    <thead>
                        <tr>
                            <th>Título</th>
                            <th>ID Ronda</th>
                            <th>Usuario</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {charlasPaginadas.map((charla) => (
                            <tr key={charla.idCharla}>
                                <td>{charla.titulo}</td>
                                <td>{charla.idRonda}</td>
                                <td>{charla.usuario}</td>
                                <td>
                                    <select 
                                        value={charla.idEstadoCharla} 
                                        onChange={(e) => this.handleEstadoChange(charla.idCharla, parseInt(e.target.value))} 
                                        className="select"
                                    >
                                        <option value="1">Propuesta</option>
                                        <option value="2">Aceptada</option>
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
                        className="button"
                    >
                        ⬅ Anterior
                    </button>
                    <span className="pageInfo">Página {currentPage} de {totalPages}</span>
                    <button 
                        onClick={() => this.handlePageChange(currentPage + 1)} 
                        disabled={currentPage === totalPages || totalPages === 0} 
                        className="button"
                    >
                        Siguiente ➡
                    </button>
                </div>
            </div>
        );
    }
}
