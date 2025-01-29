import { useState, useEffect, useCallback } from "react";
import {
  getAllUsersAdmin,
  updateStateProfesorService,
  cursoUsuario,
  updateCursoUsuarioService,
  updateRoleUsuarioService,
} from "../../services/UsuariosAdminService";
import { deleteUserAsync } from "../../services/UsuariosService";

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
      await updateCursoUsuarioService(idUsuario, idCurso);
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

  const updateRoleUsuario = useCallback(async (idUsuario, idRole) => {
    try {
      // Llamamos a la función real del servicio para actualizar el rol
      await updateRoleUsuarioService(idUsuario, idRole); // Cambié el nombre de la función importada
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
  }, [alumnos]);

  const updateStateProfesor = useCallback(async (id, state) => {
    try {
      await updateStateProfesorService(id, state);
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
  }, [alumnos]);

  const manejarCambioFiltro = (e) => {
    const { name, value } = e.target;
    setFiltros((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const deleteUsuario = async (idUsuario) => {
    try {
      await deleteUserAsync(idUsuario);
      const alumnosActualizados = alumnos.filter((alumno) => alumno.idUsuario !== idUsuario);
      setAlumnos(alumnosActualizados);
      setAlumnosFiltrados(alumnosActualizados);
      
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
    }
  }

  const aplicarFiltros = useCallback(() => {
    const { nombre, apellidos, role } = filtros;

    const alumnosFiltrados = alumnos.filter((alumno) => {
      return (
        (!nombre || alumno.nombre?.toLowerCase().includes(nombre.toLowerCase())) &&
        (!apellidos || alumno.apellidos?.toLowerCase().includes(apellidos.toLowerCase())) &&
        (!role || roleMap[alumno.idRole]?.toLowerCase().includes(role.toLowerCase()))
      );
    });

    setAlumnosFiltrados(alumnosFiltrados);
  }, [alumnos, filtros, roleMap]);

  useEffect(() => {
    aplicarFiltros();
  }, [filtros, alumnos, aplicarFiltros]);

  return {
    alumnosFiltrados,
    filtros,
    cursos,
    roleMap,
    manejarCambioFiltro,
    handleCursoChange,
    updateRoleUsuario,
    updateStateProfesor,
    deleteUsuario,
  };
};

export default useAlumnos;
