import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MainService } from '../main/service/main.service';

interface Gramatica {
  id: number;
  particula: string;
  pronunciacion?: string;
  info: string;
}

@Component({
  selector: 'app-gramatica',
  templateUrl: './gramatica.component.html',
  styles: [
    `
    .hrInfo{
      margin-top: -25px; 
    }

    .example-accordion {
      display: block;
      max-width: 500px;
      background-color: #f5f5f5; 
      border: 0px; 
      outline: none;
    }
    
    .example-accordion-item {
      display: block;
      border: solid 1px #ccc;
    }
    
 
    
    .example-accordion-item-header {
      display: flex;
      align-content: center;
      justify-content: space-between;  
    }
    
    .example-accordion-item-description {
      font-size: 0.85em;
      color: #999;
    }
    
    .example-accordion-item-header,
    .example-accordion-item-body {
      padding: 16px;
    }
    
    .example-accordion-item-header:hover {
      cursor: pointer; 
    }
    
  
    `
  ]
})
export class GramaticaComponent {
  adminMode: number = this.mainService.admin;

  gramatica: Gramatica[] = [];
  totalDatos: number = 0;
  aciertos: number = 0;
  modoQuiz: string = "Estudio";
  
  url: string = this.mainService.url + '/getGramatica'; 

  display: boolean = false;
  textoModalGramatica: string = "";


  miFormulario: FormGroup = this.fb.group({
    buscar: [''],
  });


  formularioGramatica: FormGroup = this.fb.group({
    id: [''],
    particula: ['', [Validators.required]],
    info: ['', [Validators.required]],
    pronunciacion: ['']
  })

  constructor(private fb: FormBuilder,
    private http: HttpClient,
    public mainService: MainService) {
    this.gramatica = this.getGramatica();
  }





  getGramatica(): any {
    return this.http.post<Gramatica[]>(this.url, '')
      .subscribe((result: Gramatica[]) => {
        this.gramatica = result;
      });
  }




  filtro() {
    const buscar = this.miFormulario.value.buscar;

    if (buscar) {

      this.http.post<Gramatica[]>(this.url, '')
        .subscribe((result: Gramatica[]) => {
          this.gramatica = result.filter(g => g.particula.toLowerCase().includes(buscar.toLowerCase()) || g.info.toLowerCase().includes(buscar.toLowerCase()) || g.pronunciacion?.toLowerCase().includes(buscar.toLowerCase()));
        });


    } else {
      this.http.post<Gramatica[]>(this.url, '')
        .subscribe((result: Gramatica[]) => {
          this.gramatica = result;
        });
    }

  }




  eliminarGramatica(g: Gramatica) {
    const { id } = g;
    if (confirm("¿Está seguro de que quieres eliminar esto?")) {
      this.mainService.eliminarGramatica(id); 
      this.gramatica = this.gramatica.filter(g => g.id !== id);
      this.mainService.openSnackBar('Gramática eliminada con éxito (^^)');
    }
  }


  editarGramatica(g: Gramatica) {
    const { id, particula, info, pronunciacion } = g;

    this.formularioGramatica.setValue({
      id,
      particula,
      info,
      pronunciacion
    });

    this.textoModalGramatica = 'Editar';
    this.display = true;
  }

  submitEditarGramatica() {
    const { id, particula, info, pronunciacion } = this.formularioGramatica.value;

    this.mainService.editarGramatica(id, particula, info, pronunciacion);

    this.gramatica = this.gramatica.map(g => {
      if (g.id === id) {
        g.particula = particula;
        g.info = info;
        g.pronunciacion = pronunciacion;
      }
      return g;
    });


    this.mainService.openSnackBar('Gramática editada con éxito (^^)');
    this.display = false;
  }

  nuevaGramatica() {
    this.formularioGramatica.reset();
    this.textoModalGramatica = 'Añadir';
    this.display = true;
  }

  submitCrearGramatica() {

    const { particula, info, pronunciacion } = this.formularioGramatica.value;

    this.mainService.crearGramatica(particula, info, pronunciacion);

    this.gramatica.unshift({
      id: this.gramatica.length + 1,
      particula,
      pronunciacion,
      info
    });

    this.mainService.openSnackBar('Gramática añadida con éxito (^^)');
    this.display = false;

  }

}
