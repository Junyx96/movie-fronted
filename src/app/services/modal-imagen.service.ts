import { Injectable, EventEmitter } from '@angular/core';
import { environment } from '../../environments/environment';


const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {

  private _ocultarModal: boolean = true
  public tipo:'usuarios'|'peliculas'
  public id:string
  public img:string

  public nuevaImagen:EventEmitter<string> = new EventEmitter<string>()


  get ocultarModal(){
    return this._ocultarModal
  }

  abrirModal(
    tipo:'usuarios'|'peliculas',
    id:string,
    img:string = 'no-img'
  ){
    this._ocultarModal=false
    this.tipo = tipo
    this.id = id
    // http://localhost:4000/api/upload/usuarios/603edc40ce3c5036c0ac1f1b

    if (img.includes('https')) {
      this.img = img
    } else {
      this.img = `${base_url}/upload/${tipo}/${img}`
    }

    // this.img = img
  }

  cerrarModal(){
    this._ocultarModal=true
  }

  constructor() { }
}
