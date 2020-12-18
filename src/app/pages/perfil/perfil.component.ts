import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { Usuario } from 'src/app/models/usuario.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  public perfilForm:FormGroup;
  public usuario:Usuario;
  public imagenSubir:File;
  public imgTemp:any='';

  constructor(private formBuilder:FormBuilder,
              private usuarioService:UsuarioService,
              private fileUploadService:FileUploadService,) {
    //Asignacion al puntero de la informacion
    // usuario del modelo = usuario del servicio              
    this.usuario = usuarioService.usuario;
              }

  ngOnInit(): void {
    this.perfilForm = this.formBuilder.group({
      nombre: [this.usuario.nombre, Validators.required],
      email: [this.usuario.email, [Validators.required, Validators.email]],
    });
  }
actualizarPerfil(){
  this.usuarioService.actualizarPerfil(this.perfilForm.value)
  .subscribe(()=>{
    const {nombre, email } = this.perfilForm.value;//igualan valores del formulario
    this.usuario.nombre = nombre;//asignan
    this.usuario.email = email;

    Swal.fire('Guardado', 'Cambios guardados', 'success');
  }, (err) => {
    Swal.fire('No se guardo', err.error.msg, 'error');
    
    // console.log(err.error.msg);
  })
}
cambiarImagen(file:File){
  console.log(file);  
  this.imagenSubir = file;//se establece como archivo al subirla
  if (!file) {
    return this.imgTemp = null
     }//si no existe no seguir y regresar al anterior

  const reader = new FileReader();//Converrit string a base 64
  reader.readAsDataURL(file); //comenzar la carga transformada

  reader.onloadend = ()=>{//Mostar la nueva imagen seleccionada
    this.imgTemp = reader.result;
  }
}
subirImagen(){
  this.fileUploadService.actualizarFoto(this.imagenSubir,'usuarios', this.usuario.uid)
  .then(img => {
    this.usuario.img = img;
    Swal.fire('Guardado','Imagen subida', 'success')
  }, (err) =>{
    Swal.fire('No se guardo', err.error.msg, 'error');
  });
}

}
