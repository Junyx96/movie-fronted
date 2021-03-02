import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  constructor(private usuarioService: UsuarioService,) { }

  logout(){
    this.usuarioService.logout()
    
  }

  ngOnInit(): void {
  }

}
