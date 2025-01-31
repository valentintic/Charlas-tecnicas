import { useState } from 'react';
import { postCreateCursoProfesorAsync } from './../../services/ProfesorService';

const CrearCurso = () => {
  const [idCurso, setIdCurso] = useState('');
  const [nombre, setNombre] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [activo, setActivo] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validación de campos requeridos
    if (!idCurso || !nombre || !fechaInicio || !fechaFin) {
      setError('Todos los campos son requeridos');
      return;
    }

    // Validar que el ID sea un número de 4 dígitos
    if (!/^\d{4}$/.test(idCurso)) {
      setError('El ID del curso debe ser un número de 4 dígitos');
      return;
    }

    // Crear objeto con la estructura esperada
    const curso = {
      idCurso: parseInt(idCurso), // Convertir el ID a un número
      nombre,
      fechaInicio: new Date(fechaInicio).toISOString(),
      fechaFin: new Date(fechaFin).toISOString(),
      activo
    };

    console.log('Enviando curso:', curso); // ✅ Verificar en consola antes de enviar

    try {
      const response = await postCreateCursoProfesorAsync(curso);
      console.log('Respuesta del servidor:', response); // ✅ Verificar respuesta de la API

      if (response) {
        setSuccess('Curso creado exitosamente');
        setError(null);
        setIdCurso('');
        setNombre('');
        setFechaInicio('');
        setFechaFin('');
        setActivo(true);
      }
    } catch (err) {
      console.error('Error en la petición:', err); // ✅ Verificar error en consola
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
          <label className="form-label">ID del Curso</label>
          <input
            type="text"
            className="form-control"
            value={idCurso}
            onChange={(e) => setIdCurso(e.target.value)}
            required
            maxLength={4}
          />
        </div>

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
          <select
            className="form-select"
            value={activo}
            onChange={(e) => setActivo(e.target.value === 'true')}
          >
            <option value="true">Sí</option>
            <option value="false">No</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">Crear Curso</button>
      </form>
    </div>
  );
};

export default CrearCurso;
