// Modulos
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageRoutingModule } from './pages/pages-routing.module';

// Componentes
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { AuthRoutingModule } from './auth/auth-routing.module';

const routes: Routes = [

  {path: '', redirectTo:'/dashboard', pathMatch:'full'},
  {path: '**', component: NopagefoundComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    PageRoutingModule,
    AuthRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
