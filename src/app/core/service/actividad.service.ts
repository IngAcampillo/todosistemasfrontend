import { Injectable } from '@angular/core';
import {
  HttpClient,
} from '@angular/common/http';
import { RespuestaServicio } from './respuestaServicio';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class ActividadService extends RestService<RespuestaServicio,String>{

  constructor(public  http:HttpClient) {
    super("actividad", "id", http);
  }


  
 
}
