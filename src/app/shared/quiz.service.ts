import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
qns: any = [];
reviewQuestions: any = [];
qnProgress: number;
correctAnswerCount = 0;
  constructor() { }
}
