import { Component } from '@angular/core';
import { Question } from './question';
import { QuizService } from './quiz.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Online Test Application';
  questions = [];
  givenAnswers = {};
  resultVisible = false;
  score = 0;
  constructor(private quizService: QuizService) { }

  ngOnInit() {
    var promise = this.quizService.loadQuiz().toPromise();

    promise.then(res => {
      console.log(res);
      this.questions = res;
      for(var q of this.questions){
        this.givenAnswers[q.id] = null;
      }
    });
  }

  setAnswer(question:string, answer:string){
    this.givenAnswers[question['id']] = answer;
    this.resultVisible = false;
    console.log(this.givenAnswers);
  }

  showResult(){
    this.score = 0;
    for(var q of this.questions){
      if(this.givenAnswers[q.id] == q.correct){
        this.score++;
      }
    }
    this.resultVisible = true;
  }
  
}
