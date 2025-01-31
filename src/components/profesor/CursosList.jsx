import React from 'react';

const CursosList = ({ cursos }) => {
  return (
    <ul>
      {cursos.map((curso) => (
        // Asegúrate de que cada 'li' tenga una propiedad 'key' única
        <li key={curso}>  {/* Suponiendo que 'id' sea único para cada curso */}
          {curso}
        </li>
      ))}
    </ul>
  );
};

export default CursosList;
