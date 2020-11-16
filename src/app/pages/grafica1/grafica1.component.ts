import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component implements OnInit { 
//Valores que se van a ser usados en el hijo  
  public labels1: string[] =   ['Solo Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public nombreTitulo:string="Ventas";
  public data1: number[]= [100, 10, 100];

  constructor() { }
  ngOnInit(): void {
  }

}
