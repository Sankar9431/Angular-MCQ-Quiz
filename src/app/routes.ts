import {Routes} from '@angular/router';
import {QuizComponent} from './quiz/quiz.component';
import {ResultComponent} from './result/result.component';


export const appRoutes: Routes = [
    {path: 'quiz', component: QuizComponent},
    {path: 'result', component: ResultComponent},
    {path: '', redirectTo: '/quiz', pathMatch: 'full'}
];
