import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  obtenerDatos(): Observable<any> {
    const url = 'http://localhost:8000/api/v1/products/';
    return this.http.get<any>(url);
  }

  obtenerDatosPorId(id:number): Observable<any> {
    const url = 'http://localhost:8000/api/v1/product/' + id;
    return this.http.get<any>(url);
  }

  agregar(data: any): Observable<any> {
    const url = 'http://localhost:8000/api/v1/product/';
    return this.http.post<any>(url, data);
  }
  
  actualizar(data: any): Observable<any> {
    const url = 'http://localhost:8000/api/v1/product/' + data.id;
    return this.http.put<any>(url, data);
  }
}
