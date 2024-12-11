import React, { Component } from 'react'
import { postLogin } from '../../../services/Login'
import { Navigate, useNavigate } from 'react-router-dom';


export default class LoginComponent extends Component {
    state = {
        user: {
            userName: "",
            password: ""
        },
        status: false,
    }

    handleChange = (e) => {
        this.setState({
            user: {
                ...this.state.user,
                [e.target.name]: e.target.value,   
            }
        })
    }

    login = (e) => {
        e.preventDefault();
        postLogin(this.state.user)
            .then((response) => {
                console.log(response);
                localStorage.setItem("token", response.response);
                console.log(localStorage.getItem("token"));
                this.setState({
                    status: true,
                });
            })
            .catch((error) => {
                console.error("Error during login:", error);
            });
    };

  render() {
    return (
      <>
      {
        this.state.status === true ? 
        <Navigate to="/" />
        : null
      }
        <form onSubmit={(e) => e.preventDefault()} className="container mt-4 p-4 border rounded bg-light">
    <div className="mb-3">
        <label htmlFor="userName" className="form-label">Username</label>
        <input 
            type="text" 
            name="userName" 
            id="userName" 
            onChange={this.handleChange} 
            value={this.state.user.userName} 
            className="form-control" 
            placeholder="Enter your username" 
        />
    </div>
    <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input 
            type="password" 
            name="password" 
            id="password" 
            onChange={this.handleChange} 
            value={this.state.user.password} 
            className="form-control" 
            placeholder="Enter your password" 
        />
    </div>
    <button type="submit" onClick={this.login} className="btn btn-primary w-100">
        Login
    </button>
</form>

      </>
    )
  }
}
