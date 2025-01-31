import React from 'react';
import PropTypes from 'prop-types';

// Ruta por defecto de la imagen
import defaultImage from '/src/assets/Default_imaget.webp';

const CharlaCard = ({ charla }) => {
  // Si no hay imagen, mostrar la imagen por defecto
  const imageSrc = charla.imagenCharla || defaultImage;

  return (
    <div className="ronda-card">
      <img
        className="charla-card-image"
        src={imageSrc}
        alt={charla.titulo || 'Charla'}
      />
      <div className="charla-card-text">{charla.titulo || 'Título de la Charla'}</div>
    </div>
  );
};

CharlaCard.propTypes = {
  charla: PropTypes.shape({
    imagenCharla: PropTypes.string,
    titulo: PropTypes.string,
  }).isRequired,
};

export default CharlaCard;
