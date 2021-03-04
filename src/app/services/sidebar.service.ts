import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [
    {
      titulo:'Dashboard',
      icono: 'mdi mdi-gauge',
      submenu:[
        {titulo:'Main', url:'/'},
        {titulo:'ProgessBar', url:'progress'},
        {titulo:'Graficas', url:'grafica1'},
        {titulo:'Promesas', url:'promesas'},
        {titulo:'RXJS', url:'rxjs'}
      ]
    },
    {
      titulo:'Mi Lista',
      icono: 'mdi mdi-folder-lock-open',
      submenu:[
        {titulo:'Usuarios', url:'usuarios'},
        {titulo:'Peliculas', url:'peliculas'},
      ]
    }
  ] 

  constructor() { }
}
