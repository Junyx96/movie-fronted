import { Component, OnInit, OnDestroy } from '@angular/core';
import { Pelicula } from 'src/app/models/pelicula.model';
import { PeliculaService } from '../../../services/pelicula.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { BusquedasService } from '../../../services/busquedas.service';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-peliculas',
  templateUrl: './peliculas.component.html',
  styles: [
  ]
})
export class PeliculasComponent implements OnInit, OnDestroy {

  public peliculas:Pelicula[] = []
  public cargando:boolean = true
  private imgSubs: Subscription;

  constructor(private peliculaService:PeliculaService,
              private modalImagenService:ModalImagenService,
              private busquedasService:BusquedasService) { }


  ngOnDestroy(): void {
    this.imgSubs.unsubscribe()
  }

  ngOnInit(): void {

    this.cargarPeliculas()
  
    this.imgSubs = this.imgSubs = this.modalImagenService.nuevaImagen
    .pipe(delay(100))
    .subscribe( img => this.cargarPeliculas() );

  }


  cargarPeliculas(){

    this.cargando = true 
    this.peliculaService.cargarPeliculas()
        .subscribe(peliculas => {
          this.cargando = false
          this.peliculas=peliculas
        })
  }
  
  buscar(termino:string){
    if (termino.length === 0) {
      return this.cargarPeliculas()
    }

    this.busquedasService.buscar('peliculas', termino)
        .subscribe(resp => {
        this.peliculas 
        })

  }



  abrirModal(pelicula:Pelicula){

    this.modalImagenService.abrirModal('peliculas', pelicula._id, pelicula.img)

  }

  borrarPelicula(pelicula: Pelicula){

    Swal.fire({
      title: '¿Desea eliminar esta pelicula?',
      text: `Esta eliminando a: ${pelicula.titulo}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.value) {
        this.peliculaService.eliminarPelicula(pelicula._id)
            .subscribe( resp=> {
              this.cargarPeliculas()
              Swal.fire(
                'Pelicula eliminado',
                `${pelicula.titulo} fue eliminado correctamente`,
                'success'
              )
            })
      }
    })

  }



}
