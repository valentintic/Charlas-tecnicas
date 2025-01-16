import { Component } from 'react'
import { getProfesores } from '../../services/UsuariosAdminService';



export default class Profesores extends Component {

  state = {
    profesores: null
  }

  componentDidMount = () => {
    this.loadProfesores();
  }
  loadProfesores = () => {
    getProfesores().then((response) => {
      this.setState({
        profesores: response
      })

      // console.log(response)
    })
  }

  render() {
    return (
      <>
        {
          this.state.profesores ?
            (
              <div>
                <h1>profesores AMDIN?</h1>
                <table className='table tabler-bordered'>
                  <thead>
                    <tr>
                      <th>Usuario</th>
                      <th>email</th>
                      <th>curso</th>
                      <th>Rol</th>
                      <th>estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      this.state.profesores.map((profe, index) =>{
                        return(
                          <tr key={index}>
                            <td>{profe.usuario}</td>
                            <td>{profe.email}</td>
                            <td>{profe.curso}</td>
                            <td>{profe.role}</td>
                            <td>
                            {profe.estadoUsuario === true ?
                            (<span>Activo</span>):
                            (<span>Inactivo</span>)}
                            </td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </table>
              </div>
            ) :
            (
              <h1>Cargando Profesores...</h1>
            )
        }
      </>

    )
  }
}
