import { Component, signal } from '@angular/core';
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { FormsModule } from '@angular/forms';
import { EmailVerification } from "./email-verification/email-verification";
import { Otp } from "./otp/otp";
import { RegisterComponent } from "./register/register";
import { ConfirmPassword } from './confirm-password/confirm-password';

@Component({
  selector: 'app-registeration',
  imports: [
    StepperModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    FormsModule,
    EmailVerification,
    Otp,
    RegisterComponent,
    ConfirmPassword
],
  templateUrl: './registeration.html',
  styleUrl: './registeration.css',
})
export class Registeration {
  name = '';
  activeStep = signal(1);
  userData = signal<any>(null);

  nextStep() {
    this.activeStep.update(v => v + 1);
  }

  getRegisterObj(obj: any) {
    this.userData.set(obj); 
    this.nextStep();
  }

}
