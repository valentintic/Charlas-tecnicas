import React, { Component } from 'react';
import { getCharlaById } from '../../../services/CharlasApi';
import DefaultImage from '../../../assets/Default_imaget.webp';
import '../modules/CharlaResources.module.css';
import { postRecursos, updateRecursos } from '../../../services/RecursosApi';
import { GiThorFist } from 'react-icons/gi';

export default class CharlaResources extends Component {
  state = {
    charla: null,
    nuevoRecurso: {
      idRecurso: 0,
      idCharla: null,
      url: '',
      nombre: '',
      descripcion: '',
    },
    editando: false,
    mostrarFormulario: false,
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

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      nuevoRecurso: {
        ...prevState.nuevoRecurso,
        [name]: value,
      }
    }));
  };

  handleEditRecurso = (recurso) => {
    this.setState({
      nuevoRecurso: { ...recurso },
      editando: true,
    });
  };

  handleFormulario = (e) => {
    e.preventDefault();
    this.setState({ mostrarFormulario: !this.state.mostrarFormulario });
  };

  handleSubmit = async () => {
    const { nuevoRecurso, charla, editando } = this.state;

    if (!nuevoRecurso.nombre || !nuevoRecurso.descripcion || !nuevoRecurso.url) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    try {
      let recursoActualizado;
      if (editando) {
        console.log('Editando recurso:', nuevoRecurso);
        recursoActualizado = await updateRecursos(nuevoRecurso);
        this.setState({
          editando: false,
        })
      } else {
        nuevoRecurso.idCharla = charla.charla.idCharla;
        recursoActualizado = await postRecursos(nuevoRecurso);
      }
      
      this.setState((prevState) => ({
        charla: {
          ...prevState.charla,
          recursos: editando
            ? prevState.charla.recursos.map((r) =>
                r.idRecurso === recursoActualizado.idRecurso ? recursoActualizado : r
              )
            : [...prevState.charla.recursos, recursoActualizado],
        },
        nuevoRecurso: { idRecurso: 0, idCharla: null, url: '', nombre: '', descripcion: '' },
        editando: false,
      }));

      console.log('Recurso agregado o actualizado:', recursoActualizado);
    } catch (error) {
      console.error('Error al agregar/editar el recurso:', error);
      alert('Hubo un problema al procesar el recurso.');
    }
  };

  render() {
    const { charla, nuevoRecurso, editando } = this.state;
    const { closeModal } = this.props;

    if (!charla) {
      return <div className="text-center mt-3">Cargando...</div>;
    }

    return (
      <div className="custom-modal-overlay" onClick={closeModal}>
        <div className="custom-modal" onClick={(e) => e.stopPropagation()}>

          <div className="custom-modal-header">
            <h5 className="modal-title">{charla.charla.titulo}</h5>
          </div>

          <div className="custom-modal-body">
            <div className="text-center mb-3">
              <img
                src={charla.charla.imagenCharla}
                alt="Imagen de la charla"
                className="img-fluid rounded shadow-sm"
                style={{ maxHeight: '250px', objectFit: 'cover' }}
                onError={(e) => e.target.src = DefaultImage}
              />
            </div>

            <p><strong>Descripción:</strong> {charla.charla.descripcion}</p>
            <p><strong>Tiempo:</strong> {charla.charla.tiempo} minutos</p>
            <p><strong>Fecha Propuesta:</strong> {new Date(charla.charla.fechaPropuesta).toLocaleDateString()}</p>

            {charla.recursos.length > 0 ? (
              <>
                <h5 className="mt-4">Recursos</h5>
                <ul className="custom-list-group">
                  {charla.recursos.map(recurso => (
                    <li key={recurso.idRecurso} className="custom-list-item">
                      <div>
                        <strong>{recurso.nombre}</strong>
                        <p className="mb-1">{recurso.descripcion}</p>
                        <a href={recurso.url} target="_blank" rel="noopener noreferrer" className="btn-view-resource">
                          Ver recurso
                        </a>
                        <button
                          className="btn btn-warning btn-sm ml-2"
                          onClick={() => this.handleEditRecurso(recurso)}
                        >
                          Editar
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <>
                <p className="mt-3 text-muted">No hay recursos disponibles.</p>
              </>
            )}
            <button className='btn btn-primary' onClick={this.handleFormulario}>{editando ? 'Editar Recurso' : 'Nuevo Recurso'}</button>
            {this.state.mostrarFormulario == true ?  <>
            <h5 className="mt-3">{editando ? 'Editar Recurso' : 'Agregar Nuevo Recurso'}</h5>
            <div className="custom-form">
              <input
                type="text"
                name="nombre"
                placeholder="Nombre del recurso"
                value={nuevoRecurso.nombre}
                onChange={this.handleInputChange}
                className="form-control mb-2"
              />
              <input
                type="text"
                name="descripcion"
                placeholder="Descripción"
                value={nuevoRecurso.descripcion}
                onChange={this.handleInputChange}
                className="form-control mb-2"
              />
              <input
                type="text"
                name="url"
                placeholder="URL del recurso"
                value={nuevoRecurso.url}
                onChange={this.handleInputChange}
                className="form-control mb-2"
              />
              <button
                type="button"
                className={`btn ${editando ? 'btn-success' : 'btn-primary'}`}
                onClick={this.handleSubmit}
              >
                {editando ? 'Actualizar Recurso' : 'Agregar Recurso'}
              </button>
            </div>
            
            </>: null }
          </div>

          <div className="custom-modal-footer">
            <button type="button" className="btn-close" onClick={closeModal}>
              Cerrar
            </button>
          </div>

        </div>
      </div>
    );
  }
}
