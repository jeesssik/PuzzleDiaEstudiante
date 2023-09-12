
// representación del tablero del juego
var grilla = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

// Para ir guardando la posición vacia del rompecabezas
var posicionVacia = {
  fila:2,
  columna:2
};

// La hacen los chicos: puede ser chequear que este ordenada o chequear contra
// grilla ganadora.
function chequearSiGano(){
  return grillaOrdenada();
  
}

function grillaOrdenada(){
  // guardo la cantidad de filas de la grilla en una variable
  var cantidadFilas = grilla.length;
  var cantidadColumnas = grilla[0].length;

  // En esta variable vamos a guardar el ultimo valor visto en la grilla
  var ultimoValorVisto = 0;
  var valorActual = 0;
  // recorro cada fila columna por columna chequeando el orden de sus elementos
  for(var fila=0; fila < cantidadFilas; fila++){
    for(var columna=0; columna < cantidadColumnas; columna++){
      valorActual = grilla[fila][columna]
      // si el valorActual es menor al ultimoValorVisto entonces no est&aacute; ordenada
      if(valorActual < ultimoValorVisto) return false;

      // actualizamos el valor del ultimoValorVisto
      ultimoValorVisto = valorActual;
    }
  }
  // si llegamos hasta ac&aacute; quiere decir que est&aacute; ordenada
  return true;
}


function intercambiarPosiciones(fila1, columna1, fila2, columna2){
  // Modifico posición en la grilla
  var pieza1 = grilla[fila1][columna1];
  var pieza2 = grilla[fila2][columna2];
  grilla[fila1][columna1] = pieza2;
  grilla[fila2][columna2] = pieza1;

  // Modifico posición en el DOM
  var elementoPieza1 = document.getElementById('pieza'+pieza1);
  var elementoPieza2 = document.getElementById('pieza'+pieza2);

  var padre = elementoPieza1.parentNode;

  var clonElemento1 = elementoPieza1.cloneNode(true);
  var clonElemento2 = elementoPieza2.cloneNode(true);

  padre.replaceChild(clonElemento1, elementoPieza2);
  padre.replaceChild(clonElemento2, elementoPieza1);

  // elementoPieza2.parentNode.replaceChild(clonElemento1, elementoPieza2);
  // elementoPieza1.parentNode.replaceChild(clonElemento2, elementoPieza1);
}



function actualizarposicionVacia(nuevaFila,nuevaColumna){
  posicionVacia.fila = nuevaFila;
  posicionVacia.columna = nuevaColumna;
}

// Esta buena para entender como funcionan los booleanos.
function posicionValida(fila, columna){
  return (fila >= 0 && fila <= 2) && (columna >= 0 && columna <= 2);

}

// Movimiento de fichas, en este caso la que se mueve es
// la blanca intercambiando
// su posición con otro elem
function moverEnDireccion(direccion){

  var nuevaFilaPiezaBlanca;
  var nuevaColumnaPiezaBlanca;


  if(direccion == 40){
    nuevaFilaPiezaBlanca = posicionVacia.fila-1;
    nuevaColumnaPiezaBlanca = posicionVacia.columna;
  }
  else if (direccion == 38) {
    nuevaFilaPiezaBlanca = posicionVacia.fila+1;
    nuevaColumnaPiezaBlanca = posicionVacia.columna;

  }
  else if (direccion == 39) {
    nuevaFilaPiezaBlanca = posicionVacia.fila;
    nuevaColumnaPiezaBlanca = posicionVacia.columna-1;

  }
  else if (direccion == 37) {
    nuevaFilaPiezaBlanca = posicionVacia.fila;
    nuevaColumnaPiezaBlanca = posicionVacia.columna+1;
  }

  if (posicionValida(nuevaFilaPiezaBlanca, nuevaColumnaPiezaBlanca)){
    intercambiarPosiciones(posicionVacia.fila, posicionVacia.columna,
    nuevaFilaPiezaBlanca, nuevaColumnaPiezaBlanca);
    actualizarposicionVacia(nuevaFilaPiezaBlanca, nuevaColumnaPiezaBlanca);
  }

}


// Extras, ya vienen dadas

function mezclarPiezas(veces){
  if(veces<=0){return;}
  var direcciones = [40, 38, 39, 37];
  var direccion = direcciones[Math.floor(Math.random()*direcciones.length)];
  moverEnDireccion(direccion);

  setTimeout(function(){
    mezclarPiezas(veces-1);
  },100);
}

function capturarTeclas(){
  document.body.onkeydown = (function(evento) {
    moverEnDireccion(evento.which);

    var gano = chequearSiGano();
    if(gano) alert('ganaste!');
    evento.preventDefault();
  })
}

function iniciar(){
  mezclarPiezas(60);
  capturarTeclas();
}


iniciar();
