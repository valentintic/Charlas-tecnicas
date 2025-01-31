import { useState } from "react";
import { postCreateRondaProfesorAsync } from "../../services/ProfesorService";

export default function GestionRondas() {
  const [fechaPresentacion, setFechaPresentacion] = useState("");
  const [fechaCierre, setFechaCierre] = useState("");
  const [duracion, setDuracion] = useState(""); // Se validará antes de enviar
  const [descripcionModulo, setDescripcionModulo] = useState(""); // Se validará antes de enviar
  const [fechaLimiteVotacion, setFechaLimiteVotacion] = useState("");
  const [error, setError] = useState(""); // Para mostrar errores

  const formatDate = (date) => (date ? date.split("T")[0] : "");

  const handleCrearRonda = async (e) => {
    e.preventDefault();

    // Validación de campos obligatorios
    if (!duracion || duracion <= 0) {
      setError("⚠ La duración debe ser un número mayor a 0.");
      return;
    }
    if (!descripcionModulo.trim()) {
      setError("⚠ La descripción del módulo es obligatoria.");
      return;
    }

    setError(""); // Si pasa la validación, limpiamos errores

    const rondaData = {
      idRonda: 0,
      idCursoUsuario: 0,
      fechaPresentacion: formatDate(fechaPresentacion),
      fechaCierre: formatDate(fechaCierre),
      duracion: Number(duracion),
      descripcionModulo,
      fechaLimiteVotacion: formatDate(fechaLimiteVotacion),
    };

    console.log("🚀 Cuerpo de la petición:", JSON.stringify(rondaData, null, 2));

    try {
      const response = await postCreateRondaProfesorAsync(rondaData);

      if (!response) throw new Error("Error al crear la ronda");

      alert("✅ Ronda creada con éxito");

      // Limpiar los campos
      setFechaPresentacion("");
      setFechaCierre("");
      setDuracion("");
      setDescripcionModulo("");
      setFechaLimiteVotacion("");
    } catch (error) {
      console.error(error);
      alert("❌ Hubo un error al crear la ronda");
    }
  };

  return (
    <div className="container">
      <h2>Gestión de Rondas</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleCrearRonda}>
        <div className="mb-3">
          <label className="form-label">Fecha de Presentación</label>
          <input
            type="date"
            className="form-control"
            value={fechaPresentacion}
            onChange={(e) => setFechaPresentacion(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Fecha de Cierre</label>
          <input
            type="date"
            className="form-control"
            value={fechaCierre}
            onChange={(e) => setFechaCierre(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Duración (minutos)</label>
          <input
            type="number"
            className="form-control"
            value={duracion}
            onChange={(e) => setDuracion(e.target.value)}
            required
            min="1"
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
            type="date"
            className="form-control"
            value={fechaLimiteVotacion}
            onChange={(e) => setFechaLimiteVotacion(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Crear Ronda
        </button>
      </form>
    </div>
  );
}
