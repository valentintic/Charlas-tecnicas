import axios from 'axios';

const ProfesorService = {
  fetchCharlas: async () => {
    const response = await axios.get('/api/charlas');
    return response.data;
  },

  // Modificado para obtener las rondas desde el endpoint correcto
  fetchRondas: async () => {
    const response = await axios.get('/api/profesor/rondasprofesor');
    return response.data;  // Asegúrate de que la respuesta sea un array de rondas
  },

  fetchAlumnos: async () => {
    const response = await axios.get('/api/profesor/almunoscursoprofesor');
    return response.data;
  },

  cambiarEstadoCharla: async (id, idEstado) => {
    await axios.put(`/api/Profesor/UpdateEstadoCharla/${id}/${idEstado}`);
  },

  gestionarRonda: async (accion, id, datosActualizados) => {
    if (accion === 'crear') {
      await axios.post('/api/Profesor/CreateRonda');
    } else if (accion === 'eliminar') {
      await axios.delete(`/api/Profesor/DeleteRonda/${id}`);
    } else if (accion === 'actualizar') {
      await axios.put('/api/Profesor/UpdateRonda', datosActualizados);
    }
  },

  modificarEstadoAlumno: async (idUsuario, estado) => {
    await axios.put(`/api/profesor/updateestadoalumno/${idUsuario}/${estado}`);
  },

  crearCurso: async (nombre) => {
    await axios.post('/api/profesor/createcurso', { nombre });
  }
};

export default ProfesorService;
