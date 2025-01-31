import { Component } from "react";
import CharlasUser from "./CharlasUser";
import UpdateUser from "./UpdateUser";
import Profesores from "./Profesores";
import Alumnos from "./Alumnos";
import AlumnosProfesorCurso from "./AlumnosProfesorCurso";
import UpdateEstadoCharlaAlumnosProfesor from "./UpdateEstadoCharlaAlumnosProfesor";
import GestionRondas from "./../rondas/GestionRondas";
import CrearCurso from "./../profesor/CrearCurso";
import "./UserProfileComponent.css";

export default class UserProfileComponent extends Component {
  state = {
    activeTab: "profile", // Pestaña activa por defecto
  };

  setActiveTab = (tabName) => {
    this.setState({ activeTab: tabName });
  };

  render() {
    const { activeTab } = this.state;
    const userRole = localStorage.getItem("role");

    return (
      <div className="dashboard-container">
        {/* Barra lateral */}
        <nav className="sidebar">
          <h2 className="sidebar-title">Dashboard</h2>
          <ul className="sidebar-menu">
            <li>
              <button onClick={() => this.setActiveTab("profile")} className={activeTab === "profile" ? "active" : ""}>
                Perfil
              </button>
            </li>
            {userRole === "ALUMNO" && (
              <li>
                <button onClick={() => this.setActiveTab("charlasuser")} className={activeTab === "charlasuser" ? "active" : ""}>
                  Mis Charlas
                </button>
              </li>
            )}
            {userRole === "PROFESOR" && (
              <>
                <li>
                  <button onClick={() => this.setActiveTab("alumnosCurso")} className={activeTab === "alumnosCurso" ? "active" : ""}>
                    Mis alumnos
                  </button>
                </li>
                <li>
                  <button onClick={() => this.setActiveTab("estadoCharla")} className={activeTab === "estadoCharla" ? "active" : ""}>
                    Charlas Alumnos
                  </button>
                </li>
                <li>
                  <button onClick={() => this.setActiveTab("crearCurso")} className={activeTab === "crearCurso" ? "active" : ""}>
                    Crear Curso
                  </button>
                </li>
                <li>
                  <button onClick={() => this.setActiveTab("gestionRondas")} className={activeTab === "gestionRondas" ? "active" : ""}>
                    Gestión de Rondas
                  </button>
                </li>
              </>
            )}
            {userRole === "ADMINISTRADOR" && (
              <>
                <li>
                  <button onClick={() => this.setActiveTab("profesores")} className={activeTab === "profesores" ? "active" : ""}>
                    Profesores
                  </button>
                </li>
                <li>
                  <button onClick={() => this.setActiveTab("alumnos")} className={activeTab === "alumnos" ? "active" : ""}>
                    Ver Alumnos
                  </button>
                </li>
              </>
            )}
          </ul>
        </nav>

        {/* Contenedor de contenido */}
        <main className="content">
          {activeTab === "profile" && <UpdateUser />}
          {activeTab === "charlasuser" && userRole === "ALUMNO" && <CharlasUser />}
          {activeTab === "alumnosCurso" && userRole === "PROFESOR" && <AlumnosProfesorCurso />}
          {activeTab === "estadoCharla" && userRole === "PROFESOR" && <UpdateEstadoCharlaAlumnosProfesor />}
          {activeTab === "crearCurso" && userRole === "PROFESOR" && <CrearCurso />}
          {activeTab === "gestionRondas" && userRole === "PROFESOR" && <GestionRondas />}
          {activeTab === "profesores" && userRole === "ADMINISTRADOR" && <Profesores />}
          {activeTab === "alumnos" && userRole === "ADMINISTRADOR" && <Alumnos />}
        </main>
      </div>
    );
  }
}
