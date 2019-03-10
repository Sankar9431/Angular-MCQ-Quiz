import { Component, OnInit } from '@angular/core';
import { QuizService } from '../shared/quiz.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  constructor(private quizService: QuizService) { }

  pieChartOptions = {
    responsive: true
  };

  pieChartLabels = ['Correct Answers', 'Wrong Answers'];

  pieChartColor: any = [
    {
      backgroundColor: [
        'rgba(30, 169, 224, 0.8)',
        'rgba(255,165,0,0.9)'
      ]
    }
  ];

  pieChartData: any = [
    {
      data: [this.quizService.correctAnswerCount, this.quizService.qns.length - this.quizService.correctAnswerCount ]
    }
  ];

  ngOnInit() {}

}
