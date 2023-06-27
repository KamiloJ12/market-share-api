import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) { }

  obtenerDatos(): Observable<any> {
    const url = 'https://market-share-api-back.onrender.com//api/v1/companies/';
    return this.http.get<any>(url);
  }

  obtenerDatosPorId(id:number): Observable<any> {
    const url = 'https://market-share-api-back.onrender.com//api/v1/company/' + id;
    return this.http.get<any>(url);
  }

  agregar(data: any): Observable<any> {
    const url = 'https://market-share-api-back.onrender.com//api/v1/company/';
    return this.http.post<any>(url, data);
  }
  
  agregarProductos(id: number, data: any): Observable<any> {
    const url = 'https://market-share-api-back.onrender.com//api/v1/company/' + id;
    return this.http.post<any>(url, data);
  }

  actualizar(data: any): Observable<any> {
    const url = 'https://market-share-api-back.onrender.com//api/v1/company/' + data.id;
    return this.http.put<any>(url, data);
  }

  registrarVenta(data: any) {
    const url = 'https://market-share-api-back.onrender.com//api/v1/market-share/';
    return this.http.post<any>(url, data);
  }

  obtenerVentas(id_company: number, id_product:number) {
    const url = 'https://market-share-api-back.onrender.com//api/v1/market-share/'+id_company+'/'+id_product;
    return this.http.get<any>(url);
  }
}
