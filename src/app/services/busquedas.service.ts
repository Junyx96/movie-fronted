import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';
import { Pelicula } from '../models/pelicula.model';


const base_url = environment.base_url


@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  constructor( private http:HttpClient) { }

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

  private transformarUsuarios(resultados: any[]):Usuario[]{

    return resultados.map(
      user => new Usuario(user.nombre, user.email, '', user.img, user.google, user.role, user._id)
    )
  }

  private transformarPeliculas(resultados: any[]):Pelicula[]{

    return resultados
  }




  buscar(tipo: 'usuarios'|'peliculas', termino:string){
    const url= `${base_url}/todo/coleccion/${tipo}/${termino}`
    return this.http.get<any[]>(url, this.headers)
                .pipe(
                  map( (resp:any) => {

                    switch (tipo) {
                      case 'usuarios':
                        return this.transformarUsuarios(resp.resultados)

                        case 'peliculas':
                          return this.transformarPeliculas(resp.resultados)
                    
                      default:
                        return[]
                    }


                  })
                )

  }

}
