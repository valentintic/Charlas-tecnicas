import React, { useState, useEffect, useRef } from 'react';
import styles from '../modules/ComentariosList.module.css';
import { getAlumnoId } from '../../../services/UsuariosService';
import { deleteComentario, updateComentario } from '../../../services/Comentarios';

const ComentariosList = ({ comentarios }) => {
  const [comentariosVisibles, setComentariosVisibles] = useState([]);
  const [comentariosState, setComentariosState] = useState(comentarios);
  const [mostrarComentarios, setMostrarComentarios] = useState(false);
  const [comentariosPorPagina] = useState(10);
  const [userId, setUserId] = useState(null);
  const [comentarioEditado, setComentarioEditado] = useState(null);
  const [nuevoContenido, setNuevoContenido] = useState('');
  const [showMenu, setShowMenu] = useState(null); // Estado para el menú de tres puntos
  const menuRef = useRef(null); // Referencia para el menú de opciones

  useEffect(() => {
    if (mostrarComentarios) {
      setComentariosVisibles(comentariosState.slice(0, comentariosPorPagina));
    }
  }, [mostrarComentarios, comentariosState]);

  useEffect(() => {
    getAlumnoId().then((response) => {
      setUserId(response);
    });
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setComentariosState(comentarios);
    setMostrarComentarios(false); 
    setComentariosVisibles([]);
    setComentarioEditado(null);
  }, [comentarios]);

  const formatDate = (fecha) => {
    const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(fecha).toLocaleDateString(undefined, opciones);
  };

  const mostrarMasComentarios = () => {
    const nuevosComentarios = comentariosState.slice(
      comentariosVisibles.length,
      comentariosVisibles.length + comentariosPorPagina
    );
    setComentariosVisibles((prev) => [...prev, ...nuevosComentarios]);
  };

  const borrarComentario = async (id) => {
    await deleteComentario(id);
    setComentariosState(prev => prev.filter(comentario => comentario.idComentario !== id));
  };

  const cargarComentarioEnInput = (comentario) => {
    setComentarioEditado(comentario);
    setNuevoContenido(comentario.contenido);
  };

  const updateComentarioAsync = async () => {
    if (!comentarioEditado) return;

    const comentarioActualizado = {
        idComentario: comentarioEditado.idComentario,
        idCharla: comentarioEditado.idCharla,
        idUsuario: comentarioEditado.idUsuario,
        contenido: nuevoContenido,
        fecha: new Date().toISOString(),
    };

    try {
        await updateComentario(comentarioActualizado);
        setComentariosState(prev =>
            prev.map(c => (c.idComentario === comentarioActualizado.idComentario ? comentarioActualizado : c))
        );
        setComentarioEditado(null);
        setNuevoContenido('');
    } catch (error) {
        console.error("Error updating comentario", error);
    }
  };

  const alternarComentarios = () => {
    setMostrarComentarios((prev) => !prev);
  };

  const handleMenuToggle = (idComentario) => {
    // Si el menú está abierto, se cierra; si no, se abre.
    setShowMenu(showMenu === idComentario ? null : idComentario);
  };

  return (
    <div className={styles.comentariosListContainer}>
      <div className={styles.comentariosHeader}>
        <h2>Comentarios</h2>
        <button className={styles.btnToggle} onClick={alternarComentarios}>
          <span>{mostrarComentarios ? 'Ocultar comentarios' : 'Mostrar comentarios'}</span>
        </button>
      </div>

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
                <div className={styles.comentarioInfo}>
                  <h6>{comentario.usuario}</h6>
                  <small>{formatDate(comentario.fecha)}</small>
                </div>

                {userId == comentario.idUsuario && 
                <>
                <div className={styles.comentarioAcciones}>
                  <span
                    className={styles.tresPuntos}
                    onClick={(e) => {
                      e.stopPropagation(); // Evita que el clic se propague y cierre el menú
                      handleMenuToggle(comentario.idComentario);
                    }}
                  >
                    &#8230;
                  </span>

                  {showMenu === comentario.idComentario && (
                    <div ref={menuRef} className={`${styles.menuOpciones} ${showMenu === comentario.idComentario ? styles.show : ''}`}>
                      {comentarioEditado?.idComentario !== comentario.idComentario && (
                        <button className='btn btn-primary' onClick={() => cargarComentarioEnInput(comentario)}>
                          Editar
                        </button>
                      )}
                      <button className='btn btn-danger' onClick={() => borrarComentario(comentario.idComentario)}>
                        Eliminar
                      </button>
                    </div>
                  )}
                </div>
                </>
                }
                
              </div>

              {comentarioEditado?.idComentario === comentario.idComentario ? (
                <div className={styles.comentarioEdit}>
                  <input
                    type="text"
                    value={nuevoContenido}
                    onChange={(e) => setNuevoContenido(e.target.value)}
                    className={styles.inputEditar}
                  />
                  <button className='btn btn-success' onClick={updateComentarioAsync}>Guardar</button>
                  <button className='btn btn-secondary' onClick={() => setComentarioEditado(null)}>Cancelar</button>
                </div>
              ) : (
                <p style={{ display: "flex", marginLeft: "25px"}}>{comentario.contenido}</p>
              )}
            </div>
          ))}

          {comentariosVisibles.length < comentariosState.length && (
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
