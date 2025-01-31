import React, { useState } from 'react';
import RondaItem from './RondaItem';  // Asegúrate de importar correctamente el componente de ronda

const RondasList = ({ rondas }) => {
  const [rondasList, setRondasList] = useState(rondas);

  const handleDeleteRonda = (idRonda) => {
    setRondasList((prevRondas) => prevRondas.filter((ronda) => ronda.idRonda !== idRonda));
  };

  return (
    <div className="rondas-list">
      {rondasList.map((ronda) => (
        <RondaItem key={ronda.idRonda} ronda={ronda} onDelete={handleDeleteRonda} />
      ))}
    </div>
  );
};

export default RondasList;
