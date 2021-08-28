import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';

interface Kana {
  id: number;
  kana: string;
  romaji: string;
  significado?: string;
}



@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private http: HttpClient,
    private _snackBar: MatSnackBar) {

    this.http.post<any[]>(`${this.url}/getKanjis`, '')
      .subscribe(result => {
        result.forEach(r => this.kanji.push(r));
      });

  }

  login_status: number = 0;
  admin: number = localStorage.getItem('loginAdmin') ? 1 : 0;
  url: string = 'http://localhost:3030/api';

  hiragana: Kana[] = [
    { id: 1, kana: 'あ', romaji: 'a' },
    { id: 2, kana: 'い', romaji: 'i' },
    { id: 3, kana: 'う', romaji: 'u' },
    { id: 4, kana: 'え', romaji: 'e' },
    { id: 5, kana: 'お', romaji: 'o' },
    { id: 6, kana: 'か', romaji: 'ka' },
    { id: 7, kana: 'き', romaji: 'ki' },
    { id: 8, kana: 'く', romaji: 'ku' },
    { id: 9, kana: 'け', romaji: 'ke' },
    { id: 10, kana: 'こ', romaji: 'ko' },
    { id: 11, kana: 'さ', romaji: 'sa' },
    { id: 12, kana: 'し', romaji: 'shi' },
    { id: 13, kana: 'す', romaji: 'su' },
    { id: 14, kana: 'せ', romaji: 'se' },
    { id: 15, kana: 'そ', romaji: 'so' },
    { id: 16, kana: 'た', romaji: 'ta' },
    { id: 17, kana: 'ち', romaji: 'chi' },
    { id: 18, kana: 'つ', romaji: 'tsu' },
    { id: 19, kana: 'て', romaji: 'te' },
    { id: 20, kana: 'と', romaji: 'to' },
    { id: 21, kana: 'な', romaji: 'na' },
    { id: 22, kana: 'に', romaji: 'ni' },
    { id: 23, kana: 'ぬ', romaji: 'nu' },
    { id: 24, kana: 'ね', romaji: 'ne' },
    { id: 25, kana: 'の', romaji: 'no' },
    { id: 26, kana: 'は', romaji: 'ha' },
    { id: 27, kana: 'ひ', romaji: 'hi' },
    { id: 28, kana: 'ふ', romaji: 'fu' },
    { id: 29, kana: 'へ', romaji: 'he' },
    { id: 30, kana: 'ほ', romaji: 'ho' },
    { id: 31, kana: 'ま', romaji: 'ma' },
    { id: 32, kana: 'み', romaji: 'mi' },
    { id: 33, kana: 'む', romaji: 'mu' },
    { id: 34, kana: 'め', romaji: 'me' },
    { id: 35, kana: 'も', romaji: 'mo' },
    { id: 36, kana: 'や', romaji: 'ya' },
    { id: 37, kana: 'ゆ', romaji: 'yu' },
    { id: 38, kana: 'よ', romaji: 'yo' },
    { id: 39, kana: 'ら', romaji: 'ra' },
    { id: 40, kana: 'り', romaji: 'ri' },
    { id: 41, kana: 'る', romaji: 'ru' },
    { id: 42, kana: 'れ', romaji: 're' },
    { id: 43, kana: 'ろ', romaji: 'ro' },
    { id: 44, kana: 'わ', romaji: 'wa' },
    { id: 45, kana: 'を', romaji: 'wo' },
    { id: 46, kana: 'ん', romaji: 'n' },
    { id: 47, kana: 'が', romaji: 'ga' },
    { id: 48, kana: 'ぎ', romaji: 'gi' },
    { id: 49, kana: 'ぐ', romaji: 'gu' },
    { id: 50, kana: 'げ', romaji: 'ge' },
    { id: 51, kana: 'ご', romaji: 'go' },
    { id: 52, kana: 'ざ', romaji: 'za' },
    { id: 53, kana: 'じ', romaji: 'ji' },
    { id: 54, kana: 'ず', romaji: 'zu' },
    { id: 55, kana: 'ぜ', romaji: 'ze' },
    { id: 56, kana: 'ぞ', romaji: 'zo' },
    { id: 57, kana: 'だ', romaji: 'da' },
    { id: 58, kana: 'ぢ', romaji: 'ji' },
    { id: 59, kana: 'づ', romaji: 'zu' },
    { id: 60, kana: 'で', romaji: 'de' },
    { id: 61, kana: 'ど', romaji: 'do' },
    { id: 62, kana: 'ば', romaji: 'ba' },
    { id: 63, kana: 'び', romaji: 'bi' },
    { id: 64, kana: 'ぶ', romaji: 'bu' },
    { id: 65, kana: 'べ', romaji: 'be' },
    { id: 66, kana: 'ぼ', romaji: 'bo' },
    { id: 67, kana: 'ぱ', romaji: 'pa' },
    { id: 68, kana: 'ぴ', romaji: 'pi' },
    { id: 69, kana: 'ぷ', romaji: 'pu' },
    { id: 70, kana: 'ぺ', romaji: 'pe' },
    { id: 71, kana: 'ぽ', romaji: 'po' },
  ];

  katakana: Kana[] = [
    { id: 1, kana: 'ア', romaji: 'a' },
    { id: 2, kana: 'イ', romaji: 'i' },
    { id: 3, kana: 'ウ', romaji: 'u' },
    { id: 4, kana: 'エ', romaji: 'e' },
    { id: 5, kana: 'オ', romaji: 'o' },
    { id: 6, kana: 'カ', romaji: 'ka' },
    { id: 7, kana: 'キ', romaji: 'ki' },
    { id: 8, kana: 'ク', romaji: 'ku' },
    { id: 9, kana: 'ケ', romaji: 'ke' },
    { id: 10, kana: 'コ', romaji: 'ko' },
    { id: 11, kana: 'サ', romaji: 'sa' },
    { id: 12, kana: 'シ', romaji: 'shi' },
    { id: 13, kana: 'ス', romaji: 'su' },
    { id: 14, kana: 'セ', romaji: 'se' },
    { id: 15, kana: 'ソ', romaji: 'so' },
    { id: 16, kana: 'タ', romaji: 'ta' },
    { id: 17, kana: 'チ', romaji: 'chi' },
    { id: 18, kana: 'ツ', romaji: 'tsu' },
    { id: 19, kana: 'テ', romaji: 'te' },
    { id: 20, kana: 'ト', romaji: 'to' },
    { id: 21, kana: 'ナ', romaji: 'na' },
    { id: 22, kana: 'ニ', romaji: 'ni' },
    { id: 23, kana: 'ヌ', romaji: 'nu' },
    { id: 24, kana: 'ネ', romaji: 'ne' },
    { id: 25, kana: 'ノ', romaji: 'no' },
    { id: 26, kana: 'ハ', romaji: 'ha' },
    { id: 27, kana: 'ヒ', romaji: 'hi' },
    { id: 28, kana: 'フ', romaji: 'fu' },
    { id: 29, kana: 'ヘ', romaji: 'he' },
    { id: 30, kana: 'ホ', romaji: 'ho' },
    { id: 31, kana: 'マ', romaji: 'ma' },
    { id: 32, kana: 'ミ', romaji: 'mi' },
    { id: 33, kana: 'ム', romaji: 'mu' },
    { id: 34, kana: 'メ', romaji: 'me' },
    { id: 35, kana: 'モ', romaji: 'mo' },
    { id: 36, kana: 'ヤ', romaji: 'ya' },
    { id: 37, kana: 'ユ', romaji: 'yu' },
    { id: 38, kana: 'ヨ', romaji: 'yo' },
    { id: 39, kana: 'ラ', romaji: 'ra' },
    { id: 40, kana: 'リ', romaji: 'ri' },
    { id: 41, kana: 'ル', romaji: 'ru' },
    { id: 42, kana: 'レ', romaji: 're' },
    { id: 43, kana: 'ロ', romaji: 'ro' },
    { id: 44, kana: 'ワ', romaji: 'wa' },
    { id: 45, kana: 'ヲ', romaji: 'wo' },
    { id: 46, kana: 'ン', romaji: 'n' },
    { id: 47, kana: 'ガ', romaji: 'ga' },
    { id: 48, kana: 'ギ', romaji: 'gi' },
    { id: 49, kana: 'グ', romaji: 'gu' },
    { id: 50, kana: 'ゲ', romaji: 'ge' },
    { id: 51, kana: 'ゴ', romaji: 'go' },
    { id: 52, kana: 'ザ', romaji: 'za' },
    { id: 53, kana: 'ジ', romaji: 'ji' },
    { id: 54, kana: 'ズ', romaji: 'zu' },
    { id: 55, kana: 'ゼ', romaji: 'ze' },
    { id: 56, kana: 'ゾ', romaji: 'zo' },
    { id: 57, kana: 'ダ', romaji: 'da' },
    { id: 58, kana: 'ヂ', romaji: 'ji' },
    { id: 59, kana: 'ヅ', romaji: 'zu' },
    { id: 60, kana: 'デ', romaji: 'de' },
    { id: 61, kana: 'ド', romaji: 'do' },
    { id: 62, kana: 'バ', romaji: 'ba' },
    { id: 63, kana: 'ビ', romaji: 'bi' },
    { id: 64, kana: 'ブ', romaji: 'bu' },
    { id: 65, kana: 'ベ', romaji: 'be' },
    { id: 66, kana: 'ボ', romaji: 'bo' },
    { id: 67, kana: 'パ', romaji: 'pa' },
    { id: 68, kana: 'ピ', romaji: 'pi' },
    { id: 69, kana: 'プ', romaji: 'pu' },
    { id: 70, kana: 'ペ', romaji: 'pe' },
    { id: 71, kana: 'ポ', romaji: 'po' },
  ];

  kanji: any = [];



  openSnackBar(message: string) {
    this._snackBar.open(message);
    setTimeout(() => {
      this._snackBar.dismiss();
    }, 1500);
  }

  login(user: string, password: string) {

    const data = {
      user: user,
      password: password,
    };



    this.http.post<any[]>(`${this.url}/loginAdmin`, data)
      .subscribe(result => {
        this.login_status = Number(result);
      });

    return this.login_status;
  }

  deleteKanji(item: Kana) {
    this.http.post(`${this.url}/deleteKanji/`, item)
      .subscribe((result: any) => {
        this.kanji = [];
        result.forEach((r: any) => this.kanji.push(r));
      });
  }


  crearKanji(value: any) {
    this.http.post(`${this.url}/createKanji/`, value)
      .subscribe((result: any) => {
        this.kanji = [];
        result.forEach((r: any) => this.kanji.push(r));
      });
  }


  editarKanji(value: any) {
    this.http.post(`${this.url}/editKanji/`, value)
      .subscribe((result: any) => {
        this.kanji = [];
        result.forEach((r: any) => this.kanji.push(r));
      });
  }

}
