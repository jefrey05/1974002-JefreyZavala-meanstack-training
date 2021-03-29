import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question } from './question';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http: HttpClient) { 

   }

   loadQuiz():Observable<Question[]> {
    return this.http.get<Question[]>("/assets/data.json");
  }
}
