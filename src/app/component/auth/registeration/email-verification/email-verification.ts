import { Component, EventEmitter, inject, Output, output, signal } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { StepsModule } from 'primeng/steps';
import { InputMaskModule } from 'primeng/inputmask';
import { form, FormField } from '@angular/forms/signals';
import { Registration } from '../../../../api/auth/registeration/registeration';

@Component({
  selector: 'app-email-verification',
  imports: [FormField, CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    StepsModule,
    FormsModule,
    InputMaskModule],
  templateUrl: './email-verification.html',
  styleUrl: './email-verification.css',
})
export class EmailVerification {
  private register = inject(Registration);

  emailValidationModel = signal<IEmailVerification>({
    email: ''
  });

  emailValidationForm = form(this.emailValidationModel);

  submit() {
    localStorage.setItem('email', this.emailValidationForm().value().email);
    this.register.sendEmailVerification(this.emailValidationForm().value()).subscribe({
      next: (res: any) => {
        this.goNext();
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }

  next = output<void>();

  goNext() {
    this.next.emit();
  }

}
