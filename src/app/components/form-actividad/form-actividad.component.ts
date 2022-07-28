import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actividad } from 'src/app/core/model/actividad';
import { Empleado } from 'src/app/core/model/empleado';
import { ActividadService } from 'src/app/core/service/actividad.service';
import { RespuestaServicio } from 'src/app/core/service/respuestaServicio';
import { SwalUtils } from '../../utils/swalUtils';
import { EmpleadoService } from '../../core/service/empleado.service';

@Component({
  selector: 'app-form-actividad',
  templateUrl: './form-actividad.component.html',
  styleUrls: ['./form-actividad.component.css'],
})
export class FormActividadComponent implements OnInit {
  actividad: Actividad=new Actividad();
  empleadoList: Empleado[];
  titulo: string = 'Crear Actividad';
  empleadoSelected:Empleado;
  errores: string[];
  constructor(
    private actividadService: ActividadService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private empleadoService: EmpleadoService
  ) {}

  ngOnInit() {
    debugger;
    this.activatedRoute.paramMap.subscribe((params) => {
      let id = +params.get('id');
      if (id) {
        this.actividadService
          .buscarUno(id + '')
          .subscribe((resp: RespuestaServicio) => {
            if (resp.ok) {
              this.actividad = resp.body as Actividad;
            }
          });
      }
    });

    this.cargarEmpleado();
  }

  cargarEmpleado() {
    debugger;
    this.empleadoService.buscarTodos().subscribe((resp: RespuestaServicio) => {
      if (resp.ok) {
        this.empleadoList = resp.body as Empleado[];
        console.log(this.empleadoList.length);
      }
    });
  }
  create(): void {
    console.log(this.actividad);
    this.actividad.idEmpleadoAsignado=this.empleadoSelected.id;
    this.actividadService.insertar(this.actividad).subscribe(
      (resp: RespuestaServicio) => {
        if (resp.ok) {
          SwalUtils.showAlert(
            'Nueva actividad',
            `La actividad ${this.actividad.nombre} ha sido creado con éxito`,
            'success'
          );
          this.router.navigate(['/actividades']);
        }
      },
      () => {
        SwalUtils.showAlert(
          'Información general',
          'Se ha presentado un inconviente por favor intentar nuevamente.',
          'error'
        );
      }
    );
  }

  update(): void {
    this.actividad.idEmpleadoAsignado=this.empleadoSelected.id;
    console.log(this.actividad);
    this.actividadService.actualizar(this.actividad).subscribe(
      (resp: RespuestaServicio) => {
        if (resp.ok) {
          SwalUtils.showAlert(
            'Actividad actualizada',
            `La actividad ${this.actividad.nombre} ha sido actualizado con éxito`,
            'success'
          );
          this.router.navigate(['/actividades']);
        }
      },
      () => {
        SwalUtils.showAlert(
          'Información general',
          'Se ha presentado un inconviente por favor intentar nuevamente.',
          'error'
        );
      }
    );
  }

  compararEmpleado(o1: Empleado, o2: Empleado): boolean {
    debugger;
    if (o1 === undefined && o2 === undefined) {
      return true;
    }

    return o1 === null || o2 === null || o1 === undefined || o2 === undefined
      ? false
      : o1.id === o2.id;
  }
}
