import React, { useState, useEffect } from 'react';
import styles from '../modules/ComentariosList.module.css';

const ComentariosList = ({ comentarios }) => {
  const [comentariosVisibles, setComentariosVisibles] = useState([]);
  const [mostrarComentarios, setMostrarComentarios] = useState(false);
  const [comentariosPorPagina] = useState(10);

  useEffect(() => {
    if (mostrarComentarios) {
      setComentariosVisibles(comentarios.slice(0, comentariosPorPagina));
    }
  }, [mostrarComentarios, comentarios]);

  const formatDate = (fecha) => {
    const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(fecha).toLocaleDateString(undefined, opciones);
  };

  const mostrarMasComentarios = () => {
    const nuevosComentarios = comentarios.slice(
      comentariosVisibles.length,
      comentariosVisibles.length + comentariosPorPagina
    );
    setComentariosVisibles((prev) => [...prev, ...nuevosComentarios]);
  };

  const borrarComentario = async (id) => {
    await deleteComentario(id);
    getComentariosCharla(idCharla);
  }

  const updateComentario = async (comentario) => {
    await updateComentario(comentario);
    getComentariosCharla(idCharla);
  }

  const alternarComentarios = () => {
    setMostrarComentarios((prev) => !prev);
  };

  return (
    <div className={styles.comentariosListContainer}>
      {/* Botón para desplegar/ocultar comentarios */}
      <div className={styles.comentariosHeader}>
        <h2>Comentarios</h2>
        <button
          className={styles.btnToggle}
          onClick={alternarComentarios}
        >
          <span>{mostrarComentarios ? 'Ocultar comentarios' : 'Mostrar comentarios'}</span>
        </button>
      </div>

      {/* Lista de comentarios */}
      {mostrarComentarios && (
        <div className={styles.comentariosList}>
          {comentariosVisibles.map((comentario) => (
            <div key={comentario.idComentario} className={styles.comentarioItem}>
              <div className={styles.comentarioHeader}>
                <img
                  src={`http://apicharlasalumnostajamar.azurewebsites.net:80/images/users/${comentario.idUsuario}_user.png`}
                  alt="Avatar"
                  className={styles.avatar}
                />
                <div>
                  <h6>{comentario.usuario}</h6>
                  <small>{formatDate(comentario.fecha)}</small>
                </div>
              </div>
              <p>{comentario.contenido}</p>
            </div>
          ))}
          {comentariosVisibles.length < comentarios.length && (
            <button className={styles.btnCargarMas} onClick={mostrarMasComentarios}>
              Cargar más comentarios
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ComentariosList;
