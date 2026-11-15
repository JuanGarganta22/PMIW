//Enlace al video: https://youtu.be/02Fv6DMirW8

let juego;
let imagenCalle;
let framesJugador = [];
let imagenesVallas = [];
let imagenPozo;

let correr;
let lluvia;
let sirena;

function preload() {
  imagenCalle = loadImage("assets/escenario.png");
  imagenesVallas[0] = loadImage("assets/valla1.png");
  imagenesVallas[1] = loadImage("assets/valla2.png");
  imagenesVallas[2] = loadImage("assets/valla3.png");
  imagenPozo = loadImage("assets/pozo.png");

  for (let i = 0; i < 8; i++) {
    framesJugador[i] = loadImage("assets/personaje00" + i + ".png");
  }
  
  correr = loadSound("assets/correr.mp3");
  sirena = loadSound("assets/sirena.mp3");
  
}

function setup() {
  createCanvas(800, 400);
  juego = new Juego();
}

function draw() {
  juego.actualizar();
  juego.dibujar();
  
  //jugador corre
  if (juego.estado === "jugando") {
    if (correr.isLoaded() && !correr.isPlaying()) {
      correr.setVolume(1);
      correr.loop();
    }
  } else {
    if (correr.isPlaying()) {
      correr.stop();
    }
  }

  //sirenas
  if (juego.estado === "jugando") {
    if (sirena.isLoaded() && !sirena.isPlaying()) {
      sirena.setVolume(0.2);
      sirena.loop();
    }
  } else {
    if (sirena.isPlaying()) {
      sirena.stop();
    }
  }
  
}

function keyPressed() {
  // Comenzar desde la pantalla inicial
  if (juego.estado === "inicio" && keyCode === ENTER) {
    juego.comenzar();
    userStartAudio();
  }
  // Reiniciar después de ganar o perder
  if (
    (juego.estado === "victoria" || juego.estado === "gameover") &&
    (key === "r" || key === "R")
  ) {
    juego.reiniciar();
  }

  if (keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW) {
    return false;
  }
}

//Escenario

class Escenario {
  constructor() {
    this.y = 0;
    this.velocidad = 3;
    this.ancho = width;
    this.alto = this.ancho * (imagenCalle.height / imagenCalle.width);
  }

  actualizar() {
    this.y += this.velocidad;

    if (this.y >= this.alto) {
      this.y = 0;
    }
  }

  dibujar() {
    image(imagenCalle, 0, this.y, this.ancho, this.alto);
    image(imagenCalle, 0, this.y - this.alto, this.ancho, this.alto);
  }
}

//Jugador

class Jugador {
  constructor() {
    this.x = 400;
    this.y = 305;
    this.velocidad = 4;
    this.ancho = 65;
    this.alto = 73;
  }

  actualizar() {
    if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
      this.x -= this.velocidad;
    }
    if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
      this.x += this.velocidad;
    }
      this.x = constrain(this.x, 255, 545);
  }

  dibujar() {
    let indice = floor(frameCount / 8) % framesJugador.length;

    image(
      framesJugador[indice],
      this.x - this.ancho / 2,
      this.y - this.alto / 2,
      this.ancho,
      this.alto
    );
  }
}

//Obstaculos

class Obstaculo {
  constructor(x, y, tipo, imagen) {
    this.x = x;
    this.y = y;
    this.tipo = tipo;
    this.imagen = imagen;
    this.velocidad = 3;

    if (tipo === "pozo") {
      this.ancho = 95;
      this.alto = 80;
    } else {
      this.ancho = 65;
      this.alto = 48;
    }
  }

  actualizar() {
    this.y += this.velocidad;
  }

  dibujar() {
    image(
      this.imagen,
      this.x - this.ancho / 2,
      this.y - this.alto / 2,
      this.ancho,
      this.alto
    );
  }
}

//Interfaz

class Interfaz {
  dibujar(juego) {
    // Vidas
    textSize(22);
    textAlign(LEFT, CENTER);

    for (let i = 0; i < 3; i++) {
      if (i < juego.vidas) {
        fill(255, 50, 70);
      } else {
        fill(100);
      }

       text("♥", 25 + i * 30, 30);
    }

    // Distancia
    fill(255);
    textAlign(RIGHT, CENTER);
    text("Distancia: " + floor(juego.distancia) + " / 300", 775, 30);

    // Victoria o derrota
    if (juego.estado === "victoria" || juego.estado === "gameover") {
      fill(0, 0, 0, 190);
      rect(0, 0, width, height);
      fill(255);
      textAlign(CENTER, CENTER);
      textSize(42);

      if (juego.estado === "victoria") {
        //text("¡GANASTE!", width / 2, height / 2 - 30);
        
        push();
    fill(0, 0, 0, 200);
    stroke(100);
    strokeWeight(1);
    rect(220, 30, 360, 310, 8);

    textAlign(CENTER, CENTER);
    
    let tinteRojo = map(sin(frameCount * 0.05), -1, 1, 120, 255);
    fill(tinteRojo, 40, 40);
    textSize(20);
    textStyle(BOLD);
    
    text("¡GANASTE!", width / 2, height / 2 - 30);
    
    text("— CRÉDITOS —", width / 2, 60);

    fill(230);
    textSize(14);
    textStyle(BOLD);
    text("HISTORIA:", width / 2, 105);
    fill(180);
    textSize(13);
    textStyle(NORMAL);
    text("El misterio del almacen 10", width / 2, 125);

    fill(230);
    textSize(14);
    textStyle(BOLD);
    text("AUTOR:", width / 2, 165);
    fill(180);
    textSize(13);
    textStyle(NORMAL);
    text("Juan Garganta", width / 2, 185);
    text("Francesca Bonfiglio Ros", width / 2, 205);
    pop();
        
      } else {
        //text("PERDISTE :(", width / 2, height / 2 - 30);
        
        push();
    fill(0, 0, 0, 200);
    stroke(100);
    strokeWeight(1);
    rect(220, 30, 360, 310, 8);

    textAlign(CENTER, CENTER);
    
    fill(180);
    textSize(23);
    text("PERDISTE :(", width / 2, 60);
    
    let tinteRojo = map(sin(frameCount * 0.05), -1, 1, 120, 255);
    fill(tinteRojo, 40, 40);
    textSize(20);
    textStyle(BOLD);
    
    text("— CRÉDITOS —", width / 2, 100);

    fill(230);
    textSize(14);
    textStyle(BOLD);
    text("HISTORIA:", width / 2, 145);
    fill(180);
    textSize(13);
    textStyle(NORMAL);
    text("El misterio del almacen 10", width / 2, 165);

    fill(230);
    textSize(14);
    textStyle(BOLD);
    text("AUTOR:", width / 2, 205);
    fill(180);
    textSize(13);
    textStyle(NORMAL);
    text("Juan Garganta", width / 2, 225);
    text("Francesca Bonfiglio Ros", width / 2, 245);
    pop();
      }
      textSize(20);
      text("R para reiniciar", width / 2, 285);
    }
  }

  dibujarInicio() {
    fill(0, 0, 0, 200);
    rect(0, 0, width, height);
    textAlign(CENTER, CENTER);
    fill(255);
    textSize(48);
    text("PERSECUCIÓN", width / 2, 105);
    textSize(21);
    text("Escapa de la escena del crimen lo antes posible", width / 2, 165);
    textSize(19);
    text("Movimiento con flechas o A y D", width / 2, 220);
    text("Tenés 3 vidas. Llegá a los 300 puntos de distancia", width / 2, 255);
    fill(255, 220, 80);
    textSize(25);
    text("Tocar enter para jugar", width / 2, 325);
  }
}

//Juego


class Juego {
  constructor() {
    this.escenario = new Escenario();
    this.jugador = new Jugador();
    this.interfaz = new Interfaz();
    this.obstaculos = [];
    this.carriles = [305, 400, 495];
    this.contadorObstaculos = 0;
    this.proximoObstaculo = 70;
    this.vidas = 3;
    this.distancia = 0;
    this.estado = "inicio";
    this.velocidadNormal = 3;
    this.velocidadRapida = 6;
  }

  comenzar() {
    this.estado = "jugando";
  }

  actualizar() {
    if (this.estado !== "jugando") {
      return;
    }

    // Determinar velocidad según la distancia
    let velocidadActual;

    if (this.distancia >= 150) {
      velocidadActual = this.velocidadRapida;
    } else {
      velocidadActual = this.velocidadNormal;
    }

    // Actualizar velocidad del escenario
    this.escenario.velocidad = velocidadActual;
    this.escenario.actualizar();

    // Actualizar jugador
    this.jugador.actualizar();

    // Actualizar distancia
    this.distancia += 0.1;

    // Comprobar victoria
    if (this.distancia >= 300) {
      this.distancia = 300;
      this.estado = "victoria";
      return;
    }

    // Generación de obstáculos
    this.contadorObstaculos++;
    if (this.contadorObstaculos >= this.proximoObstaculo) {
      this.generarObstaculo();
      this.contadorObstaculos = 0;
      this.proximoObstaculo = random(85, 115);
    }

    // Actualizar obstáculos y detectar colisiones
    for (let i = this.obstaculos.length - 1; i >= 0; i--) {
      let obstaculo = this.obstaculos[i];
      obstaculo.velocidad = velocidadActual;
      obstaculo.actualizar();

      if (this.detectarColision(obstaculo)) {
        this.vidas--;

        this.obstaculos.splice(i, 1);

        if (this.vidas <= 0) {
          this.vidas = 0;
          this.estado = "gameover";
          return;
        }

        continue;
      }
      if (obstaculo.y > height + 60) {
        this.obstaculos.splice(i, 1);
      }
    }
  }
  
  generarObstaculo() {
    let carril = floor(random(0, 3));
    let x = this.carriles[carril];
    let tipo;
    let imagen;
    if (random() < 0.25) {
      tipo = "pozo";
      imagen = imagenPozo;
    } else {
      tipo = "valla";
      let indice = floor(random(0, imagenesVallas.length));
      imagen = imagenesVallas[indice];
    }
    let obstaculo = new Obstaculo(x, -50, tipo, imagen);
    this.obstaculos.push(obstaculo);
  }

  detectarColision(obstaculo) {
    let jugadorIzquierda = this.jugador.x - 21;
    let jugadorDerecha = this.jugador.x + 21;
    let jugadorArriba = this.jugador.y - 27;
    let jugadorAbajo = this.jugador.y + 27;
    let obstaculoIzquierda = obstaculo.x - obstaculo.ancho * 0.4;
    let obstaculoDerecha = obstaculo.x + obstaculo.ancho * 0.4;
    let obstaculoArriba = obstaculo.y - obstaculo.alto * 0.4;
    let obstaculoAbajo = obstaculo.y + obstaculo.alto * 0.4;

    return (
      jugadorIzquierda < obstaculoDerecha &&
      jugadorDerecha > obstaculoIzquierda &&
      jugadorArriba < obstaculoAbajo &&
      jugadorAbajo > obstaculoArriba
    );
  }

  dibujar() {
    this.escenario.dibujar();
    for (let obstaculo of this.obstaculos) {
      obstaculo.dibujar();
    }
    this.jugador.dibujar();
    if (this.estado === "inicio") {
      this.interfaz.dibujarInicio();
    } else {
      this.interfaz.dibujar(this);
    }
  }

  reiniciar() {
    this.vidas = 3;
    this.distancia = 0;
    this.obstaculos = [];
    this.contadorObstaculos = 0;
    this.proximoObstaculo = 70;
    this.escenario.y = 0;
    this.escenario.velocidad = this.velocidadNormal;
    this.jugador.x = 400;
    this.estado = "jugando";
  }
}
