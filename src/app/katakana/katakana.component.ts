import { Component } from '@angular/core';
import { MainService } from '../main/service/main.service';

@Component({
  selector: 'app-katakana',
  templateUrl: './katakana.component.html',
  styles: [
    `
    
    `
  ]
})
export class KatakanaComponent {

  constructor(public mainService: MainService) { }

  katakana = this.mainService.katakana;

}
