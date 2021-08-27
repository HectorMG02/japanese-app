import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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

  constructor(private fb: FormBuilder,
    public mainService: MainService) { }

  miFormulario: FormGroup = this.fb.group({
    buscar: [''],
  });

  katakana = this.mainService.katakana;

  filtro() {
    const buscar = this.miFormulario.value.buscar;

    if (buscar) {
      this.katakana = this.mainService.katakana.filter(h => h.kana.toLowerCase().includes(buscar) || h.romaji.toLocaleLowerCase().includes(buscar));
    } else {
      this.katakana = this.mainService.katakana;
    }
  }

}
