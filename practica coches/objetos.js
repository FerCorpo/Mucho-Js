class Cliente{
    _dniCliente;
    _nombre;
    _apellidos;
    _usuario;

    constructor(dniCliente,nombre,apellidos,usuario){
        this.dniCliente=dniCliente;
        this.nombre=nombre;
        this.apellidos=apellidos;
        this.usuario=nombre.substring(0,1).toLoweCase()+apellidos.substring(apellidos.indexOf(" ")+1,apellidos.indexOf(" ")+4).toLoweCase()
        +dniCliente.toString.substring(dniCliente.toString().length-3);
    }
    get usuario() {
        return this._usuario;
    }
    set usuario(value) {
        this._usuario = value;
    }
    get apellidos() {
        return this._apellidos;
    }
    set apellidos(value) {
        this._apellidos = value;
    }
    get nombre() {
        return this._nombre;
    }
    set nombre(value) {
        this._nombre = value;
    }
    get dniCliente() {
        return this._dniCliente;
    }
    set dniCliente(value) {
        this._dniCliente = value;
    }

    toHTMLRow(){
        let fila="<tr>";
        fila+="<td>"+this.dniCliente+"</td>";
        fila+="<td>"+this.nombre+"</td>";
        fila+="<td>"+this.apellidos+"</td>";
        fila+="<td>"+this.usuario+"</td>";
        fila+"</tr>"
    }
}

class Vehiculo{
    _matricula;
    _marca;
    _modelo;

    constructor(matricula,marca,modelo){
        this.matricula=matricula;
        this.marca=marca;
        this.modelo=modelo;
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
    get matricula() {
        return this._matricula;
    }
    set matricula(value) {
        this._matricula = value;
    }

    toHTMLRow(){
        let fila="<tr>";
        fila+="<td>"+this.matricula+"</td>";
        fila+="<td>"+this.marca+"</td>";
        fila+="<td>"+this.modelo+"</td>";
        fila="</tr>"
    }

}

class Moto extends Vehiculo{
    _ciclomotor;
    constructor(matricula,marca,modelo,ciclomotor){
        super(matricula,marca,modelo);
        this.ciclomotor=ciclomotor;
    }
    get ciclomotor() {
        return this._ciclomotor;
    }
    set ciclomotor(value) {
        this._ciclomotor = value;
    }

    toHTMLRow(){
        let fila=super.toHTMLRow();
        fila=fila.slice(0,salida.length-5);
        fila+="<td></td><td></td><td>"+(this.ciclomotor ? "Si" : "No")+"</td>";
        fila+="</tr>";
    }
}

class Coche extends Vehiculo{
    _combustible;
    _plazas;
    constructor(matricula,marca,modelo,combustible,plazas){
        super(matricula,marca,modelo);
        this.combustible=combustible;
        this.plazas=plazas;
    }
    get plazas() {
        return this._plazas;
    }
    set plazas(value) {
        this._plazas = value;
    }
    get combustible() {
        return this._combustible;
    }
    set combustible(value) {
        this._combustible = value;
    }

    toHTMLRow(){
        let fila=super.toHTMLRow();
        fila=fila.slice(0,salida.length-5);
        fila+="<td>"+this.combustible+"</td>"+"<td>"+this.plazas+"</td>";
        fila+="</tr>";
    }
}

class Alquiler{
    _idAlquiler;
    _cliente;
    _vehiculos;
    _fechaInicio;
    _fechaFin;
    constructor(idAlquiler,cliente,vehiculos,fechaInicio,fechaFin){
        this.idAlquiler=idAlquiler;
        this.cliente=cliente;
        this.vehiculos=vehiculos;
        this.fechaInicio=fechaInicio;
        this.fechaFin=fechaFin;
    }
    get fechaFin() {
        return this._fechaFin;
    }
    set fechaFin(value) {
        this._fechaFin = value;
    }
    get fechaInicio() {
        return this._fechaInicio;
    }
    set fechaInicio(value) {
        this._fechaInicio = value;
    }
    get vehiculos() {
        return this._vehiculos;
    }
    set vehiculos(value) {
        this._vehiculos = value;
    }
    get cliente() {
        return this._cliente;
    }
    set cliente(value) {
        this._cliente = value;
    }
    get idAlquiler() {
        return this._idAlquiler;
    }
    set idAlquiler(value) {
        this._idAlquiler = value;
    }

    toHTMLRow(){
        let fila="<tr>";
        fila+="<td>"+this.idAlquiler+"</td>";
        fila+="<td>"+this.cliente+"</td><td>";
        for(let vehiculo of this.vehiculos)
            {
                fila += vehiculo.matricula + "<br>";
            }
        fila+="</td><td>"+this.fechaInicio.toLocaleDateString()+"</td>";
        fila+="<td>"+this.fechaFin.toLocaleDateString()+"</td>";
        fila+"</tr>"
    }
}

class Agencia{
    _clientes;
    _alquileres;
    _vehiculos;
    constructor(){
        this.clientes=[];
        this.alquileres=[];
        this.vehiculos={};
    }
    get vehiculos() {
        return this._vehiculos;
    }
    set vehiculos(value) {
        this._vehiculos = value;
    }
    get alquileres() {
        return this._alquileres;
    }
    set alquileres(value) {
        this._alquileres = value;
    }
    get clientes() {
        return this._clientes;
    }
    set clientes(value) {
        this._clientes = value;
    }

    buscarCliente(dniCliente){
        return this.clientes.find((elemento) => elemento.dniCliente==dniCliente);
    }

    altaCliente(oCliente){
        if(this.buscarCliente(oCliente.dniCliente)==undefined){
            this.clientes.push(oCliente);
            return true;
        }

        return false;
    }

    altaVehiculo(oVehiculo){
        if(this.vehiculos.filter((elemento) => elemento.matricula==oVehiculo.matricula).length==0){
            this.vehiculos.push(oVehiculo)
            return true
        }

        return false;
    }

    altaAlquiler(alquilerEntrada) {
        let fechaSolicitaEntrada = alquilerEntrada.fechaInicio;
        let fechaSolicitaSalida = alquilerEntrada.fechaFin;
        let vehiculosEntrada = alquilerEntrada.vehiculos;
        let fechaActual = new Date();
    
        if (fechaSolicitaEntrada < fechaActual || fechaSolicitaSalida < fechaActual) // No se puede alquilar en fechas anteriores a la actual
        {
            return false;
        }
    
        for (let alquiler of this.alquileres) 
        { 
            let fechaAlquilerEntrada = alquiler.fechaInicio;
            let fechaAlquilerSalida = alquiler.fechaFin;
    
            if (!(fechaSolicitaSalida < fechaAlquilerEntrada || fechaSolicitaEntrada > fechaAlquilerSalida)) {
                // Si se superponen las fechas, verificamos si los vehículos están disponibles
                let vehiculosAlquiler = alquiler.vehiculos;
                for (let vehiculo of vehiculosEntrada) {
                    if (vehiculosAlquiler.find(v => v.matricula === vehiculo.matricula))  // Si el vehículo del alquiler el cual estoy iterando
                    //está en el array de vehículos del alquiler que estoy comprobando
                    {
                        //Significa que el vehículo está alquilado en esas fechas
                        return false;
                    }
                }
            }
        }
    
        // No hay superposición de fechas ni vehículos ya alquilados, procedemos con el alquiler
        this.alquileres.push(alquilerEntrada);
        return true;
    }

    bajaAlquiler(idAlquiler){
        let indice=this.alquileres.findIndex((elemento) => elemento.idAlquiler==idAlquiler);
        if(indice!=1){
            this.alquileres.splice(indice,1); //splice lo que hace es eliminar un elemento del array, 
            //el primer parámetro es el índice a partir de lo que queremos borrar y el segundo es el número de elementos a borrar
            return true;
        }
        return false;
    }

    listadoClientes()
    {

        let salida = "<table border='1'>";

        salida +=
        "<thead><tr><th>DNI</th><th>Nombre</th><th>Apellidos</th><th>Usuario</th></thead><tbody>";
        for(let cliente of this.clientes)
        {
            salida += cliente.toHTMLRow();
        }

        salida += "</tbody></table>";
        return salida;

    }

    listadoVehiculos()
    {
        let salida = "<table border='1'>";
        salida +=
        "<thead><tr><th>Tipo</th><th>Matrícula</th><th>Marca</th><th>Modelo</th><th>Combustible</th><th>Puertas</th><th>Ciclomotor</th></thead><tbody>";
        for(let vehiculo of this.vehiculos)
        {
            salida += vehiculo.toHTMLRow();
        }

        salida += "</tbody></table>";
        return salida;
    }

    listadoAlquileresCliente(dniCliente)
    {
        let salida = "<table border='1'>";
        salida +=
        "<thead><tr><th>Id Alquiler</th><th>Cliente</th><th>Vehículos</th><th>Fecha Inicio</th><th>Fecha Fin</th></thead><tbody>";
        for(let alquiler of this.alquileres)
        {
            if(alquiler.cliente.dniCliente == dniCliente)
            {
                salida += alquiler.toHTMLRow();
            }
            
        }

        salida += "</tbody></table>";
        return salida;
    }

    listadoAlquileresFechas(fechaInicio, fechaFin)
    {
        let salida = "<table border='1'>";
        salida +=
        "<thead><tr><th>Id Alquiler</th><th>Cliente</th><th>Vehículos</th><th>Fecha Inicio</th><th>Fecha Fin</th></thead><tbody>";
        for(let alquiler of this.alquileres)
        {
            if(alquiler.fechaInicio >= fechaInicio && alquiler.fechaFin <= fechaFin)
            {
                salida += alquiler.toHTMLRow();
            }
            
        }

        salida += "</tbody></table>";
        return salida;
    }

    listadoCochesElectricos()
    {
        let salida = "<table border='1'>";
        salida +=
        "<thead><tr><th>Tipo</th><th>Matrícula</th><th>Marca</th><th>Modelo</th><th>Combustible</th><th>Puertas</th></thead><tbody>";
        for(let vehiculo of this.vehiculos)
        {
            if(vehiculo instanceof Coche && vehiculo.combustible.toLowerCase() == "eléctrico")
            {
                salida += vehiculo.toHTMLRow();
            }
            
        }
        //debugger; ??
        salida = salida.slice(0, salida.length - 5);// Para quitar el tr
        salida += "</tr></tbody></table>";
        return salida;
    }
}
