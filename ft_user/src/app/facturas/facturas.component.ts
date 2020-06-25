import { Component, OnInit } from '@angular/core';
import { Factura } from './models/factura';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from '../clientes/cliente.service';
import { FormControl, Form } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map, flatMap,filter } from 'rxjs/operators';
import { FacturasService } from './services/facturas.service';
import { Producto } from './models/producto';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { ItemFactura } from './models/item-factura';
import swal from 'sweetalert2';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css']
})
export class FacturasComponent implements OnInit {

  titulo: string = 'Nueva Factura';
  factura: Factura = new Factura();

  autocompleteControl = new FormControl();
  productos: Producto[] = [];
  productosFiltraddos: Observable<Producto[]>;

  constructor(private clienteService:ClienteService,private activatedRoute:ActivatedRoute, private router:Router, private facturaService:FacturasService) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params=>{
      let clienteId = +params.get('clienteId')
      this.clienteService.getCliente(clienteId).subscribe(cliente => this.factura.cliente = cliente)
    })
    this.productosFiltraddos = this.autocompleteControl.valueChanges.pipe(
        map(value=> typeof value === 'string'? value:value.nombre),
        flatMap(value => value?this._filter(value):[]),
      );
  }

  mostrarNombre(producto?:Producto){
    return producto? producto.nombre:undefined;
  }

  seleccionarProducto(event: MatAutocompleteSelectedEvent){
    console.log('evento')
    let producto = event.option.value as Producto;
    console.log(producto)

    let nuevoItem = new ItemFactura();
    nuevoItem.producto = producto;
    if(!this.existeItem(producto.id)){
      console.log(this.existeItem(producto.id))
      this.factura.items.push(nuevoItem);
    }else{
      console.log('aumentando')
      this.incrementaCantidad(producto.id)
    }
    

    this.autocompleteControl.setValue('');
    event.option.focus();
    event.option.deselect();
  }

  actualizarCantidad(id:number,e:any){
    if(e.target.value=="") return;
    
    let cantidad:number = e.target.value as number
    
    if(cantidad == 0 ){
      this.eliminarItemFactura(id);
    } 
    this.factura.items = this.factura.items.map((item: ItemFactura) => {
      if(item.producto.id === id){
        item.cantidad = cantidad
      }
      return item
    })
  }

  eliminarItemFactura(id:number){
    this.factura.items = this.factura.items.filter((item:ItemFactura)=>item.producto.id!==id)
    console.log(this.factura.items)
    
  }

  existeItem(id: number):boolean{
    return this.factura.items.filter(item=>item.producto.id === id).length === 1 
  }

  incrementaCantidad(id:number): void{
    this.factura.items = this.factura.items.map((item: ItemFactura) => {
      if(item.producto.id === id){
        ++item.cantidad
      }
      return item
    })
  }

  crearFactura(facturaForm:Form){
    console.log(this.factura)
    
    this.facturaService.crearFactura(this.factura).subscribe(factura=>{
        swal(this.titulo,'Factura creada','success');
        this.router.navigateByUrl('/clientes');
    })
  }
  private _filter(value: string):Observable<Producto[]>{
    const filterValue = value.toLowerCase();
    return this.facturaService.filtrarProducto(filterValue);
    
  }


}
