import { Producto } from './producto';
export class ItemFactura {
    producto: Producto;
    cantidad: number = 1;
    importe: number;
    calcularImporte(){
        return this.producto.precio*this.cantidad
    }
}
