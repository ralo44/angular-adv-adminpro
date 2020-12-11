import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate { //para que no pase a lados que no le corresponde sin el token
  constructor(private usuarioService:UsuarioService,//saber el usuario logged
              private router:Router, //sacar al usuario si no tiene token
              ){}
  
  canActivate(//metodo cargado
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
      
      
    return this.usuarioService.validarToken()//regresa el metodo booleano usado para saber si la pagina trae token
            .pipe(tap(
              estaAutenticado =>{
                if (!estaAutenticado) {
                  this.router.navigateByUrl('/login');
                }
              })
        )
  }
  
}
