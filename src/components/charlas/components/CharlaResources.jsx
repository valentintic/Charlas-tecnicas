import React, { Component } from 'react';
import { getCharlaById } from '../../../services/CharlasApi'; // Asegúrate de que el servicio es correcto
import 'bootstrap/dist/css/bootstrap.min.css';

export default class CharlaResources extends Component {
  state = {
    charla: null,
  };

  componentDidMount() {
    this.loadCharla();
  }

  loadCharla = async () => {
    const { charlaId } = this.props;
    try {
      const response = await getCharlaById(charlaId);
      this.setState({ charla: response });
      console.log('Charla:', response);
    } catch (error) {
      console.error('Error loading charla:', error);
    }
  };

  render() {
    const { charla } = this.state;
    const { closeModal } = this.props;

    if (!charla) {
      return <div className="text-center mt-3">Cargando...</div>;
    }

    return (
      <div className="modal fade show d-block" tabIndex="-1" role="dialog">
        <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
          <div className="modal-content">
            {/* Cabecera del modal */}
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title">{charla.charla.titulo}</h5>
            </div>

            {/* Cuerpo del modal */}
            <div className="modal-body">
              <div className="text-center mb-3">
                <img
                  src={charla.charla.imagenCharla}
                  alt="Imagen de la charla"
                  className="img-fluid rounded shadow-sm"
                  style={{ maxHeight: '250px', objectFit: 'cover' }}
                />
              </div>

              <p><strong>Descripción:</strong> {charla.charla.descripcion}</p>
              <p><strong>Tiempo:</strong> {charla.charla.tiempo} minutos</p>
              <p><strong>Fecha Propuesta:</strong> {new Date(charla.charla.fechaPropuesta).toLocaleDateString()}</p>

              {/* Sección de Recursos */}
              {charla.recursos.length > 0 ? (
                <>
                  <h5 className="mt-4">Recursos</h5>
                  <ul className="list-group">
                    {charla.recursos.map(recurso => (
                      <li key={recurso.idRecurso} className="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                          <strong>{recurso.nombre}</strong>
                          <p className="mb-1">{recurso.descripcion}</p>
                          <a href={recurso.url} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-primary">
                            Ver recurso
                          </a>
                        </div>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <p className="mt-3 text-muted">No hay recursos disponibles.</p>
              )}
            </div>

            {/* Pie del modal */}
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={closeModal}>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
