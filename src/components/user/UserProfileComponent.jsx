import { Component } from 'react'
import { getUserProfile } from '../../services/UsuariosService'

export default class UserProfileComponent extends Component {

    state = {
        userData: null,

    }

    componentDidMount = () => {

        getUserProfile().then((response) => {
            this.setState({
                userData: response.usuario
            })

            console.log(response.usuario)
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
                                <div className="col-md-4 mb-3">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="d-flex flex-column align-items-center text-center">
                                                <img src={this.state.userData.imagen} alt="Admin" className="rounded-circle" width="150" />
                                                <div className="mt-3">
                                                    <h4>
                                                        {this.state.userData.nombre}
                                                        <br/>
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
                                {/* iNFORMACION */}

                                <div className="col-md-8">
                                    <div className="card mb-3">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <h6 className="mb-0">Full Name</h6>
                                                </div>
                                                <div className="col-sm-9 text-secondary">
                                                    Kenneth Valdez
                                                </div>
                                            </div>
                                            <hr /   >
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <h6 className="mb-0">Email</h6>
                                                </div>
                                                <div className="col-sm-9 text-secondary">
                                                    fip@jukmuh.al
                                                </div>
                                            </div>
                                            <hr /   >
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <h6 className="mb-0">Phone</h6>
                                                </div>
                                                <div className="col-sm-9 text-secondary">
                                                    (239) 816-9029
                                                </div>
                                            </div>
                                            <hr /   >
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <h6 className="mb-0">Mobile</h6>
                                                </div>
                                                <div className="col-sm-9 text-secondary">
                                                    (320) 380-4539
                                                </div>
                                            </div>
                                            <hr /   >
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <h6 className="mb-0">Address</h6>
                                                </div>
                                                <div className="col-sm-9 text-secondary">
                                                    Bay Area, San Francisco, CA
                                                </div>
                                            </div>
                                            <hr /   >
                                            <div className="row">
                                                <div className="col-sm-12">
                                                    <a className="btn btn-info " target="__blank" href="https://www.bootdey.com/snippets/view/profile-edit-data-and-skills">Edit</a>
                                                </div>
                                            </div>
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
