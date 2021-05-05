import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable, NgZone } from '@angular/core';

import { tap, map, catchError } from 'rxjs/operators'
import { Observable, of } from 'rxjs';

import { ICargarUsuario } from '../interfaces/cargar-usuarios.interface';
import { LoginForm } from '../interfaces/login-forms.iterfaces';
import { RegisterForm } from '../interfaces/register-forms.interface';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario.model';
import { UsuariosComponent } from '../pages/mantenimientos/usuarios/usuarios.component';


const base_url = environment.base_url;
declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  public auth2: any;
  public usuario: Usuario;

  constructor(private http: HttpClient,
              private ngZone: NgZone,
              private router: Router,
  ) {
    this.googleInit();
  }

  get token(): string{
    return localStorage.getItem('token') || '';
  }
  
  get uid():string {
    return this.usuario.uid || '';
  }

  get headers(){
    return {
      headers: {
      'x-token': this.token
    }
  }
  }
  logout() {
    localStorage.removeItem('token');
    this.auth2.signOut().then(() => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      })
    });
  }

  googleInit() {//es neceario para concetar con google
    return new Promise(resolve => {
      gapi.load('auth2', () => {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id: '388412636183-c2ss9jpir5mc06d9spfjofj1tmoc7j84.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',

        });
        resolve('');
      });

    })
  };

  validarToken(): Observable<boolean> {
    // const token = localStorage.getItem('token') || '';

    return this.http.get(`${base_url}/login/renew`, this.headers).pipe(
      map((resp: any) => {
        const { email, google, img = '', nombre, role, uid } = resp.usuario;
        this.usuario = new Usuario(nombre, email, '', google, img, role, uid);

        localStorage.setItem('token', resp.token)
        return true;
      }),
      // map(resp => true),
      catchError(error => of(false))//observable que resuelve el error si no te saca
    );
  }

  crearUsuario(formData: RegisterForm) {
    return this.http.post(`${base_url}/usuarios`, formData).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token)
      })
    );
  }

  actualizarPerfil(data: { email: string, nombre: string,  role:string }) {
   
    data = {
      ...data,
      role : this.usuario.role
    };

    return this.http.put(`${ base_url }/usuarios/${ this.uid }`, data, this.headers);       
  }

  login(formData: LoginForm) {//postea en la ruta del backend
    return this.http.post(`${base_url}/login`, formData).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token)
      })
    );
  }

  loginGoogle(token) {//postea en la ruta del backend
    return this.http.post(`${base_url}/login/google`, { token }).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token)
      })
    );
  }
  cargarUsuario( desde: number = 0){
    
    const url = `${base_url}/usuarios?desde=${desde}`
    return this.http.get<ICargarUsuario>(url, this.headers).pipe(
      map(resp =>{
        const usuarios = resp.usuarios.map(user => new Usuario(user.nombre, user.email, '',  user.google, user.img, user.role,user.uid))
        return {
          total:resp.total,
          usuarios
        };
      })
    )
  }
  eliminarUsuario(usuario: Usuario){
    //console.log(usuario);
     const url = `${base_url}/usuarios/${usuario.uid}`
     return this.http.delete(url,this.headers)
  }
  
}
