import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MainService } from '../main/service/main.service';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styles: [
  ]
})
export class InicioSesionComponent {
  passwordRequiredError: boolean = false;
  miFormulario: FormGroup = this.fb.group({
    user: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });


  constructor(private fb: FormBuilder,
    private mainService: MainService,
    private router: Router) { }

  campoEsValido(campo: string) {
    return this.miFormulario.controls[campo].errors && this.miFormulario.controls[campo].touched;
  }

  loginStatus: boolean = false;

  login(): any {
    const { user, password } = this.miFormulario.value

    if (user === 'admin' && password === '123') {
      localStorage.setItem('loginAdmin', '1');
      this.loginStatus = true;
      this.mainService.admin = 1;
    } else {
      alert('Usuario o contraseña erróneos');
    }
    return;
  }


}
