import React, { Component } from 'react';
import { getCharlasCursoProfesor, getRondasProfesorAsync, updateEstadoCharlaProfesorAsync } from '../../services/ProfesorService';

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
            <div style={styles.container}>
                <h1 style={styles.title}>Charlas - Estado</h1>

                {/* Filtros */}
                <div style={styles.filtersContainer}>
                    <input type="text" name="filtroTitulo" value={filtroTitulo} onChange={this.handleFiltroChange} placeholder="Buscar por título..." style={styles.input} />
                    <select name="filtroIdRonda" value={filtroIdRonda} onChange={this.handleFiltroChange} style={styles.select}>
                        <option value="">Todas las rondas</option>
                        {rondasProfesor.map((ronda) => (
                            <option key={ronda.idRonda} value={ronda.idRonda}>
                                {ronda.descripcionModulo} - {ronda.idRonda}
                            </option>
                        ))}
                    </select>
                    <input type="text" name="filtroUsuario" value={filtroUsuario} onChange={this.handleFiltroChange} placeholder="Buscar usuario..." style={styles.input} />
                    <select name="filtroEstado" value={filtroEstado} onChange={this.handleFiltroChange} style={styles.select}>
                        <option value="">Todos</option>
                        <option value="1">Propuesta</option>
                        <option value="2">Aceptada</option>
                    </select>
                </div>

                {/* Tabla */}
                <table style={styles.table}>
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
                                    <select value={charla.idEstadoCharla} onChange={(e) => this.handleEstadoChange(charla.idCharla, parseInt(e.target.value))} style={styles.select}>
                                        <option value="1">Propuesta</option>
                                        <option value="2">Aceptada</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Paginación */}
                <div style={styles.paginationContainer}>
                    <button onClick={() => this.handlePageChange(currentPage - 1)} disabled={currentPage === 1} style={{ ...styles.button, opacity: currentPage === 1 ? 0.5 : 1 }}>
                        ⬅ Anterior
                    </button>
                    <span style={styles.pageInfo}>Página {currentPage} de {totalPages}</span>
                    <button onClick={() => this.handlePageChange(currentPage + 1)} disabled={currentPage === totalPages || totalPages === 0} style={{ ...styles.button, opacity: currentPage === totalPages ? 0.5 : 1 }}>
                        Siguiente ➡
                    </button>
                </div>
            </div>
        );
    }
}

const styles = {
    container: {
        maxWidth: '900px',
        margin: 'auto',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        background: '#f9f9f9',
        borderRadius: '10px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)'
    },
    title: {
        textAlign: 'center',
        color: '#333',
        marginBottom: '20px'
    },
    filtersContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '20px',
        gap: '10px'
    },
    input: {
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        width: '100%'
    },
    select: {
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        width: '100%',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        backgroundColor: '#fff',
        borderRadius: '8px',
        overflow: 'hidden'
    },
    paginationContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '20px',
        gap: '10px'
    },
    button: {
        padding: '10px 15px',
        borderRadius: '5px',
        border: 'none',
        background: '#007bff',
        color: '#fff',
        cursor: 'pointer',
        fontSize: '14px'
    },
    pageInfo: {
        fontSize: '16px',
        fontWeight: 'bold'
    }
};
