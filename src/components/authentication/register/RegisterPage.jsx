
function Register() {

    return (
        <div>
            <form className="container-md">
                <h1>Registro</h1>
                <label className="form-label" >Nombre:</label>
                <input className="form-control" type="text" name="nombre" id="nombre" />
                <label className="form-label" >Apellidos:</label>
                <input className="form-control" type="text" name="apellidos" id="apellidos" />
                <label className="form-label" >Email:</label>
                <input className="form-control" type="text" name="email" id="email" />
                <label className="form-label" >Constraseña:</label>
                <input className="form-control" type="password" name="password" id="password" />
                <label className="form-label" >Repite Constraseña:</label>
                <input className="form-control" type="password" name="passwordRepeat" id="passwordRepeat" />
            </form>
        </div>
    )
}

export default Register