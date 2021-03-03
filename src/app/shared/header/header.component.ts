import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  public usuario:Usuario

  constructor(private usuarioService: UsuarioService,) {
    this.usuario= usuarioService.usuario
  }

  logout(){
    this.usuarioService.logout()
    
  }

  ngOnInit(): void {
  }

}
