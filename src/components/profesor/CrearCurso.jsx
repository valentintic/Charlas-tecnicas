import React, { useState } from 'react';

export default function CrearCurso() {
  const [nombre, setNombre] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [activo, setActivo] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!nombre || !fechaInicio || !fechaFin) {
      alert('Por favor, complete todos los campos.');
      return;
    }

    try {
      const response = await fetch('/api/profesor/createcurso', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          idCurso: 0,
          nombre,
          fechaInicio,
          fechaFin,
          activo,
        }),
      });

      if (!response.ok) {
        throw new Error('Error al crear el curso');
      }

      const data = await response.json();
      alert('Curso creado con éxito');
      console.log(data);

      // Limpiar formulario después de enviar
      setNombre('');
      setFechaInicio('');
      setFechaFin('');
      setActivo(true);
    } catch (error) {
      console.error('Error creando el curso:', error);
      alert('Hubo un error al crear el curso');
    }
  };

  return (
    <div className="container">
      <h2>Crear Nuevo Curso</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre del Curso</label>
          <input
            type="text"
            className="form-control"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Fecha de Inicio</label>
          <input
            type="datetime-local"
            className="form-control"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Fecha de Fin</label>
          <input
            type="datetime-local"
            className="form-control"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Activo</label>
          <input
            type="checkbox"
            className="form-check-input"
            checked={activo}
            onChange={(e) => setActivo(e.target.checked)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Crear Curso
        </button>
      </form>
    </div>
  );
}
