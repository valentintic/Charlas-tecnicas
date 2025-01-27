import React, { Component } from 'react'
import { getAlumnosCursoProfesorAsync, getCursosProfesorAsync } from '../../services/ProfesorService'

export default class AlumnosProfesorCurso extends Component {

    state = {
        cursos:null,
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
                {/* <label>Cursos:</label>
                {
                    this.state.cursos ?
                    (
                        <select name='cursos' id='cursos'>
                        {
                            this.state.cursos.map((curso, index) => {
                                return(
                                    <option key={index} value={curso}>
                                        {curso}
                                    </option>
                                );
                            })
                        }
                        </select>
                    ):
                    (<h2>Cargando cursos...</h2>)
                } */}
                {
                    this.state.alumnosCurso ?
                    (
                        <>
                        <h2>hola</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.alumnosCurso.map((alumnos, index) => {
                                        // Muestra todos ls alumnos de este curso
                                        
                                    })
                                }
                            </tbody>
                        </table>
                        </>
                    ) :
                    (
                        <h2>Cargando alumnos...</h2>
                    )
                }
            </div>
        )
    }
}
