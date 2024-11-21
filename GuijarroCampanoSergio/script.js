let agencia = new Agencia();
datosPrueba();


function datosPrueba()
{
    let cliente1 = new Cliente(12345678, "Juan", "Pérez González");
    let cliente2 = new Cliente(87654321, "María", "López Rodríguez");
    let cliente3 = new Cliente(12121212, "Pedro", "García Pérez");
    let cliente4 = new Cliente(34343434, "Ana", "Martínez Sánchez");
    let cliente5 = new Cliente(12345678, "Lucía", "Fernández García");// Este cliente no se puede agregar porque ya existe otro con el mismo DNI

    let coche1 = new Coche("ABC123", "Toyota", "Corolla", "Eléctrico", 5);
    let coche2 = new Coche("XYZ987", "Ford", "Focus", "Híbrido", 4);
    let coche3 = new Coche("QWE456", "Audi", "A3", "Eléctrico", 5);
    let coche4 = new Coche("RTY321", "Seat", "Ibiza", "Diesel", 5);
    let coche5 = new Coche("XYZ987", "Mitsubishi", "Lancer", "Gasolina", 4);// Este coche no se puede agregar porque ya existe otro con la misma matrícula


    let moto1 = new Moto("MNB456", "Honda", "CBR", true);
    let moto2 = new Moto("QWE789", "Yamaha", "YZF", false);
    let moto3 = new Moto("ASD123", "Suzuki", "GSX", true);
    let moto4 = new Moto("FGH321", "Kawasaki", "Ninja", false);
    let moto5 = new Moto("MNB456", "Ducati", "Monster", true);// Esta moto no se puede agregar porque ya existe otra con la misma matrícula

    console.log("Alta de clientes y vehículos de prueba");

    agencia.altaCliente(cliente1) ? console.log("Cliente 1 añadido con éxito") : console.log("No se pudo agregar el cliente 1");
    agencia.altaCliente(cliente2) ? console.log("Cliente 2 añadido con éxito") : console.log("No se pudo agregar el cliente 2");
    agencia.altaCliente(cliente3) ? console.log("Cliente 3 añadido con éxito") : console.log("No se pudo agregar el cliente 3");
    agencia.altaCliente(cliente4) ? console.log("Cliente 4 añadido con éxito") : console.log("No se pudo agregar el cliente 4");
    agencia.altaCliente(cliente5) ? console.log("Cliente 5 añadido con éxito") : console.log("No se pudo agregar el cliente 5");

    console.log("");
    agencia.altaVehiculo(coche1) ? console.log("Coche 1 añadido con éxito") : console.log("No se pudo agregar el coche 1");
    agencia.altaVehiculo(coche2) ? console.log("Coche 2 añadido con éxito") : console.log("No se pudo agregar el coche 2");
    agencia.altaVehiculo(coche3) ? console.log("Coche 3 añadido con éxito") : console.log("No se pudo agregar el coche 3");
    agencia.altaVehiculo(coche4) ? console.log("Coche 4 añadido con éxito") : console.log("No se pudo agregar el coche 4");
    agencia.altaVehiculo(coche5) ? console.log("Coche 5 añadido con éxito") : console.log("No se pudo agregar el coche 5");


    console.log("");
    agencia.altaVehiculo(moto1) ? console.log("Moto 1 añadida con éxito") : console.log("No se pudo agregar la moto 1");
    agencia.altaVehiculo(moto2) ? console.log("Moto 2 añadida con éxito") : console.log("No se pudo agregar la moto 2");
    agencia.altaVehiculo(moto3) ? console.log("Moto 3 añadida con éxito") : console.log("No se pudo agregar la moto 3");
    agencia.altaVehiculo(moto4) ? console.log("Moto 4 añadida con éxito") : console.log("No se pudo agregar la moto 4");
    agencia.altaVehiculo(moto5) ? console.log("Moto 5 añadida con éxito") : console.log("No se pudo agregar la moto 5");

    console.log("");
    console.log("Alta de alquileres de prueba");
    // Crear algunos alquileres de prueba
    let alquiler1 = new Alquiler(1, cliente1, [coche1], "2023-12-10", "2023-12-15");
    let alquiler2 = new Alquiler(2, cliente2, [moto1, coche2], "2023-12-10", "2023-12-25");
    let alquiler3 = new Alquiler(3, cliente1, [moto1], "2022-12-20", "2024-12-25");
    let alquiler4 = new Alquiler(4, cliente2, [coche2,moto3], "2023-12-20", "2023-12-25"); // Este alquiler no se puede agregar porque el coche ya está alquilado
    let alquiler5 = new Alquiler(5, cliente3, [coche3,moto3], "2023-12-20", "2023-12-25");
    // Intentar agregar los alquileres a la agencia
    agencia.altaAlquiler(alquiler1) ? console.log("Alquiler 1 añadido con éxito") : console.log("No se pudo agregar el alquiler 1");
    agencia.altaAlquiler(alquiler2) ? console.log("Alquiler 2 añadido con éxito") : console.log("No se pudo agregar el alquiler 2");
    agencia.altaAlquiler(alquiler3) ? console.log("Alquiler 3 añadido con éxito") : console.log("No se pudo agregar el alquiler 3");
    //El alquiler 3 no se puede agregar porque la fecha de inicio es anterior a la actual
    agencia.altaAlquiler(alquiler4) ? console.log("Alquiler 4 añadido con éxito") : console.log("No se pudo agregar el alquiler 4");
    //El alquiler 4 no se puede agregar porque un ya tiene un vehículo alquilado en esas fechas
    agencia.altaAlquiler(alquiler5) ? console.log("Alquiler 5 añadido con éxito") : console.log("No se pudo agregar el alquiler 5");
    //El alquiler 5 se puede agregar porque ningun cliente tiene algún vehículo alquilado en esas fechas
}




function altaCliente()
{
    let dni = Number(frmAltaCliente.dni.value);
    let nombre = frmAltaCliente.nombre.value;
    let apellidos = frmAltaCliente.apellidos.value.split(" ")
    
    //Validamos la información
    if(nombre.length == 0 || apellidos.length == 0 || isNaN(dni) || dni <= 0 || apellidos.length != 2) //El apellido es un array con dos elementos
        alert("Datos incorrectos");
    else   
    {
        let cliente = new Cliente(dni,nombre,apellidos);
        if(agencia.altaCliente(cliente))
            alert("Cliente añadido con éxito");
        else
            alert("El cliente ya estaba registrado");
    }

}

function altaVehiculo()
{
    let matricula = frmAltaVehiculo.matricula.value;
    let marca = frmAltaVehiculo.marca.value;
    let modelo = frmAltaVehiculo.modelo.value;
    let tipo = frmAltaVehiculo.combustible.value;
    let combustible = frmAltaVehiculo.combustible.value;
    let plazas = Number(frmAltaVehiculo.plazas.value);
    
    //Validamos la información
    if(matricula.length == 0 || marca.length == 0 || modelo.length == 0 || isNaN(plazas) || plazas <= 0)
        alert("Datos incorrectos");
    else   
    {
        let vehiculo;
        if(tipo == "coche")
            vehiculo = new Coche(matricula,marca,modelo,combustible,plazas);
        else
            vehiculo = new Moto(matricula,marca,modelo,tipo);
        
        if(agencia.altaVehiculo(vehiculo))
            alert("Vehículo añadido con éxito");
        else
            alert("El vehículo ya estaba registrado");
    }
}

function altaAlquiler()
{
    let dni = Number(frmAltaAlquiler.dni.value);
    let fechaInicio = new Date(frmAltaAlquiler.fechaInicio.value);
    let fechaFin = new Date(frmAltaAlquiler.fechaFin.value);
    let matriculas = frmAltaAlquiler.matriculas.value;
    
    //Validamos la información
    if(isNaN(dni) || dni <= 0 || fechaInicio.length == 0 || fechaFin.length == 0 || matricula.length == 0 || fechaInicio < new Date() || fechaFin < new Date() &&
        matriculas.length == 0)
        alert("Datos incorrectos");
    else   
    {
        let arrayMatriculasfechaInicio = matriculas.split(",");
        let idAlquiler = agencia.alquileres.length + 1;
        let cliente = agencia.buscarCliente(dni);
        let alquiler = new Alquiler(idAlquiler,cliente,arrayMatriculasfechaInicio,fechaFin);
        if(agencia.altaAlquiler(alquiler))
            alert("Alquiler añadido con éxito");
        else
            alert("El alquiler no se ha podido realizar");
    }
}

function bajaAlquiler()
{
    let idAlquiler = Number(frmBajaAlquiler.idAlquiler.value);
    if(isNaN(idAlquiler) || idAlquiler <= 0)
        alert("Datos incorrectos");
    else
    {
        if(agencia.bajaAlquiler(idAlquiler))
            alert("Alquiler eliminado con éxito");
        else
            alert("El alquiler no se ha podido eliminar");
    }
}

function listadoClientes()
{
    let listado = agencia.listadoClientes();
    if(listado.length == 0)
        alert("No hay clientes registrados");
    else
        {
            let oVentana = open("", "_blank", "");
            oVentana.document.open();
            oVentana.document.write(
              "<h1>Listado de clientes:</h1> "
            );
            oVentana.document.write(agencia.listadoClientes());
            oVentana.document.close();
            oVentana.document.title = "Listado Clientes:";
          
          
        }
}

function listadoVehiculos()
{
    let listado = agencia.listadoVehiculos();
    if(listado.length == 0)
        alert("No hay vehículos registrados");
    else
        {
            let oVentana = open("", "_blank", "");
            oVentana.document.open();
            oVentana.document.write(
              "<h1>Listado de vehículos:</h1> "
            );
            oVentana.document.write(agencia.listadoVehiculos());
            oVentana.document.close();
            oVentana.document.title = "Listado Vehículos:";
          
          
        }
}

function listadoAlquileresCliente()
{
    let dni = Number(frmListadoAlquileresCliente.dni.value);
    if(isNaN(dni) || dni <= 0)
        alert("Datos incorrectos");
    else
    {
        let listado = agencia.listadoAlquileresCliente(dni);
        if(listado.length == 0)
            alert("No hay alquileres registrados para ese cliente");
        else
            {
                let oVentana = open("", "_blank", "");
                oVentana.document.open();
                oVentana.document.write(
                  "<h1>Listado de alquileres de ese cliente:</h1> "
                );
                oVentana.document.write(agencia.listadoAlquileresCliente(dni));
                oVentana.document.close();
                oVentana.document.title = "Listado Alquileres:";
              
              
            }
    }
}

function listadoAlquileresFechas()
{
    let fechaInicio = new Date(frmListadoAlquileresFechas.fechaInicio.value);
    let fechaFin = new Date(frmListadoAlquileresFechas.fechaFin.value);
    if(fechaInicio.length == 0 || fechaFin.length == 0 || fechaInicio < new Date() || fechaFin < new Date())
        alert("Datos incorrectos");
    else
    {
        let listado = agencia.listadoAlquileresFechas(fechaInicio,fechaFin);
        if(listado.length == 0)
            alert("No hay alquileres registrados entre esas fechas");
        else
            {
                let oVentana = open("", "_blank", "");
                oVentana.document.open();
                oVentana.document.write(
                  "<h1>Listado de alquileres entre esas fechas:</h1> "
                );
                oVentana.document.write(agencia.listadoAlquileresFechas(fechaInicio,fechaFin));
                oVentana.document.close();
                oVentana.document.title = "Listado Alquileres:";
              
              
            }
    }
}

function listadoCochesElectricos()
{
    let listado = agencia.listadoCochesElectricos();
    if(listado.length == 0)
        alert("No hay coches eléctricos registrados");
    else
        {
            let oVentana = open("", "_blank", "");
            oVentana.document.open();
            oVentana.document.write(
              "<h1>Listado de coches eléctricos:</h1> "
            );
            oVentana.document.write(agencia.listadoCochesElectricos());
            oVentana.document.close();
            oVentana.document.title = "Listado Coches Eléctricos:";
          
          
        }
}