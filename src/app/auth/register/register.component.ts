import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'

import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'], 
  
})
export class RegisterComponent  {
  formSubmitted = false;

  public registerForms = this.formBuilder.group({
    nombre: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    password2: ['', Validators.required],
    check: [false, Validators.required],

  },{
    validators: this.passwordsIguales('password', 'password2')
  });

  constructor(private formBuilder:FormBuilder,
              private router:Router,
              private usuarioService:UsuarioService) { }

  crearUsuario(){
    this.formSubmitted = true;
    console.log(this.registerForms.value);
    if (this.registerForms.invalid) {
      return;
    } 
    //REalizar posteo
    this.usuarioService.crearUsuario(this.registerForms.value)
       .subscribe(resp => {
        console.log('usuario creado');
        console.log(resp);
        this.router.navigateByUrl('/');
        
      }, err => {
        Swal.fire('Eror',err.error.msg, 'error')
       
      })
  }

  campoNoValido(campo:string):boolean{
    if (this.registerForms.get(campo).invalid && this.formSubmitted) {
      return true;
    }else{
      return false;
    }
  }
  aceptaTerminos(){
    return !this.registerForms.get('check').value && this.formSubmitted;
    
  }
  contrasenaNoValida(){
    const pass1 = this.registerForms.get('password').value;
    const pass2 = this.registerForms.get('password2').value;
    if ( (pass1 !== pass2) && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }
  passwordsIguales(pass1Name: string, pass2Name:string){
    return ( formGroup:FormGroup) => {
      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);
      if (pass1Control.value === pass2Control.value) {
          pass2Control.setErrors(null);
      }else{
        pass2Control.setErrors({noEsIgual: true})
      }
    }
  }
}
