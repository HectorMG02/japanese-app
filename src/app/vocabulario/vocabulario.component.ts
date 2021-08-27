import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MainService } from '../main/service/main.service';




interface Vocabulario {
  kana: string;
  significado: string;
  categoria: string;
}

interface Datos {
  categoria: string;
  datos: Vocabulario[];
}

@Component({
  selector: 'app-vocabulario',
  templateUrl: './vocabulario.component.html',
  styles: [
    `
      .thead-dark{
        background-color: #343a40;
        color: white; 
      }

      .colVocabulario{
        border: 2px solid black;
        border-radius: 20px;
        margin-left: 5%!important;
      }

      .zonaTabla{
        height: 300px;
        max-height:300px;
        overflow-y  : auto!important;
      }
    `
  ]
})
export class VocabularioComponent {

  vocabulario!: Vocabulario[];
  categorias: string[] = [];
  datos: Datos[] = [];

  modoQuiz: string = "Estudio";
  aciertos: number = 0;
  acertados: string[] = [];
  totalDatos: number = 0;


  constructor(private fb: FormBuilder,
    private http: HttpClient,
    private mainService: MainService) {
    this.vocabulario = this.getVocabulario()
  }



  miFormulario: FormGroup = this.fb.group({
    buscar: [''],
  });

  changeMode(tipo: string): void {
    if (tipo == 'Estudio') {
      this.modoQuiz = 'Estudio';
      this.datos = [];
      this.getVocabulario();


    } else if (tipo == 'Examen') {
      this.modoQuiz = 'Examen';

      this.datos = this.datos.filter(d => d.datos.sort((a, b) => 0.5 - Math.random()).slice(0, 10));
    }
  }

  getVocabulario(): any {
    const url = 'http://localhost:3030/api/getVocabulario';

    return this.http.post<Vocabulario[]>(url, '')
      .subscribe(result => {
        const vocabulario_raw = result;


        vocabulario_raw.forEach(v => {
          if (!this.categorias.includes(v.categoria) && v.categoria) {
            this.categorias.push(v.categoria);
          }
        });


        this.categorias.forEach(c => {
          let data: any = {
            categoria: c,
            datos: vocabulario_raw.filter(v => v.categoria === c)
          }

          this.datos.push(data);
        });

        this.datos.forEach(d => {
          this.totalDatos += d.datos.length;
        })

      });
  }

  filtro() {
    const buscar = this.miFormulario.value.buscar;

    if (buscar) {
      this.datos = this.datos.filter(d => d.categoria.toLowerCase().includes(buscar.toLowerCase()) || d.datos.filter(v => v.kana.toLowerCase().includes(buscar.toLowerCase()) || v.significado.toLowerCase().includes(buscar.toLowerCase())).length > 0);
    } else {
      this.datos = [];
      this.getVocabulario();
    }

  }

  checkRomaji(significado: string, e: any) {
    const romaji = e.target.value;
    const existe = this.acertados.filter(item => item === romaji);

    if (romaji === significado && !existe.length) {
      this.aciertos++;
      this.acertados.push(significado);

      this.mainService.openSnackBar('Acertaste (^^)');

      // quit the focus from the event
      e.target.blur();

      // set the input as disabled
      e.target.disabled = true;

      // set the background color to green
      e.target.style.backgroundColor = '#78f272';
    } else {
      e.target.style.backgroundColor = '#fa6c61';
    }

  }

}
