import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Actividad } from 'src/app/core/model/actividad';
import { ModalService } from 'src/app/core/service/modal.service';
import { RespuestaServicio } from 'src/app/core/service/respuestaServicio';
import Swal from 'sweetalert2';
import { ActividadService } from '../../core/service/actividad.service';

@Component({
  selector: 'app-activdad',
  templateUrl: './activdad.component.html',
  styleUrls: ['./activdad.component.css']
})
export class ActivdadComponent implements OnInit {
  actividadList: Actividad[];
  public paginador: any;
  actividadSelected: Actividad;
  selectedRowIds: Set<number> = new Set<number>();
  selectedId: string;
  constructor(
    private actividadService:ActividadService,
    private activatedRoute: ActivatedRoute,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
      this.actividadService.buscarTodos().subscribe((resp: RespuestaServicio) => {
        if(resp.ok){
        this.actividadList = resp.body as Actividad[];
        }
      });
  }

  
  
  delete(actividad: Actividad): void {
    Swal.fire({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar la actividad id: ${actividad.id} y nombre: ${actividad.nombre}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(`¿Seguro que desea eliminar la actividad id: ${actividad.id} y nombre: ${actividad.nombre}?`);
        this.actividadService.borrar(actividad.id).subscribe((resp: RespuestaServicio) => {
          if(resp.ok){
            this.actividadList.splice(this.findIndexById(actividad.id),1);
            this.actividadList = this.actividadList.filter(c => c !== actividad);
          Swal.fire(
            'Actividad Eliminado!',
            `${resp.ok} : ${actividad.nombre} `,
            'success'
          );
          }
        });
      }
    });
  }

  abrirModal(actividad: Actividad) {
    this.modalService.abrirModal();
  }

  findIndexById(id:number):number{
    let index=-1;
    for(let i=0; i<this.actividadList.length;i++){
      if(this. actividadList[i].id===id){
          index=i;
          break;
      }
    }
    return index;


  }

  deleteIndexById(id:number){
    this.actividadList.splice(this.findIndexById(id),1);

  }
  onRowClick(id: number) {
    if(this.selectedRowIds.has(id)) {
     this.selectedRowIds.delete(id);
    }
    else {
      this.selectedRowIds.add(id);
    }
  }

  rowIsSelected(id: number) {
    return this.selectedRowIds.has(id);
  }

  getSelectedRows(){
    return this.actividadList.filter(x => this.selectedRowIds.has(x.id));
  }

  onLogClick() {

    console.log(this.selectedRowIds);
    console.log(this.getSelectedRows());
    
}

}
