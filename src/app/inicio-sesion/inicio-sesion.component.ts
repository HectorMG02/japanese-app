import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    private mainService: MainService) { }

  campoEsValido(campo: string) {
    return this.miFormulario.controls[campo].errors && this.miFormulario.controls[campo].touched;
  }

  login(): any {
    const { user, password } = this.miFormulario.value

    if (user === 'admin' && password === '123') {
      localStorage.setItem('loginAdmin', '1');
      return location.href = '/hiragana'
    } else {
      alert('Usuario o contraseña erróneos');
    }

  }


}
