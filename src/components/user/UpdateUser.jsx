import { Component } from 'react'
import { getUserProfile, getAlumnoId, uploadUserImg, updateAlumno , changePassword} from '../../services/UsuariosService'
// import { Usuario } from '../../models/usuario';
import { postLogin } from '../../services/Login';
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Importar SweetAlert
import defaultUserImage from "../../assets/profile-default-icon.jpg";
export default class UpdateUser extends Component {
    state = {
        userData: {
            apellidos: "",
            curso: "",
            email: "",
            estadoUsuario: false,
            idCurso: 0,
            idCursoUsuario: 0,
            idRole: 0,
            idUsuario: 0,
            imagen: "",
            nombre: "",
            role: "",
        },

        userEdit: {
            idUsuario: 0,
            nombre: "",
            apellidos: "",
            email: "",
            estadoUsuario: false,
            imagen: "",
            password: "123",
            idRole: 0
        },

        oldPassword: "",
        confirmPassword: "",
        errorMsg: "",
    }

    componentDidMount = () => {
       this.loadUserProfile();
    };

    loadUserProfile = async () => {
        const id = await getAlumnoId();
        getUserProfile(id)
            .then((response) => {
                this.setState({
                    userData: response.usuario
                });
                // console.log(response.usuario);
            })
            .catch((error) => {
                console.error("Error fetching user profile:", error);
            });
    }

    confirmPassword = async () => {
        const { oldPassword, confirmPassword } = this.state;
    
        const { value: formValues } = await Swal.fire({
            title: 'Cambiar contraseña',
            html: `
                <div style="padding: 20px; font-family: Arial, sans-serif;">
                    <div style="margin-bottom: 15px;">
                        <label for="oldPassword" style="font-size: 14px; color: #333; font-weight: bold;">Contraseña actual</label>
                        <input id="oldPassword" type="password" class="swal2-input" placeholder="Introduce tu contraseña actual" defaultValue="${oldPassword}" 
                            style="width: 80%; padding: 10px; margin-top: 5px; border: 1px solid #ccc; border-radius: 5px; font-size: 14px; box-sizing: border-box;" />
                    </div>
                    <div style="margin-bottom: 15px;">
                        <label for="confirmPassword" style="font-size: 14px; color: #333; font-weight: bold;">Repite la contraseña actual</label>
                        <input id="confirmPassword" type="password" class="swal2-input" placeholder="Repite la contraseña actual" defaultValue="${confirmPassword}" 
                            style="width: 80%; padding: 10px; margin-top: 5px; border: 1px solid #ccc; border-radius: 5px; font-size: 14px; box-sizing: border-box;" />
                    </div>
                </div>

            `,
            focusConfirm: false,
            showCancelButton: true,
            // showCancelButton: true,
            preConfirm: () => {
                const oldPassword = document.getElementById('oldPassword').value;
                const confirmPassword = document.getElementById('confirmPassword').value;
                return { oldPassword, confirmPassword };
            },
        });
    
        if (!formValues) {
            return;
        }
    
        const { oldPassword: enteredOldPassword, confirmPassword: enteredConfirmPassword } = formValues;
    
        if (enteredOldPassword !== enteredConfirmPassword) {
            Swal.fire({
                icon: 'error',
                title: 'Las contraseñas no coinciden 1',
                text: 'Por favor, asegúrate de que ambas contraseñas sean iguales.',
            });
            return;
        }
    
        const user = {
            userName: this.state.userData.email,
            password: enteredOldPassword,
        };
    
        try {
            const response = await postLogin(user);
            if (response.status === 200) {
                console.log("Verificación Correcta");
                Swal.fire({
                    icon: 'success',
                    title: 'Contraseña verificada',
                    text: 'Puedes cambiar tu contraseña ahora.',
                })
                this.changePassword();
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Credenciales incorrectas',
                    text: 'Por favor, revisa tu contraseña o intenta más tarde.',
                });
            }
        } catch (error) {
            console.error("Error durante la verificación de contraseña:", error);
            Swal.fire({
                icon: 'error',
                title: 'Error en la autenticación',
                text: 'Hubo un problema al verificar tu contraseña. Inténtalo de nuevo.',
            });
        }
    };

    changePassword = async () => {
        const { value: newPasswordValues } = await Swal.fire({
            title: 'Nueva Contraseña',
            html: `
                <div>
                    <label for="newPassword">Nueva contraseña</label>
                    <input id="newPassword" type="password" class="swal2-input" placeholder="Introduce tu nueva contraseña" />
                </div>
                <div>
                    <label for="confirmNewPassword">Confirmar nueva contraseña</label>
                    <input id="confirmNewPassword" type="password" class="swal2-input" placeholder="Repite tu nueva contraseña" />
                </div>
            `,
            focusConfirm: false,
            preConfirm: () => {
                const newPassword = document.getElementById('newPassword').value;
                const confirmNewPassword = document.getElementById('confirmNewPassword').value;
                return { newPassword, confirmNewPassword };
            },
        });
    
        if (!newPasswordValues) {
            return;
        }
    
        const { newPassword, confirmNewPassword } = newPasswordValues;
    
        if (newPassword !== confirmNewPassword) {
            Swal.fire({
                icon: 'error',
                title: 'Las contraseñas no coinciden',
                text: 'Por favor, asegúrate de que ambas contraseñas sean iguales.',
            });
            return;
        }
    
        try {
            const newPasswordInput = new Object();
            newPasswordInput.newPassword = newPasswordValues.newPassword;
            const response = await changePassword(newPasswordInput);
            console.log(response);
            if (response.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Contraseña cambiada con éxito',
                    text: 'Tu contraseña ha sido actualizada correctamente.',
                });
                localStorage.removeItem("token");
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error al cambiar la contraseña',
                    text: 'Hubo un problema al cambiar tu contraseña. Inténtalo de nuevo.',
                });
            }
        } catch (error) {
            console.error("Error durante el cambio de contraseña:", error);
            Swal.fire({
                icon: 'error',
                title: 'Error en el cambio de contraseña',
                text: 'Hubo un problema al cambiar tu contraseña. Inténtalo de nuevo.',
            });
        }
    };
    
    

    postImagenCharla = async () => {
        const id = await getAlumnoId();
        const reader = new FileReader();
        reader.onloadend = async () => {
          const fileContent = reader.result.split(',')[1]; // Extraer el contenido Base64 del archivo
          const payload = {
            fileName: this.state.imagenArchivo.name,
            fileContent,
          };
      
          try {
            const response = await uploadUserImg(id, payload);
            console.log('Imagen subida con éxito:', response);
          } catch (error) {
            console.error('Error subiendo la imagen:', error);
          }
        };
      
        reader.readAsDataURL(this.state.imagenArchivo);
      };
    
      editUser = async () => {
        const updatedUserEdit = {
            ...this.state.userEdit,
            ...this.state.userData,
        };
    
        updatedUserEdit.password = this.state.userEdit.password || "123"; // Usa el valor actual o asigna un valor por defecto
    
        this.setState({ userEdit: updatedUserEdit }, async () => {
            console.log("userData:", this.state.userData);
            console.log("userEdit:", this.state.userEdit);
    
            try {
                const response = await updateAlumno(this.state.userEdit);
                console.log("Respuesta del servidor:", response);
    
                await this.postImagenCharla();
            } catch (error) {
                console.error("Error al actualizar el usuario:", error);
            }
        });
    };
    

      handleChange = (e) => {
        const { name, value } = e.target; // Extraemos el nombre y el valor del input
        this.setState((prevState) => ({
            userData: {
                ...prevState.userData,
                [name]: value, // Actualizamos el valor correspondiente en el estado
            },
        }));
    };

    handlePasswordChange = (e) => {
        const { name, value } = e.target;
        this.setState((prevState) => ({
                ...prevState.userData,
                [name]: value,
        }));
    };
    handleEmailChange = (e) => {
        const emailPrefix = e.target.value; // Parte antes del @
        const fixedDomain = "@tajamar365.com"; // Parte fija
        const fullEmail = emailPrefix + fixedDomain; // Concatenamos la parte modificada con la parte fija
    
        // Actualizamos el estado con el correo completo
        this.setState({
            userData: {
                ...this.state.userData,
                email: fullEmail,
            },
        });
    };

    handleImageRemove = () => {
        this.setState({ imagenArchivo: null });
    }
    


    render() {
        return (
            <>
                {this.state.confirmedPassword ? (
                    <Navigate to="/update/password" />
                ) : this.state.userData ? (
                    <div>
                        <h1>Perfiles</h1>
                        <div className="container mt-5">
                            {/* Header con avatar y botón Edit */}
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <div className="d-flex align-items-center">
                                    <img
                                        src={this.state.userData.imagen}
                                        onError={(e) => e.target.src = defaultUserImage}
                                        alt="Avatar"
                                        className="rounded-circle me-3"
                                        style={{ width: "80px", height: "80px" }}
                                    />
                                    <div>
                                        <h5 className="mb-0">{this.state.userData.nombre}</h5>
                                        <p className="text-muted mb-0">{this.state.userData.email}</p>
                                    </div>
                                </div>
                            </div>
    
                            {/* Formulario de dos columnas */}
                            <form onSubmit={(e) => e.preventDefault()}>
                                <div className="row">
                                    {/* Primera columna */}
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Nombre</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Tu nombre"
                                            defaultValue={this.state.userData.nombre}
                                            onChange={this.handleChange}
                                            name="nombre"
                                        />
                                    </div>
    
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Apellidos</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Tu apellido"
                                            defaultValue={this.state.userData.apellidos}
                                            onChange={this.handleChange}
                                            name="apellidos"
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Correo</label>
                                        <div className="d-flex">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Tu correo"
                                                defaultValue={this.state.userData.email.split('@')[0]}
                                                onChange={this.handleEmailChange}
                                                name="email"
                                            />
                                            <input
                                                type="text"
                                                className="form-control"
                                                defaultValue="@tajamar365.com" // Parte fija del email
                                                disabled // No editable
                                                readOnly // Asegura que no se pueda modificar
                                            />
                                        </div>
                                    </div>
    
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Role</label>
                                        <input
                                            disabled={this.state.userData.role === "ALUMNO"}
                                            type="text"
                                            className="form-control"
                                            placeholder="Tu apellido"
                                            defaultValue={this.state.userData.role}
                                            name="role"
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="idCurso">Curso</label>
                                        <input
                                            disabled={this.state.userData.role === "ALUMNO"}
                                            type="text"
                                            className="form-control"
                                            placeholder="Cursos"
                                            defaultValue={
                                                (this.state.userData.idCurso || "") + " - " + (this.state.userData.curso || "")
                                            }
                                            name="idCurso"
                                        />
                                    </div>
    
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="imagenUsuario" className="form-label">Imagen del Usuario</label>
                                        <div className="input-group">
                                            <input
                                                type="file"
                                                name="imagenUsuario"
                                                id="imagenUsuario"
                                                className="form-control"
                                                onChange={(e) => this.setState({ imagenArchivo: e.target.files[0] })}
                                            />
                                        </div>
                                        {/* Vista previa de la imagen seleccionada */}
                                        {this.state.imagenArchivo && (
                                            <div className="mt-3 position-relative" style={{ display: "flex", justifyContent: "center" }}>
                                                <img
                                                    src={URL.createObjectURL(this.state.imagenArchivo)}
                                                    alt="Vista previa"
                                                    className="img-thumbnail"
                                                    style={{
                                                        width: "200px",
                                                        height: "200px",
                                                        objectFit: "cover",
                                                        borderRadius: "11px",
                                                        cursor: "pointer"
                                                    }}
                                                />
                                                {/* Botón "X" para eliminar la imagen */}
                                                <button
                                                    type="button"
                                                    className="btn btn-danger position-absolute top-0 end-0 m-1"
                                                    style={{
                                                        width: "30px",
                                                        height: "30px",
                                                        borderRadius: "50%",
                                                        backgroundColor: "#dc3545",
                                                        border: "none",
                                                        fontSize: "18px",
                                                        color: "white",
                                                        cursor: "pointer"
                                                    }}
                                                    onClick={this.handleImageRemove}
                                                >
                                                    X
                                                </button>
                                            </div>
                                        )}
                                    </div>
    
                                </div>
                                <button className="btn btn-primary w-25" onClick={this.editUser}>Edit</button>
                            </form>
    
                            {/* Sección Email */}
                            <div className="mt-4">
                                <h6>
                                    <strong>My Email Address</strong>
                                </h6>
                                <div className="d-flex align-items-center mb-3">
                                    <div className="me-3">
                                        <span
                                            className="badge bg-primary rounded-circle"
                                            style={{ padding: "10px" }}
                                        >
                                            <i className="bi bi-envelope-fill text-white"></i>
                                        </span>
                                    </div>
                                    <div>
                                        <p className="mb-0">{this.state.userData.email}</p>
                                        <small className="text-muted">1 month ago</small>
                                    </div>
                                </div>
                                <button className="btn btn-outline-primary" onClick={this.confirmPassword}>Change Password</button>
                                
    
                            </div>
                        </div>
                    </div>
                ) : (
                    <div>
                        <h1>Cargando datos....</h1>
                    </div>
                )}
            </>
        );
    }
}    
