import { Component } from 'react';
import CharlasUser from './CharlasUser';
import UpdateUser from './UpdateUser';
import Profesores from './Profesores';
import Alumnos from './Alumnos';

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

                {(userRole === "ADMINISTRADOR" || userRole === "PROFESOR") && (
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

                {/* Mostrar "Ver Alumnos" solo para ADMINISTRADORistrador */}
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

                {/* Mostrar "Mis Charlas" solo para Alumnos */}
                {userRole === "ALUMNO" && (
                  <div
                    className="tab-pane fade"
                    id="v-pills-charlasuser"
                    role="tabpanel"
                    aria-labelledby="v-pills-charlasuser-tab"
                  >
                    <CharlasUser />
                  </div>
                )}

                {/* Mostrar "Profesores" solo para ADMINISTRADORistrador y Profesor */}
                {(userRole === "ADMINISTRADOR" || userRole === "PROFESOR") && (
                  <div
                    className="tab-pane fade"
                    id="v-pills-profesores"
                    role="tabpanel"
                    aria-labelledby="v-pills-profesores-tab"
                  >
                    <Profesores />
                  </div>
                )}

                {/* Mostrar "Ver Alumnos" solo para ADMINISTRADORistrador */}
                {userRole === "ADMINISTRADOR" && (
                  <div
                    className="tab-pane fade"
                    id="v-pills-alumnos"
                    role="tabpanel"
                    aria-labelledby="v-pills-alumnos-tab"
                    style={{
                      overflowY: 'auto',
                      maxHeight: '100%',
                    }}
                  >
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
