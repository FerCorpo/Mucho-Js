class Arbol{
    _codigo;
    _tallaje;
    _especie;
    constructor(codigo,tallaje,especie){
        this._codigo=codigo;
        this._tallaje=tallaje;
        this._especie=especie;
    }
    get especie() {
        return this._especie;
    }
    set especie(value) {
        this._especie = value;
    }
    get tallaje() {
        return this._tallaje;
    }
    set tallaje(value) {
        this._tallaje = value;
    }
    get codigo() {
        return this._codigo;
    }
    set codigo(value) {
        this._codigo = value;
    }

    toHTMLRow(){
        //Mejorable
        let salida="<tr>";
        //let atributos= Object.keys(this);
        let valores = Object.values(this);
        //valor in valores nos devuelve la posicion de la tabla [0,1,2]
        //mientras que valores of nos devuelve sus valores[1001,25,"Pino"] tambien por que hemos usado el Objec.values(this)
        for(let valor of valores)
            salida+="<td>"+valor+"</td>";

        salida+="</tr>";

        /*
        salida="<tr><td>"+
            this.codigo+"</td><td>"+
            this.tallaje+"</td><td>"+
            this.especie+"</td></tr>"
        */
        return salida;
    }
}

class Perenne extends Arbol{
    _frutal;
    constructor(codigo,tallaje,especie,frutal){
        super(codigo,tallaje,especie)
        this.frutal=frutal;
    }
    get frutal() {
        return this._frutal;
    }
    set frutal(value) {
        this._frutal = value;
    }
    toHTMLRow(){
        let fila=super.toHTMLRow();
        fila=fila.slice(0,fila.length -5);//slice() le mando el inicio de donde quiero cortar el String y el -5 para que me elimine el </tr> que son 5 digitos
        fila+="<td>" + (this.frutal ? "SI" : "NO") + "</td></tr>";
        return fila;
    }
}

class Caduco extends Arbol {
    _mesFloracion;
    constructor(codigo,tallaje,especie,mesFloracion){
        super(codigo,tallaje,especie);
        this._mesFloracion=mesFloracion;
    }
    get mesFloracion() {
        return this._mesFloracion;
    }
    set mesFloracion(value) {
        this._mesFloracion = value;
    }
    
    toHTMLRow(){
        let fila=super.toHTMLRow();
        fila=fila.slice(0,fila.length -5); //para quitar el tr
        fila+="<td>" + this.mesFloracion+"</td></tr>";
        return fila;
    }
}

class Vivero{
    _arboles;
    constructor(){
        this._arboles=[];
    }
    get arboles() {
        return this._arboles;
    }
    set arboles(value) {
        this._arboles = value;
    }

    altaArbol(oArbol){
        //comprobar que el oArbol no pertenece al array de arboles
        //MEJORABLE
        /*
        let encontrado=false;
        let i=0;

        while(i<this.arboles.length && !encontrado){

            if(this.arboles[i].codigo==oArbol.codigo){
                encontrado=true;
            }else{
                i++;
            }
        }*/

        let encontrado = this.arboles.filter((elem) => elem.codigo == oArbol.codigo).length==1;
        //para entenderlo mejor this.arboles recorrido por un bucle (filter) y elem es el nombre
        //de la variable que le damos a cada uno de esos valores, algo asi como el for i in this.arboles, en este caso seria la i
        //despues ya podemos trabajar con elem de forma convencional

        if(!encontrado){
            this.arboles.push(oArbol);
            return true;
        }else{
            return false;
        }


    }

    buscarArbol(codigo){
        let i=0,
        encontrado=false;

        while(i<this.arboles.length && !encontrado){
            if(this.arboles[i].codigo==codigo){
                encontrado=true;
            }else{
                i++
            }
        }

        if(encontrado){
            return i;
        }else{
            return -1;
        }
    }

    tallajeArbol(codigo,tallaje){
        let mensajeSalida="";
        let posicion = this.buscarArbol(codigo);
        if(posicion<0){//osea no encontrado, por como es nuestra funcion
            mensajeSalida+="Arbol no registrado";
        }else if(this.arboles[posicion].tallaje>tallaje){
            mensajeSalida+="Tallaje inferior al registrado";
        }else{
            this.arboles[posicion].tallaje=tallaje;
            mensajeSalida+="Correcto, tallaje actualizado";
            mensajeSalida+=this.arboles[posicion] instanceof Perenne?"Perenne":"Caduco";
        }
        return mensajeSalida;
    }

    listadoPerennes(minAltura){
        let listadoPerenne=this.arboles.filter(
            (arbol) => arbol instanceof Perenne && arbol.tallaje >= minAltura
        );

        listadoPerenne.sort((a1,a2) => a2.tallaje-a1.tallaje);

        let salida="<table border='1'>";
        salida+=
            "<thead><tr><th>Codigo</th><th>Tallaje</th><th>Especie</th><th>Frutal</th></thead><tbody>";
            for(let arbol of listadoPerenne){
                salida+=arbol.toHTMLRow();
            }
            salida+="</tbody></table>";
            return salida;
    }

    listadoCaducos(mesFloracion){
        let listadoCaduco=this.arboles.filter(
            (arbol) => arbol instanceof Caduco && arbol.mesFloracion == mesFloracion
        );

        let salida="<table border='1'>";
        salida+=
        "<thead><tr><th>Codigo</th><th>Tallaje</th><th>Especie</th><th>Mes floracion</th></thead><tbody>";

        for(let arbol of listadoCaduco){
            salida+=arbol.toHTMLRow();
        }
        salida+="</tbody></table>";
        return salida;
    }

    totalArbolesVenta(){
        let contador=0;
        for(let arbol of this.arboles){
            if(arbol instanceof Caduco && arbol.tallaje >100){
                contador++;
            }else if(arbol instanceof Perenne && arbol.frutal&& arbol.tallaje>80){
                contador++;
            }else if(arbol instanceof Perenne && !arbol.frutal && arbol.tallaje>120){
                contador++;
            }
        }
        return contador;
    }

    siguienteCodigoArbol(){
        if(this.arboles.length==0){
            return 1;
        }else{
            return this.arboles[this.arboles.length -1].codigo + 1;
        }
    }
}