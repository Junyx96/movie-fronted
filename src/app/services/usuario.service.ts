import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { tap, map, catchError } from 'rxjs/operators';
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
  public usuario:Usuario


  constructor(private http: HttpClient,
              private router:Router,
              private ngZone: NgZone) { 

    this.googleInit()            
}

  get token():string{
    return localStorage.getItem('token') || ''
  }

  get uid():string{
    return this.usuario._id || ''
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

        this.usuario = new Usuario(nombre, email, '', img, google, _id, role)
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

    return this.http.put(`${base_url}/usuarios/${this.uid}`, data, {
      headers:{
        'x-token': this.token
      }
    })

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


  
}
