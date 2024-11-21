class Cliente
{
    _dniCliente;
    _nombre;
    _apellidos;
    _usuario;

    constructor(dniCliente, nombre, apellidos, )
    {
        this._dniCliente = dniCliente;
        this._nombre = nombre;
        this._apellidos = apellidos;
        this.actualizarUsuario();
    }
    get dniCliente() {
        return this._dniCliente;
    }
    set dniCliente(value) {
        this._dniCliente = value;
    }
    
    get nombre() {
        return this._nombre;
    }
    set nombre(value) {
        this._nombre = value;
    }
    
    get apellidos() {
        return this._apellidos;
    }
    set apellidos(value) {
        this._apellidos = value;
    }
    
    get usuario() {
        return this._usuario;
    }
    set usuario(value) {
        this._usuario = value;
    }

    actualizarUsuario() {
        let inicial = this.nombre.slice(0, 1);
        let apellido1 = this.apellidos[0].slice(0, 3);
        let apellido2 = this.apellidos[1].slice(0, 3);
        let tresUltimosDigitosDni = this.dniCliente.toString().slice(-3);
        let resultado = inicial + apellido1 + apellido2 + tresUltimosDigitosDni;
        this.usuario = resultado.toLowerCase();
    }

    toHTMLRow() {
        return `<tr>
                    <td>${this.dniCliente}</td>
                    <td>${this.nombre}</td>
                    <td>${this.apellidos}</td>
                    <td>${this.usuario}</td>
                </tr>`;
    }
}


class Vehiculo
{
    _matricula;
    _marca;
    _modelo;
    constructor(matricula,marca,modelo)
    {
        this._matricula = matricula;
        this._marca = marca;
        this._modelo = modelo;
        
    }
    get matricula() {
        return this._matricula;
    }
    set matricula(value) {
        this._matricula = value;
    }
    
    get marca() {
        return this._marca;
    }
    set marca(value) {
        this._marca = value;
    }
    
    get modelo() {
        return this._modelo;
    }
    set modelo(value) {
        this._modelo = value;
    }

    toHTMLRow()
    {
        
        let tipoVehiculo = this instanceof Coche ? "Coche" : "Moto";
        return `<tr>
                    <td>${tipoVehiculo}</td>
                    <td>${this.matricula}</td>
                    <td>${this.marca}</td>
                    <td>${this.modelo}</td>
                </tr>`;
    }
}

class Moto extends Vehiculo
{
   _ciclomotor;
    constructor(matricula, marca, modelo, ciclomotor)
    {
        super(matricula, marca, modelo);
        this._ciclomotor = ciclomotor;
    }
    get ciclomotor() {
        return this._ciclomotor;
    }
    set ciclomotor(value) {
        this._ciclomotor = value;
    }

    toHTMLRow()
    {
        let salida = super.toHTMLRow();
        salida = salida.slice(0, salida.length - 5); // Para quitar el </tr>
        salida+= `<td></td><td></td>
                    <td>${this.ciclomotor ? "Sí" : "No" }</td>
                    
                </tr>`;
        return salida;
    }
}

class Coche extends Vehiculo
{
    _combustible;
    _plazas;
    constructor(matricula, marca, modelo, combustible, plazas)
    {
        super(matricula, marca, modelo);
        this._combustible = combustible;
        this._plazas = plazas;
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

    toHTMLRow()
    {
        let salida = super.toHTMLRow();
        salida = salida.slice(0, salida.length - 5); // Para quitar el </tr>
        salida+= `<td>${this.combustible}</td>
                    <td>${this.plazas}</td>
                    </tr>`;
                
        return salida;
    }
    
}

class Alquiler
{
    _idAlquiler;
    _cliente;
    _vehiculos;
    _fechaInicio;
    _fechaFin;
    constructor(idAlquiler, cliente, vehiculos, fechaInicio, fechaFin)
    {
        this._idAlquiler = idAlquiler;
        this._cliente = cliente;
        this._vehiculos = vehiculos;
        this._fechaInicio = new Date(fechaInicio);
        this._fechaFin = new Date(fechaFin);
    }
    get idAlquiler() {
        return this._idAlquiler;
    }
    set idAlquiler(value) {
        this._idAlquiler = value;
    }

    get cliente() {
        return this._cliente;
    }
    set cliente(value) {
        this._cliente = value;
    }

    get vehiculos() {
        return this._vehiculos;
    }
    set vehiculos(value) {
        this._vehiculos = value;
    }

    get fechaInicio() {
        return this._fechaInicio;
    }
    set fechaInicio(value) {
        this._fechaInicio = value;
    }

    get fechaFin() {
        return this._fechaFin;
    }
    set fechaFin(value) {
        this._fechaFin = value;
    }

    toHTMLRow()
    {
        let salida = `<tr>
                        <td>${this.idAlquiler}</td>
                        <td>${this.cliente.nombre}</td>
                        <td>`;
        for(let vehiculo of this.vehiculos)
        {
            salida += vehiculo.matricula + "<br>";
        }
        salida += `</td>
                    <td>${this.fechaInicio.toLocaleDateString()}</td>
                    <td>${this.fechaFin.toLocaleDateString()}</td>
                </tr>`;
        return salida;
    }
}

class Agencia
{
    _clientes;
    _alquileres;
    _vehiculos;
    constructor()
    {
        this._clientes = []
        this._alquileres = []
        this._vehiculos = []
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

    buscarCliente(dniCliente)
    {
        return this.clientes.find((elemento) => elemento.dniCliente == dniCliente);
    }

    altaCliente(cliente)
    {
        if(this.buscarCliente(cliente.dniCliente) == undefined) //También se puede hacer con filter y length == 0 pero ya que tenemos la función buscarCliente la usamos
        {
            this.clientes.push(cliente);
            return true;
        }

        return false;
    }

    altaVehiculo(vehiculo)
    {
        if(this.vehiculos.filter((elemento) => elemento.matricula == vehiculo.matricula).length == 0)
        {
            this.vehiculos.push(vehiculo);
            return true;
        }

        return false;

    }

    buscarVehiculo(matricula)
    {
        return this.vehiculos.find((elemento) => elemento.matricula == matricula);
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
    

    bajaAlquiler(idAlquiler)
    {
        let indice = this.alquileres.findIndex((elemento) => elemento.idAlquiler == idAlquiler);
        if(indice != -1)
        {
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
        debugger;
        salida = salida.slice(0, salida.length - 5);// Para quitar el tr
        salida += "</tr></tbody></table>";
        return salida;
    }
}