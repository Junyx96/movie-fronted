import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromiseComponent } from './promise/promise.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { AuthGuard } from '../guards/auth.guard';



const routes: Routes = [

    {path: 'dashboard', 
    component: PagesComponent,
    canActivate: [ AuthGuard ],
    children:[
    {path: '', component: DashboardComponent, data:{titulo:'Dashboard'}},
    {path: 'progress', component: ProgressComponent, data:{titulo:'Progress'}},
    {path: 'grafica1', component: Grafica1Component, data:{titulo:'Grafica #1'}},
    {path: 'account-settings', component: AccountSettingsComponent, data:{titulo:'Accouns-Settings'}},
    {path: 'promesas', component: PromiseComponent, data:{titulo:'Promesas'}} ,
    {path: 'rxjs', component: RxjsComponent, data:{titulo:'RXJS'}},
    // {path: '', redirectTo:'/dashboard', pathMatch:'full'},
    ]
    },
    
    //{ path: 'path/:routeParam', component: MyComponent },
    //{ path: 'staticPath', component: ... },
    //{ path: '**', component: ... },
    //{ path: 'oldPath', redirectTo: '/staticPath' },
    //{ path: ..., component: ..., data: { message: 'Custom' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PageRoutingModule {}