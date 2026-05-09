import { Component, inject, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputOtpModule } from 'primeng/inputotp';
import { Registration } from '../../../../api/auth/registeration/registeration';
import { email } from '@angular/forms/signals';

@Component({
  selector: 'app-otp',
  imports: [InputOtpModule, FormsModule,
    ButtonModule],
  templateUrl: './otp.html',
  styleUrl: './otp.css',
})
export class Otp {
  otpValue = signal('');
  next = output<void>();
  timeLeft = signal(60);
  timerInterval: any;
  private register = inject(Registration);

  ngOnInit() {
    this.startTimer();
    this.otpValue.set(''); 
  }

  submit() {
    let emailData = localStorage.getItem('email');
    let obj = {
      email:  emailData,
      code: this.otpValue()
    }
    this.register.sendOtpVerification(obj).subscribe({
      next: (res: any) => {
        this.goNext();
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }

  goNext() {
    this.next.emit();
  }
  
  startTimer() {
    this.timerInterval = setInterval(() => {
      if (this.timeLeft() > 0) {
        this.timeLeft.update(value => value - 1);
      } else {
        this.stopTimer();
      }
    }, 1000); 
  }

  stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  resendCode() {
    this.timeLeft.set(60); 
    this.startTimer();
  }

  ngOnDestroy() {
    this.stopTimer();
  }
}
