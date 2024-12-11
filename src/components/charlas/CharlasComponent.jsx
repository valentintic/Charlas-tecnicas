import React, { Component } from 'react'
import { useState } from 'react'
import { getCharlas } from '../../services/CharlasApi'
export default class CharlasComponent extends Component {
    state = {
      charlas: null,
    }

    componentDidMount() {
      getCharlas().then((response) => {
        console.error("Charlas", response)
        this.setState({ charlas: response })
      })
    }



  render() {
    return (
      <>
        <div>
          <h1>Charlas</h1>
          <div className="row">
              {this.state.charlas ? this.state.charlas.map((charla) => {
                  return (
                      <div key={charla.idCharla} className="col-md-4 mb-4">
                          <div className="card h-100">
                              <div className="card-body">
                                  <h5 className="card-title">{charla.titulo}</h5>
                                  <p className="card-text">{charla.descripcion}</p>
                                  <p><strong>Tiempo:</strong> {charla.tiempo}</p>
                                  <p><strong>Fecha Propuesta:</strong> {charla.fechaPropuesta}</p>
                                  <p><strong>Estado:</strong> {charla.idEstadoCharla}</p>
                                  <p><strong>Ronda:</strong> {charla.idRonda}</p>
                              </div>
                          </div>
                      </div>
                  )
              }) : null}
          </div>
        </div>

      </>
    )
  }
}
