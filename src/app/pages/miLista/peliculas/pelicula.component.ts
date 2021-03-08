import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PeliculaService } from '../../../services/pelicula.service';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styles: [
  ]
})
export class PeliculaComponent implements OnInit {

  public peliculaForm:FormGroup

  constructor(private fb: FormBuilder,
              private peliculaService:PeliculaService) { }

  ngOnInit(): void {

    this.peliculaForm=this.fb.group({

    titulo:[' karate', Validators.required],
    descripcion:[' bvxbzv', Validators.required],
    director:['bvcbxzv ', Validators.required],
    genero:['', Validators.required],
    calificacion:[' ', Validators.required],
    img:[' ', Validators.required],
    favorito:[false, Validators.required]

    })
  }

  guardarPelicula(){
    console.log(this.peliculaForm.value)
    this.peliculaService.crearPelicula(this.peliculaForm.value)
        .subscribe(resp =>{
          console.log(resp)
        })
  }

}
