//Funcion con parametros
function dibujarEscenario(velFondo, velPiso) {
  fondoX = (fondoX - velFondo) % 5000;
  image(fondo, fondoX, -300);
  pisoX = (pisoX - velPiso) % 5000;
  image(piso, pisoX, 300);
}

//Funcion con parametros
function gestionarEstados(tiempoActual, t1, t2, t3, t4) {
  if (tiempoActual < t1) {
    estado = 0;
  } else if (tiempoActual < t2) {
    estado = 1;
  } else if (tiempoActual < t3) {
    estado = 2;
  } else if (tiempoActual < t4) {
    estado = 3;
  } else {
    estado = 4;
  }
}

//Funcion que retorna valor
function limitarValor(valor, limiteMaximo) {
  if (valor > limiteMaximo) {
    return limiteMaximo;
  }
  return valor;
}
