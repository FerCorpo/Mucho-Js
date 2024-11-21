class Ordenador
{
    _marca;
    _modelo;
    _precio;
    constructor(marca,modelo,precio)
    {
        this._marca = marca;
        this._modelo = modelo;
        this._precio = precio;
    }
    get precio() {
        return this._precio;
    }
    set precio(value) {
        this._precio = value;
    }
    get modelo() {
        return this._modelo;
    }
    set modelo(value) {
        this._modelo = value;
    }
    get marca() {
        return this._marca;
    }
    set marca(value) {
        this._marca = value;
    }

    toHTMLRow()
    {
        debugger
        let tipo = this instanceof Portatil ? "Portátil" : "Sobremesa";
        let fila = "<tr>";
        fila+= "<td>" + tipo + "</td>" 
        fila += "<td>" + this.marca + "</td>";
        fila += "<td>" + this.modelo + "</td>";
        fila += "<td>" + this.precio + "</td></tr>";
        return fila ;
    }
}

class Portatil extends Ordenador
{
    _discoSSD;
    _pulgadas;

    constructor(marca,modelo,precio,discoSSD,pulgadas)
    {
        super(marca,modelo,precio);
        this._discoSSD = discoSSD;
        this._pulgadas = pulgadas;
    }
    get pulgadas() {
        return this._pulgadas;
    }
    set pulgadas(value) {
        this._pulgadas = value;
    }
    get discoSSD() {
        return this._discoSSD;
    }
    set discoSSD(value) {
        this._discoSSD = value;
    }
    toHTMLRow()
    {
        let fila = super.toHTMLRow();
        let disco = this.discoSSD ? "Sí" : "No";
        fila = fila.slice(0, fila.length - 5); // Para quitar el </tr>
        fila += "<td>" + this.pulgadas + "</td><td>" + disco + "</td></tr>";
        return fila;
    }
}

class Sobremesa extends Ordenador
{
    
    _tarjetaGrafica;
    constructor(marca,modelo,precio,tarjetaGrafica)
    {
        super(marca,modelo,precio)
        this._tarjetaGrafica = tarjetaGrafica;
    }
    get tarjetaGrafica() {
        return this._tarjetaGrafica;
    }
    set tarjetaGrafica(value) {
        this._tarjetaGrafica = value;
    }

    toHTMLRow()
    {
        let fila = super.toHTMLRow();
        fila = fila.slice(0, fila.length - 5); // Para quitar el </tr>
        fila += "<td></td><td></td><td>" + this.tarjetaGrafica + "</td></tr>";
        return fila;
    }
}

class StockOrdenadores
{
    _ordenador;
    _stock;
    constructor(ordenador,stock)
    {
        this._ordenador = ordenador;
        this._stock = stock;
    }
    get stock() {
        return this._stock;
    }
    set stock(value) {
        this._stock = value;
    }
    get ordenador() {
        return this._ordenador;
    }
    set ordenador(value) {
        this._ordenador = value;
    }
    toHTMLRow()
    {

    }
}

class Tienda
{
    _catalogo;
    _stock;
    constructor()
    {
        this._catalogo = [];
        this._stock = [];
    }
    get stock() {
        return this._stock;
    }
    set stock(value) {
        this._stock = value;
    }
    get catalogo() {
        return this._catalogo;
    }
    set catalogo(value) {
        this._catalogo = value;
    }

    buscarCatalogo(modelo,marca)
    {
        let encontrado =
        this.catalogo.filter((elemento) => elemento.modelo == modelo && elemento.marca == marca)
          .length == 1;
    
        if (encontrado)
            return false;
        return true;
    }

    buscarStockUnidades(oOrdenador)
    {
        let stock = this.stock.find((elemento) => elemento.ordenador.modelo == oOrdenador.modelo && elemento.ordenador.marca == oOrdenador.marca);
        return stock;
    }

    altaCatalogo(oOrdenador)
    {
        if(this.buscarCatalogo(oOrdenador.modelo,oOrdenador.marca))
        {
            this.catalogo.push(oOrdenador);
            this.stock.push(new StockOrdenadores(oOrdenador,0));
            return true;
        }
        return false;
        

    }

    entradaStock(marca,modelo,unidades)
    {
        //Si está en el array de stock significa que sí o sí se ha dado de alta en catálogo mediante altaCatálogo, 
            let stockOrdenador = this.stock.find((elemento) => elemento.ordenador.marca == marca && elemento.ordenador.modelo == modelo);
            if(stockOrdenador != undefined)
            {
                let stockTotal = stockOrdenador.stock+= unidades;
                return "El total de stock del ordenador de la marca" + marca + " y del modelo " + modelo + " es de " + stockTotal;
            }

            return "Ese modelo no está en el catálogo";
        
    }

    salidaStock(marca,modelo,unidades)
    {
        
        let stockOrdenador = this.stock.find((elemento) => elemento.ordenador.marca == marca && elemento.ordenador.modelo == modelo);
        if(stockOrdenador != undefined)
        {
            
            let stockTotal = stockOrdenador.stock= stockOrdenador.stock - unidades;
            return "El total de stock del ordenador de la marca" + marca + " y del modelo " + modelo + " es de " + stockTotal;
        }
        return "Ese modelo no está en el catálogo";
    }
    listadoCatalogo()
    {
        let listadoCatalogo = this.catalogo;

        let salida = "<table border='1'>";
        salida +=
        "<thead><tr><th>Tipo</th><th>Marca</th><th>Modelo</th><th>Precio</th><th>Pulgadas</th><th>Disco SSD</th><th>tarjeta gráfica</th></thead><tbody>";
        for (let ordenador of listadoCatalogo) {
          salida += ordenador.toHTMLRow();
        }
        salida += "</tbody></table>";
        return salida;
    }

    listadoStock()
    {
        debugger;
        let listadoStock = this.stock;

        let tabla1 = "<table border='1'>";
        tabla1 +=
        "<thead><tr><th>Tipo</th><th>Marca</th><th>Modelo</th><th>Precio</th><th>Pulgadas</th><th>Disco SSD</th><th>tarjeta gráfica</th></thead><tbody>";
        for (let objetoStock of listadoStock) {
          if(objetoStock.ordenador instanceof Portatil)
            tabla1 += objetoStock.ordenador.toHTMLRow();
        }
        tabla1 += "</tbody></table> <br>";

        
        let tabla2 = "<table border='1'>";
        tabla2 +=
        "<thead><tr><th>Tipo</th><th>Marca</th><th>Modelo</th><th>Precio</th><th>Pulgadas</th><th>Disco SSD</th><th>tarjeta gráfica</th></thead><tbody>";
        for (let objetoStock of listadoStock) {
          if(objetoStock.ordenador instanceof Sobremesa)
            tabla2 += objetoStock.ordenador.toHTMLRow();
        }
        tabla2 += "</tbody></table>";

        let salida = tabla1 + tabla2;
        return salida;
    }

    numPortatilesStock()
    {
        let listadoStock = this.stock;
        let contador = 0;
        for (let objetoStock of listadoStock) {
            if(objetoStock.ordenador instanceof Portatil)
                contador+=objetoStock.stock;
          }
        return contador;
    }

    numSobremesaStock()
    {
        let listadoStock = this.stock;
        let contador = 0;
        for (let objetoStock of listadoStock) {
            if(objetoStock.ordenador instanceof Sobremesa)
              contador+=objetoStock.stock;
          }
        return contador;
    }

    importeTotalStock()
    {
        let listadoStock = this.stock;
        let total = 0;
        for (let objetoStock of listadoStock) {
            total += objetoStock.stock * objetoStock.ordenador.precio;
          }
        return total;
    }


}