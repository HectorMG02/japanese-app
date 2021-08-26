import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { QuizComponent } from './main/quiz/quiz.component';
import { HiraganaComponent } from './hiragana/hiragana.component';
import { KatakanaComponent } from './katakana/katakana.component';
import { KanjiComponent } from './kanji/kanji.component';
import { VocabularioComponent } from './vocabulario/vocabulario.component';
import { GramaticaComponent } from './gramatica/gramatica.component';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    QuizComponent,
    HiraganaComponent,
    KatakanaComponent,
    KanjiComponent,
    VocabularioComponent,
    GramaticaComponent,
    InicioSesionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
