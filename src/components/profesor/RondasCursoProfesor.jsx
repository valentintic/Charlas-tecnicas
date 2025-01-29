import  { useEffect, useState } from 'react';
import { getRondasProfesorAsync } from '../../services/ProfesorService'; 
import styles from './RondasCursoProfesor.module.css';

const RondasCursoProfesor = () => {
  const [rondas, setRondas] = useState([]);
  const [selectedRondaId, setSelectedRondaId] = useState(null);
  const [isCharlasVisible, setIsCharlasVisible] = useState(false);

  useEffect(() => {
    // Llamamos a la API para obtener las rondas
    getRondasProfesorAsync()
      .then((response) => {
        setRondas(response); // Guardamos las rondas en el estado
      })
      .catch((error) => {
        console.error("Error al obtener las rondas:", error);
      });
  }, []);

  const handleRondaClick = (idRonda) => {
    setSelectedRondaId((prevId) => {
      if (prevId === idRonda) {
        // Alterna la visibilidad de las charlas si la misma ronda es clickeada
        setIsCharlasVisible((prevState) => !prevState);
      } else {
        setIsCharlasVisible(true); // Muestra las charlas para la nueva ronda seleccionada
      }
      return idRonda;
    });
  };

  return (
    <div className={styles.container}>
      <h1>Rondas</h1>
      <ul>
        {rondas.map((ronda) => {
          const formattedDatePresentacion = new Date(ronda.fechaPresentacion).toLocaleDateString();

          return (
            <li key={ronda.idRonda} className={styles.rondaItem}>
              <div
                className={styles.dateBox}
                onClick={() => handleRondaClick(ronda.idRonda)}
              >
                <h3>{formattedDatePresentacion}</h3>
                <span
                  className={styles.arrow}
                  style={{
                    transform: selectedRondaId === ronda.idRonda && isCharlasVisible
                      ? 'rotate(180deg)'
                      : 'rotate(0deg)', // Flecha hacia abajo o arriba
                  }}
                >
                  &#9660; {/* Flecha hacia abajo */}
                </span>
              </div>

              {selectedRondaId === ronda.idRonda && isCharlasVisible && (
                <div className={styles.charlasContainer}>
                  {/* Aquí podrías poner el componente para las charlas si es necesario */}
                  <p>Charlas para la ronda {ronda.numero}</p>
                </div>
              )}
            </li>
          );
        }).reverse()}
      </ul>
    </div>
  );
};

export default RondasCursoProfesor;
