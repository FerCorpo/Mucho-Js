class Cliente {
    #dniCliente;
    #nombre;
    #apellidos;
    #usuario;

    constructor(dniCliente, nombre, apellidos) {
        this.#dniCliente = dniCliente;
        this.#nombre = nombre;
        this.#apellidos = apellidos;
        this.#usuario = nombre.substring(0,1).toLowerCase() 
            + apellidos.substring(0,3).toLowerCase() 
            + apellidos.substring(apellidos.indexOf(" ")+1,apellidos.indexOf(" ")+4).toLowerCase() 
            + dniCliente.toString().substring(dniCliente.toString().length-3); //Tratamos el parámetro como String para facilitar.
    }

    get dniCliente() {
        return this.#dniCliente;
    }
    set dniCliente(dniCliente) {
        this.#dniCliente = dniCliente;
    }
    get nombre() {
        return this.#nombre;
    }
    set nombre(nombre) {
        this.#nombre = nombre;
    }
    get apellidos() {
        return this.#apellidos;
    }
    set apellidos(apellidos) {
        this.#apellidos = apellidos;
    }
    get usuario() {
        return this.#usuario;
    }
    set usuario(usuario) {
        this.#usuario = usuario;
    }
    
    toHTMLRow() {
        let fila = "<tr>";
        fila += "<td>" + this.dniCliente + "</td>";
        fila += "<td>" + this.nombre + "</td>";
        fila += "<td>" + this.apellidos + "</td>";
        fila += "<td>" + this.usuario + "</td></tr>";
        return fila;
    }
}

class Alojamiento {
    #idAlojamiento;
    #numPersonas;

    constructor(idAlojamiento, numPersonas) {
        this.#idAlojamiento = idAlojamiento;
        this.#numPersonas = numPersonas;
    }

    get idAlojamiento() {
        return this.#idAlojamiento;
    }
    set idAlojamiento(idAlojamiento) {
        this.#idAlojamiento = idAlojamiento;
    }
    get numPersonas() {
        return this.#numPersonas;
    }
    set numPersonas(numPersonas) {
        this.#numPersonas = numPersonas;
    }

    toHTMLRow() {
        let fila = "<tr>";
        fila += "<td>" + this.idAlojamiento + "</td>";
        fila += "<td>" + this.numPersonas + "</td></tr>";
        return fila;
    }
}

class Habitacion extends Alojamiento {
    #desayuno;

    constructor(idAlojamiento, numPersonas, desayuno) {
        super(idAlojamiento, numPersonas);
        this.#desayuno = desayuno;
    }

    get desayuno() {
        return this.#desayuno;
    }
    set desayuno(desayuno) {
        this.#desayuno = desayuno;
    }

    toHTMLRow() {
        let fila = super.toHTMLRow();
        fila = fila.replace("</tr>", ""); //Quitamos el cierre del <tr> para añadir los atributos propios de la clase hija.
        fila += "<td>" + this.desayuno + "</td></tr>";
        return fila;
    }
}

class Apartamento extends Alojamiento {
    #parking;
    #dormitorios;

    constructor(idAlojamiento, numPersonas, parking, dormitorios) {
        super(idAlojamiento, numPersonas);
        this.#parking = parking;
        this.#dormitorios = dormitorios;
    }

    get parking() {
        return this.#parking;
    }
    set parking(parking) {
        this.#parking = parking;
    }
    get dormitorios() {
        return this.#dormitorios;
    }
    set dormitorios(dormitorios) {
        this.#dormitorios = dormitorios;
    }

    toHTMLRow() {
        let fila = super.toHTMLRow();
        fila = fila.replace("</tr>", ""); //Quitamos el cierre del <tr> para añadir los atributos propios de la clase hija.
        fila += "<td>" + this.parking + "</td>";
        fila += "<td>" + this.dormitorios + "</td></tr>";
        return fila;
    }
}

class Reserva {
    #idReserva;
    #cliente;
    #alojamientos;
    #fechaInicio;
    #fechaFin;

    constructor(idReserva, cliente, alojamientos, fechaInicio, fechaFin) {
        this.#idReserva = idReserva;
        this.#cliente = cliente;
        this.#alojamientos = alojamientos;
        this.#fechaInicio = fechaInicio;
        this.#fechaFin = fechaFin;
    }

    get idReserva() {
        return this.#idReserva;
    }
    set idReserva(idReserva) {
        this.#idReserva = idReserva;
    }
    get cliente() {
        return this.#cliente;
    }
    set cliente(cliente) {
        this.#cliente = cliente;
    }
    get alojamientos() {
        return this.#alojamientos;
    }
    set alojamientos(alojamientos) {
        this.#alojamientos = alojamientos;
    }
    get fechaInicio() {
        return this.#fechaInicio;
    }
    set fechaInicio(fechaInicio) {
        this.#fechaInicio = fechaInicio;
    }
    get fechaFin() {
        return this.#fechaFin;
    }
    set fechaFin(fechaFin) {
        this.#fechaFin = fechaFin;
    }

    toHTMLRow() {
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

class Agencia {
    #clientes;
    #reservas;
    #alojamientos;

    constructor() {
        this.#clientes = [];
        this.#reservas = [];
        this.#alojamientos = [];
    }

    get clientes() {
        return this.#clientes;
    }
    set clientes(clientes) {
        this.#clientes = clientes;
    }
    get reservas() {
        return this.#reservas;
    }
    set reservas(reservas) {
        this.#reservas = reservas;
    }
    get alojamientos() {
        return this.#alojamientos;
    }
    set alojamientos(alojamientos) {
        this.#alojamientos = alojamientos;
    }

    altaCliente(oCliente) {
        const encontrado = this.clientes.filter((elem) => elem.dniCliente == oCliente.dniCliente).length == 1;

        if (!encontrado) {
            this.clientes.push(oCliente);
            return "Cliente registrado OK";
        } else {
            return "ERROR: Cliente registrado previamente";
        }
    }

    altaAlojamiento(oAlojamiento) {
        const encontrado = this.alojamientos.filter((elem) => elem.idAlojamiento == oAlojamiento.idAlojamiento).length == 1;

        if (!encontrado) { 
            this.alojamientos.push(oAlojamiento);
            return "Alojamiento registrado OK con identificador " + oAlojamiento.idAlojamiento;
        } else {
            return "ERROR: Alojamiento registrado previamente";
        }
    }

    altaReserva(oReserva) {
        const encontrado = this.reservas.filter((elem) => elem.idReserva == oReserva.idReserva).length == 1;

        if (!encontrado) { 
            this.reservas.push(oReserva);
            return "Reserva registrada OK con identificador " + oReserva.idReserva;
        } else {
            return "ERROR: Reserva registrada previamente";
        }
    }

    bajaReserva(idReserva) {
        const reservasEncontradas = this.reservas.filter((elem) => elem.idReserva == idReserva);

        if (reservasEncontradas.length == 1) {
            const index = this.reservas.indexOf(reservasEncontradas[0]);
            this.reservas.splice(index, 1); //en la posición indicada borra un elemento sin dejar ningún hueco en el array.
            return "Reserva eliminada OK";
        } else {
            return "ERROR: La reserva indicada no existe";
        }
    }

    listadoClientes() {
        let salida = "<table border='1'>";
        salida += "<thead><tr><th>DNI</th><th>Nombre</th><th>Apellidos</th><th>Usuario</th></tr></thead><tbody>";
        for (let oCliente of this.clientes) {
            salida += oCliente.toHTMLRow();
        }
        salida += "</tbody></table>";
        return salida;
    }

    listadoAlojamientos() {
        return this.listadoAlojamientosAux(this.alojamientos);
    }

    listadoAlojamientosAux(alojamientos) { //método auxiliar para listados de alojamientos
        let salida = "<table border='1'>";
        salida += "<thead><tr><th>Tipo</th><th>Código</th><th>Nº personas</th><th>Desayuno</th><th>Parking</th><th>Dormitorios</th></tr></thead><tbody>";
        for (let oAlojamiento of alojamientos) {
            let atribsApmto = oAlojamiento.toHTMLRow().replace(/<tr>|<\/tr>/g, "");
            if (oAlojamiento instanceof Habitacion) {
                salida += "<tr><td>Habitación</td>";
                salida += atribsApmto;
                salida += "<td> - </td><td> - </td></tr>";
            } else {
                salida += "<tr><td>Apartamento</td>";
                atribsApmto = atribsApmto.split("<td>");
                salida += "<td>" + atribsApmto[1] + "<td>" + atribsApmto[2] 
                        + "<td> - </td>" 
                        + "<td>" + atribsApmto[3] + "<td>" + atribsApmto[4] + "</tr>";
            }
        }
        salida += "</tbody></table>";
        return salida; 
    }

    listadoReservas(fechaInicio, fechaFin) {
        const fechaInicioMs = Date.parse(fechaInicio.toLocaleDateString()); //Fecha inicio en milisegundos
        const fechaFinMs = Date.parse(fechaFin.toLocaleDateString()); //Fecha fin en milisegundos
        const reservasAMostrar = [];
        //Buscamos las reservas que se encuentran dentro del rango de fechas seleccionado y las añadimos al array
        for (let oReserva of this.reservas) {
            let fechaInicioIter = Date.parse(oReserva.fechaInicio.toLocaleDateString()); //Fecha inicio de la reserva en milisegundos
            let fechaFinIter = Date.parse(oReserva.fechaFin.toLocaleDateString()); //Fecha fin de la reserva en milisegundos
            let coincidenFechas = fechaInicioIter >= fechaInicioMs && fechaInicioIter <= fechaFinMs &&
                                fechaFinIter >= fechaInicioMs && fechaFinIter <= fechaFinMs;
            if (coincidenFechas) {
                reservasAMostrar.push(oReserva);
            }
        }
        //Devolvemos la tabla a mostrar
        return this.listadoReservasAux(reservasAMostrar);
    }

    listadoReservasAux(reservas) { //método auxiliar para listados de reservas
        let salida = "<table border='1'>";
        salida += "<thead><tr><th>Código reserva</th><th>DNI cliente</th><th>Nombre cliente</th><th>Fecha inicio</th><th>Fecha fin</th><th>Lista alojamientos</th></tr></thead><tbody>";
        for (let oReserva of reservas) {
            salida += "<tr>";
            salida += "<td>" + oReserva.idReserva + "</td>";
            salida += "<td>" + oReserva.cliente.dniCliente + "</td>";
            salida += "<td>" + oReserva.cliente.nombre + "</td>";
            salida += "<td>" + oReserva.fechaInicio.toLocaleDateString() + "</td>";
            salida += "<td>" + oReserva.fechaFin.toLocaleDateString() + "</td>";
            salida += "<td>";
            salida += this.listadoAlojamientosAux(oReserva.alojamientos);
            salida += "</td>";
            salida += "</tr>";
        }
        salida += "</tbody></table>";
        return salida;
    }

    listadoReservasCliente(idCliente) {
        const reservasAMostrar = this.reservas.filter((elem) => elem.cliente.dniCliente == idCliente);
        
        return this.listadoReservasAux(reservasAMostrar);
    }

    listadoHabitacionesConDesayuno() {
        const alojsAMostrar = this.alojamientos.filter((elem) => elem instanceof Habitacion && elem.desayuno == true);
        alojsAMostrar.sort(
            function(elem1, elem2) {
                const difNumPersonas = elem2.numPersonas - elem1.numPersonas; //diferencia
                if (difNumPersonas != 0) {
                    return difNumPersonas;
                } else {
                    return elem1.idAlojamiento - elem2.idAlojamiento;
                }
            }
        );

        return this.listadoAlojamientosAux(alojsAMostrar);
    }
}
