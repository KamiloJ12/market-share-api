import { Component } from '@angular/core';
import { CompanyService } from '../../../services/company.service';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styles: [
  ]
})
export class EmpresasComponent {

  companies!: any[];

  constructor(private companyService: CompanyService) { }

  ngOnInit(): void {
    this.companyService.obtenerDatos()
      .subscribe( datos => this.companies = datos,
                  error => console.error );
  }
}
