import React, { Component } from 'react'
import { getAllUsersAdmin } from '../../services/UsuariosAdminService'
import { table } from 'framer-motion/client'

export default class Alumnos extends Component {
    state = {
        alumnos: null,
    }

    loadAlumnos() {
        getAllUsersAdmin().then((response) => {
            this.setState({ alumnos: response })
        })
    }
    componentDidMount() {
        this.loadAlumnos()
    }

  render() {
    return (
      <div className="container" style={{ maxHeight: '100%', overflowY: 'auto' }}>
        <h1>Alumnos</h1>
        { this.state.alumnos && this.state.alumnos.map((alumno) => (
             <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
             <table className="table table-striped table-bordered">
                 <thead>
                     <tr>
                         <th>Id Usuario</th>
                         <th>Nombre</th>
                         <th>Apellidos</th>
                         <th>Email</th>
                         <th>Rol</th>
                     </tr>
                 </thead>
                 <tbody>
                         <tr key={alumno.idUsuario}>
                             <td>{alumno.idUsuario}</td>
                             <td>{alumno.nombre}</td>
                             <td>{alumno.apellidos}</td>
                             <td>{alumno.email}</td>
                             <td>{alumno.idRole}</td>
                         </tr>
                 </tbody>
             </table>
         </div>
        
        
        ))}
      </div>
    )
  }
}
