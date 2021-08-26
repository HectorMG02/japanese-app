import { Component, OnInit } from '@angular/core';

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
    `
  ]
})
export class NavbarComponent implements OnInit {

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
      nombre: 'Login/registro',
      ruta: '/iniciarSesion'
    }
  ];


  constructor() { }

  ngOnInit(): void {
  }

}
