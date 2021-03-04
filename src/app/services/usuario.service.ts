import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { CargarUsuario } from '../interfaces/cargar-usuarios.interface';
import { tap, map, catchError, delay } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';



const base_url = environment.base_url
declare const gapi: any

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2:any
  public usuario: Usuario


  constructor(private http: HttpClient,
              private router:Router,
              private ngZone: NgZone) { 

    this.googleInit()            
}

  get token():string{
    return localStorage.getItem('token') || ''
  }

  get uid():string{
    return this.usuario._id || '';
  }

  get headers(){
    return {
      headers:{
        'x-token': this.token
      }
    }
  }


  googleInit(){

    return new Promise((resolve)=>{
      gapi.load('auth2', () =>{
        this.auth2 = gapi.auth2.init({
          client_id: '1073705373451-mjmtsja9pbmia4gle2pvftmo4msu9c26.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
        resolve(this.auth2)
      });
    })

  }            

  logout(){
    localStorage.removeItem('token')
    this.auth2.signOut().then( () => {

      this.ngZone.run(()=>{
        this.router.navigateByUrl('/login')

      })
    });
  }
              

  validarToken():Observable<boolean>{

    return this.http.get(`${base_url}/login/renew`, {
      headers:{
        'x-token': this.token
      }
    }).pipe(
      tap((resp:any) =>{
        const {email, google, img, nombre, role, _id} = resp.usuario

        this.usuario = new Usuario(nombre, email, '', img, google, role, _id)
        localStorage.setItem('token', resp.token)
      }),
      map(resp=> true),
      catchError(error => of(false))
    )

  }

  crearUsuario(formData:RegisterForm){
    
    return this.http.post(`${base_url}/usuarios`, formData)
                .pipe(
                  tap((resp:any)=>{
                    localStorage.setItem('token', resp.token)
                  })
                )

  }

  actualizarPerfil(data: {email:string, nombre:string, role:string}) {

    data = {
      ...data,
      role: this.usuario.role
    }

    return this.http.put(`${base_url}/usuarios/${this.uid}`, data, this.headers)

  }

  login(formData:LoginForm){
    
    return this.http.post(`${base_url}/login`, formData)
                .pipe(
                  tap((resp:any)=>{
                    localStorage.setItem('token', resp.token)
                  })
                )
  }

  loginGoogle(token){
    
    return this.http.post(`${base_url}/login/google`, {token})
                .pipe(
                  tap((resp:any)=>{
                    localStorage.setItem('token', resp.token)
                  })
                )
  }

  cargarUsurios(desde: number = 0){
    const url= `${base_url}/usuarios?desde=${desde}`
    return this.http.get<CargarUsuario>(url, this.headers)
                .pipe(
                  //Probar
                  // delay(3000),
                  map(resp =>{
                    const usuarios = resp.usuarios.map(
                      user => new Usuario(user.nombre, user.email, '', user.img, user.google, user.role, user._id)
                    )
                    return {
                      total:resp.total,
                      usuarios
                    }
                  })
                )


  }

eliminarUsuario( usuario: Usuario){
  const url= `${base_url}/usuarios/${this,usuario._id}`
  return this.http.delete(url, this.headers)
}

guardarUsuario(usuario: Usuario) {

  return this.http.put(`${base_url}/usuarios/${usuario._id}`, usuario, this.headers)

}

  
}
