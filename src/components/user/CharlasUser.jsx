import { Component } from 'react'
import { getCharlasUser } from '../../services/UsuariosService'
import { deleteCharla } from '../../services/CharlasApi'
import { NavLink } from 'react-router-dom'

export default class CharlasUser extends Component {

    state = {
        misCharlas: null
    }

    componentDidMount = () => {
        this.getCharlasUser();
    }

    getCharlasUser = () => {
        getCharlasUser().then((response) => {
            
            this.setState({
                misCharlas: response
            })

            //console.log(response)
        })
    }

    handleDeleteCharla = async (id) => {
        await deleteCharla(id).then((response) => {
            console.log(response)
            this.getCharlasUser()
        })
    }

  render() {
    return (
      <>
        {
            this.state.misCharlas ?
            (
                <>
                <h1>Mis Charlas</h1>
                <table className='table table-bordered'>
                    <thead>
                        <tr>
                            <th>Titulo</th>
                            <th>Fecha Propuesta</th>
                            <th>Estado</th>
                            <th>Ronda</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.misCharlas.map((arr, index) => {
                                return(
                                    <tr key={index}>
                                        <td>{arr.charla.titulo}</td>
                                        <td>{arr.charla.fechaPropuesta}</td>
                                        <td>{arr.charla.estadoCharla}</td>
                                        <td>{arr.charla.idRonda}</td>
                                        <td><NavLink to={"/update/charla/" + arr.charla.idCharla} >editar</NavLink></td>
                                        <td><button onClick={() => this.handleDeleteCharla(arr.charla.idCharla)}>Eliminar</button></td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
                </>
            ) :
            (
                <h1>Aún no tienes charlas</h1>
            )
        }
        
      </>
    )
  }
}
