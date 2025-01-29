import React, { Component } from 'react';
import { getCharlasCursoProfesor, getRondasProfesorAsync, updateEstadoCharlaProfesorAsync } from '../../services/ProfesorService';

export default class UpdateEstadoCharlaAlumnosProfesor extends Component {
    state = {
        charlas: null,
        rondasProfesor: [],
        filtroTitulo: '',
        filtroIdRonda: '',
        filtroUsuario: '',
        filtroEstado: ''
    };

    componentDidMount = () => {
        this.loadCharlasCursoProfesor();
        this.loadRondasProfesor();
    };

    loadCharlasCursoProfesor = () => {
        getCharlasCursoProfesor().then((response) => {
            this.setState({ charlas: response });
            console.log(response);
        });
    };

    loadRondasProfesor = () => {
        getRondasProfesorAsync().then((response) => {
            this.setState({ rondasProfesor: response });
            console.log(response);
        });
    };

    UpdateEstadoCharlaAlumnosProfesor = (idCharla, idEstado) => {
        updateEstadoCharlaProfesorAsync(idCharla, idEstado);
    };

    handleFiltroChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleEstadoChange = (idCharla, nuevoEstado) => {
        console.log(`Actualizando charla con ID ${idCharla} al estado ${nuevoEstado}`);

        // Simular actualización local
        this.setState((prevState) => {
            const charlasActualizadas = prevState.charlas.map((charla) =>
                charla.idCharla === idCharla
                    ? { ...charla, idEstadoCharla: nuevoEstado }
                    : charla
            );
            return { charlas: charlasActualizadas };
        });
    };

    render() {
        const { charlas, rondasProfesor, filtroTitulo, filtroIdRonda, filtroUsuario, filtroEstado } = this.state;

        const charlasFiltradas = charlas
            ? charlas.filter((charla) => {
                const cumpleTitulo = !filtroTitulo || charla.titulo.toLowerCase().includes(filtroTitulo.toLowerCase());
                const cumpleIdRonda = !filtroIdRonda || charla.idRonda.toString() === filtroIdRonda;
                const cumpleUsuario = !filtroUsuario || charla.usuario.toLowerCase().includes(filtroUsuario.toLowerCase());
                const cumpleEstado = !filtroEstado || charla.idEstadoCharla === parseInt(filtroEstado);

                return cumpleTitulo && cumpleIdRonda && cumpleUsuario && cumpleEstado;
            })
            : [];

        return (
            <div>
                <h1>Actualizar Estado de Charlas</h1>
                {charlas ? (
                    <>
                        {/* Filtros */}
                        <div style={{ marginBottom: '20px' }}>
                            <label htmlFor="filtroTitulo">Filtrar por Título:</label>
                            <input
                                type="text"
                                name="filtroTitulo"
                                value={filtroTitulo}
                                onChange={this.handleFiltroChange}
                                placeholder="Buscar título..."
                                className="form form-control"
                            />

                            <label htmlFor="filtroIdRonda" style={{ marginLeft: '20px' }}>
                                Filtrar por ID Ronda:
                            </label>
                            <select
                                name="filtroIdRonda"
                                value={filtroIdRonda}
                                onChange={this.handleFiltroChange}
                                className="form form-control"
                            >
                                <option value="">Todas</option>
                                {rondasProfesor.map((ronda) => (
                                    <option key={ronda.idRonda} value={ronda.idRonda}>
                                        {ronda.descripcionModulo} - {ronda.idRonda}
                                    </option>
                                ))}
                            </select>

                            <label htmlFor="filtroUsuario" style={{ marginLeft: '20px' }}>
                                Filtrar por Usuario:
                            </label>
                            <input
                                type="text"
                                name="filtroUsuario"
                                value={filtroUsuario}
                                onChange={this.handleFiltroChange}
                                placeholder="Buscar usuario..."
                                className="form form-control"
                            />

                            <label htmlFor="filtroEstado" style={{ marginLeft: '20px' }}>
                                Filtrar por Estado:
                            </label>
                            <select
                                name="filtroEstado"
                                value={filtroEstado}
                                onChange={this.handleFiltroChange}
                                className="form form-control"
                            >
                                <option value="">Todos</option>
                                <option value="1">Propuesta</option>
                                <option value="2">Aceptada</option>
                            </select>
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
                                {charlasFiltradas.map((charla) => (
                                    <tr key={charla.idCharla}>
                                        <td>{charla.titulo}</td>
                                        <td>{charla.idRonda}</td>
                                        <td>{charla.usuario}</td>
                                        <td>
                                            <select
                                                value={charla.idEstadoCharla}
                                                onChange={(e) =>
                                                    this.handleEstadoChange(
                                                        charla.idEstadoCharla,
                                                        parseInt(e.target.value)
                                                    )
                                                }
                                            >
                                                <option value="1">Propuesta</option>
                                                <option value="2">Aceptada</option>
                                            </select>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>
                ) : (
                    <h2>Cargando Charlas...</h2>
                )}
            </div>
        );
    }
}
