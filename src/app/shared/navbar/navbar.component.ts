import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from 'src/app/main/service/main.service';

interface MenuItems {
  nombre: string;
  ruta: string;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
    `
    .example-spacer {
      flex: 1 1 auto;
    }

    .admin_movil{
      margin-right: 5px!important;
    }

    .adminPc{
      margin-top: 4px;
      position: absolute;
      left: 0;
    }

    .adminMovil{
      margin-right: -1px!important;
    }
    `
  ]
})
export class NavbarComponent {


  admin: number = this.mainService.admin;

  nombreAdmin: string = this.admin != 1 ? "Administración" : "Cerrar sesión"

  menuItems: MenuItems[] = [
    {
      nombre: 'あ Hiragana',
      ruta: '/hiragana'
    },
    {
      nombre: 'ア Katakana',
      ruta: '/katakana'
    },
    {
      nombre: '日本 Kanji',
      ruta: '/kanji'
    },
    {
      nombre: 'Vocabulario',
      ruta: '/vocabulario'
    },
    {
      nombre: 'Gramática',
      ruta: '/gramatica'
    },
    {
      nombre: this.nombreAdmin,
      ruta: '/iniciarSesion'
    }
  ];



  constructor(public mainService: MainService,
    private router: Router) { }


 
  logout() {
    localStorage.removeItem("loginAdmin");
    this.admin = 0;
    this.mainService.admin = 0;
    this.nombreAdmin = 'Administración';
  }

}
