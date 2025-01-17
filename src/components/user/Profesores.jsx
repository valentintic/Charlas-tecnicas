import { Component } from 'react';
import { getProfesoresAsync } from '../../services/UsuariosAdminService';

export default class Profesores extends Component {
  state = {
    profesores: null
  };

  componentDidMount = () => {
    this.loadProfesores();
  };

  loadProfesores = () => {
    getProfesoresAsync().then((response) => {
      this.setState({
        profesores: response
      });
    });
  };

  render() {
    return (
      <>
        {
          this.state.profesores ? (
            <div className="container mt-4">
              <h1 className="mb-4">Profesores</h1>
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Usuario</th>
                      <th>Email</th>
                      <th>Curso</th>
                      <th>Rol</th>
                      <th>Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      this.state.profesores.map((profe, index) => {
                        return (
                          <tr key={index}>
                            <td>{profe.usuario}</td>
                            <td>{profe.email}</td>
                            <td>{profe.curso}</td>
                            <td>{profe.role}</td>
                            <td>
                              {profe.estadoUsuario === true ? (
                                <span className="text-success">Activo</span>
                              ) : (
                                <span className="text-danger">Inactivo</span>
                              )}
                            </td>
                          </tr>
                        );
                      })
                    }
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <h1>Cargando Profesores...</h1>
          )
        }
      </>
    );
  }
}
