import { Component, Input } from '@angular/core';
import { MultiDataSet, Label, Color } from 'ng2-charts';


@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent  {
  // Valores exportados a padre
  @Input()titulo: string = "Sin titulo";
  @Input('labels') doughnutChartLabels: Label[] = ['Label1', 'Label2', 'Label3'];//Valores default
  @Input('data') doughnutChartData: MultiDataSet = [[350, 450, 100]];//valores default
  //Valores locales
  public colors: Color[]=[{backgroundColor:['#9e120e', '#FF5800', '#FFb414']}];

  
  constructor() { }
 

}
