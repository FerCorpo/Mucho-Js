
class Cliente{
    _dniCliente;
    _nombre;
    _apellidos;
    _usuario;

    constructor(dniCliente,nombre,apellidos,usuario){
        this.dniCliente=dniCliente;
        this.nombre=nombre;
        this.apellidos=apellidos;
        //si no hago los usuarios de esta forma me aparece como undefined al mostrarlo en la tabla
        this.usuario=nombre.substring(0,1).toLowerCase() 
        + apellidos.substring(0,3).toLowerCase() 
        + apellidos.substring(apellidos.indexOf(" ")+1,apellidos.indexOf(" ")+4).toLowerCase() 
        + dniCliente.toString().substring(dniCliente.toString().length-3);
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
        let fila = "<tr>";
        fila += "<td>" + this.dniCliente + "</td>";
        fila += "<td>" + this.nombre + "</td>";
        fila += "<td>" + this.apellidos + "</td>";
        fila += "<td>" + this.usuario + "</td></tr>";
        return fila;
    }
}

class Alojamiento{
    _idAlojamiento;
    _numPersonas;

    constructor(idAlojamiento,numPersonas){
        this._idAlojamiento=idAlojamiento;
        this._numPersonas=numPersonas;
    }

    get numPersonas() {
        return this._numPersonas;
    }
    set numPersonas(value) {
        this._numPersonas = numPersonas;
    }
    get idAlojamiento() {
        return this._idAlojamiento;
    }
    set idAlojamiento(value) {
        this._idAlojamiento = idAlojamiento;
    }

    toHTMLRow(){
        let fila = "<tr>";
        fila += "<td>" + this.idAlojamiento + "</td>";
        fila += "<td>" + this.numPersonas + "</td></tr>";
        return fila;
    }
}

class Habitacion extends Alojamiento{
    _desayuno;
    constructor(idAlojamiento,numPersonas,desayuno){
        super(idAlojamiento,numPersonas);
        this.desayuno=desayuno;
    }
    get desayuno() {
        return this._desayuno;
    }
    set desayuno(value) {
        this._desayuno = value;
    }

    toHTMLRow(){
        let fila=super.toHTMLRow();
        fila=fila.slice(0,fila.length -5);
        fila+="<td>"+(this.desayuno ? "SI" : "NO")+"</td></tr>";
        return fila;
    }
    
}

class Apartamento extends Alojamiento{
    _parking;
    _dormitorios;
    constructor(idAlojamiento,numPersonas,parking,dormitorios){
        super(idAlojamiento,numPersonas);
        this.parking=parking;
        this.dormitorios=dormitorios;
    }
    get dormitorios() {
        return this._dormitorios;
    }
    set dormitorios(value) {
        this._dormitorios = value;
    }
    get parking() {
        return this._parking;
    }
    set parking(value) {
        this._parking = value;
    }

    toHTMLRow(){
        let fila=super.toHTMLRow();
        fila=fila.slice(0,fila.length -5);
        fila+="<td>"+(this.parking?"SI":"NO")+"</td>";
        fila+="<td>"+this.dormitorios+"</td></td>";

        return fila;
    }
}

class Reserva{
    _idReserva;
    _cliente;
    _alojamientos;
    _fechaInicio;
    _fechaFin;

    constructor(idReserva,cliente,alojamientos,fechaInicio,fechaFin){
        this.idReserva=idReserva;
        this.cliente=cliente;
        this.alojamientos=alojamientos;
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
    get alojamientos() {
        return this._alojamientos;
    }
    set alojamientos(value) {
        this._alojamientos = value;
    }
    get cliente() {
        return this._cliente;
    }
    set cliente(value) {
        this._cliente = value;
    }
    get idReserva() {
        return this._idReserva;
    }
    set idReserva(value) {
        this._idReserva = value;
    }

    toHTMLRow(){
        let fila = "<tr>";
        fila += "<td>" + this.idReserva + "</td>";
        fila += "<td><table>" + this.cliente.toHTMLRow() + "</table></td>";
        fila += "<td><table>";
        for (let oAlojamiento of this.alojamientos) {
            fila += oAlojamiento.toHTMLRow();
        }
        fila += "</table></td>";
        fila += "<td>" + this.fechaInicio + "</td>";
        fila += "<td>" + this.fechaFin + "</td></tr>";
        return fila;
        
    }
}

class Agencia{
    _clientes;
    _reservas;
    _alojamientos;

    constructor(clientes,reservas,alojamientos){
        this.clientes=[];
        this.reservas=[];
        this.alojamientos=[];
    }
    get alojamientos() {
        return this._alojamientos;
    }
    set alojamientos(value) {
        this._alojamientos = value;
    }
    get reservas() {
        return this._reservas;
    }
    set reservas(value) {
        this._reservas = value;
    }
    get clientes() {
        return this._clientes;
    }
    set clientes(value) {
        this._clientes = value;
    }

    altaCliente(oCliente){
        let encontrado = this.clientes.filter((elem) => elem.dniCliente == oCliente.dniCliente).length == 1;

        if(!encontrado){
            this.clientes.push(oCliente);
            return "OK";
        }else{
            return "ERROR";
        }

    }

    altaAlojamiento(oAlojamiento){
        let encontrado= this.alojamientos.filter((elem) => elem.idAlojamiento==oAlojamiento.idAlojamiento).length==1;

        if(!encontrado){
            this.alojamientos.push(oAlojamiento);
            return "OK";
        }else{
            return "ERROR";
        }
    }

    altaReserva(oReserva){
        let encontrado=this.reservas.filter((elem)=> elem.idReserva==oReserva.idReserva).length==1;

        if(!encontrado){
            this.reservas.push(oReserva);
            return "OK";
        }else{
            return "ERROR";
        }
    }

    bajaReserva(idReserva){
        let reservaEncontrada=this.reservas.filter((elem)=>elem.idReserva==idReserva);

        if(reservaEncontrada.length==1){//significa que el filter ha encontrado algo
            let index=this.reservas.indexOf(reservaEncontrada[0]);//como es una tabla de una sola posicion pues quiero encontrar su indice

            this.reservas.splice(index,1); //le mando el indice a borrar y la cantidad de elementos que quiero borrar

            return "OK";
        }else{
            return "ERROR";
        }
    }

    listadoClientes(){
        let salida="<table border=1>";
        salida+="<thead><tr><td>DNi</td><td>Nombre</td><td>Apellidos</td><td>Usuarios</td></tr></thead><tbody>"

        for(let cliente of this.clientes){
            salida+=cliente.toHTMLRow();
        }
        salida+="</tbody></table>";

        return salida;
    }

    listadoAlojamientos(){
        return this.listadoAuxAlojamientos(this.alojamientos);
    }

    listadoAuxAlojamientos(alojamientos){

        let salida="<table border=1>";

        salida += "<thead><tr><th>Tipo</th><th>Código</th><th>Nº personas</th><th>Desayuno</th><th>Parking</th><th>Dormitorios</th></tr></thead><tbody>";

        for(let alojamiento of alojamientos){

            let atribApart = alojamiento.toHTMLRow().replace(/<tr>|<\/tr>/g, "");
            //.replace() se usa la doble barra \/ para que no haya confusion y js entienda que queremos buscar la /

            if(alojamiento instanceof Habitacion){
                salida += "<tr><td>Habitación</td>";
                salida += atribApart;
                salida += "<td> - </td><td> - </td></tr>";
            }else{
                salida += "<tr><td>Apartamento</td>";
                atribApart = atribApart.split("<td>");
                salida +="<td>"+atribApart[1]+"<td>"+atribApart[2]+"<td> - </td>"+"<td>"+atribApart[3]+"<td>"+atribApart[4]+"</tr>";
                //al hacer el split nos devuelve un array de 5 elementos del cual el 0 no nos interesa por ser una cadena vacia
            }
        }
        salida+="<tbody></table>";

        return salida;

    }

    listadoReservas(fechaInicio, fechaFin) {

        let fechaInicioMS=Date.parse(fechaInicio.toLocaleDateString());//fecha en ms
        let fechaFinMS=Date.parse(fechaFin.toLocaleDateString())
        let reservasFechas=[];

        for(let reserva of this.reservas){
            let fechaInicioReservas=Date.parse(reserva.fechaInicio.toLocaleDateString());
            let fechaFinReservas=Date.parse(reserva.fechaFin.toLocaleDateString());
            let coincidencias=(fechaInicioReservas >= fechaInicioMS && fechaInicioReservas <= fechaFinMS) || // inicio de la reserva dentro del rango
            (fechaFinReservas >= fechaInicioMS && fechaFinReservas <= fechaFinMS) ||       // fin de la reserva dentro del rango
            (fechaInicioReservas <= fechaInicioMS && fechaFinReservas >= fechaFinMS);

            if(coincidencias){
                reservasFechas.push(reserva);
            }
        }
        console.log(reservasFechas);
        return this.listadoAuxReservas(reservasFechas);

    }

    listadoAuxReservas(reservas){
        let salida = "<table border='1'>";
        salida += "<thead><tr><th>Código reserva</th><th>DNI cliente</th><th>Nombre cliente</th><th>Fecha inicio</th><th>Fecha fin</th><th>Lista alojamientos</th></tr></thead><tbody>";
        for (let reserva of reservas) {
            salida += "<tr>";
            salida += "<td>" + reserva.idReserva + "</td>";
            salida += "<td>" + reserva.cliente.dniCliente + "</td>";
            salida += "<td>" + reserva.cliente.nombre + "</td>";
            salida += "<td>" + reserva.fechaInicio.toLocaleDateString() + "</td>";
            salida += "<td>" + reserva.fechaFin.toLocaleDateString() + "</td>";
            salida += "<td>";
            salida += this.listadoAuxAlojamientos(reserva.alojamientos);
            salida += "</td>";
            salida += "</tr>";
        }
        salida += "</tbody></table>";

        return salida;
    }

    listadoReservasCliente(idCliente){
        let mostrarReservas = this.reservas.filter((elem) => elem.cliente.dniCliente == idCliente);
        
        return this.listadoAuxReservas(mostrarReservas);
    }
    
    listadoHabitacionesConDesayuno(){

        let mostrarAlojamientos= this.alojamientos.filter((elem) => elem instanceof Habitacion && elem.desayuno == true);

        mostrarAlojamientos.sort(
            function(elem1,elem2){
                let difNPersonas=elem2.numPersonas - elem1.numPersonas;
                if(difNPersonas!=0){
                    return difNPersonas;
                }else{
                    return elem1.idAlojamiento - elem2.idAlojamiento
                }
            }
        );


        return this.listadoAuxAlojamientos(mostrarAlojamientos);
    }
}