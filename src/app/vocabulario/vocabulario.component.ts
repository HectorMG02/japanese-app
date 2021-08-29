import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MainService } from '../main/service/main.service';
import { PrimeNGConfig } from 'primeng/api';


interface Vocabulario {
  kana: string;
  significado: string;
  categoria: string;
}

interface Datos {
  id: number;
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


      .zonaTabla::-webkit-scrollbar {
        -webkit-appearance: none;
      }
    
      .zonaTabla::-webkit-scrollbar:vertical {
          width:10px;
      }

      .zonaTabla::-webkit-scrollbar-button:increment,.zonaTabla::-webkit-scrollbar-button {
        display: none;
      } 
      
      .zonaTabla::-webkit-scrollbar:horizontal {
          height: 10px;
      }
      
      .zonaTabla::-webkit-scrollbar-thumb {
          background-color: #797979;
          border-radius: 20px;
          border: 2px solid #f1f2f3;
      }
      
      .zonaTabla::-webkit-scrollbar-track {
          border-radius: 10px;  
      }
    `
  ]
})
export class VocabularioComponent implements OnInit {

  adminMode: number = this.mainService.admin;

  vocabulario: Vocabulario[];
  categorias: string[] = [];
  datos: Datos[] = [];
  copiaDatos: Datos[] = [];

  modoQuiz: string = "Estudio";
  aciertos: number = 0;
  acertados: string[] = [];
  totalDatos: number = 0;


  constructor(private fb: FormBuilder,
    private http: HttpClient,
    private mainService: MainService,
    private primengConfig: PrimeNGConfig) {
    this.vocabulario = this.getVocabulario()
  }


  ngOnInit(): void {
    this.primengConfig.ripple = true; // para hacer que salgan los efectos de primeng
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
        });

        this.copiaDatos = this.datos;

      });
  }

  filtro() {
    const buscar = this.miFormulario.value.buscar;

    if (buscar) {
      this.datos = this.copiaDatos.filter(d => d.categoria.toLowerCase().includes(buscar.toLowerCase()) || d.datos.filter(v => v.kana.toLowerCase().includes(buscar.toLowerCase()) || v.significado.toLowerCase().includes(buscar.toLowerCase())).length > 0);
    } else {
      this.datos = this.copiaDatos
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


  eliminarCategoria(categoria: string) {
    this.mainService.eliminarCategoria(categoria);
    console.log(categoria);
    this.datos = this.datos.filter((d: Datos) => d.categoria !== categoria);
    this.copiaDatos = this.datos;
  }
}
