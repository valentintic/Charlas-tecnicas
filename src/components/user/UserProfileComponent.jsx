import { Component } from 'react'
import CharlasUser from './CharlasUser'
import UpdateUser from './UpdateUser'
import Profesores from './Profesores'
import Alumnos from './Alumnos'

export default class UserProfileComponent extends Component {

    state = {
        userData: null,
    }

    componentDidMount = () => {

    }

    render() {
        return (
            <>
                <div>
                    <h1>Bienvenido</h1>


                                <div className="d-flex vh-100 justify-content-around">
                                    {/* Barra lateral */}
                                    <div
                                        className="nav flex-column nav-pills p-3 shadow-sm"
                                        id="v-pills-tab"
                                        role="tablist"
                                        aria-orientation="vertical"
                                        style={{
                                            width: "250px",
                                            backgroundColor: "#f8f9fa",
                                            borderRight: "1px solid #e9ecef",
                                        }}
                                    >
                                        
                                        <button
                                            className="nav-link active text-start mb-2"
                                            id="v-pills-profile-tab"
                                            data-bs-toggle="pill"
                                            data-bs-target="#v-pills-profile"
                                            type="button"
                                            role="tab"
                                            aria-controls="v-pills-profile"
                                            aria-selected="false"
                                            style={{ borderRadius: "0.5rem", fontWeight: "500" }}
                                        >
                                            Perfil
                                        </button>
                                        <button
                                            className="nav-link text-start"
                                            id="v-pills-charlasuser-tab"
                                            data-bs-toggle="pill"
                                            data-bs-target="#v-pills-charlasuser"
                                            type="button"
                                            role="tab"
                                            aria-controls="v-pills-charlasuser"
                                            aria-selected="false"
                                            style={{ borderRadius: "0.5rem", fontWeight: "500" }}
                                        >
                                            Mis Charlas
                                        </button>
                                        <button
                                            className="nav-link text-start"
                                            id="v-profesores-tab"
                                            data-bs-toggle="pill"
                                            data-bs-target="#v-pills-profesores"
                                            type="button"
                                            role="tab"
                                            aria-controls="v-pills-profesores"
                                            aria-selected="false"
                                            style={{ borderRadius: "0.5rem", fontWeight: "500" }}
                                        >
                                            Profesores
                                        </button>
                                        <button
                                            className="nav-link text-start"
                                            id="v-alumnos-tab"
                                            data-bs-toggle="pill"
                                            data-bs-target="#v-pills-alumnos"
                                            type="button"
                                            role="tab"
                                            aria-controls="v-pills-alumnos"
                                            aria-selected="false"
                                            style={{ borderRadius: "0.5rem", fontWeight: "500" }}
                                        >
                                            Ver Alumnos
                                        </button>

                        </div>

                                    {/* Contenedor de pestañas */}
                                    <div
                                        className="tab-content flex-grow-1 p-4"
                                        id="v-pills-tabContent"
                                        style={{
                                            backgroundColor: "#ffffff",
                                            borderRadius: "0.5rem",
                                            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                                        }}
                                    >
                                        <div
                                            className="tab-pane fade show active"
                                            id="v-pills-profile"
                                            role="tabpanel"
                                            aria-labelledby="v-pills-profile-tab"
                                        >
                                            {/* iNFORMACION */}
                                            <UpdateUser />
                                        </div>
                                        <div
                                            className="tab-pane fade"
                                            id="v-pills-charlasuser"
                                            role="tabpanel"
                                            aria-labelledby="v-pills-charlasuser-tab"
                                        >
                                            {/* MIS CHARLAS */}
                                            <CharlasUser/>
                                        </div>
                                        <div
                                            className="tab-pane fade"
                                            id="v-pills-profesores"
                                            role="tabpanel"
                                            aria-labelledby="v-pills-profesores-tab"
                                        >
                                            {/* MIS CHARLAS */}
                                            <Profesores/>
                                        </div>
                                        <div
                                            className="tab-pane fade"
                                            id="v-pills-alumnos"
                                            role="tabpanel"
                                            aria-labelledby="v-pills-alumnos-tab"
                                            style={{ overflowY: 'auto' }}
                                        >
                                            {/* MIS CHARLAS */}
                                            <Alumnos/>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
            </>
        )
    }

}
