import { Injectable, signal } from '@angular/core';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { filter } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BreadcrumbService {
  breadcrumbs = signal<MenuItem[]>([]);

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const root = this.router.routerState.snapshot.root;
      const breadcrumbs: MenuItem[] = [];
      this.addBreadcrumb(root, [], breadcrumbs);
      this.breadcrumbs.set(breadcrumbs);
    });
  }

  private addBreadcrumb(route: ActivatedRouteSnapshot, parentUrl: string[], breadcrumbs: MenuItem[]) {
    const routeUrl = parentUrl.concat(route.url.map(url => url.path));
    const breadcrumb = route.data['breadcrumb'];

    if (breadcrumb) {
      breadcrumbs.push({
        label: breadcrumb,
        routerLink: '/' + routeUrl.join('/')
      });
    }

    if (route.firstChild) {
      this.addBreadcrumb(route.firstChild, routeUrl, breadcrumbs);
    }
  }
}