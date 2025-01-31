// src/components/profesor/RondaDetails.jsx
import React, { useState, useEffect } from 'react';
import { getCharlasCursoIdRonda } from '../../services/CharlasApi'; // Asegúrate de tener el servicio para obtener las charlas
import CharlaCard from './CharlaCard';
import styles from './RondaDetails.module.css';

const RondaDetails = ({ idRonda }) => {
  const [charlas, setCharlas] = useState([]);

  useEffect(() => {
    const fetchCharlas = async () => {
      const response = await getCharlasCursoIdRonda(idRonda);
      setCharlas(response);
    };

    if (idRonda) fetchCharlas();
  }, [idRonda]);

  return (
    <div className={styles.rondaDetails}>
      {charlas.length > 0 ? (
        <div className={styles.charlasList}>
          {charlas
            .sort((a, b) => b.votos - a.votos) // Ordena por número de votos
            .map((charla) => (
              <CharlaCard key={charla.idCharla} charla={charla} />
            ))}
        </div>
      ) : (
        <p>No hay charlas para esta ronda.</p>
      )}
    </div>
  );
};

export default RondaDetails;
