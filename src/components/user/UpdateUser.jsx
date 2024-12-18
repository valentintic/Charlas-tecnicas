import { Component } from 'react'
import { getUserProfile } from '../../services/UsuariosService'

export default class UpdateUser extends Component {
    state = {
        userData: null,

    }

    componentDidMount = () => {


        getUserProfile().then((response) => {
            this.setState({
                userData: response.usuario
            })
            // console.log(response.usuario);
        })
    }


    render() {
        return (
            <>
                {
                    this.state.userData ?
                        (
                            <div>
                                <h1>Perfil</h1>
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
                                    <div className="row">
                                        {/* Primera columna */}
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">Nombre</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Tu nombre"
                                                defaultValue={this.state.userData.nombre}
                                            />
                                        </div>
                                        
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">Apellidos</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Tu apellido"
                                                defaultValue={this.state.userData.apellidos}
                                            />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">Correo</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Tu correo"
                                                defaultValue={this.state.userData.email}
                                            />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">Role</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Tu apellido"
                                                defaultValue={this.state.userData.role}
                                            />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">Curso</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Tu apellido"
                                                defaultValue={ this.state.userData.idCurso+ " - "+ this.state.userData.curso}
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
                                    <button className="btn btn-primary w-25">Edit</button>

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
