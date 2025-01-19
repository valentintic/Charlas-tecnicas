import { Component } from "react";
import { getAllUsersAdmin } from "../../services/UsuariosAdminService";
import defaultUserImage from "../../assets/profile-default-icon.jpg";

export default class Alumnos extends Component {
  state = {
    alumnos: [], // Lista completa de alumnos
    alumnosFiltrados: [], // Lista filtrada
    filtros: {
      curso: "",
      nombre: "",
      apellidos: "",
      role: "",
    },
  };

  componentDidMount() {
    this.loadAlumnos();
  }

  componentWillUnmount() {
    this.setState({ alumnos: [], alumnosFiltrados: [] });
  }

  loadAlumnos() {
    getAllUsersAdmin().then((response) => {
      this.setState({
        alumnos: response,
        alumnosFiltrados: response, // Inicialmente, todos los alumnos se muestran
      });
    });
  }

  manejarCambioFiltro = (e) => {
    const { name, value } = e.target;
    this.setState(
      (prevState) => ({
        filtros: {
          ...prevState.filtros,
          [name]: value,
        },
      }),
      this.aplicarFiltros // Aplicar los filtros después de actualizar el estado
    );
  };

  aplicarFiltros = () => {
    const { alumnos, filtros } = this.state;
    const { curso, nombre, apellidos, role } = filtros;

    const alumnosFiltrados = alumnos.filter((alumno) => {
      return (
        (!curso || alumno.curso?.toLowerCase().includes(curso.toLowerCase())) &&
        (!nombre || alumno.nombre?.toLowerCase().includes(nombre.toLowerCase())) &&
        (!apellidos || alumno.apellidos?.toLowerCase().includes(apellidos.toLowerCase())) &&
        (!role || String(alumno.idRole).toLowerCase().includes(role.toLowerCase()))
      );
    });

    this.setState({ alumnosFiltrados });
  };

  render() {
    const { alumnosFiltrados, filtros } = this.state;

    return (
      <div className="container mt-5">
        <h1 className="mb-4">Gestión de Alumnos</h1>

        {/* Filtros */}
        <div className="mb-4 p-3 rounded shadow-sm bg-light">
          <h5>Filtros</h5>
          <div className="row g-3">
            <div className="col-12 col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="Filtrar por curso"
                name="curso"
                value={filtros.curso}
                onChange={this.manejarCambioFiltro}
              />
            </div>
            <div className="col-12 col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="Filtrar por nombre"
                name="nombre"
                value={filtros.nombre}
                onChange={this.manejarCambioFiltro}
              />
            </div>
            <div className="col-12 col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="Filtrar por apellidos"
                name="apellidos"
                value={filtros.apellidos}
                onChange={this.manejarCambioFiltro}
              />
            </div>
            <div className="col-12 col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="Filtrar por role"
                name="role"
                value={filtros.role}
                onChange={this.manejarCambioFiltro}
              />
            </div>
          </div>
        </div>

        {/* Tabla de alumnos */}
        <div style={{ maxHeight: "500px", overflowY: "auto" }}>
          <div className="table-responsive">
            <table className="table table-striped table-bordered table-responsive">
              <thead className="table-dark">
                <tr>
                  <th>Imagen</th>
                  <th>Id Usuario</th>
                  <th>Nombre</th>
                  <th>Apellidos</th>
                  <th>Email</th>
                  <th>Estado</th>
                  <th>Rol</th>
                </tr>
              </thead>
              <tbody>
                {alumnosFiltrados.length > 0 ? (
                  alumnosFiltrados.map((alumno) => (
                    <tr key={alumno.idUsuario}>
                      <td>
                        <img
                          src={alumno.imagen}
                          onError={(e) => e.target.src = defaultUserImage}
                          alt={`Imagen de ${alumno.nombre}`}
                          className="img-fluid"
                          style={{
                            width: "50px",
                            height: "50px",
                            borderRadius: "50%",
                            objectFit: "cover",
                          }}
                        />
                      </td>
                      <td>{alumno.idUsuario}</td>
                      <td>{alumno.nombre}</td>
                      <td>{alumno.apellidos}</td>
                      <td>{alumno.email}</td>
                      <td>
                        <span
                          style={{
                            display: "flex",
                            width: "20px",
                            height: "20px",
                            borderRadius: "50%",
                            backgroundColor: alumno.estadoUsuario ? "green" : "red",
                            justifyContent: "center",
                          }}
                          title={alumno.estadoUsuario ? "Activo" : "Inactivo"}
                        ></span>
                      </td>
                      <td>{alumno.idRole}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center">
                      No se encontraron alumnos.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
