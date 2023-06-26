import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { CompanyService } from 'src/app/services/company.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-ver-empresa',
  templateUrl: './ver-empresa.component.html',
  styles: [
  ]
})
export class VerEmpresaComponent {

  company!: any;
  products!: any;
  visible: boolean = false;
  visible2: boolean = false;
  productActive: any;
  data: any;
  options: any;
  datos: any[] = [];

  miFormulario: FormGroup = this.formBuilder.group({
    // Define los campos y las validaciones
    productsId: [[], [Validators.required]],
  });

  miFormulario2: FormGroup = this.formBuilder.group({
    // Define los campos y las validaciones
    fecha: ['', [Validators.required]],
    venta: ['', [Validators.required]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private companyService: CompanyService,
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.companyService.obtenerDatosPorId(id)),
      ).subscribe(company => {
        if (!company) {
          return this.router.navigate(['/empresas/']);
        }
        this.company = company;
        return;
      });
    this.cargarDatos();

  }

  cargarGraficas(product: any): void {
    this.companyService.obtenerVentas(this.company.id, product.id)
      .subscribe( resp => this.datos = resp,
                error => alert(error));

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    const fechas = this.datos.map( resul => new Date(resul.fecha).getFullYear());
    const data = this.datos.map( result => result.venta);

    this.data = {
      labels: fechas,
      datasets: [
        {
          label: 'Ventas',
          data: data,
          fill: false,
          borderColor: documentStyle.getPropertyValue('--blue-500'),
          tension: 0.4
        }
      ]
    };

    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        y: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };
  }

  showDialog() {
    this.visible = true;
  }

  showDialog2(product: any) {
    this.visible2 = true;
    this.productActive = product;
  }

  cargarDatos() {
    this.productService.obtenerDatos()
      .subscribe(datos => this.products = datos);
  }

  onSave(): void {
    console.log(this.miFormulario.value);
    if (this.miFormulario.valid) {
      this.companyService.agregarProductos(this.company.id, this.miFormulario.value)
        .subscribe(resp => {
          this.miFormulario.reset()
          this.cargarDatos();
        });
    }
  }

  onSaveVenta(): void {
    if (this.miFormulario2.invalid) {
      return;
    }
    const data = {
      ...this.miFormulario2.value,
      companyProductId: this.productActive.company_product.id
    }

    this.companyService.registrarVenta(data)
      .subscribe(resp => {
        this.cargarDatos();
        this.miFormulario2.reset();
        this.visible2 = false;
      },
        error => alert('Ocurrio un error')
      );

    
  }

}
