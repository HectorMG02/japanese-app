import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuizHiraganaComponent } from './main/pages/quiz-hiragana/quiz-hiragana.component';
import { QuizKatakanaComponent } from './main/pages/quiz-katakana/quiz-katakana.component';
import { QuizKanjiComponent } from './main/pages/quiz-kanji/quiz-kanji.component';
import { SharedModule } from './shared/shared.module';
import { NavbarComponent } from './shared/navbar/navbar.component';


@NgModule({
  declarations: [
    AppComponent,
    QuizHiraganaComponent,
    QuizKatakanaComponent,
    QuizKanjiComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
