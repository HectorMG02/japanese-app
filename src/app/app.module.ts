import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { QuizComponent } from './main/quiz/quiz.component';
import { HiraganaComponent } from './hiragana/hiragana.component';
import { KatakanaComponent } from './katakana/katakana.component';
import { KanjiComponent } from './kanji/kanji.component';
import { VocabularioComponent } from './vocabulario/vocabulario.component';
import { GramaticaComponent } from './gramatica/gramatica.component';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { MenubarModule } from 'primeng/menubar';
import { FieldsetModule } from 'primeng/fieldset';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';

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
    ReactiveFormsModule,
    HttpClientModule,
    DialogModule,
    BrowserAnimationsModule,
    ButtonModule,
    CardModule,
    MenubarModule,
    FieldsetModule,
    ToolbarModule,
    TableModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
