import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent implements OnInit {//El usuario elige el color del tema
  //Propiedades de clase

  constructor(private settingssetting: SettingsService) { }

  ngOnInit(): void {
    this.settingssetting.checkCurrentTheme();
  }
  changeTheme(theme: string) { //metodo cambiartema Theme es igual al color
    this.settingssetting.changeTheme(theme);
  }

}


