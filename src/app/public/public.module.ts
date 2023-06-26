import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { EmpresasComponent } from './pages/empresas/empresas.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { PrimengModule } from '../primeng/primeng.module';
import { AgregarEmpresaComponent } from './pages/agregar-empresa/agregar-empresa.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AgregarProductosComponent } from './pages/agregar-productos/agregar-productos.component';
import { VerEmpresaComponent } from './pages/ver-empresa/ver-empresa.component';


@NgModule({
  declarations: [
    EmpresasComponent,
    NavbarComponent,
    ProductosComponent,
    AgregarEmpresaComponent,
    AgregarProductosComponent,
    VerEmpresaComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    PrimengModule,
    ReactiveFormsModule
  ]
})
export class PublicModule { }
