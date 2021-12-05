import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {
  productoForm: FormGroup;
  Titulo = 'Crear Producto';
  id: string | null;

  constructor(private fb:FormBuilder,
    private router:Router,
    private toastr: ToastrService,
    private _productoService : ProductoService,
    private aRouter: ActivatedRoute){
        
      this.productoForm = this.fb.group({
      Codigo: ['', Validators.required],
      Nombre: ['', Validators.required],
      Descripcion: ['', Validators.required],
      Valor: ['', Validators.required],
      Categoria:['', Validators.required],
      Stock:['', Validators.required]
    })
    this.id = this.aRouter.snapshot.paramMap.get('id');
   }

  ngOnInit(): void {
    this.pEditar();
  }
  agregarProducto(){

    const PRODUCTO: Producto = {
      Codigo: this.productoForm.get('Codigo')?.value,
      Nombre: this.productoForm.get('Nombre')?.value,
      Descripcion: this.productoForm.get('Descripcion')?.value,
      Valor: this.productoForm.get('Valor')?.value,
      Categoria: this.productoForm.get('Categoria')?.value,
      Stock: this.productoForm.get('Stock')?.value
    }
    if(this.id !== null){
      //se edita el producto
      this._productoService.editarProducto(this.id, PRODUCTO).subscribe(data =>{
        this.toastr.info('Actualizado con exito' , 'Producto Actualizado');
        this.router.navigate(['/']);
      }, error => {
        console.log(error);
        this.productoForm.reset()
      })
    }else{
      //agregar producto
      console.log(PRODUCTO);
    this._productoService.crearProducto(PRODUCTO).subscribe(data =>{
      this.toastr.success('Agregado con exito' , 'Producto Creado!');
      this.router.navigate(['/']); }, error =>{
      console.log(error);
      this.productoForm.reset();
    }) 
    }  
  }
  
  pEditar(){
    if(this.id != null){
      this.Titulo = "Editar Producto";
      this._productoService.obtenerProducto(this.id).subscribe(data =>{
        this.productoForm.setValue({
          Codigo: data.Codigo,
          Nombre: data.Nombre,
          Descripcion: data.Descripcion,
          Valor: data.Valor,
          Categoria: data.Categoria,
          Stock: data.Stock,
        })
      })
    }
  }
}
