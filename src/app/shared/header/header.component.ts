import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

declare const gapi:any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent  {

   public imgUrl = '';
  public usuario: Usuario;

  constructor(private usuarioService:UsuarioService) {
    // this.nameUrl = usuarioService.usuario.getName();
    // this.emailUrl = usuarioService.usuario.getEmail();
    this.usuario = usuarioService.usuario;

   }

  logout(){
    this.usuarioService.logout();
  }
 

}
