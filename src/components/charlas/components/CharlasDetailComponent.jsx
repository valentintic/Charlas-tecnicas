import React from 'react';
import styles from '../modules/Charlas.module.css';
import { formatedDate } from '../../utils/dateUtils';
import ComentariosComponent from './ComentariosComponent';

const CharlaDetailsComponent = ({ charla }) => {
  return (
    <div className={`${styles.cardDetails} ${styles.visible}`}>
      <p><strong>Descripción:</strong> {charla.descripcion}</p>
      <p><strong>Tiempo:</strong> {charla.tiempo}</p>
      <p><strong>Fecha Propuesta:</strong> {formatedDate(charla.fechaPropuesta)}</p>
      <p><strong>Estado:</strong> {charla.idEstadoCharla}</p>
      <p><strong>Ronda:</strong> {formatedDate(charla.idRonda)}</p>
      <div className={styles.cardButtons}>
        <button className="btn btn-primary">Votar</button>
        <button className="btn btn-secondary">Detalles</button>
      </div>

      <ComentariosComponent charlaId={charla.idCharla} />
    </div>
  );
};

export default CharlaDetailsComponent;
