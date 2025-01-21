import { useState, useEffect } from "react";
import {
  getAllUsersAdmin,
  updateStateProfesor,
  cursoUsuario,
  updateCursoUsuario,
  updateRoleUsuario,
} from "../../services/UsuariosAdminService";

const useAlumnos = () => {
  const [alumnos, setAlumnos] = useState([]);
  const [alumnosFiltrados, setAlumnosFiltrados] = useState([]);
  const [filtros, setFiltros] = useState({
    curso: "",
    nombre: "",
    apellidos: "",
    role: "",
  });
  const [roleMap] = useState({
    1: "Profesor",
    2: "Alumno",
    3: "Administrador",
  });
  const [cursos, setCursos] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      await loadAlumnos();
      await loadCursos();
    };
    loadData();
  }, []);

  const loadCursos = async () => {
    try {
      const cursosResponse = await cursoUsuario();
      const cursosUnicos = [
        ...new Map(cursosResponse.map((curso) => [curso.idCurso, curso])).values(),
      ];
      setCursos(cursosUnicos);
    } catch (error) {
      console.error("Error al cargar cursos:", error);
    }
  };

  const loadAlumnos = async () => {
    try {
      const alumnosResponse = await getAllUsersAdmin();
      const cursosResponse = await cursoUsuario();

      const alumnosConCursos = alumnosResponse.map((alumno) => {
        const cursosDelAlumno = cursosResponse.filter(
          (curso) => curso.idUsuario === alumno.idUsuario
        );

        return {
          ...alumno,
          cursos: cursosDelAlumno,
        };
      });

      setAlumnos(alumnosConCursos);
      setAlumnosFiltrados(alumnosConCursos);
    } catch (error) {
      console.error("Error al cargar alumnos:", error);
    }
  };

  const handleCursoChange = async (idUsuario, idCurso) => {
    const alumno = alumnos.find((alumno) => alumno.idUsuario === idUsuario);
    if (alumno.cursos.some((curso) => curso.idCurso === idCurso)) {
      return;
    }

    try {
      await updateCursoUsuario(idUsuario, idCurso);
      const alumnosActualizados = alumnos.map((alumno) => {
        if (alumno.idUsuario === idUsuario) {
          return {
            ...alumno,
            cursos: [...alumno.cursos, { idCurso }],
          };
        }
        return alumno;
      });

      setAlumnos(alumnosActualizados);
      setAlumnosFiltrados(alumnosActualizados);
    } catch (error) {
      console.error("Error al cambiar el curso del alumno:", error);
    }
  };

  const updateRoleUsuario = async (idUsuario, idRole) => {
    try {
      await updateRoleUsuario(idUsuario, idRole);
      const alumnosActualizados = alumnos.map((alumno) => {
        if (alumno.idUsuario === idUsuario) {
          return { ...alumno, idRole };
        }
        return alumno;
      });

      setAlumnos(alumnosActualizados);
      setAlumnosFiltrados(alumnosActualizados);
    } catch (error) {
      console.error("Error al actualizar el rol del usuario:", error);
    }
  };

  const updateStateProfesor = async (id, state) => {
    try {
      await updateStateProfesor(id, state);
      const alumnosActualizados = alumnos.map((alumno) => {
        if (alumno.idUsuario === id) {
          return { ...alumno, estadoUsuario: state };
        }
        return alumno;
      });

      setAlumnos(alumnosActualizados);
      setAlumnosFiltrados(alumnosActualizados);
    } catch (error) {
      console.error("Error al actualizar el estado del profesor:", error);
    }
  };

  const manejarCambioFiltro = (e) => {
    const { name, value } = e.target;
    setFiltros((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const aplicarFiltros = () => {
    const { nombre, apellidos, role } = filtros;

    const alumnosFiltrados = alumnos.filter((alumno) => {
      return (
        (!nombre || alumno.nombre?.toLowerCase().includes(nombre.toLowerCase())) &&
        (!apellidos || alumno.apellidos?.toLowerCase().includes(apellidos.toLowerCase())) &&
        (!role || roleMap[alumno.idRole]?.toLowerCase().includes(role.toLowerCase()))
      );
    });

    setAlumnosFiltrados(alumnosFiltrados);
  };

  useEffect(() => {
    aplicarFiltros();
  }, [filtros, alumnos]);

  return {
    alumnosFiltrados,
    filtros,
    cursos,
    roleMap,
    manejarCambioFiltro,
    handleCursoChange,
    updateRoleUsuario,
    updateStateProfesor,
  };
};

export default useAlumnos;
