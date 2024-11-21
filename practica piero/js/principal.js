const oAgencia = new Agencia();

datosIniciales();

console.log(oAgencia);

function datosIniciales() {
    //Clientes
    oAgencia.altaCliente(new Cliente(1111, "Manolo", "Delgado Guerrero"));
    oAgencia.altaCliente(new Cliente(1112, "Juan", "Ponce Domingo"));
    oAgencia.altaCliente(new Cliente(1114, "Sergio", "Pérez López"));
    oAgencia.altaCliente(new Cliente(1113, "Pepe", "Balsera Gabino"));
    //Alojamientos (Habitación o Apartamento)
    oAgencia.altaAlojamiento(new Habitacion(siguienteCodigo(oAgencia.alojamientos), 2, true));
    oAgencia.altaAlojamiento(new Habitacion(siguienteCodigo(oAgencia.alojamientos), 2, true));
    oAgencia.altaAlojamiento(new Habitacion(siguienteCodigo(oAgencia.alojamientos), 2, true));
    oAgencia.altaAlojamiento(new Apartamento(siguienteCodigo(oAgencia.alojamientos), 2, false, 2));
    oAgencia.altaAlojamiento(new Apartamento(siguienteCodigo(oAgencia.alojamientos), 2, false, 2));
    oAgencia.altaAlojamiento(new Apartamento(siguienteCodigo(oAgencia.alojamientos), 2, false, 2));
}

function siguienteCodigo(array) { //asegura que no se repitan los códigos de los elementos del array.
    if (array.length == 0) {
        return 1;
    } else if (array[array.length-1] instanceof Alojamiento) {
        return array[array.length-1].idAlojamiento+1;
    } else { //instanceof Reserva
        return array[array.length-1].idReserva+1;
    }
}

function gestionFormularios(sFormularioVisible) {
    ocultarTodosLosFormularios();
    // Hacemos visible el formulario que llega como parámetro
    switch (sFormularioVisible) {
        case "frmAltaCliente":
            frmAltaCliente.style.display = "block";
            break;
        case "frmAltaAlojamiento":
            frmAltaAlojamiento.style.display = "block";
            break;
        case "frmAltaReserva":
            mostrarAltaReserva();
            break;
        case "frmBajaReserva":
            mostrarBajaReserva();
            break;
        case "frmListadoReservasPorFecha":
            frmListadoReservasPorFecha.style.display = "block";
            break;
        case "frmListadoReservasPorCliente":
            mostrarFrmListadoReservasPorCliente();
            break;
    }
}

function ocultarTodosLosFormularios() {
    const oFormularios = document.querySelectorAll("form");

    for (let i = 0; i < oFormularios.length; i++) {
        oFormularios[i].style.display = "none";
    }
}

function mostrarAltaReserva() {
    let salida = "";
    for (let cliente of oAgencia.clientes) {
        salida += "<option value='" + cliente.dniCliente + "'>";
        salida += cliente.dniCliente + " - " + cliente.nombre + " " + cliente.apellidos + " - " + cliente.usuario;
        salida += "</option>";
    }
    frmAltaReserva.comboClientes.innerHTML = salida;

    salida = "";
    for (let alojamiento of oAgencia.alojamientos) {
        salida += "<option value='" + alojamiento.idAlojamiento + "'>" + "ID" + alojamiento.idAlojamiento;
        if (alojamiento instanceof Habitacion) {
            salida += " Habitación para " + alojamiento.numPersonas + " personas " 
                    + (alojamiento.desayuno ? " con " : " sin ") + "desayuno";
        } else { //instanceof Apartamento
            salida += " Apartamento para " + alojamiento.numPersonas + " personas " 
                    + (alojamiento.parking ? " con " : " sin ") + "parking " 
                    + "y " + alojamiento.dormitorios + " dormitorios";
        }
        salida += "</option>";
    }
    frmAltaReserva.comboAlojamientos.innerHTML = salida;

    // Hacemos visible el formulario
    frmAltaReserva.style.display = "block";
}

function mostrarBajaReserva() {
    let salida = "";
    for (let reserva of oAgencia.reservas) {
        salida += "<option value='" + reserva.idReserva + "'>" + "ID" + reserva.idReserva;
        salida += " " + reserva.cliente.nombre + " (DNI " + reserva.cliente.dniCliente + "), "
                + "alojamientos ID";
        for (let alojamiento of reserva.alojamientos) {
            salida += alojamiento.idAlojamiento + ", ";
        }
        salida += "del " + reserva.fechaInicio.toLocaleDateString() + " al " + reserva.fechaFin.toLocaleDateString();
        salida += "</option>";
    }
    frmBajaReserva.comboReservas.innerHTML = salida;

    // Hacemos visible el formulario
    frmBajaReserva.style.display = "block";
}

function mostrarFrmListadoReservasPorCliente() {
    let salida = "";
    for (let cliente of oAgencia.clientes) {
        salida += "<option value='" + cliente.dniCliente + "'>";
        salida += cliente.dniCliente + " - " + cliente.nombre + " " + cliente.apellidos + " - " + cliente.usuario;
        salida += "</option>";
    }
    frmListadoReservasPorCliente.comboClientes.innerHTML = salida;

    // Hacemos visible el formulario
    frmListadoReservasPorCliente.style.display = "block";
}

function aceptarAltaCliente() {
    const dniCliente = parseInt(frmAltaCliente.txtDni.value.trim());
    const nombre = frmAltaCliente.txtNombre.value.trim();
    const apellidos = frmAltaCliente.txtApellidos.value.trim();
    const oCliente = new Cliente(dniCliente, nombre, apellidos);
    const respuesta = oAgencia.altaCliente(oCliente);

    if (respuesta.includes("OK")) {
        frmAltaCliente.reset(); // Vaciamos los campos del formulario
    }
    frmAltaCliente.txtRespuesta.value = respuesta;
}

function aceptarAltaAlojamiento() {
    const idAlojamiento = siguienteCodigo(oAgencia.alojamientos); //Si validásemos los datos del formulario, inicializaríamos idAlojamiento tras la validación para no desperdiciar números de id. Asumimos que los datos se introducen con un formato válido.
    const numPersonas = parseInt(frmAltaAlojamiento.txtNumPersonas.value.trim());
    let desayuno = frmAltaAlojamiento.rbtDesayuno.value;
    desayuno = (desayuno == "S" ? true : false);
    let parking = frmAltaAlojamiento.rbtParking.value;
    parking = (parking == "S" ? true : false);
    const dormitorios = parseInt(frmAltaAlojamiento.txtNumDormitorios.value.trim());
    let oAlojamiento;

    if (frmAltaAlojamiento.rbtTipoAloj.value == "habitacion") {
        oAlojamiento = new Habitacion(idAlojamiento, numPersonas, desayuno);
    } else {
        oAlojamiento = new Apartamento(idAlojamiento, numPersonas, parking, dormitorios);
    }
    const respuesta = oAgencia.altaAlojamiento(oAlojamiento);

    if (respuesta.includes("OK")) {
        frmAltaAlojamiento.reset(); // Vaciamos los campos del formulario
    }
    frmAltaAlojamiento.txtRespuesta.value = respuesta;
}

function aceptarAltaReserva() {
    let cliente = parseInt(frmAltaReserva.comboClientes.value); //dni
    cliente = (oAgencia.clientes.filter((elem) => elem.dniCliente == cliente))[0]; //Objeto Cliente
    const alojamientos = [];
    const alojamientosAux = [...frmAltaReserva.comboAlojamientos.options].filter(x => x.selected).map(x => x.value); //array auxiliar con los idAlojamiento de los alojamientos seleccionados.
    for (let alojamiento of alojamientosAux) {
        alojamientos.push((oAgencia.alojamientos.filter((elem) => elem.idAlojamiento == alojamiento))[0]); //Añadimos el objeto al array definitivo.
    }
    const fechaInicio = new Date(frmAltaReserva.dateFechaInicio.value); 
    const fechaFin = new Date(frmAltaReserva.dateFechaFin.value);
    let respuesta;
    const fechaInicioMs = Date.parse(fechaInicio.toLocaleDateString()); //Fecha inicio en milisegundos
    const fechaFinMs = Date.parse(fechaFin.toLocaleDateString()); //Fecha fin en milisegundos
    const fechaActual = Date.parse((new Date()).toLocaleDateString()); //Fecha actual en milisegundos
    
    if (fechaInicioMs < fechaActual) {
        respuesta = "ERROR: Debe seleccionar una fecha de inicio válida.";
    } else if (fechaFinMs < fechaActual) {
        respuesta = "ERROR: Debe seleccionar una fecha de fin válida.";
    } else {
        //Realizamos una búsqueda para comprobar si los alojamientos elegidos están disponibles.
        let i = 0, j, exito = false; //exito se pondrá a true si algún alojamiento está ya reservado algún día entre las fechas seleccionadas.
        while (i < alojamientosAux.length && !exito) {
            j = 0;
            while (j < oAgencia.reservas.length && !exito) {
                let contieneAloj = oAgencia.reservas[j].alojamientos.filter((elem) => elem.idAlojamiento == alojamientosAux[i]).length == 1;
                if (contieneAloj) { //Si la reserva contiene el alojamiento
                    let fechaInicioIter = Date.parse(oAgencia.reservas[j].fechaInicio.toLocaleDateString()); //Fecha inicio de la reserva en milisegundos
                    let fechaFinIter = Date.parse(oAgencia.reservas[j].fechaFin.toLocaleDateString()); //Fecha fin de la reserva en milisegundos
                    let coincidenFechas = fechaInicioIter >= fechaInicioMs && fechaInicioIter <= fechaFinMs ||
                                        fechaFinIter >= fechaInicioMs && fechaFinIter <= fechaFinMs ||
                                        fechaInicioIter <= fechaInicioMs && fechaFinIter >= fechaFinMs;
                    if (coincidenFechas) 
                        exito = true;
                }
                if (!exito) 
                    j++;
            }
            if (!exito) 
                i++;
        }
        if (exito) {
            respuesta = "ERROR: El alojamiento nº " + alojamientosAux[i] + " está ya reservado del "
                        + oAgencia.reservas[j].fechaInicio.toLocaleDateString() + " al " 
                        + oAgencia.reservas[j].fechaFin.toLocaleDateString();
        } else { //Realizamos el alta reserva
            const idReserva = siguienteCodigo(oAgencia.reservas);
            const oReserva = new Reserva(idReserva, cliente, alojamientos, fechaInicio, fechaFin);
            respuesta = oAgencia.altaReserva(oReserva);
        }
    }
    if (respuesta.includes("OK")) {
        frmAltaReserva.reset(); // Vaciamos los campos del formulario
    }
    frmAltaReserva.txtRespuesta.value = respuesta;
}

function aceptarBajaReserva() {
    const idReserva = parseInt(frmBajaReserva.comboReservas.value);
    const respuesta = oAgencia.bajaReserva(idReserva);

    if (respuesta.includes("OK")) {
        frmBajaReserva.reset(); 
    }
    frmBajaReserva.txtRespuesta.value = respuesta;
}

function mostrarListadoClientes() {
    const sListado = oAgencia.listadoClientes();
    const tituloListado = "Listado de clientes";
    const tituloPag = "Listado clientes";

    mostrarListadoAux(sListado, tituloListado, tituloPag);
}

function mostrarListadoAux(sListado, tituloListado, tituloPag) { //Función auxiliar para todos los listados
    const oVentana = open("", "_blank", "");

    oVentana.document.open();
    oVentana.document.write(
        "<head><style>"
        + "body \{background-image: url(\"images/pexels-worldMap-highQuality.jpg\");"
        + "background-size: cover; background-repeat: no-repeat;}"
        + "th \{background-color: LightSteelBlue\;}" 
        + "td \{text-align: center\; background-color: AliceBlue\;}"
        + "</style></head>" 
        + "<body><h1>" + tituloListado + "</h1>" 
        + sListado + "</body>"
    );
    oVentana.document.close();
    oVentana.document.title = tituloPag;
}

function mostrarListadoAlojamientos() {
    const sListado = oAgencia.listadoAlojamientos();
    const tituloListado = "Listado de alojamientos";
    const tituloPag = "Listado alojamientos";

    mostrarListadoAux(sListado, tituloListado, tituloPag);
}

function AceptarListadoReservasPorFecha() {
    const fechaInicio = new Date(frmListadoReservasPorFecha.dateFechaInicio.value); 
    const fechaFin = new Date(frmListadoReservasPorFecha.dateFechaFin.value);
    const sListado = oAgencia.listadoReservas(fechaInicio, fechaFin);
    const tituloListado = "Listado de reservas entre " + fechaInicio.toLocaleDateString() 
                        + " y " + fechaFin.toLocaleDateString();
    const tituloPag = "Listado reservas por fecha";

    mostrarListadoAux(sListado, tituloListado, tituloPag);
    // Reseteamos y ocultamos el formulario
    frmListadoReservasPorFecha.reset();
    frmListadoReservasPorFecha.style.display = "none";
}

function AceptarListadoReservasPorCliente() {
    const cliente = parseInt(frmListadoReservasPorCliente.comboClientes.value); //dni
    const sListado = oAgencia.listadoReservasCliente(cliente);
    const tituloListado = "Listado de reservas del cliente con DNI " + cliente;
    const tituloPag = "Listado reservas por cliente";

    mostrarListadoAux(sListado, tituloListado, tituloPag);
    // Reseteamos y ocultamos el formulario
    frmListadoReservasPorCliente.reset();
    frmListadoReservasPorCliente.style.display = "none";
}

function mostrarListadoHabitacionesConDesayuno() {
    const sListado = oAgencia.listadoHabitacionesConDesayuno();
    const tituloListado = "Listado de habitaciones con desayuno";
    const tituloPag = "Listado habitaciones desayuno";

    mostrarListadoAux(sListado, tituloListado, tituloPag);
}
