import  { useState } from 'react';
import { postCreateCursoProfesorAsync } from './../../services/ProfesorService'; 

const CrearCurso = () => {
  const [nombre, setNombre] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [activo, setActivo] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Verificar que todos los campos estén completos
    if (!nombre || !fechaInicio || !fechaFin) {
      setError('Todos los campos son requeridos');
      return;
    }

    const curso = {
      nombre,
      fechaInicio,
      fechaFin,
      activo,
    };

    try {
      const response = await postCreateCursoProfesorAsync(curso); // Llamada al servicio

      if (response) {
        setSuccess('Curso creado exitosamente');
        setError(null);
        setNombre('');
        setFechaInicio('');
        setFechaFin('');
        setActivo(true);
      }
    } catch (err) {
      setError('Hubo un error al crear el curso');
      setSuccess(null);
    }
  };

  return (
    <div>
      <h3>Crear Nuevo Curso</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre del Curso</label>
          <input
            type="text"
            className="form-control"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="fechaInicio" className="form-label">Fecha de Inicio</label>
          <input
            type="date"
            className="form-control"
            id="fechaInicio"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="fechaFin" className="form-label">Fecha de Fin</label>
          <input
            type="date"
            className="form-control"
            id="fechaFin"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="activo" className="form-label">Activo</label>
          <select
            id="activo"
            className="form-select"
            value={activo}
            onChange={(e) => setActivo(e.target.value === 'true')}
          >
            <option value="true">Activo</option>
            <option value="false">Inactivo</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">Crear Curso</button>
      </form>
    </div>
  );
};

export default CrearCurso;
