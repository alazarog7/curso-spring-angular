import { Injectable } from '@angular/core';
import {formatDate, DatePipe, registerLocaleData} from '@angular/common';
import localeES from '@angular/common/locales/es-BO';
import { CLIENTES } from './clientes.json';
import { Cliente } from './cliente';
import { Observable,throwError } from 'rxjs';

import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import { map, catchError,tap } from 'rxjs/operators';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { Region } from './region';
import { AuthService } from '../usuarios/auth.service';



@Injectable()
export class ClienteService {
  private urlEndPoint: string = 'http://localhost:8089/api/clientes';
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'})
  constructor(private http: HttpClient,
              private router:Router,
              private activatedRoute : ActivatedRoute,
              private auth:AuthService) { }
  
  private agregarAuthorization(){
    let token = this.auth.token;
    if(token != null){
      return this.httpHeaders.append('Authorization','Bearer '+token)
    }else{
      return this.httpHeaders
    }
  }

  
  getRegiones():Observable<Region[]>{
    return this.http.get<Region[]>(this.urlEndPoint+'/regiones')
  }

  getClientes(page:number): Observable<any> {
    //return of(CLIENTES);
    return this.http.get(this.urlEndPoint+'/page/'+page).pipe(
      tap(
        (response:any) =>{
          console.log("TAP 1");
          console.log(response);
        }
      ),
      map((response:any) =>{
        (response.content as Cliente[]).map(
          cliente =>{
            cliente.nombre = cliente.nombre[0].toLocaleUpperCase()+cliente.nombre.substring(1,cliente.nombre.length);
            cliente.apellido = cliente.apellido[0].toLocaleUpperCase()+cliente.apellido.substring(1,cliente.apellido.length);
            registerLocaleData(localeES,'es')
            //let datePipe = new DatePipe('es');
            //cliente.createAt = formatDate(cliente.createAt, 'dd-MM-yyyy','en-US');
            //cliente.createAt = datePipe.transform(cliente.createAt,'EEEE dd, MMMM yyyy');
            return cliente;
          }
        )
        return response;
      }),
      tap(
        (response:any) =>{
          console.log("TAP 2");
          console.log(response);
        }
      )
    );
  }
  createCliente(cliente:Cliente):Observable<Cliente>{
    //Se reemplazo this.httpHeaders
    return this.http.post<Cliente>(this.urlEndPoint,cliente).pipe(
      map(
        (response:any)=>response.cliente as Cliente
      )
    )
  }

  getCliente(id):Observable<Cliente>{
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`);
  }
  updateCliente( cliente: Cliente):Observable<Cliente>{
    return this.http.put<Cliente>(`${this.urlEndPoint}/${cliente.id}`,cliente).pipe(
      map(
        (response: any) => response.cliente as Cliente 
      )
    );
  }

  delete(id: number):Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`);
  }

  subirFoto(archivo: File, id): Observable<HttpEvent<{}>>{
    let formData =  new FormData()
    formData.append("archivo",archivo)
    formData.append("id",id)
    
    const req = new HttpRequest('POST', `${this.urlEndPoint}/upload`,formData, {
      reportProgress:true
    });

    return this.http.request(req);
  }
}
