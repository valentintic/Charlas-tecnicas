export class ronda {
    constructor (
        idRonda, idCursoUsuario, fechaPresentacion, fechaCierre, duracion, descripcionModulo, fechahLimiteVotacion
    ) {
        this.idRonda = idRonda;
        this.idCursoUsuario = idCursoUsuario;
        this.fechaPresentacion = new Date(fechaPresentacion);
        this.fechaCierre = new Date(fechaCierre);
        this.duracion = duracion;
        this.descripcionModulo = descripcionModulo;
        this.fechahLimiteVotacion = new Date(fechahLimiteVotacion);
    }
}