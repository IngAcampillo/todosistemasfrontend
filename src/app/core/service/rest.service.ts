import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class RestService<T, K> {

  private servidor: string = environment.url;

/*
  private httpOptions = {
    headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')}),
    params: {}
  };*/

  constructor(public endPoint: string, public id: K, public http: HttpClient) {
  }

  get url() {
    return `${this.servidor}/${this.endPoint}`;
  }

  public buscarTodos():Observable<T> {
    return this.http.get<T>(this.url);
  }

  public insertar(tipo:any):Observable<T> {
    return this.http.post<T>(this.url,tipo);
  }
  
  public actualizar(tipo:any):Observable<T> {
    return this.http.put<T>(this.url,tipo);
  }


  public borrar(tipo:any):Observable<T> {
    return this.http.delete<T>(`${this.url}/${tipo}`);
  }

  public borrarVarios(url:string,listado:any):Observable<T> {
    return this.http.post<T>(url,listado);
  }

  public buscarVarios(url:string,listado:any):Observable<T> {
    return this.http.get<T>(`${url}/${listado}`);
  }

  public buscarUno(id:K):Observable<T> {
    return this.http.get<T>(`${this.url}/${id}`);
  }

  public buscarPage(url:string,pageableTransform:any):Observable<T> {
    //return this.http.get<T>(this.url, `page?${pageableTransform}`);
    return this.http.get<T>(`${this.url}/page/${pageableTransform}`);
  }

 
}
