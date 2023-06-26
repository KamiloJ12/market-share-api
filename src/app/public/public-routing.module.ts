import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpresasComponent } from './pages/empresas/empresas.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { AgregarEmpresaComponent } from './pages/agregar-empresa/agregar-empresa.component';
import { AgregarProductosComponent } from './pages/agregar-productos/agregar-productos.component';
import { VerEmpresaComponent } from './pages/ver-empresa/ver-empresa.component';

const routes: Routes = [
  {
    path: 'empresas',
    component: EmpresasComponent
  },
  {
    path: 'empresas/agregar',
    component: AgregarEmpresaComponent
  },
  {
    path: 'empresas/editar/:id',
    component: AgregarEmpresaComponent
  },
  {
    path: 'empresas/:id',
    component: VerEmpresaComponent
  },
  {
    path: 'productos',
    component: ProductosComponent
  },
  {
    path: 'productos/agregar',
    component: AgregarProductosComponent
  },
  {
    path: '**',
    redirectTo: 'empresas'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
