import React, { Component } from 'react';
import { getCharlasCursoProfesor } from '../../services/ProfesorService';

export default class UpdateEstadoCharlaAlumnosProfesor extends Component {
    state = {
        charlas: null,
        filtroTitulo: '',
        filtroIdRonda: '',
        filtroUsuario: '',
        filtroEstado: '' // 'true' para activa, 'false' para inactiva
    };

    componentDidMount = () => {
        this.loadCharlasCursoProfesor();
    };

    loadCharlasCursoProfesor = () => {
        getCharlasCursoProfesor().then((response) => {
            this.setState({ charlas: response });
        });
    };

    handleFiltroTituloChange = (event) => {
        this.setState({ filtroTitulo: event.target.value });
    };

    handleFiltroIdRondaChange = (event) => {
        this.setState({ filtroIdRonda: event.target.value });
    };

    handleFiltroUsuarioChange = (event) => {
        this.setState({ filtroUsuario: event.target.value });
    };

    handleFiltroEstadoChange = (event) => {
        this.setState({ filtroEstado: event.target.value });
    };

    handleEstadoChange = (idCharla, nuevoEstado) => {
        // Aquí puedes agregar la llamada al endpoint para actualizar el estado de la charla si se requiere
        console.log(`Actualizando charla con ID ${idCharla} al estado ${nuevoEstado}`);

        // Simular actualización en el estado local (opcional si no hay una actualización en el backend)
        this.setState((prevState) => {
            const charlasActualizadas = prevState.charlas.map((charla) =>
                charla.idCharla === idCharla
                    ? { ...charla, estadoCharla: nuevoEstado }
                    : charla
            );
            return { charlas: charlasActualizadas };
        });
    };

    render() {
        const { charlas, filtroTitulo, filtroIdRonda, filtroUsuario, filtroEstado } = this.state;

        // Filtrar las charlas según los filtros seleccionados
        const charlasFiltradas = charlas
            ? charlas.filter((charla) => {
                  const cumpleTitulo =
                      !filtroTitulo || charla.titulo.toLowerCase().includes(filtroTitulo.toLowerCase());
                  const cumpleIdRonda =
                      !filtroIdRonda || charla.idRonda.toString() === filtroIdRonda;
                  const cumpleUsuario =
                      !filtroUsuario || charla.usuario.toLowerCase().includes(filtroUsuario.toLowerCase());
                  const cumpleEstado =
                      !filtroEstado || charla.estadoCharla.toString() === filtroEstado;

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
                                id="filtroTitulo"
                                value={filtroTitulo}
                                onChange={this.handleFiltroTituloChange}
                                placeholder="Buscar título..."
                                className="form form-control"
                            />

                            <label htmlFor="filtroIdRonda" style={{ marginLeft: '20px' }}>
                                Filtrar por ID Ronda:
                            </label>
                            <input
                                type="number"
                                id="filtroIdRonda"
                                value={filtroIdRonda}
                                onChange={this.handleFiltroIdRondaChange}
                                placeholder="ID Ronda"
                                className="form form-control"
                            />

                            <label htmlFor="filtroUsuario" style={{ marginLeft: '20px' }}>
                                Filtrar por Usuario:
                            </label>
                            <input
                                type="text"
                                id="filtroUsuario"
                                value={filtroUsuario}
                                onChange={this.handleFiltroUsuarioChange}
                                placeholder="Buscar usuario..."
                                className="form form-control"
                            />

                            <label htmlFor="filtroEstado" style={{ marginLeft: '20px' }}>
                                Filtrar por Estado:
                            </label>
                            <select
                                id="filtroEstado"
                                value={filtroEstado}
                                onChange={this.handleFiltroEstadoChange}
                                className="form form-control"
                            >
                                <option value="">Todos</option>
                                <option value="true">Activa</option>
                                <option value="false">Inactiva</option>
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
                                                name="estadoCharla"
                                                value={charla.estadoCharla}
                                                onChange={(e) =>
                                                    this.handleEstadoChange(
                                                        charla.idCharla,
                                                        e.target.value === 'true'
                                                    )
                                                }
                                            >
                                                <option value="true">PROPUESTA</option>
                                                <option value="false">ACEPTA</option>
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
