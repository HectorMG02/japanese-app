import { Component, OnInit } from '@angular/core';


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

  menuItems: string[] = ['あ Hiragana', 'ア Katakana', '日本 Kanji', 'Vocabulario', 'Gramática', 'Login/Registro'];

  constructor() { }

  ngOnInit(): void {
  }

}
