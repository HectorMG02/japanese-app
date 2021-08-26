import { Component } from '@angular/core';
import { MainService } from '../main/service/main.service';

@Component({
  selector: 'app-hiragana',
  templateUrl: './hiragana.component.html',
  styles: [
    `
 
    `
  ]
})
export class HiraganaComponent {

  constructor(public mainService: MainService) { }

  hiragana = this.mainService.hiragana;

}
