import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'


export default class MenuComponent extends Component {
  render() {
    return (
      <>
        <div>
            <nav className="navbar navbar-expand-xl navbar-dark bg-dark" aria-label="Third navbar example">
              <div className="container-fluid">
                <div className="collapse navbar-collapse" id="navbarsExample03">
                  <ul className="navbar-nav me-auto mb-2 mb-sm-0">
                    <li className="nav-item">
                      <NavLink to={"/"} className="nav-link active" aria-current="page">Home</NavLink>
                    </li>

                    <li>
                      <NavLink to={"/register"} className={"nav-link"} >Register</NavLink>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
        </div>
      </>
    )
  }
}
