import { Empleado } from "./empleado";

export class Actividad{
  id:number;
  nombre:string;
  descripcion:string;
  empleado:Empleado;
  idEmpleadoAsignado:number;
  nombreEmpleadoAsingado:string;
  fechaRealEjecucion:Date;
  fechaPlaneadaEjecucion:Date;
  fechaFormateadaReal:string;
  fechaFormateadaPlaneada:string;
  status:number;
  nombreStatus:string;
  diasRetraso:number;
}
