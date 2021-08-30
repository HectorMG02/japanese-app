import { Component } from '@angular/core';
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
      nombre: 'Administración',
      ruta: '/iniciarSesion'
    }
  ];


  admin: number = this.mainService.admin;

  constructor(public mainService: MainService) { }


  logout() {
    localStorage.removeItem("loginAdmin");

    return location.href = '/iniciarSesion'
  }

}
