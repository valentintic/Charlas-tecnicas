export default class Comentario {
    constructor(idComentario, idCharla, idUsuario, contenido, fecha) {
        this.idComentario = idComentario;
        this.idCharla = idCharla;
        this.idUsuario = idUsuario;
        this.contenido = contenido;
        this.fecha = fecha;
    }
}