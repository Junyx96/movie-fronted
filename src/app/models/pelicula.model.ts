interface _PeliculaUser{
    _id:string
    nombre:string
    email:string
    img:string
}


export class Pelicula {

    constructor(

        public titulo: string,
        public descripcion: string, 
        public director: string, 
        public genero: string, 
        public calificacion: string,
        public _id: string, 
        public img?: string,  
        public favorito?: boolean,
        public usuario?: _PeliculaUser,

    )   {
    }   

} 