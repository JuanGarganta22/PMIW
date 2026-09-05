let segundos;
let fondo;
let piso;
let estado;
let a, b, c, d;
let contadorGeneral;
let pisoX;
let fondoX;
let titulo;
let tiempoInicial;
let reinicio1;
let reinicio2;
let reinicio3;
let cuentaX;
let cuentaX2;
let cuentaX3;
let personaje = [];


function preload() {
  fondo = (loadImage('/assets/fondoP.png'));
  piso = (loadImage('/assets/pisoP.png'));
  titulo = (loadImage('/assets/titulo.png'));
  reinicio1 = (loadImage('assets/reinicio1.png'));
  reinicio2 = (loadImage('assets/reinicio2.png'));
  reinicio3 = (loadImage('assets/reinicio3.png'));
  for ( let i = 1; i < 16; i++ ) {
    personaje.push( loadImage('/assets/C'+i+'.png') );
  }
}

function setup() {
  createCanvas (800, 600);
  a = b = c = d = 0;
  contadorGeneral = 0;
  pisoX = 0;
  fondoX = -300;
  tiempoInicial = 0;
  cuentaX = 0;
  cuentaX2 = 0;
  cuentaX3 = 0;
}


function draw() {
  segundos = (millis() - tiempoInicial)/1000;
  background (155);

  gestionarEstados(segundos, 4, 15, 19, 28);        

  if (estado == 0) {                                 //Entrada caminando del personaje 
    dibujarEscenario( 1, 4);
    image(personaje[a], contadorGeneral*2, 300);
    contadorGeneral = limitarValor(contadorGeneral, 150);
    a = floor(segundos * 5) % 5;
  } else if (estado == 1) {                         //Personaje corriendo 
    dibujarEscenario( 3, 10);
    image(personaje[b], 50 + contadorGeneral*2, 290)
      b = 5 + (floor(segundos * 8) % 5);
      contadorGeneral = limitarValor(contadorGeneral, 150);
  } else if (estado == 2) {                        //Saltos del personaje al final
    dibujarEscenario( 2, 6);
    image(personaje[c], contadorGeneral*2, 240)
      c = 9 + (floor(segundos * 6) % 4);
  } else if (estado == 3) {     //Titulo final y cuenta regresiva
    image(fondo, fondoX, -300);
    image(piso, pisoX, 300);
    image(titulo, 50, d);
    d = limitarValor(d + 5, 150);

    image(reinicio3, -150 + cuentaX3, 350);

    if (segundos > 21) {
      image(reinicio2, -500 + cuentaX2, 350);
    }
    if (segundos > 24) {
      image(reinicio1, -500 + cuentaX, 350);
    }


    if (cuentaX3 < 330 || segundos > 21) {
      cuentaX3 = cuentaX3 + 10;
    }


    if (segundos > 22) {
      if (cuentaX2 < 680 || segundos > 24) {
        cuentaX2 = cuentaX2 + 10;
      }
    }


    if (segundos > 25) {
      if (cuentaX < 680 || segundos > 27) {
        cuentaX = cuentaX + 10;
      }
    }
  } else if (estado == 4) {  //Reinicio de animacion
    a = b = c = d = 0;
    contadorGeneral = 0;
    pisoX = 0;
    fondoX = -300;
    tiempoInicial = millis();
    cuentaX = 0;
    cuentaX2 = 0;
    cuentaX3 = 0;
  }
  contadorGeneral ++;
}
