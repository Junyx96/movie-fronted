import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncrementadorComponent } from './incrementador/incrementador.component';
import { FormsModule } from '@angular/forms';
import { DougnutComponent } from './dougnut/dougnut.component';
import { ChartsModule } from 'ng2-charts';



@NgModule({
  declarations: [
    IncrementadorComponent,
    DougnutComponent
  ],
  exports:[
    IncrementadorComponent,
    DougnutComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule,
  ]
})
export class ComponentsModule { }
