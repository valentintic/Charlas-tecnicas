import { Component } from 'react'
import { getUserProfile, getAlumnoId, uploadUserImg } from '../../services/UsuariosService'

export default class UpdateUser extends Component {
    state = {
        userData: null,

    }

    componentDidMount = () => {
        getUserProfile()
            .then((response) => {
                this.setState({
                    userData: response.usuario
                });
            })
            .catch((error) => {
                console.error("Error fetching user profile:", error);
            });
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
        const id = await getAlumnoId();
        console.log(id);
        console.log(this.state.userData);
      }

      handleChange = (e) => {
        this.setState({
          userData: {
            ...this.state.userData,
            [e.target.name]: e.target.value,
          },
        }); 
      }


    render() {
        return (
            <>
                {
                    this.state.userData ?
                        (
                            <div>
                                <h1>Perfilas</h1>
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
                                            />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">Correo</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Tu correo"
                                                value={this.state.userData.email}
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">Role</label>
                                            <input
                                                readOnly={this.state.userData.role === "admin" ? true : false}
                                                type="text"
                                                className="form-control"
                                                placeholder="Tu apellido"
                                                value={this.state.userData.role}
                                            />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Tu apellido"
                                                value={ this.state.userData.idCurso+ " - "+ this.state.userData.curso}
                                                handleChange={this.handleChange}
                                            />
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
                                                <p className="mb-0">alexarawles@gmail.com</p>
                                                <small className="text-muted">1 month ago</small>
                                            </div>
                                        </div>
                                        <button className="btn btn-outline-primary">+ Add Email Address</button>
                                        <div className="mb-3">
                                            <label htmlFor="imagenUsuario">Imagen del Usuario</label>
                                            <input
                                            type="file"
                                            name="imagenUsuario"
                                            id="imagenUsuario"
                                            onChange={(e) => this.setState({ imagenArchivo: e.target.files[0] })}
                                            />
                                        </div>
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
