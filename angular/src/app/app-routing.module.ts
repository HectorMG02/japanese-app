import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GramaticaComponent } from './gramatica/gramatica.component';
import { HiraganaComponent } from './hiragana/hiragana.component';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { KanjiComponent } from './kanji/kanji.component';
import { KatakanaComponent } from './katakana/katakana.component';
import { QuizComponent } from './main/quiz/quiz.component';
import { VocabularioComponent } from './vocabulario/vocabulario.component';

const routes: Routes = [
  { path: '', component: QuizComponent },
  { path: 'hiragana', component: HiraganaComponent },
  { path: 'katakana', component: KatakanaComponent },
  { path: 'kanji', component: KanjiComponent },
  { path: 'vocabulario', component: VocabularioComponent },
  { path: 'gramatica', component: GramaticaComponent },
  { path: 'iniciarSesion', component: InicioSesionComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
