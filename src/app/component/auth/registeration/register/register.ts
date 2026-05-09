import { Component, computed, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { form, FormField } from '@angular/forms/signals';

@Component({
  selector: 'app-register',
  imports: [FormsModule, InputTextModule, ButtonModule, InputGroupModule, InputGroupAddonModule, FormField],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class RegisterComponent {
  next = output<void>();
  formData = output<any>();
  showPhoneError = signal(false);

  goNext() {
    this.next.emit();
  }

  registrationModel = signal<IRegistration>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phone: ""
  });

  registrationForm = form(this.registrationModel);

  phoneValid = computed(() => {
    const model = this.registrationModel();
    const phoneRegex = /^01[0125][0-9]{8}$/;
    return phoneRegex.test(model.phone);
  });

  submit() {
    let emailData = localStorage.getItem('email') || "";
    this.registrationModel.update(currentValue => ({
      ...currentValue, 
      email: emailData
    }));
    this.formData.emit(this.registrationForm().value());
    this.goNext();
  }
}
