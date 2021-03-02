import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

import Swal from 'sweetalert2'

declare const gapi:any

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formSubmitted = false
  public auth2:any

  public loginForm = this.fb.group({
    email:[ localStorage.getItem('email') ||'', [Validators.required, Validators.email]],
    password:['', Validators.required],
    remenber:[false],
  })


  constructor(private router:Router,
              private fb :FormBuilder,
              private usuarioService:UsuarioService,
              private ngZone:NgZone) { }

  ngOnInit(): void {
    this.renderButton()
  }

  login() {

    this.usuarioService.login(this.loginForm.value)
      .subscribe(resp=>{
        if (this.loginForm.get('remenber').value) {
          localStorage.setItem('email', this.loginForm.get('email').value)
        } else {
          localStorage.removeItem('email')
        }
        
        // Navegar al dashboard
        this.router.navigateByUrl('/')
      }, (err) => {
        // Si hay error
        Swal.fire('Error', err.error.msg, 'error')
      })
    // console.log(this.loginForm.value)
  }

  

  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark', 
    });

    this.startApp()

  }

  async startApp() {

      this.auth2 = await this.usuarioService.googleInit()

      this.attachSignin(document.getElementById('my-signin2'));
  };

  


  attachSignin(element) {
    this.auth2.attachClickHandler(element, {},
        (googleUser) => {
          const id_token = googleUser.getAuthResponse().id_token;
          // console.log(id_token)
          this.usuarioService.loginGoogle(id_token)
            .subscribe(resp=>
               // Navegar al dashboard
              this.ngZone.run(()=>{
                this.router.navigateByUrl('/')
              })
              )


        }, (error)  => {
          alert(JSON.stringify(error, undefined, 2));
        });
  }

   // attachSignin( element ) {
  //   this.auth2.attachClickHandler( element, {}, (googleUser) => {
  //     // const profile = googleUser.getBasicProfile();
  //     const id_token = googleUser.getAuthResponse().id_token;
  //     this.usuarioService.loginGoogle(id_token)
  //       .subscribe((resp) => {
  //         // console.log(resp);
  //         this.auth2.disconnect();
  //       });
  //   });
  // }


}
