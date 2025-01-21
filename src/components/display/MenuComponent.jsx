import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import styles from "./Navbar.module.css"; 
import { FaHome } from "react-icons/fa";

export default class MenuComponent extends Component {
  state = {
    isAuthenticated: localStorage.getItem("token") !== null,
  };

  componentDidMount() {
    this.interval = setInterval(() => {
      const currentToken = localStorage.getItem("token");
      if (this.state.isAuthenticated !== (currentToken !== null)) {
        this.setState({ isAuthenticated: currentToken !== null });
      }
    }, 500); 
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  logoff = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    this.setState({ isAuthenticated: false });
  };

  getRole = () => {
    const role = localStorage.getItem("role");
    return role;
  }

  render() {
    const role = this.getRole(); // Obtenemos el rol del usuario

    return (
      <>
        <div>
          <nav className={`navbar navbar-expand-sm navbar-dark ${styles.navbar}`} aria-label="Third navbar example">
            <div className="container-fluid">
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample03" aria-controls="navbarsExample03" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarsExample03">
                <ul className={`navbar-nav me-auto mb-2 mb-sm-0 ${styles.navbarLeft}`}>
                  <li className="nav-item">
                    <NavLink to={"/"} className={`nav-link ${styles.navLink}`} aria-current="page">
                      <img
                        src="https://www.tajamar.es/wp-content/uploads/2017/06/logo-tajamar.svg"
                        alt="Logo Tajamar"
                        className={styles.navLogo}
                      />
                    </NavLink>
                  </li>
                </ul>

                {/* Navbar a la derecha */}
                <ul className={`navbar-nav mb-2 mb-sm-0 ${styles.navbarRight}`}>
                  {!this.state.isAuthenticated && (
                    <>
                      <li className="nav-item">
                        <NavLink to="/login" className={`nav-link ${styles.navLink}`} state={{ isActive: true }}>
                          Register
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink to={"/login"} className={`nav-link ${styles.navLink}`} state={{ isActive: false }}>
                          Login
                        </NavLink>
                      </li>
                    </>
                  )}

                  {this.state.isAuthenticated && (
                    <>
                      {/* Mostrar el menú de Charlas solo si el rol no es Administrador */}
                      {role !== "3" && (
                        <li className="nav-item dropdown">
                          <a className={`nav-link dropdown-toggle ${styles.navLink}`} href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Charlas
                          </a>
                          <ul className={`dropdown-menu ${styles.dropdownMenu}`} aria-labelledby="navbarDropdown">
                            <li>
                              <NavLink to="/charlas" className={`dropdown-item ${styles.dropdownItem}`}>
                                Ver Charlas
                              </NavLink>
                            </li>
                            <li>
                              <NavLink to="/create/charla" className={`dropdown-item ${styles.dropdownItem}`}>
                                Create Charla
                              </NavLink>
                            </li>
                          </ul>
                        </li>
                      )}
                      <li className="nav-item">
                        <NavLink to={"/rondas"} className={`nav-link ${styles.navLink}`} aria-current="page">
                          Rondas
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink to={"/user/profile"} className={`nav-link ${styles.navLink}`} aria-current="page">
                          Perfil
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink to={"/login"} className={`nav-link ${styles.navLink} ${styles.navLinkLogout}`} aria-current="page" onClick={this.logoff}>
                          Cerrar Sesion
                        </NavLink>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </>
    );
  }
}
