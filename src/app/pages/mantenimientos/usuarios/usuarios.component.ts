import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  public totalUsuarios: number = 0;
  public usuarios:Usuario[] = [];
  public usuariosTmp:Usuario[] = [];
  public desde: number = 0;
  public cargando: boolean = true;

  constructor(private usuarioService: UsuarioService,
              private busquedaService:BusquedasService
    ) { }

  ngOnInit(): void {
   this.cargarUsuarios();
  }
  cargarUsuarios(){
    this.cargando = true;
    this.usuarioService.cargarUsuario(this.desde).subscribe(({total, usuarios}) => {
      this.totalUsuarios = total;
      this.usuarios = usuarios;
      this.usuariosTmp = usuarios;
      this.cargando = false;
    })
  }
  cambiarPagina(valor:number){
    this.desde += valor;
    if (this.desde < 0) {
      this.desde = 0;
    }else if(this.desde > this.totalUsuarios){
      this.desde -= valor;
    }
    this.cargarUsuarios();
  }
  buscarUsuario(termino:string){
    if (termino.length === 0) {
      return this.usuarios = this.usuariosTmp;
    }
    this.busquedaService.buscar('usuario',termino).subscribe(resp => {
      this.usuarios = resp;
    })
  }
  eliminarUsuario(usuario:Usuario){
    if (usuario.uid === this.usuarioService.uid) {
      return Swal.fire( 'Error','No puede borrar su usuario','warning')
    }

    Swal.fire({
      title: 'Are you sure?',
      text: `Borrar a ${usuario.nombre}`,
      icon: 'warning',
      showCancelButton: true, 
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.usuarioService.eliminarUsuario(usuario).subscribe( resp => {
         this.cargarUsuarios();
          Swal.fire(
            'Deleted!',
            `${usuario.nombre} borrado`,
            'success'
          )
        })
        
      }
    })
  }
  cambiarRole(usuario:Usuario){

  }

}
