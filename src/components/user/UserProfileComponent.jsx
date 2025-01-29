import { Component } from 'react';
import CharlasUser from './CharlasUser';
import UpdateUser from './UpdateUser';
import Profesores from './Profesores';
import Alumnos from './Alumnos';
import AlumnosProfesorCurso from './AlumnosProfesorCurso';
import UpdateEstadoCharlaAlumnosProfesor from './UpdateEstadoCharlaAlumnosProfesor';
import GestionRondas from './../rondas/GestionRondas';
import CrearCurso from './../profesor/CrearCurso'; 
export default class UserProfileComponent extends Component {
  state = {
    userData: null,
  };

  componentDidMount = () => {
    // Lógica para cargar datos del usuario si es necesario
  };

  render() {
    const userRole = localStorage.getItem("role");

    return (
      <>
        <div className="container-fluid mt-4">
          <div className="row g-3">
            {/* Barra lateral */}
            <div
              className="col-12 col-md-3"
              style={{
                backgroundColor: '#f8f9fa',
                borderRight: '1px solid #e9ecef',
              }}
            >
              <div className="nav flex-column nav-pills p-3 shadow-sm">
                <button
                  className="nav-link active text-start mb-2"
                  id="v-pills-profile-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#v-pills-profile"
                  type="button"
                  role="tab"
                  aria-controls="v-pills-profile"
                  aria-selected="false"
                  style={{ borderRadius: '0.5rem', fontWeight: '500' }}
                >
                  Perfil
                </button>

                {/* Mostrar "Mis Charlas" solo para Alumnos */}
                {userRole === "ALUMNO" && (
                  <button
                    className="nav-link text-start mb-2"
                    id="v-pills-charlasuser-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-charlasuser"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-charlasuser"
                    aria-selected="false"
                    style={{ borderRadius: '0.5rem', fontWeight: '500' }}
                  >
                    Mis Charlas
                  </button>
                )}

                {/* Mostrar "Mis alumnos" para Profesor */}
                {userRole === "PROFESOR" && (
                  <button
                    className="nav-link text-start mb-2"
                    id="v-pills-alumnoscursoprofesor-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-alumnoscursoprofesor"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-alumnoscursoprofesor"
                    aria-selected="false"
                    style={{ borderRadius: '0.5rem', fontWeight: '500' }}
                  >
                    Mis alumnos
                  </button>
                )}

                {/* Mostrar "Charlas Alumnos" para Profesor */}
                {userRole === "PROFESOR" && (
                  <button
                    className="nav-link text-start mb-2"
                    id="v-pills-estadoCharla-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-estadoCharla"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-estadoCharla"
                    aria-selected="false"
                    style={{ borderRadius: '0.5rem', fontWeight: '500' }}
                  >
                    Charlas Alumnos
                  </button>
                )}

                {/* 🔹 Nueva opción: Crear Curso (Solo para Profesores) */}
                {userRole === "PROFESOR" || userRole === "ADMINISTRADOR" && (
                  <button
                    className="nav-link text-start mb-2"
                    id="v-pills-crear-curso-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-crear-curso"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-crear-curso"
                    aria-selected="false"
                    style={{ borderRadius: '0.5rem', fontWeight: '500' }}
                  >
                    Crear Curso
                  </button>
                )}

                {/* 🔹 Nueva opción: Gestión de Rondas (Solo para Profesores) */}
                {userRole === "PROFESOR" && (
                  <button
                    className="nav-link text-start mb-2"
                    id="v-pills-gestionrondas-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-gestionrondas"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-gestionrondas"
                    aria-selected="false"
                    style={{ borderRadius: '0.5rem', fontWeight: '500' }}
                  >
                    Gestión de Rondas
                  </button>
                )}

                {/* Mostrar "Profesores" solo para ADMINISTRADOR */}
                {userRole === "ADMINISTRADOR" && (
                  <button
                    className="nav-link text-start mb-2"
                    id="v-profesores-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-profesores"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-profesores"
                    aria-selected="false"
                    style={{ borderRadius: '0.5rem', fontWeight: '500' }}
                  >
                    Profesores
                  </button>
                )}

                {/* Mostrar "Ver Alumnos" solo para ADMINISTRADOR */}
                {userRole === "ADMINISTRADOR" && (
                  <button
                    className="nav-link text-start mb-2"
                    id="v-alumnos-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-alumnos"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-alumnos"
                    aria-selected="false"
                    style={{ borderRadius: '0.5rem', fontWeight: '500' }}
                  >
                    Ver Alumnos
                  </button>
                )}
              </div>
            </div>

            {/* Contenedor de pestañas */}
            <div className="col-12 col-md-9">
              <div
                className="tab-content p-4"
                id="v-pills-tabContent"
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '0.5rem',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  overflow: 'hidden',
                }}
              >
                <div
                  className="tab-pane fade show active"
                  id="v-pills-profile"
                  role="tabpanel"
                  aria-labelledby="v-pills-profile-tab"
                >
                  <UpdateUser />
                </div>

                {userRole === "ALUMNO" && (
                  <div className="tab-pane fade" id="v-pills-charlasuser" role="tabpanel">
                    <CharlasUser />
                  </div>
                )}

                {userRole === "PROFESOR" && (
                  <div className="tab-pane fade" id="v-pills-alumnoscursoprofesor" role="tabpanel">
                    <AlumnosProfesorCurso />
                  </div>
                )}

                {userRole === "PROFESOR" && (
                  <div className="tab-pane fade" id="v-pills-estadoCharla" role="tabpanel">
                    <UpdateEstadoCharlaAlumnosProfesor />
                  </div>
                )}

                {/* 🔹 Contenedor de la pestaña "Crear Curso" */}
                {userRole === "PROFESOR" && (
                  <div className="tab-pane fade" id="v-pills-crear-curso" role="tabpanel">
                    <CrearCurso />
                  </div>
                )}

                {/* 🔹 Contenedor de la pestaña "Gestión de Rondas" */}
                {userRole === "PROFESOR" && (
                  <div className="tab-pane fade" id="v-pills-gestionrondas" role="tabpanel">
                    <GestionRondas />
                  </div>
                )}

                {userRole === "ADMINISTRADOR" && (
                  <div className="tab-pane fade" id="v-pills-profesores" role="tabpanel">
                    <Profesores />
                  </div>
                )}

                {userRole === "ADMINISTRADOR" && (
                  <div className="tab-pane fade" id="v-pills-alumnos" role="tabpanel">
                    <Alumnos />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
