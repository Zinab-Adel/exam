import { Component, inject, signal } from '@angular/core';
import { Authentication } from '../../../api/auth/login/authentication';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, InputTextModule, PasswordModule],
  templateUrl: './login.html'
})
export class LoginComponent {
  private auth = inject(Authentication);
  username = signal('');
  password = signal('');
  showPassword = signal(false);
  loading = signal(false);

  togglePassword() {
    this.showPassword.update(v => !v);
  }

  onLogin() {
    this.loading.set(true);

    this.auth.login({
      username: this.username(),
      password: this.password()
    }).subscribe({
      next: (res) => {
        const token = res.payload.token;
        localStorage.setItem('token', token);
        this.loading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.loading.set(false);
      }
    });
  }
}
