import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getCharlasCursoIdRonda } from '../../services/CharlasApi';  
import { updateRondaProfesorAsync, deleteRondaProfesorAsync } from '../../services/ProfesorService';  
import CharlaCard from './CharlaCard'; 
import styles from './RondaItem.module.css'; 

const RondaItem = ({ ronda, onDelete }) => {
  const [charlas, setCharlas] = useState([]);
  const [showCharlas, setShowCharlas] = useState(false);
  const [isEditing, setIsEditing] = useState(false);  
  const [rondaData, setRondaData] = useState({
    idRonda: ronda.idRonda,
    descripcionModulo: ronda.descripcionModulo,
    fechaPresentacion: ronda.fechaPresentacion,
    fechaCierre: ronda.fechaCierre,
    duracion: ronda.duracion,
    fechaLimiteVotacion: ronda.fechaLimiteVotacion,
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date)) return dateString;
    return date.toLocaleDateString('es-ES');
  };

  useEffect(() => {
    if (showCharlas) {
      getCharlasCursoIdRonda(ronda.idRonda).then((data) => {
        setCharlas(data);
      });
    }
  }, [showCharlas, ronda.idRonda]);

  const handleEditClick = () => {
    setIsEditing(!isEditing);  
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRondaData({
      ...rondaData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedRonda = await updateRondaProfesorAsync(rondaData);
    if (updatedRonda) {
      setIsEditing(false);  
    }
  };

  const handleDelete = async () => {
    // Confirmación de eliminación
    const confirmDelete = window.confirm(`¿Estás seguro de que quieres eliminar la ronda: ${ronda.nombre}?`);

    if (confirmDelete) {
      try {
        await deleteRondaProfesorAsync(ronda.idRonda); // Llamamos al servicio de eliminación
        if (onDelete) onDelete(ronda.idRonda); // Llamamos a la función de eliminación en el componente padre si se pasa
        alert('Ronda eliminada con éxito');
      } catch (error) {
        console.error('Error al eliminar la ronda:', error);
        alert('Hubo un problema al eliminar la ronda');
      }
    }
  };

  return (
    <div className={styles.rondaItem}>
      <div className={styles.rondaHeader}>
        <div className={styles.rondaInfo}>
          <h3>{ronda.nombre}</h3>
          <p>{formatDate(ronda.fechaPresentacion)} - {ronda.descripcionModulo}</p>
        </div>
        <div className={styles.arrow}>▼</div>
        <button className="edit-button" onClick={handleEditClick}>
          {isEditing ? 'Cancelar' : 'Editar'}
        </button>
        <button className="delete-button" onClick={handleDelete}>
          Eliminar
        </button>  {/* Botón de eliminar */}
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="form-container">
          <label>
            Descripción:
            <input
              type="text"
              name="descripcionModulo"
              value={rondaData.descripcionModulo}
              onChange={handleChange}
            />
          </label>
          <label>
            Fecha de Presentación:
            <input
              type="datetime-local"
              name="fechaPresentacion"
              value={rondaData.fechaPresentacion}
              onChange={handleChange}
            />
          </label>
          <label>
            Fecha de Cierre:
            <input
              type="datetime-local"
              name="fechaCierre"
              value={rondaData.fechaCierre}
              onChange={handleChange}
            />
          </label>
          <label>
            Duración (minutos):
            <input
              type="number"
              name="duracion"
              value={rondaData.duracion}
              onChange={handleChange}
            />
          </label>
          <label>
            Fecha Límite de Votación:
            <input
              type="datetime-local"
              name="fechaLimiteVotacion"
              value={rondaData.fechaLimiteVotacion}
              onChange={handleChange}
            />
          </label>
          <button type="submit">Guardar</button>
        </form>
      ) : (
        showCharlas && (
          <div className={styles.charlasContainer}>
            {charlas.length > 0 ? (
              charlas.map((charla) => <CharlaCard key={charla.idCharla} charla={charla} />)
            ) : (
              <p>No hay charlas disponibles para esta ronda.</p>
            )}
          </div>
        )
      )}
    </div>
  );
};

RondaItem.propTypes = {
  ronda: PropTypes.object.isRequired,
  onDelete: PropTypes.func, // Prop para manejar la eliminación en el componente padre
};

export default RondaItem;
