import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MainService } from '../main/service/main.service';

interface Gramatica {
  particula: string;
  pronunciacion: string;
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
  gramatica: Gramatica[] = [];
  totalDatos: number = 0;
  aciertos: number = 0;
  modoQuiz: string = "Estudio";
  url: string = 'http://localhost:3030/api/getGramatica';


  miFormulario: FormGroup = this.fb.group({
    buscar: [''],
  });


  constructor(private fb: FormBuilder,
    private http: HttpClient,
    private mainService: MainService) {
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
          this.gramatica = result.filter(g => g.particula.toLowerCase().includes(buscar.toLowerCase()) || g.info.toLowerCase().includes(buscar.toLowerCase()) || g.pronunciacion.toLowerCase().includes(buscar.toLowerCase()));
        });


    } else {
      this.http.post<Gramatica[]>(this.url, '')
        .subscribe((result: Gramatica[]) => {
          this.gramatica = result;
        });
    }

  }


}
