import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styles: [
  ]
})
export class ProductosComponent {

  products!: any[];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.obtenerDatos()
      .subscribe( datos => this.products = datos );
  }
}
