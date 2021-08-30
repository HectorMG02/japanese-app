import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MainService } from '../main/service/main.service';

@Component({
  selector: 'app-hiragana',
  templateUrl: './hiragana.component.html',
  styles: [
  ]
})
export class HiraganaComponent {

  miFormulario: FormGroup = this.fb.group({
    buscar: [''],
  });


  constructor(private fb: FormBuilder,
    public mainService: MainService) { }


  hiragana = this.mainService.hiragana;


  filtro() {
    const buscar = this.miFormulario.value.buscar.toLowerCase();

    if (buscar) {
      this.hiragana = this.mainService.hiragana.filter(h => h.kana.toLowerCase().includes(buscar) || h.romaji.toLocaleLowerCase().includes(buscar));
    } else {
      this.hiragana = this.mainService.hiragana;
    }


  }

}
