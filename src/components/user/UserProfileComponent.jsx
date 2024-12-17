import { Component } from 'react'
import { getUserProfile } from '../../services/UsuariosService'
import UpdateUser from './updateUser'

export default class UserProfileComponent extends Component {

    state = {
        userData: null,

    }

    componentDidMount = () => {

        getUserProfile().then((response) => {
            this.setState({
                userData: response.usuario
            })

            // console.log(response.usuario)
        })

        // console.log(this.state.userData)

    }


    render() {
        return (
            <>
                {
                    this.state.userData ?
                        (
                            <div>
                                <h1>Hay datos</h1>
                                <div className="col-ld-4 mb-3">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="d-flex flex-column align-items-center text-center">
                                                <img src={this.state.userData.imagen} alt="Admin" className="rounded-circle" width="150px" />
                                                <div className="mt-3">
                                                    <h4>
                                                        {this.state.userData.nombre}
                                                        <br />
                                                        {this.state.userData.apellidos}
                                                    </h4>
                                                    <p className="text-secondary mb-1">{this.state.userData.curso}</p>
                                                    <p className="text-muted font-size-sm">{this.state.userData.role}</p>
                                                    <button className="btn btn-primary">Follow</button>
                                                    <button className="btn btn-outline-primary">Message</button>
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Prueba de tabs  */}
                                <div className="d-flex align-items-start">


                                                        
<div className="nav flex-column nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
    <button className="nav-link active" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true">Home</button>
    <button className="nav-link" id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false">Profile</button>
    <button className="nav-link" id="v-pills-disabled-tab" data-bs-toggle="pill" data-bs-target="#v-pills-disabled" type="button" role="tab" aria-controls="v-pills-disabled" aria-selected="false" disabled>Disabled</button>
    <button className="nav-link" id="v-pills-messages-tab" data-bs-toggle="pill" data-bs-target="#v-pills-messages" type="button" role="tab" aria-controls="v-pills-messages" aria-selected="false">Messages</button>
    <button className="nav-link" id="v-pills-settings-tab" data-bs-toggle="pill" data-bs-target="#v-pills-settings" type="button" role="tab" aria-controls="v-pills-settings" aria-selected="false">Settings</button>
</div>
<div className="tab-content" id="v-pills-tabContent">
    <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab" tabIndex="0">
        {/* iNFORMACION */}
        <UpdateUser/>
    </div>
    <div className="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab" tabIndex="0">...</div>
    <div className="tab-pane fade" id="v-pills-disabled" role="tabpanel" aria-labelledby="v-pills-disabled-tab" tabIndex="0">...</div>
    <div className="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab" tabIndex="0">...</div>
    <div className="tab-pane fade" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab" tabIndex="0">...</div>
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
