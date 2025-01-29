import React, { Component } from 'react';
import { postLogin } from '../../../services/Login';
import { Navigate } from 'react-router-dom';
import styles from './Login.module.css';  // Importas el archivo como un objeto
import { postRegister } from '../../../services/UsuariosService';
import { Usuario } from '../../../models/usuario';
import { withLocation } from '../login/WithLocation.jsx'; // Asegúrate de que la ruta sea correcta
import { postNewProfesorAsync } from '../../../services/ProfesorService';

class LoginComponent extends Component {
  state = {
    user: {
      userName: "",
      password: ""
    },
    userRegistration: {
      idUsuario: 123131231,
      nombre: "",
      apellidos: "",
      email: "",
      imagen: "",
      password: "",
      estadoUsuario: false,
      idRole: 2,
      key: "",
    },
    curso: "",
    status: false,
    isActive: false, // Esto controla el toggle entre login y registro
    errorLogin: null,
    errorRegistro: null,
  };

  handleToggleForm = () => {
    this.setState((prevState) => ({
      isActive: !prevState.isActive,
      errorRegistro: null, // Limpiar el error al cambiar de formulario
    }));
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      user: {
        ...this.state.user,
        [name]: value,
      }
    });
  };

  handleRegisterChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      userRegistration: {
        ...prevState.userRegistration,
        [name]: value,
      },
      ...(name === 'curso' ? { curso: value } : {}),
    }));
  };

  login = (e) => {
    e.preventDefault();
    postLogin(this.state.user)
      .then((response) => {
        localStorage.setItem("token", response.data.response);
        localStorage.setItem("role", response.data.role)
        this.setState({ status: true, errorLogin: null });
      })
      .catch((error) => {
        console.error("Error during login:", error);
        this.setState({ errorLogin: true });
      });
  };

  register = async (e) => {
    e.preventDefault();
    const { userRegistration, curso } = this.state;
    const { key, nombre, apellidos, email, password } = userRegistration;
  
    // Validación básica
    if (!nombre || !apellidos || !email || !password) {
      this.setState({ errorRegistro: "Todos los campos son obligatorios." });
      return;
    }
  
    // Construcción del objeto usuario
    const usuarioRegistro = new Usuario(
      userRegistration.idUsuario || 0,
      nombre,
      apellidos,
      `${email}@tajamar365.com`,
      userRegistration.estadoUsuario || true,
      userRegistration.imagen || "string",
      password,
      userRegistration.idRole || 2
    );
  
    try {
      if (key) {
        try {
          const response = await postNewProfesorAsync(key, usuarioRegistro);
          // Verifica si la respuesta contiene un idUsuario
          if (response && response.idUsuario) {
            this.setState({ isActive: false, errorRegistro: null });
          } else {
            this.setState({ errorRegistro: "Error al registrar el profesor. Inténtalo de nuevo." });
          }
        } catch (error) {
          console.error("Error al registrar el profesor:", error);
          this.setState({ errorRegistro: "Error al registrar el profesor. Inténtalo de nuevo." });
        }
      } else {
        try {
          const response = await postRegister(curso, usuarioRegistro);
          // Verifica si la respuesta contiene un idUsuario
          if (response && response.idUsuario) {
            this.setState({ isActive: false, errorRegistro: null });
          } else {
            this.setState({ errorRegistro: "Error al registrar el alumno. Inténtalo de nuevo." });
          }
        } catch (error) {
          console.error("Error al registrar el alumno:", error);
          this.setState({ errorRegistro: "Error al registrar el alumno. Inténtalo de nuevo." });
        }
      }
    } catch (error) {
      this.setState({ error: "Error en el registro. Inténtalo de nuevo." });
    }
  };
  



  componentDidMount() {
    const { state } = this.props.location || {};
    if (state?.isActive) {
      this.setState({ isActive: state.isActive });
    }
  }

  componentDidUpdate(prevProps) {
    const { state } = this.props.location || {};
    if (state?.isActive !== prevProps.location?.state?.isActive) {
      this.setState({ isActive: state.isActive });
    }
  }

  render() {
    const role = localStorage.getItem("role");
    if (this.state.status) {
      if (role === "ALUMNO") {
        return <Navigate to="/charlas" />;
      } else {
        return <Navigate to="/" />;
      }
    }

    return (
      <div className={`${styles["login-page-container"]}`}>
        <div className={`${styles.container} ${this.state.isActive ? styles.active : ''}`}>
          {/* Formulario de registro */}
          <div className={`${styles["form-container"]} ${styles["sign-up"]} ${this.state.isActive ? '' : styles.active}`}>
            <form onSubmit={this.register}>
              <h2>Create Account</h2>

              <input type="text" name="nombre" placeholder="Nombre" onChange={this.handleRegisterChange} />
              <input type="text" name="apellidos" placeholder="Apellidos" onChange={this.handleRegisterChange} />

              {/* Email con dominio fijo */}
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  type="text"
                  name="email"
                  placeholder="user.example"
                  onChange={this.handleRegisterChange}
                  style={{ flex: '0.5', borderRadius: '8px 0 0 8px' }}
                />
                <input
                  type="text"
                  value="@tajamar365.com"
                  disabled
                  style={{
                    backgroundColor: '#ddd',
                    color: '#333',
                    border: 'none',
                    flex: '0.5',
                    borderRadius: '0 8px 8px 0',
                    textAlign: 'center',
                  }}
                />
              </div>

              <input type="text" name="imagen" placeholder="Image.jpg" onChange={this.handleRegisterChange} />
              <input type="password" name="password" placeholder="Password" onChange={this.handleRegisterChange} />
              <input type="text" name="curso" placeholder="Curso" onChange={this.handleRegisterChange} />
              <input type="text" name="key" placeholder="Key (solo para profesores)" onChange={this.handleRegisterChange} />

              {/* Mensaje de error si hay problemas en el registro */}
              {this.state.errorRegistro && (
                <p style={{ color: "red", fontSize: "14px", margin: "5px 0" }}>
                  {this.state.errorRegistro}
                </p>
              )}

              <button type="submit">Sign Up</button>
            </form>
          </div>

          {/* Formulario de inicio de sesión */}
          <div className={`${styles["form-container"]} ${styles["sign-in"]} ${this.state.isActive ? styles.active : ''}`}>
            <form onSubmit={this.login}>
              <h1>Sign In</h1>
              <input type="email" name="userName" placeholder="userexample@tajamar365.com" onChange={this.handleChange} />
              <input type="password" name="password" placeholder="Password" onChange={this.handleChange} />
              
              {/* Mensaje de error con menos margen */}
              {this.state.errorLogin && (
                <p style={{ color: "red", fontSize: "14px", margin: "5px 0" }}>
                  Error de credenciales. Inténtalo de nuevo.
                </p>
              )}

              <button type="submit">Log In</button>
            </form>
          </div>

          {/* Toggle para cambiar entre formularios */}
          <div className={styles["toggle-container"]}>
            <div className={styles.toggle}>
              <div className={`${styles["toggle-panel"]} ${styles["toggle-left"]}`}>
                <h1>Already have an Account?</h1>
                <p>Enter your personal details to use all of the site features</p>
                <button onClick={() => this.handleToggleForm()}>Log In</button>
              </div>
              <div className={`${styles["toggle-panel"]} ${styles["toggle-right"]} `}>
                <h1>Don't have an account?</h1>
                <p>Register with your personal details to use all of the site features</p>
                <button onClick={() => this.handleToggleForm()}>Register</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withLocation(LoginComponent);
