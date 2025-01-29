import { useState, useEffect } from "react";
import { getCursosActivosProfesorAsync } from "./../../services/ProfesorService";
import { postCreateRondaProfesorAsync } from "../../services/ProfesorService";
import { ronda } from "../../models/rondas";

export default function GestionRondas() {
  const [cursoActivo, setCursoActivo] = useState(null);
  const [fechaPresentacion, setFechaPresentacion] = useState("");
  const [fechaCierre, setFechaCierre] = useState("");
  const [duracion, setDuracion] = useState(0);
  const [descripcionModulo, setDescripcionModulo] = useState("");
  const [fechaLimiteVotacion, setFechaLimiteVotacion] = useState("");
  const [loading, setLoading] = useState(true); // Estado de carga

  // Cargar el curso activo al cargar el componente
  useEffect(() => {
    const fetchCursosActivos = async () => {
      try {
        const cursos = await getCursosActivosProfesorAsync();
        console.log("📢 Cursos activos recibidos:", cursos);

        if (cursos && cursos.length > 0) {
          const curso = cursos[0];
          console.log("Curso obtenido:", curso); // Verifica que se obtiene el curso correctamente
          if (curso && curso.idCurso) {
            setCursoActivo(curso); // Establece el curso como curso activo
          } else {
            console.warn("⚠ Curso no tiene idCurso");
          }
        } else {
          console.warn("⚠ No hay cursos activos disponibles");
        }
      } catch (error) {
        console.error("❌ Error obteniendo cursos activos:", error);
      } finally {
        setLoading(false); // Una vez cargado, cambiamos el estado de loading
      }
    };

    fetchCursosActivos();
  }, []);

  useEffect(() => {
    if (cursoActivo) {
      console.log("🚀 Curso activo ID para crear ronda:", cursoActivo.idCurso); // Verifica que el cursoActivo tiene idCurso
    }
  }, [cursoActivo]);

  const handleCrearRonda = async (e) => {
    e.preventDefault();

    if (!cursoActivo) {
      alert("No se pudo obtener el curso activo.");
      return;
    }

    // Crear el objeto rondaData
    const rondaData = new ronda(
      null, // El id se generará automáticamente, no lo enviamos
      cursoActivo.idCurso, // Enviamos el ID del curso activo
      fechaPresentacion,
      fechaCierre,
      duracion,
      descripcionModulo,
      fechaLimiteVotacion
    );

    // Comprobamos el cuerpo de la petición antes de enviarlo
    console.log("🚀 Cuerpo de la petición de la ronda:", rondaData);

    try {

      // Usamos el servicio para crear la ronda
      const response = await postCreateRondaProfesorAsync(rondaData);

      if (!response) throw new Error("Error al crear la ronda");

      alert("Ronda creada con éxito");

      // Limpiar los campos del formulario
      setFechaPresentacion("");
      setFechaCierre("");
      setDuracion(0);
      setDescripcionModulo("");
      setFechaLimiteVotacion("");
    } catch (error) {
      console.error(error);
      alert("Hubo un error al crear la ronda");
    }
  };

  return (
    <div className="container">
      <h2>Gestión de Rondas</h2>

      {loading ? (
        <p>Cargando información del curso activo...</p> // Mensaje de carga
      ) : (
        <form onSubmit={handleCrearRonda}>
          <div className="mb-3">
            <label className="form-label">Fecha de Presentación</label>
            <input
              type="datetime-local"
              className="form-control"
              value={fechaPresentacion}
              onChange={(e) => setFechaPresentacion(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Fecha de Cierre</label>
            <input
              type="datetime-local"
              className="form-control"
              value={fechaCierre}
              onChange={(e) => setFechaCierre(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Duración</label>
            <input
              type="number"
              className="form-control"
              value={duracion}
              onChange={(e) => setDuracion(Number(e.target.value))}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Descripción del Módulo</label>
            <input
              type="text"
              className="form-control"
              value={descripcionModulo}
              onChange={(e) => setDescripcionModulo(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Fecha Límite de Votación</label>
            <input
              type="datetime-local"
              className="form-control"
              value={fechaLimiteVotacion}
              onChange={(e) => setFechaLimiteVotacion(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">ID Curso Activo</label>
            <input
              type="text"
              className="form-control"
              value={cursoActivo ? cursoActivo: "Cargando..."} // Muestra el ID del curso o "Cargando..."
              readOnly
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Crear Ronda
          </button>
        </form>
      )}
    </div>
  );
}
