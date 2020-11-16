import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {//almacenar servicios utiles por otras apps
  private linkTheme = document.querySelector('#theme'); //DOM
  private link: NodeListOf<Element>;


  constructor() {
    const url = localStorage.getItem('theme') || `./assets/css/colors/green.css`;//donde se guarda
    this.linkTheme.setAttribute('href', url);//le añadimos
  }
  changeTheme(theme: string) { //metodo cambiartema Theme es igual al color
    const url = `./assets/css/colors/${theme}.css`;//dirección del tema en css cambia depende el tema
    this.linkTheme.setAttribute('href', url); //añadir un elemento al href
    localStorage.setItem('theme', url);//guardar los valores para utilizarles desúes de reinicar
    this.checkCurrentTheme();
  }
  checkCurrentTheme() {//marcar color que esta usandose
    const link = document.querySelectorAll('.selector');//toma el nombre del tema en el selector de la clase
    
    link.forEach(elem => {//recorre la lista de elementos
      elem.classList.remove('working');//quita la 'working' que define el tema elegiso
      const btnTheme = elem.getAttribute('data-theme');//obtener el color del tema
      const urlTheme = `./assets/css/colors/${btnTheme}.css`;//dirección del tema
      const currentTheme = this.linkTheme.getAttribute('href');//obtiene el href deñ dom
      if (urlTheme === currentTheme) {
        elem.classList.add('working');//valida y añade la palabra working al elegido
      }
    });
  }

}
