import { Component, OnInit } from '@angular/core';
import { QuizService } from '../shared/quiz.service';
import { forEach } from '@angular/router/src/utils/collection';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
review = false;

  constructor(public quizService: QuizService, private router: Router) { }

  ngOnInit() {
    this.displayTimeRemaining();
    this.quizService.qnProgress = 0;
    this.quizService.qns = [
      {
          Id: 1,
          Qn: 'Inside which HTML element do we put the JavaScript?',
          Options: [
              {
                  Id: 101,
                  QuestionId: 1,
                  Name: '<javascript>',
                  IsAnswer: false
              },
              {
                  Id: 102,
                  QuestionId: 1,
                  Name: '<js>',
                  IsAnswer: false
              },
              {
                  Id: 103,
                  QuestionId: 1,
                  Name: '<script>',
                  IsAnswer: true
              },
              {
                  Id: 104,
                  QuestionId: 1,
                  Name: '<scripting>',
                  IsAnswer: false
              }
          ],
          IsAnswered: false,
          Answer: 0
      },
      {
        Id: 2,
        Qn: 'Where is the correct place to insert a JavaScript?',
        Options: [
            {
                Id: 201,
                QuestionId: 2,
                Name: 'The <body> section',
                IsAnswer: false
            },
            {
                Id: 202,
                QuestionId: 2,
                Name: 'The <head> section',
                IsAnswer: false
            },
            {
                Id: 203,
                QuestionId: 2,
                Name: 'Both',
                IsAnswer: true
            },
            {
                Id: 204,
                QuestionId: 2,
                Name: 'None of the above',
                IsAnswer: false
            }
        ],
        IsAnswered: false,
        Answer: 0
    },
    {
      Id: 3,
      Qn: 'What is the correct syntax for referring to an external script called "xxx.js"?',
      Options: [
          {
              Id: 301,
              QuestionId: 3,
              Name: '<script name="xxx.js">',
              IsAnswer: false
          },
          {
              Id: 302,
              QuestionId: 3,
              Name: '<script href="xxx.js">',
              IsAnswer: false
          },
          {
              Id: 303,
              QuestionId: 3,
              Name: '<script src="xxx.js">',
              IsAnswer: true
          }
      ],
      IsAnswered: false,
      Answer: 0
  },
  {
    Id: 4,
    Qn: 'The external JavaScript file must contain the <script> tag.',
    Options: [
        {
            Id: 401,
            QuestionId: 4,
            Name: 'true',
            IsAnswer: false
        },
        {
            Id: 402,
            QuestionId: 4,
            Name: 'false',
            IsAnswer: true
        }
    ],
    IsAnswered: false,
    Answer: 0
 },
 {
  Id: 5,
  Qn: 'How do you write "Hello World" in an alert box?',
  Options: [
      {
          Id: 501,
          QuestionId: 5,
          Name: 'alertBox("Hello World")',
          IsAnswer: false
      },
      {
          Id: 502,
          QuestionId: 5,
          Name: 'alert("Hello World")',
          IsAnswer: true
      },
      {
          Id: 503,
          QuestionId: 5,
          Name: 'msg("Hello World")',
          IsAnswer: false
    }
  ],
  IsAnswered: false,
  Answer: 0
}
      ];
  }

  prev() {
    this.quizService.qnProgress--;
  }
  next() {
    this.quizService.qnProgress++;
  }

  displayTimeRemaining() {
    const countDownDate = new Date().getTime() + 600000;
    const x = setInterval(() => {
    const now = new Date().getTime();
    const distance = countDownDate - now;
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    if (distance < 0) {
    clearInterval(x);
    this.onSubmit();
    } else {document.getElementById('timer').innerHTML = 'Time Remaining' +  ' : '  + minutes + 'm '  + seconds + 's'; }
}, 1000);
  }

  onSelect(QnId, OpId) {
      this.quizService.qns.find(q => q.Id === QnId ).Answer = OpId;
      this.quizService.qns.find(q => q.Id === QnId ).IsAnswered = true;
  }

  onSubmit() {
    if (this.quizService.qns.every(qn => qn.IsAnswered)) {
      this.quizService.qns.forEach(qn => qn.Options.find(a => a.Id === qn.Answer).IsAnswer ? this.quizService.correctAnswerCount++ : null );
      this.router.navigateByUrl('/result');
    } else {
      this.quizService.reviewQuestions = this.quizService.qns.filter(qn => !qn.IsAnswered );
      this.review = true;
      this.quizService.qnProgress = 0;
    }
  }

}
