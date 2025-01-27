import React, { Component } from 'react'
import { getAlumnosCursoProfesorAsync } from '../../services/ProfesorService'

export default class AlumnosProfesorCurso extends Component {

    state = {
        alumnosCurso: null
    }

    componentDidMount = () => {
        this.loadAlumnosCursoProfesor();
    }

    loadAlumnosCursoProfesor = () => {
        getAlumnosCursoProfesorAsync().then((response) => {
            this.setState({
                alumnosCurso: response
            })
            console.log(response);
        })
    }
    render() {
        return (
            <div>
                <h1>AlumnosProfesorCurso</h1>
                {
                    this.state.alumnosCurso ?
                    (
                        <>
                        <h2>hola</h2>
                        {/* <table>
                            <thead>
                                <tr>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.alumnosCurso.map((alumnos, index) => {
                                        // Muestra todos los alumnos de este curso
                                        
                                    })
                                }
                            </tbody>
                        </table> */}
                        </>
                    ) :
                    (
                        <h2>Cargando datos...</h2>
                    )
                }
            </div>
        )
    }
}
