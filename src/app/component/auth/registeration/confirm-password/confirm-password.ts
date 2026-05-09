import { Component, computed, inject, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Registration } from '@app/api/auth/registeration/registeration';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-confirm-password',
  imports: [ButtonModule, InputTextModule, FormsModule, FormsModule, PasswordModule],
  templateUrl: './confirm-password.html',
  styleUrl: './confirm-password.css',
})
export class ConfirmPassword {
  private register = inject(Registration);
  password = signal('');
  confirmPassword = signal('');
  next = output<void>();
  userData = input.required<any>();
  showPasswordError = signal(false);
  showConfirmPasswordError = signal(false);
  private router = inject(Router);

  passwordValid = computed(() => {
    const value = this.password();
    const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>_\-+=\/\\[\];'`~]).{8,}$/;
    return regex.test(value);
  });

  passwordMatch = computed(() => {
    return this.password() === this.confirmPassword();
  });

  goNext() {
    this.next.emit();
  }

  submit() {
      const finalData = {
        ...this.userData(),
        password: this.password(),
        confirmPassword: this.confirmPassword()
      };
      console.log("this.userData()", finalData)

    if (this.password() && this.password() === this.confirmPassword()) {
        this.register.registeration(finalData).subscribe({
          next: (res: any) => {
            this.router.navigate(['/auth/login']);
          },
          error: (err: any) => {
            console.error(err);
          }
        });
    } else {
      console.log('كلمات المرور غير متطابقة!');
    }
  }
}
