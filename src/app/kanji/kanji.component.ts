import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MainService } from '../main/service/main.service';

@Component({
  selector: 'app-kanji',
  templateUrl: './kanji.component.html',
  styles: [
    `
     
    `
  ]
})
export class KanjiComponent {

  kanji = this.mainService.kanji;

  miFormulario: FormGroup = this.fb.group({
    buscar: [''],
  });

  adminMode = this.mainService.admin;


  constructor(private fb: FormBuilder,
    public mainService: MainService) { }



  filtro() {
    const buscar = this.miFormulario.value.buscar;
    console.log(buscar, this.kanji);
    if (buscar) {
      //this.kanji = this.mainService.kanji.filter(h => h.kana.toLowerCase().includes(buscar) || h.romaji.toLocaleLowerCase().includes(buscar) || h.significado?.toLocaleLowerCase().includes(buscar));
    } else {
      this.kanji = this.mainService.kanji;
    }
  }


  deleteKanji(item: any) {
    if (confirm(`¿Estás seguro de que quieres eliminar el kanji: ${item.kana}`)) {
      return
    }

  }

}


