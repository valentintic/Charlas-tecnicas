import React, { Component } from 'react'
import { ronda } from '../../models/rondas'
import { getRondas } from '../../services/Rondas'

export default class FormCharlas extends Component {
    state = {
        charla: {
            idCharla: 0, 
            titulo: "", 
            descripcion: "", 
            tiempo: "", 
            fechaPropuesta: new Date(),  
            idUsuario: "",  
            idEstadoCharla: "", 
            idRonda: "",
        },
        ronda: []
    }

    handleChange = (e) => {
        this.setState({
            charla: {
                ...this.state.charla,
                [e.target.name]: e.target.value
            }
        })
    }
    getAllRondas = () => {
        getRondas().then(response => {
            this.setState({
                ronda: response
            })
        })
    }

    postFormCharlas = () => {
        console.log(this.state.charla);
    }

    componentDidMount() {
        this.getAllRondas();
    }
    
  render() {
    return (
      <>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="mb-3">
            <label htmlFor="titulo" className="form-label">Titulo</label>
            <input 
                type="text" 
                name="titulo" 
                id="titulo" 
                onChange={this.handleChange} 
                value={this.state.charla.titulo} 
                className="form-control" 
                placeholder="Enter the title" 
            />
        </div>
        <div className="mb-3">
            <label htmlFor="descripcion" className="form-label">Descripcion</label>
            <input 
                type="text" 
                name="descripcion" 
                id="descripcion" 
                onChange={this.handleChange} 
                value={this.state.charla.descripcion} 
                className="form-control" 
                placeholder="Enter the description" 
            />
        </div>
        <div className="mb-3">
            <label htmlFor="tiempo" className="form-label">Tiempo</label>
            <input 
                type="text" 
                name="tiempo" 
                id="tiempo" 
                onChange={this.handleChange} 
                value={this.state.charla.tiempo} 
                className="form-control" 
                placeholder="Enter the time" 
            />
        </div>
        <div className="mb-3">
            <label htmlFor="fechaPropuesta" className="form-label">Fecha Propuesta</label>
            <input 
                type="date" 
                name="fechaPropuesta" 
                id="fechaPropuesta" 
                onChange={this.handleChange} 
                value={this.state.charla.fechaPropuesta} 
                className="form-control" 
                placeholder="Enter the proposed date" 
            />
        </div>
        <div className="mb-3">
            <label htmlFor="idRonda" className="form-label.lg">Ronda</label>
            <select name="rondas" id="">
                {this.state.ronda.map((ronda) => {
                    return (
                        <option key={ronda.idRonda} value={ronda.idRonda}>{ronda.fechaPresentacion}</option>
                    )
                })}
            </select>
        </div>
        <button className='btn btn-primary' onClick={this.postFormCharlas}>Create</button>
      </form>
      </>
    )
  }
}
