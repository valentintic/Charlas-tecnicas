import React, { Component } from 'react'
import { getComentariosCharla } from '../../services/Comentarios'
import Comentario from '../../models/comentario'
import ComentariosList from "./ComentariosList"
export default class ComentariosComponent extends Component {

    state = {
        comentarios: [],
    }

    componentDidMount() {
        const id = this.props.charlaId
        this.loadComentarios(id)
        console.log("ComentariosComponent mounted")
    }

    componentDidUpdate(prevProps) {
        if (prevProps.charlaId !== this.props.charlaId) {
            this.loadComentarios(this.props.charlaId); // Usar el ID actual
        }
    }

    loadComentarios(id) {
        getComentariosCharla(id).then((response) => {
            console.log("response",response)
            this.setState({ 
                comentarios: response
             })
        })
    }
  render() {
    return (
      <>
        <div className="comentarios">
            { this.state.comentarios.length > 0 ? <ComentariosList comentarios={this.state.comentarios} /> : <h1>No hay comentarios</h1> }
        </div>
      </>
    )
  }
}
