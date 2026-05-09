import { Routes } from '@angular/router';
import { LoginComponent } from './component/auth/login/login';
import { AuthComponent } from './component/auth/auth';
import { Registeration } from './component/auth/registeration/registeration';
import { EmailVerification } from './component/auth/registeration/email-verification/email-verification';
import { Feature } from './component/feature/feature';
import { Diploma } from './component/feature/diploma/diploma';
import { Exam } from './component/feature/diploma/exam/exam';

export const routes: Routes = [
    {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: Registeration
      },
      {
        path: 'email-ver',
        component: EmailVerification
      }
    ]
  },
  {
    path: 'home',
    component: Feature,
    children: [
      {
        path: 'diploma',
        component: Diploma,
        data: { breadcrumb: 'Diplomas' }
      },
      {
        path: 'exam/:id',
        component: Exam,
        data: { breadcrumb: 'Frontend Development Exams' }
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'auth/login'
  }
];
