import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanyService } from '../../../services/company.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-agregar-empresa',
  templateUrl: './agregar-empresa.component.html',
  styles: [
  ]
})
export class AgregarEmpresaComponent {

  miFormulario: FormGroup = this.formBuilder.group({
    // Define los campos y las validaciones
    id: [''],
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    description: ['', Validators.required],
    address: ['', Validators.required],
  });;

  constructor(private formBuilder: FormBuilder, 
              private companyService: CompanyService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    if( this.router.url.includes('editar') ) {
      this.activatedRoute.params
        .pipe(
          switchMap( ({ id }) => this.companyService.obtenerDatosPorId(id) ),
        ).subscribe( company => {
          if ( !company ) {
            return this.router.navigate(['/empresas/']);
          }
          this.miFormulario.reset( company );
          return;
        });
    }  
  }

  onSubmit(): void {
    if (this.miFormulario.valid) {
      if( this.miFormulario.value.id ){
        this.companyService.actualizar(this.miFormulario.value)
        .subscribe( resp => this.miFormulario.reset());
        return;  
      }
      this.companyService.agregar(this.miFormulario.value)
        .subscribe( resp => this.miFormulario.reset());
    } else {
      this.miFormulario.markAllAsTouched();
    }
  }
}
