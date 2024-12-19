{ /* 
    {
  "idCharla": 0,
  "titulo": "string",
  "descripcion": "string",
  "tiempo": 0,
  "fechaPropuesta": "2024-12-18T08:51:16.703Z",
  "idUsuario": 0,
  "idEstadoCharla": 0,
  "idRonda": 0,
  "imagenCharla": "string"
}
    */
   }


export default class Charlas {
    constructor(idCharla, titulo, descripcion, tiempo, fechaPropuesta, idUsuario, idEstadoCharla, idRonda, imagenCharla) {
        this.idCharla = idCharla;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.tiempo = tiempo;
        this.fechaPropuesta = fechaPropuesta;
        this.idUsuario = idUsuario;
        this.idEstadoCharla = idEstadoCharla;
        this.idRonda = idRonda;
        this.imagenCharla = imagenCharla;
    }
}
