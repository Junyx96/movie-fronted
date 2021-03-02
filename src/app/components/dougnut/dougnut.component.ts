import { Component, Input, OnInit } from '@angular/core';
import { MultiDataSet, Label, Color,  } from 'ng2-charts';

@Component({
  selector: 'app-dougnut',
  templateUrl: './dougnut.component.html',
  styles: [
  ]
})
export class DougnutComponent implements OnInit {

  @Input() title: string = "sin titulo"

  @Input('labels') doughnutChartLabels: Label[] = ['Test1', 'Test2', 'Test3'];
  @Input('data') doughnutChartData: MultiDataSet = [
    [350, 450, 100],
  ];

  public colors : Color[] =[
    {backgroundColor:['#6857E6', '#009FEE', '#F02059']}
  ]


  constructor() { }

  ngOnInit(): void {
  }

}
