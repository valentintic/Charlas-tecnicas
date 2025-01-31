import React from "react";
import useAlumnos from "./useAlumnos";
import defaultUserImage from "../../assets/profile-default-icon.jpg";

const Alumnos = () => {
  const {
    alumnosFiltrados,
    filtros,
    cursos,
    roleMap,
    manejarCambioFiltro,
    handleCursoChange,
    updateRoleUsuario,
    updateStateProfesor,
    deleteUsuario,
  } = useAlumnos();

  return (
    <div className="container">
      <h1 className="mb-4">Gestión de Alumnos</h1>

      {/* Filtros */}
      <div className="mb-4 p-3 rounded shadow-sm bg-light">
        <h5>Filtros</h5>
        <div className="row g-3">
          <div className="col-12 col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Filtrar por nombre"
              name="nombre"
              value={filtros.nombre}
              onChange={manejarCambioFiltro}
            />
          </div>
          <div className="col-12 col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Filtrar por apellidos"
              name="apellidos"
              value={filtros.apellidos}
              onChange={manejarCambioFiltro}
            />
          </div>
          <div className="col-12 col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Filtrar por role"
              name="role"
              value={filtros.role}
              onChange={manejarCambioFiltro}
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
                <th>Rol</th>
                <th>Cambiar Rol</th>
                <th>Cursos</th>
                <th>Curso</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {alumnosFiltrados.length > 0 ? (
                alumnosFiltrados.map((alumno) => (
                  <tr key={alumno.idUsuario}>
                    <td>
                      <img
                        src={alumno.imagen}
                        onError={(e) => (e.target.src = defaultUserImage)}
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
                    <td>{roleMap[alumno.idRole]}</td>
                    <td>
                      <select
                        value={alumno.idRole}
                        onChange={(e) => updateRoleUsuario(alumno.idUsuario, e.target.value)}
                        className="form-select"
                      >
                        {Object.entries(roleMap).map(([roleId, roleName]) => (
                          <option key={roleId} value={roleId}>
                            {roleName}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      {alumno.cursos.map((curso) => (
                        <span key={curso.idCurso} className="badge bg-secondary me-1">
                          {curso.idCurso}
                        </span>
                      ))}
                    </td>

                    <td>
                      <select
                        value={alumno.curso || ""}
                        onChange={(e) => handleCursoChange(alumno.idUsuario, e.target.value)}
                        className="form-select"
                      >
                        <option value="" disabled>
                          Seleccionar curso
                        </option>
                        {cursos.map((curso) => (
                          <option key={curso.idCurso} value={curso.idCurso}>
                            {curso.idCurso}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <span
                        onClick={() => {
                          if (alumno.idRole === 1) {
                            updateStateProfesor(alumno.idUsuario, !alumno.estadoUsuario);
                          }
                        }}
                        style={{
                          display: "flex",
                          width: "20px",
                          height: "20px",
                          borderRadius: "50%",
                          backgroundColor: alumno.estadoUsuario ? "green" : "red",
                          justifyContent: "center",
                          cursor: alumno.idRole === 1 ? "pointer" : "not-allowed",
                          opacity: alumno.idRole === 1 ? 1 : 0.5,
                        }}
                        title={
                          alumno.idRole === 1
                            ? alumno.estadoUsuario
                              ? "Activo"
                              : "Inactivo"
                            : "Solo los profesores pueden cambiar el estado"
                        }
                      ></span>
                    </td>
                    <td>
                      <button className="btn btn-danger" onClick={() => deleteUsuario(alumno.idUsuario)}>
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center">
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
};

export default Alumnos;
