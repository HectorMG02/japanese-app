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
    if (confirm("??Est?? seguro de que quieres eliminar esto?")) {
      this.mainService.eliminarGramatica(id); 
      this.gramatica = this.gramatica.filter(g => g.id !== id);
      this.mainService.openSnackBar('Gram??tica eliminada con ??xito (^^)');
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

 
    this.mainService.openSnackBar('Gram??tica editada con ??xito (^^)');
    this.display = false;

    setTimeout(() => {
      this.getGramatica();
    }, 500);
  }

  nuevaGramatica() {
    this.formularioGramatica.reset();
    this.textoModalGramatica = 'A??adir';
    this.display = true;
  }

  submitCrearGramatica() {

    const { particula, info, pronunciacion } = this.formularioGramatica.value;

    this.mainService.crearGramatica(particula, info, pronunciacion);

    this.mainService.openSnackBar('Gram??tica a??adida con ??xito (^^)');
    this.display = false;

    setTimeout(() => {
      this.getGramatica();
    }, 500);
  }

}
