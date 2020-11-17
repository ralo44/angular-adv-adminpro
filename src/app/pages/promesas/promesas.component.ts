import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styleUrls: ['./promesas.component.css']
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.getUsuarios().then(usuarios => {
      console.log(usuarios)
    })
    // const promesas = new Promise((resolve, reject) =>{
    //   if(false){
    //     resolve('hola');
    //   }else{
    //     reject('Algo malio sal');
    //   }
    // });

    // promesas.then((mensaje) =>{
    //   console.log(mensaje);
    // })
    // .catch(error => console.log('error cachadao'));
    // console.log('Saludos');
  }
  getUsuarios() {
    return new Promise(resolve => {
      fetch('https://reqres.in/api/users')
        .then(resp => resp.json())
        .then(body => resolve(body.data))

    });
  }
}

