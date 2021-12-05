import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-listar-producto',
  templateUrl: './listar-producto.component.html',
  styleUrls: ['./listar-producto.component.css']
})
export class ListarProductoComponent implements OnInit {
  listProductos: Producto [] = [];
  constructor(private _productoService: ProductoService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos(){
    this._productoService.getproductos().subscribe(data => {
      console.log(data);
      this.listProductos = data;
    }, error => {
      console.log(error);    
    })
  }
  eliminarProducto(id:any){
    this._productoService.eliminarProductos(id).subscribe(data =>{
      this.toastr.error('Este producto fue eliminado', 'Producto Eliminado');
      this.obtenerProductos();
    }, error => {
      console.log(error);
    })
  }
}
