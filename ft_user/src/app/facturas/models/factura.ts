import { ItemFactura } from './item-factura';
import { Cliente } from '../../clientes/cliente';
export class Factura {
    id:number;
    descripcion: string;
    observacion: string;
    items: Array<ItemFactura> = [];
    cliente: Cliente = new Cliente();
    total: number;
    createAt: string;

    public calcularTotal():number{
        let total = 0
        this.items.forEach(item => {
            total += item.calcularImporte()
        })
        return total
    }

}
