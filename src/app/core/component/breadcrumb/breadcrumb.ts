import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BreadcrumbService } from '@app/core/service/breadcrumb';
import { BreadcrumbModule } from 'primeng/breadcrumb';

@Component({
  selector: 'app-breadcrumb',
  imports: [BreadcrumbModule, RouterModule],
  templateUrl: './breadcrumb.html'
})
export class Breadcrumb {
  breadcrumbService = inject(BreadcrumbService);
}
