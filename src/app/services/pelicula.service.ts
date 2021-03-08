import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Pelicula } from '../models/pelicula.model';
import { PeliculaForm } from '../interfaces/peliculas-form.interface';



const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class PeliculaService {

  constructor (private http: HttpClient) { }

  get token():string{
    return localStorage.getItem('token') || ''
  }

  get headers(){
    return {
      headers:{
        'x-token': this.token
      }
    }
  }


  cargarPeliculas(){
    const url= `${base_url}/peliculas`
    return this.http.get(url, this.headers)
              .pipe(
                map( (resp:{ok:boolean, peliculas:Pelicula[]})=>resp.peliculas)
              )
  }

  crearPelicula(formData:PeliculaForm){
    const url= `${base_url}/peliculas`
    return this.http.post(url,{formData}, this.headers)
  }

  actualizarPelicula( _id:string, formData:PeliculaForm){
    const url= `${base_url}/peliculas/${_id}`
    return this.http.put(url,{formData}, this.headers)
  }

  eliminarPelicula( _id:string){
    const url= `${base_url}/peliculas/${_id}`
    return this.http.delete(url, this.headers)
  }


}
