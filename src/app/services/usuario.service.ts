import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable, NgZone } from '@angular/core';

import {tap,map, catchError} from 'rxjs/operators'
import { Observable, of } from 'rxjs';

import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-forms.iterfaces';
import { RegisterForm } from '../interfaces/register-forms.interface';


const base_url = environment.base_url;
declare const gapi:any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  public auth2:any;

  constructor(private http:HttpClient,
              private router:Router,
              private ngZone: NgZone
              ) {
                this.googleInit();
               }

  logout(){
    localStorage.removeItem('token');
    this.auth2.signOut().then( () => {
      this.ngZone.run(()=>{
      this.router.navigateByUrl('/login');
      })
    });
  }
  
  googleInit() {//es neceario para concetar con google
    return new Promise(resolve =>{
      gapi.load('auth2', () => {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id: '388412636183-c2ss9jpir5mc06d9spfjofj1tmoc7j84.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
  
        });
        resolve();
      });

    })
  };
  
  validarToken(): Observable<boolean>{
    const token = localStorage.getItem('token') || '';
    
    return this.http.get(`${base_url}/login/renew`, {
      headers:{
        'x-token':token
      }
    }).pipe(
      tap((resp:any) =>{
      localStorage.setItem('token', resp.token)
    }),
    map(resp => true),
    catchError(error => of(false))
    );
  }
  crearUsuario(formData: RegisterForm){
   return this.http.post(`${base_url}/usuarios`,formData).pipe(
    tap((resp: any) =>{
      localStorage.setItem('token', resp.token)
    })
  );
  }
  login(formData:LoginForm){//postea en la ruta del backend
    return this.http.post(`${base_url}/login`, formData).pipe(
      tap((resp: any) =>{
        localStorage.setItem('token', resp.token)
      })
    );
  }

  loginGoogle(token){//postea en la ruta del backend
    return this.http.post(`${base_url}/login/google`, {token}).pipe(
      tap((resp: any) =>{
        localStorage.setItem('token', resp.token)
      })
    );
  }
}
