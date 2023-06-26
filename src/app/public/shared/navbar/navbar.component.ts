import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent {

  items: MenuItem[] | undefined;

  ngOnInit() {
      this.items = [
        {
          label: 'Empresas',
          icon: 'pi pi-building',
          routerLink: '/empresas'
        },
        {
          label: 'Productos',
          icon: 'pi pi-cart-plus',
          routerLink: '/productos'
        }
      ];
  }
}
