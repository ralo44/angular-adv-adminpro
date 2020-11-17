import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable , interval, Subscription} from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent implements OnDestroy {

  public intervalSubs :Subscription;
  constructor() {
   
    // //Subscribe
    // this.retornaObservable().pipe(//cambiar la manera en que fluyen los datos
    //   retry(2)
    // ).subscribe(//Subscribe añ observador
    //   valor => console.log('Subs',valor),//Mensaje al suscriptor
    //   (error) => console.warn('Error', error),//Mensaje de error
    //   () => console.info('Obs terminado')//mensaje final
    //   );
    
   this.intervalSubs = this.retornaIntervalo().subscribe(//Variable para poder quitar subscripcion
      (valor) => console.log(valor)
    );
   }
//Unsubscribe
  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }

   retornaIntervalo(): Observable<number>{//Utilizando la función de intervalos
    return interval(500).pipe(//se convierte la data
          //take(10),//toma 4
          map(valor => valor +1),//convierte el valor valor en 0
          filter(valor => (valor % 2 === 0) ? true: false), //filtro
          )
    
   }
  retornaObservable(): Observable<number>{
    let i = -1;//Comienza la cuenta

    const obs$ = new Observable<number>(observer =>{//Variable observador
      const intervalo = setInterval( () =>{//Variable de cuanto va a durar
        i++;//Contador
        observer.next(i);//Iterador
        if(i === 4){//Condicion
          clearInterval( intervalo);//stop
          observer.complete();//Finalizador
        }
        if(i === 2){
          observer.error(' i llega al valor de 2');
        }
      }, 1000);//tiempo de cada iterada
    });
    return obs$;  
   }

 

}
