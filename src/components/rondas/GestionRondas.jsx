import { useState, useEffect } from "react";

export default function GestionRondas() {
  const [cursoActivo, setCursoActivo] = useState(null);
  const [fechaPresentacion, setFechaPresentacion] = useState("");
  const [fechaCierre, setFechaCierre] = useState("");
  const [duracion, setDuracion] = useState(0);
  const [descripcionModulo, setDescripcionModulo] = useState("");
  const [fechaLimiteVotacion, setFechaLimiteVotacion] = useState("");

  // Cargar el curso activo al cargar el componente
  useEffect(() => {
    const fetchCursosActivos = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("/api/profesor/cursosactivosprofesor", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Error al obtener los cursos activos");

        const data = await response.json();
        console.log("📢 Cursos activos recibidos:", data);

        if (data.length > 0) {
          setCursoActivo(data[0].idCurso); // Tomamos el primer curso de la lista
        } else {
          console.warn("⚠ No hay cursos activos disponibles");
        }
      } catch (error) {
        console.error("❌ Error obteniendo cursos activos:", error);
      }
    };

    fetchCursosActivos();
  }, []);

  const handleCrearRonda = async (e) => {
    e.preventDefault();

    if (!cursoActivo) {
      alert("No se pudo obtener el curso activo.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/profesor/createronda", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          idRonda: null, // El id se generará automáticamente, no lo envíes
          idCursoUsuario: cursoActivo, // Se envía el curso activo
          fechaPresentacion,
          fechaCierre,
          duracion,
          descripcionModulo,
          fechaLimiteVotacion,
        }),
      });

      if (!response.ok) throw new Error("Error al crear la ronda");

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
            value={cursoActivo || "Cargando..."}
            readOnly
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Crear Ronda
        </button>
      </form>
    </div>
  );
}
