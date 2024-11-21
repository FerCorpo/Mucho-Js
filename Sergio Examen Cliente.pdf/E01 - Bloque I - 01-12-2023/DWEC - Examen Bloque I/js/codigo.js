let tienda = new Tienda();

datosIniciales();

function datosIniciales() {
  let tienda = new Tienda();
  tienda.altaCatalogo(new Portatil("HP","hp1",300,true,14));
  tienda.altaCatalogo(new Portatil("Xiaomi","xiaomi1",400,false,15));
  tienda.altaCatalogo(new Sobremesa("Asus","asus1",400,"4090"));
  tienda.altaCatalogo(new Sobremesa("Honor","honor1",500,"3060"));
}

// Gestión de formularios
function gestionFormularios(sFormularioVisible) {
  ocultarTodosLosFormularios();

  // Hacemos visible el formulario que llega como parámetro
  switch (sFormularioVisible) {
    case "frmAltaCatalogo":
      frmAltaCatalogo.style.display = "block";
      break;
    case "frmEntradaStock":
      frmEntradaStock.style.display = "block";
      break;
    case "frmSalidaStock":
      frmSalidaStock.style.display = "block";
      break;
  }
}

function ocultarTodosLosFormularios() {
  let oFormularios = document.querySelectorAll("form");

  for (let i = 0; i < oFormularios.length; i++) {
    oFormularios[i].style.display = "none";
  }
}

function aceptarAltaCatalogo() {
  // Añadir código
  let marca = frmAltaCatalogo.txtMarca.value;
  let modelo = frmAltaCatalogo.txtModelo.value;
  let precio = Number(frmAltaCatalogo.txtPrecio.value);
  let ordenador = frmAltaCatalogo.rbtOrdenador.value;
  let pulgadasPor = Number(frmAltaCatalogo.txtPulgadas.value);
  let discoPor = frmAltaCatalogo.rbtDiscoSSD.value;
  let graficaSob = frmAltaCatalogo.txtGrafica.value;

  let añadido;
  if(ordenador == "sobremesa" )
  {
    let sobremesa = new Sobremesa(marca,modelo,precio,graficaSob);
    añadido = tienda.altaCatalogo(sobremesa);
    

  }
  else
  {
    let portatil = new Portatil(marca,modelo,precio,discoPor,pulgadasPor)
    
    añadido = tienda.altaCatalogo(portatil);
  }

  if(añadido)
    alert("Ordenador añadido con éxito");
  else
    alert("El ordenador ya estaba en el catálogo");


    

  
}

function aceptarEntradaStock() {
  // Añadir código
  let marca = frmEntradaStock.txtMarca.value;
  let modelo = frmEntradaStock.txtModelo.value;
  let unidades = Number(frmEntradaStock.txtUnidades.value);

  alert(tienda.entradaStock(marca,modelo,unidades));


}

function aceptarSalidaStock() {
  // Añadir código
  let marca = frmSalidaStock.txtMarca.value;
  let modelo = frmSalidaStock.txtModelo.value;
  let unidades = parseInt(frmSalidaStock.txtUnidades.value);
  debugger;
  alert(tienda.salidaStock(marca,modelo,unidades));
}

function mostrarListadoCatalogo() {
  let oVentana = open("", "_blank", "");
  oVentana.document.open();
  oVentana.document.write(
    "<h1>Listado de árboles perennes de altura mínima: "
  );
  oVentana.document.write(tienda.listadoCatalogo());
  oVentana.document.close();
  oVentana.document.title = "Listado perennes";


  // Añadir código
}

function mostrarListadoStock() {
  // Añadir código
  let oVentana = open("", "_blank", "");
  oVentana.document.open();
  oVentana.document.write(
    "<h1>Listado de árboles perennes de altura mínima: "
  );
  oVentana.document.write(tienda.listadoStock());
  oVentana.document.close();
  oVentana.document.title = "Listado perennes";

}

function mostrarTotales() {
  
  let numSobremesa = tienda.numSobremesaStock();
  let numPortatiles = tienda.numPortatilesStock()
  let importeTotal = tienda.importeTotalStock();

  console.log(numSobremesa);
  console.log(numPortatiles);
  console.log(importeTotal);
  
  // Añadir código
}
