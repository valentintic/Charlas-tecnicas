import React, { Component } from "react";

export default class ComentariosList extends Component {
  state = {
    comentarios: [], // Lista completa de comentarios
    comentariosVisibles: [], // Comentarios actualmente visibles
    mostrarComentarios: false, // Controla si se despliega la lista
    comentariosPorPagina: 10, // Cantidad de comentarios por bloque
    nuevoComentario: "", // Texto del nuevo comentario
  };

  componentDidMount() {
    this.loadComentarios();
  }

  loadComentarios() {
    const comentarios = this.props.comentarios || []; // Cargar comentarios desde props
    this.setState({ comentarios });
  }

  formatDate(fecha) {
    const opciones = { year: "numeric", month: "long", day: "numeric" };
    return new Date(fecha).toLocaleDateString(undefined, opciones);
  }

  mostrarMasComentarios = () => {
    const { comentarios, comentariosVisibles, comentariosPorPagina } = this.state;
    const nuevosComentarios = comentarios.slice(
      comentariosVisibles.length,
      comentariosVisibles.length + comentariosPorPagina
    );
    this.setState({
      comentariosVisibles: [...comentariosVisibles, ...nuevosComentarios],
    });
  };

  alternarComentarios = () => {
    const { mostrarComentarios, comentarios, comentariosPorPagina } = this.state;
    if (!mostrarComentarios) {
      this.setState({
        mostrarComentarios: true,
        comentariosVisibles: comentarios.slice(0, comentariosPorPagina),
      });
    } else {
      this.setState({ mostrarComentarios: false, comentariosVisibles: [] });
    }
  };

  manejarCambioComentario = (e) => {
    this.setState({ nuevoComentario: e.target.value });
  };

  agregarComentario = () => {
    const { nuevoComentario, comentarios } = this.state;
    if (nuevoComentario.trim()) {
      const nuevo = {
        idComentario: comentarios.length + 1,
        idUsuario: comentarios.length + 1,
        usuario: "Usuario Actual", // Cambiar por el usuario actual
        contenido: nuevoComentario,
        fecha: new Date().toISOString(),
      };
      this.setState({
        comentarios: [nuevo, ...comentarios],
        nuevoComentario: "",
      });
    }
  };

  render() {
    const { comentariosVisibles, mostrarComentarios, nuevoComentario, comentarios } = this.state;

    return (
      <div className="container mt-5">
        {/* Formulario para agregar un nuevo comentario */}
        <div className="mb-4 p-4 rounded-4 shadow-sm" style={{ backgroundColor: "#f8f9fa" }}>
          <div className="d-flex align-items-center">
            <img
              src={`https://i.pravatar.cc/150?img=1`} // Cambiar por el avatar del usuario actual
              alt="Avatar"
              className="rounded-circle me-3"
              style={{ width: "50px", height: "50px", objectFit: "cover" }}
            />
            <textarea
              className="form-control"
              rows="3"
              placeholder="Escribe un comentario..."
              value={nuevoComentario}
              onChange={this.manejarCambioComentario}
              style={{
                borderRadius: "15px",
                resize: "none",
                border: "1px solid #ced4da",
                backgroundColor: "#ffffff",
              }}
            ></textarea>
          </div>
          <div className="d-flex justify-content-end mt-3">
            <button
              className="btn btn-primary px-4 py-2 rounded-3 shadow-sm"
              style={{ fontWeight: "bold" }}
              onClick={this.agregarComentario}
            >
              Publicar
            </button>
          </div>
        </div>

        {/* Botón para desplegar/ocultar comentarios */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-0" style={{ fontWeight: "bold", color: "#343a40" }}>Comentarios</h2>
          <button
            className={`btn btn-${mostrarComentarios ? "secondary" : "primary"} btn-sm rounded-pill px-4`}
            onClick={this.alternarComentarios}
          >
            {mostrarComentarios ? "Ocultar comentarios" : "Mostrar comentarios"}
          </button>
        </div>

        {/* Lista de comentarios */}
        {mostrarComentarios && (
          <div className="list-group">
            {comentariosVisibles.map((comentario) => (
              <div
                key={comentario.idComentario}
                className="list-group-item mb-4 p-4 rounded-4 shadow-sm"
                style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e9ecef",
                }}
              >
                <div className="d-flex align-items-start">
                  {/* Avatar */}
                  <img
                    src={`https://i.pravatar.cc/150?img=${comentario.idUsuario}`}
                    alt="Avatar"
                    className="rounded-circle me-3"
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "cover",
                      border: "2px solid #dee2e6",
                    }}
                  />
                  <div style={{ flex: "1" }}>
                    {/* Usuario y fecha */}
                    <div className="d-flex align-items-center mb-1">
                      <h6 className="mb-0 me-2" style={{ fontWeight: "600", color: "#495057" }}>
                        {comentario.usuario}
                      </h6>
                      <small className="text-muted">{this.formatDate(comentario.fecha)}</small>
                    </div>
                    {/* Contenido del comentario */}
                    <p className="mb-2" style={{ fontSize: "15px", color: "#495057", display: "flex" }}>
                      {comentario.contenido}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Botón para cargar más comentarios */}
            {comentariosVisibles.length < comentarios.length && (
              <div className="d-flex justify-content-center mt-3">
                <button
                  className="btn btn-outline-primary rounded-pill shadow-sm px-4 py-2"
                  onClick={this.mostrarMasComentarios}
                >
                  Mostrar más
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}
