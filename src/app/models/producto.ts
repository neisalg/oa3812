export class Producto{
    _id?: number;
    Codigo: string;
    Nombre: string;
    Descripcion: string;
    Valor: number;
    Categoria: string;
    Stock: number;

    constructor(Codigo: string, Nombre: string, 
                Descripcion: string, Valor: number, 
                Categoria: string,  Stock: number){

        this.Codigo=Codigo;
        this.Nombre=Nombre;
        this.Descripcion=Descripcion;
        this.Valor=Valor;
        this.Categoria=Categoria;
        this.Stock=Stock;
    }


}