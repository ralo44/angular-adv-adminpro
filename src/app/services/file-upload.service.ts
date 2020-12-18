import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() { }

  async actualizarFoto(
    archivo:File,
    tipo: 'usuarios' | 'medicos' | 'hospitales',
    id: string
  ){
    try {
      const url = `${base_url}/uploads/${tipo}/${id}`
      const formData = new FormData(); //Crear data a enviar al FEtch(HAcer peticiones https)
      formData.append('imagen', archivo);//añadir datos
      
      const resp = await fetch(url, {//resp maneja los datos extraidos, indicaciones
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem('token') || ''
        },body: formData
      });

      const data = await resp.json();//desencapsular el body

      if (data.ok) {
        return data.nombreArchivo;
      } else {
        console.log(data.msg);
        return false;
      }

    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
