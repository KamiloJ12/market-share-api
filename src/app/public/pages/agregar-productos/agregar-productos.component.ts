import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-agregar-productos',
  templateUrl: './agregar-productos.component.html',
  styles: [
  ]
})
export class AgregarProductosComponent {
  
  miFormulario: FormGroup = this.formBuilder.group({
    // Define los campos y las validaciones
    id: [''],
    name: ['', Validators.required],
    description: ['', Validators.required],
  });;

  constructor(private formBuilder: FormBuilder, 
              private productService: ProductService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    if( this.router.url.includes('editar') ) {
      this.activatedRoute.params
        .pipe(
          switchMap( ({ id }) => this.productService.obtenerDatosPorId(id) ),
        ).subscribe( product => {
          if ( !product ) {
            return this.router.navigate(['/productos/']);
          }
          this.miFormulario.reset( product );
          return;
        });
    }  
  }

  onSubmit(): void {
    if (this.miFormulario.valid) {
      if( this.miFormulario.value.id ){
        this.productService.actualizar(this.miFormulario.value)
        .subscribe( resp => this.miFormulario.reset());
        return;  
      }
      this.productService.agregar(this.miFormulario.value)
        .subscribe( resp => this.miFormulario.reset());
    } else {
      this.miFormulario.markAllAsTouched();
    } 
  }
}
