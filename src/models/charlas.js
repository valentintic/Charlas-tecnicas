export class Charla {
    constructor(
        idCharla, titulo, descripcion, tiempo, fechaPropuesta, idUsuario, idEstadoCharla, idRonda
    ) {
        this.idCharla = idCharla;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.tiempo = tiempo;
        this.fechaPropuesta = new Date(fechaPropuesta);
        this.idUsuario = idUsuario;
        this.idEstadoCharla = idEstadoCharla;
        this.idRonda = idRonda;
    }
}
