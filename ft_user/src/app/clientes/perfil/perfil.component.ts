import { Component, OnInit, Input } from '@angular/core';
import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { ModalService } from './modal.service';
import { AuthService } from '../../usuarios/auth.service';
import { FacturasService } from '../../facturas/services/facturas.service';
import { async } from '@angular/core/testing';

@Component({
  selector: 'detalle-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  @Input()cliente: Cliente;

  titulo:string="Detalle Cliente";
  private fotoSeleccionada: File;

  progreso:number = 0;
  constructor(private clienteService: ClienteService,private modalService:ModalService,private facturaService:FacturasService, private authService:AuthService, private router:Router) { }

  ngOnInit() {
   //Debido a que se inyectando desde clientes el ngonINIT ya no es necesario 

    //this.activateRoute.paramMap.subscribe(params=>{
    //let id:number = +params.get('id');
    //  if(id){
    //    this.clienteService.getCliente(id).subscribe(cliente=>{
    //      this.cliente = cliente;
    //      console.log(this.cliente);
    //    });
    //  }
    //})
  }
  seleccionarFoto(event){
    this.fotoSeleccionada = event.target.files[0];
    this.progreso = 0;
    console.log(this.fotoSeleccionada);
    if(this.fotoSeleccionada.type.indexOf('image'))//con indexof buscamos la posicion en el array que contenga el texto ima
    {
      swal('Error seleccionar imagen: ','El archivo debe ser del tipo imagen','error');
      this.fotoSeleccionada = null;
    }
  }
  subirFoto(){
    if(!this.fotoSeleccionada){
      swal('Error Upload: ','Debe seleccionar una foto','error')
    }else{
      this.clienteService.subirFoto(this.fotoSeleccionada,this.cliente.id).subscribe(
        event=>{
          //this.cliente=cliente;
          if(event.type === HttpEventType.UploadProgress){
            this.progreso = Math.round((event.loaded/event.total)*100)
          }else if(event.type === HttpEventType.Response){
            let response: any = event.body;
            this.cliente = response.cliente as Cliente;
            this.modalService.notificarUpload.emit(this.cliente);
            swal('La foto se ha subido completamente',`La foto se ha subido con exito: ${response.mensaje}`,'success')
          }
      
  
        }
      );
    }
  }
  deleteFactura(id:number){
    const swalWithBootstrapButtons = swal.mixin({
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
    })
    
    swalWithBootstrapButtons({
      title: 'Esta seguro?',
      text: `Seguro que quiere eliminar la factura`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.facturaService.deleteFactura(id).subscribe(
          response =>{
            this.cliente.facturas = this.cliente.facturas.filter(x=> x.id!==id)
            swalWithBootstrapButtons(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
          }
        )
        
      } else if (
        // Read more about handling dismissals
        result.dismiss === swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })

  }
  facturar(cliente: Cliente){
    this.cerrarModal()
  }
  cerrarModal(){
    this.modalService.cerraModal();
    this.fotoSeleccionada  = null;
    this.progreso = 0;
  }
}
