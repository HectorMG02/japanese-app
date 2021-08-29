import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MainService } from '../main/service/main.service';
import { PrimeNGConfig } from 'primeng/api';
import { MatSnackBar } from '@angular/material/snack-bar';


interface Vocabulario {
  id: number;
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

  display: boolean = false;
  displayNuevoVoc: boolean = false;
  categoriaEd: string = "";

  textoModalVoc: string = "";
  textoModalCat: string = "";
  categoriaSeleccionada: string = "";

  constructor(private fb: FormBuilder,
    private http: HttpClient,
    private mainService: MainService,
    private primengConfig: PrimeNGConfig,
    private _snackBar: MatSnackBar) {
    this.vocabulario = this.getVocabulario()
  }


  ngOnInit(): void {
    this.primengConfig.ripple = true; // para hacer que salgan los efectos de primeng
  }

  miFormulario: FormGroup = this.fb.group({
    buscar: [''],
  });


  formularioCategoria: FormGroup = this.fb.group({
    nombre: ['', [Validators.required]]
  });

  formNuevoVoc: FormGroup = this.fb.group({
    id: [],
    kana: ['', [Validators.required]],
    significado: ['', [Validators.required]],
    categoria: ['-1', [Validators.required, Validators.min(0)]],
  })

  changeMode(tipo: string): void {
    if (tipo == 'Estudio') {
      this.modoQuiz = 'Estudio';
      this.datos = [];
      this.getVocabulario();


    } else if (tipo == 'Examen') {
      this.modoQuiz = 'Examen';

      this.datos = this.datos.filter(d => d.datos?.sort((a, b) => 0.5 - Math.random()).slice(0, 10));
    }
  }

  getVocabulario(): any {
    this.datos = [];
    this.copiaDatos = [];
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

        // delete duplicated elements from this.datos.datos array
        this.datos.forEach(d => {
          d.datos = d.datos.filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i);
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
    if (confirm(`¿Estás seguro de que quieres eliminar esta categoría? perderás todo el vocabulario asociado a la categoría: ${categoria}`)) {
      this.mainService.eliminarCategoria(categoria);
      this.datos = this.datos.filter((d: Datos) => d.categoria !== categoria);
      this.copiaDatos = this.datos;

      this.mainService.openSnackBar('Categoría eliminada con éxito (^^)');
    }
  }

  editarCategoria(categoria: string) {
    this.textoModalCat = 'Editar Categoría';
    this.categoriaEd = categoria;
    this.formularioCategoria.get('nombre')?.setValue(categoria);
    this.display = true;
  }

  submitEditarCategoria() {
    const nombreCategoriaOld = this.categoriaEd;
    const newName = this.formularioCategoria.get('nombre')?.value;

    this.mainService.editCategoria(nombreCategoriaOld, newName);

    this.datos = this.datos.map(v => {
      if (v.categoria === nombreCategoriaOld) {
        v.categoria = newName;
      }
      return v;
    });

    this.copiaDatos = this.datos;
    this.mainService.openSnackBar('Categoría modificada con éxito (^^)');
    this.display = false;
  }

  nuevoVocab(categoria: string) {
    this.formNuevoVoc.reset();
    this.textoModalVoc = "Añadir Vocabulario"
    this.displayNuevoVoc = true;
    this.formNuevoVoc.get('categoria')?.setValue(categoria);
  }

  submitNuevoVoc() {
    const { kana, significado, categoria } = this.formNuevoVoc.value;

    this.mainService.nuevoVocab({ kana: kana, significado: significado, categoria: categoria });
    let totalDatos = 0;

    this.datos.forEach((d: Datos) => {
      totalDatos += d.datos.length;
    });


    this.datos.map((d: Datos) => {
      if (d.categoria === categoria) {
        d.datos.unshift({
          id: totalDatos + 1,
          kana: kana,
          significado: significado,
          categoria: categoria
        });
      }
      return d;
    });

    this.copiaDatos = this.datos;

    this.mainService.openSnackBar('Vocabulario añadido con éxito (^^)');
    this.displayNuevoVoc = false;
  }


  eliminarVocab(id: number, kana: string) {
    if (confirm(`¿Estás seguro de que quieres eliminar este vocabulario: ${kana}?`)) {
      this.mainService.eliminarVocab(id);

      this.datos = this.datos.map((d: Datos) => {
        d.datos = d.datos.filter((v: Vocabulario) => v.id !== id);
        return d;
      });

      this.copiaDatos = this.datos;
      this.mainService.openSnackBar('Vocabulario eliminado con éxito (^^)');
    }
  }


  editarVocab(v: Vocabulario) {
    this.textoModalVoc = 'Editar Vocabulario';
    this.displayNuevoVoc = true;

    this.formNuevoVoc.get('id')?.setValue(v.id);
    this.formNuevoVoc.get('kana')?.setValue(v.kana);
    this.formNuevoVoc.get('significado')?.setValue(v.significado);
    this.formNuevoVoc.get('categoria')?.setValue(v.categoria);
  }

  submitEdVoc() {
    const { id, kana, significado, categoria } = this.formNuevoVoc.value;

    this.mainService.editarVocab(id, kana, significado, categoria);

    this.datos.forEach((d: Datos) => {
      d.datos = d.datos.map((v: Vocabulario) => {
        if (v.id === id && v.categoria != categoria) {
          location.reload();
        }
        return v;
      });
    });

    //location.reload();
    this.mainService.openSnackBar('Vocabulario editado con éxito (^^)');
    this.displayNuevoVoc = false;
  }


  nuevaCategoria() {
    this.formularioCategoria.reset();
    this.display = true;
    this.textoModalCat = "Añadir Categoría";
  }


  submitCrearCategoria() {
    const nombreCategoria = this.formularioCategoria.get('nombre')?.value;

    this.mainService.nuevaCategoria(nombreCategoria);

    this.datos.unshift({
      id: this.datos.length + 1,
      categoria: nombreCategoria,
      datos: []
    });

    this.copiaDatos = this.datos;
    this.mainService.openSnackBar('Categoría creada con éxito (^^)');
    this.display = false;
  }
}
