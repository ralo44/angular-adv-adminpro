import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy {
  public titulo:string; //EL nombre del titulo se asigno en routing
  public tituloSubs$: Subscription;//Para des sunscribirse

  constructor(private router:Router) {
    this.tituloSubs$ = this.getArgumentosRuta().subscribe(data =>{//
      this.titulo = data.titulo;
      document.title = data.titulo;//Pomer nombre arriba de la página
    });  
  }

  ngOnDestroy(): void {
    this.tituloSubs$.unsubscribe();
  }

  getArgumentosRuta(){
    return this.router.events.pipe(//comienza el filtro
      filter(event => event instanceof(ActivationEnd)),
      filter((event: ActivationEnd) => event.snapshot.firstChild === null),
      map((event: ActivationEnd) => event.snapshot.data),//obtener el data del  lugar de donde lo necesitamos

    )
    
   }


}
