import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2'


//       fernand2o@gmail.com
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'
  ]
})
export class LoginComponent implements OnInit {
  public formSubmitted = false;
  public auth2: any;


  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private usuarioService: UsuarioService,
              private ngZone:NgZone
              ) { }

  public loginForms = this.formBuilder.group({// agrupa las interfaces
    email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    remember: [false],
  });

  login() {//llama al servicio de usuarios
    // console.log(this.loginForms.value);
    this.usuarioService.login(this.loginForms.value)
    .subscribe(resp => {
      if (this.loginForms.get('remember').value) {
        localStorage.setItem('email', this.loginForms.get('email').value);        
      } else {
        localStorage.removeItem('email');
      }

      this.router.navigateByUrl('/')// la resp permite entrar

    }, (err) => {
      console.log(err.error.msg);

      Swal.fire('Eror', err.error.msg, 'error')
    })

  }

  // 

  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
    });
    this.startApp();
  }

  async startApp() {
      await this.usuarioService.googleInit();
      this.auth2 = this.usuarioService.auth2;
      
      this.attachSignin(document.getElementById('my-signin2'));
  };

  attachSignin(element) {
    console.log(element.id);
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {
        const id_token = googleUser.getAuthResponse().id_token;
        this.usuarioService.loginGoogle(id_token).subscribe(resp =>  { 
                                    this.ngZone.run(()=>{
                                      this.router.navigateByUrl('/')//NAvegar al dashboars
                                    })
        });
        

      }, (error) => {
        alert(JSON.stringify(error, undefined, 2));
      });
  }

  ngOnInit(): void {
    this.renderButton();
  }

}
