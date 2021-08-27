import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MainService } from '../service/main.service';

interface Acertados {
  tipo: string;
  value: string
}

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styles: [
    `
      .h1RomajiKanjiQuiz{
        font-size: 1.5em;
        background: #7a9ffa;
        width: 100%;
        height: 100%;
        padding-top: 12px; 
      }
    `
  ]
})
export class QuizComponent {

  constructor(public mainService: MainService,
    private _snackBar: MatSnackBar) { }

  modoQuiz: string = "Estudio";
  aciertos: number = 0;
  acertados: Acertados[] = [];

  hiragana = this.mainService.hiragana;
  katakana = this.mainService.katakana;
  kanji = this.mainService.kanji;



  changeMode(tipo: string): void {
    if (tipo == 'Estudio') {
      this.modoQuiz = 'Estudio';

      // order the hiragana array by the field id
      this.hiragana = this.hiragana.sort((a, b) => a.id - b.id);
      this.katakana = this.katakana.sort((a, b) => a.id - b.id);

    } else if (tipo == 'Examen') {
      this.modoQuiz = 'Examen';

      this.hiragana = this.hiragana.sort(() => {
        return 0.5 - Math.random();
      });

      this.katakana = this.katakana.sort(() => {
        return 0.5 - Math.random();
      });

    }
  }


  checkRomaji(tipo: string, solution: string, event: any): void {
    const romaji = event.target.value;

    const existe = this.acertados.filter(item => item.tipo === tipo && item.value === romaji);


    if (romaji === solution && !existe.length) {
      this.aciertos++;
      this.acertados.push({ tipo: tipo, value: solution });
      this.mainService.openSnackBar('Acertaste (^^)');

      // quit the focus from the event
      event.target.blur();

      // set the input as disabled
      event.target.disabled = true;

      // set the background color to green
      event.target.style.backgroundColor = '#78f272';
    } else {
      event.target.style.backgroundColor = '#fa6c61';
    }
  }




}
