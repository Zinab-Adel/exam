import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { MenuModule } from 'primeng/menu';
import { Profile } from '@app/api/profile/profile';
import { Breadcrumb } from "@app/core/component/breadcrumb/breadcrumb";

@Component({
  selector: 'app-feature',
  imports: [CommonModule, RouterModule, AvatarModule, MenuModule, Breadcrumb],
  templateUrl: './feature.html',
  styleUrl: './feature.css',
})
export class Feature {
  private profile = inject(Profile);
  activeItem = signal<'diplomas' | 'settings'>('diplomas');
  userData = signal<IProfile | null>(null);

  setActive(item: 'diplomas' | 'settings') {
    this.activeItem.set(item);
  }

  getUserData() {
    this.profile.getUserData().subscribe({
      next: (res) => {
        this.userData.set(res.payload);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  ngOnInit(): void {
    this.getUserData();
  }
}
