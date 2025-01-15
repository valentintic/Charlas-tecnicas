import { Component } from 'react'
import { getUserProfile, getAlumnoId, uploadUserImg, updateAlumno } from '../../services/UsuariosService'
import { Usuario } from '../../models/usuario';
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
        }

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
                console.log(response.usuario);
            })
            .catch((error) => {
                console.error("Error fetching user profile:", error);
            });
    }
    

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
                {
                    this.state.userData ?
                        (
                            <div>
                                <h1>Perfiles</h1>
                                <div className="container mt-5">
                                    {/* Header con avatar y botón Edit */}
                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                        <div className="d-flex align-items-center">
                                            <img
                                                src={this.state.userData.imagen}
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
                                                value={this.state.userData.nombre}
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
                                                value={this.state.userData.apellidos}
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
                                                    value={this.state.userData.email.split('@')[0]}
                                                    onChange={this.handleEmailChange}
                                                    name="email"
                                                />
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value="@tajamar365.com" // Parte fija del email
                                                    disabled // No editable
                                                    readOnly // Asegura que no se pueda modificar
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">Role</label>
                                            <input
                                                disabled={this.state.userData.role == "ALUMNO" ? true : false}
                                                type="text"
                                                className="form-control"
                                                placeholder="Tu apellido"
                                                value={this.state.userData.role}
                                                name="role"
                                            />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="idCurso">Curso</label>
                                            <input
                                                disabled={this.state.userData.role == "ALUMNO" ? true : false}
                                                type="text"
                                                className="form-control"
                                                placeholder="Tu apellido"
                                                value={
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
                                            <div className="mt-3 position-relative"
                                                style={{display: "flex", justifyContent: "center"}}
                                            >
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


                                        
                                        {/* <div className="col-md-6 mb-3">
                                            <label className="form-label">Time Zone</label>
                                            <select className="form-select">
                                                <option selected>Select Time Zone</option>
                                                <option>UTC-5</option>
                                                <option>UTC-6</option>
                                                <option>UTC-7</option>
                                            </select>
                                        </div> */}
                                        
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
                                                <p className="mb-0">{ this.state.userData.email }</p>
                                                <small className="text-muted">1 month ago</small>
                                            </div>
                                        </div>
                                        <button className="btn btn-outline-primary">Change Password</button>
                                    </div>
                                </div>

                            </div>
                        ) :
                        (
                            <div>
                                <h1>Cargando datos....</h1>
                            </div>

                        )
                }
            </>
        )
    }
}
