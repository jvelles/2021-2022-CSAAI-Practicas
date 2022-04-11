console.log("Ejecutando JS...");

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 600;

//Declaramos variables
let xtabla = 260;
let ytabla = 550;
let xbola = 300;
let ybola = 300;
let radio = 15;
let vidas = 3;
let puntos = 0;

//sonidos
const raqueta = new Audio("raqueta.mp3");
const fallo = new Audio("fallas.mp3");
const fin = new Audio("pierdes.mp3");
const win = new Audio("victoria.mp3");

//Dificultad
const buttonF = document.getElementById("buttonF");
const buttonM = document.getElementById("buttonM");
const buttonD = document.getElementById("buttonD");

//Ladrillos
let xinit = 35;
let yinit = 60;
let xincremento = 60;
let yincremento = 50 ;
let filas = 5;
let columnas = 9;
var arraybloques = new Array(filas*columnas);
let b = 0;
let alturaladrillo = 20;
let anchuraladrillo = 50;

//Velocidades de la bola
let velx = 6;
let vely = -2;

//Estados
const ESTADO = {
  INIT : 0,
  BEGIN: 1,
  JUGANDO : 2,
  FIN : 4,
  WIN : 5
}
let estado = ESTADO.INIT 

for (i = 0; i < filas; i++){
  for(j = 0; j < columnas; j++){
      var bloque = {
          x : xinit + j * xincremento,
          y : yinit + i * yincremento,
          estado : 1,
      };
      arraybloques[b] = bloque; 
      b = b + 1; 
  }
}

//Color a cada fila
for (b = 36; b < 45; b++){   
  arraybloques[b].color = "#562588"; 
}
for (b = 27; b < 36; b++){   
  arraybloques[b].color = "#ffff00"; 
}
for (b = 18; b < 27; b++){   
  arraybloques[b].color = "#00ffff"; 
}
for (b = 9; b < 18; b++){   
  arraybloques[b].color = "#00ff00"; 
}
for (b = 0; b < 9; b++){   
  arraybloques[b].color = "#b4b4b4"; 
}


function pala(){
    ctx.beginPath();
    ctx.rect(xtabla, ytabla, 80, 20);
    ctx.fill(); 
    ctx.strokeStyle = 'lightblue';
    ctx.setLineDash([]); 
    ctx.stroke() 
  ctx.closePath();
}

function bola(){
    ctx.beginPath();
    ctx.arc(xbola, ybola, radio, 0, 2 * Math.PI); 
    ctx.fill(); 
    ctx.strokeStyle = 'lightblue'; 
    ctx.setLineDash([]); 
    ctx.stroke() 
  ctx.closePath();
}

function bloques(){
  for (b = 0; b < filas*columnas; b++){
      if (arraybloques[b].estado == 1){
          ctx.beginPath();
              ctx.rect(arraybloques[b].x,arraybloques[b].y,anchuraladrillo,alturaladrillo);
              ctx.fillStyle = arraybloques[b].color;
              ctx.strokeStyle = 'black';
              ctx.setLineDash([]);
              ctx.fill();
              ctx.stroke()
          ctx.closePath();
      }
  }
}

function red(){
    ctx.beginPath();    
    ctx.moveTo( 0, 570);
    ctx.lineTo(600, 570); 
    ctx.setLineDash([10, 10]); 
    ctx.strokeStyle = 'cyan'; 
    ctx.stroke();
  ctx.closePath();
}

function vida(){
  ctx.font = "20px Arial";
    ctx.fillStyle = 'white'
    ctx.fillText("Vidas:", 20, 30);
    ctx.fillText(vidas, 80, 30);
}

function puntuación(){
  ctx.font = "20px Arial";
    ctx.fillStyle = 'white'
    ctx.fillText("Puntos:", 490, 30);
    ctx.fillText(puntos, 560, 30);
}

function victoria(){
  found = false;
  b = 0; 
  while (found == false && b < filas*columnas){
      if (arraybloques[b].estado == 1){
          found = true;
      }
     b = b + 1;
  }
  if (found == false){
    for (b = 0;  b < columnas*filas; b++){
      arraybloques[b].estado = 1
      win.play();
    }  
  estado = ESTADO.WIN;
  puntos = 0;
  vidas = 3;
  }
}

function derrota(){
  if (estado == ESTADO.FIN){
    estado = ESTADO.INIT;
    vidas = 3;
    puntos = 0;
    //al acabar, todos los ladrillos se reinician
    for (b = 0; b < 9; b++){
      arraybloques[b].estado = 1;
      arraybloques[b].color = "#b4b4b4";
    }
    for (b = 9; b < 18; b++){
      arraybloques[b].estado = 1;
      arraybloques[b].color = "#00ff00";
    }
    for (b = 18; b < 27; b++){
      arraybloques[b].estado = 1;
      arraybloques[b].color = "#00ffff";
    }
    for (b = 27; b < 36; b++){
      arraybloques[b].estado = 1;
      arraybloques[b].color = "#ffff00";
    }
    for (b = 36; b < 45; b++){
      arraybloques[b].estado = 1;
      arraybloques[b].color = "#562588";
    }

  }
}

function update(){
  // Algoritmo de animacion:
  if (estado == ESTADO.JUGANDO){
    // movimiento bola
    if (xbola < 10 || xbola >= (canvas.width - 10) ) {
      velx = -velx;
    }if(ybola <= 10 || ybola >= (canvas.height-10 )) {
      vely = -vely;
    }
    //Actualizar la posición
    xbola = xbola + velx;
    ybola = ybola + vely;

    //rebote pala        
      if (xbola >= xtabla - radio && xbola <= (xtabla + 90) &&
    ybola >= (ytabla - radio) && ybola <=(ytabla + 30 - radio)){
      vely = vely * -1;
      raqueta.play();
      
    }
    
    //rebote en ladrillos
    for (var b in arraybloques){
      bloque = arraybloques[b];
      if (xbola >= bloque.x && xbola <=(bloque.x + anchuraladrillo + radio) 
          && ybola >= (bloque.y) && ybola <=(bloque.y + alturaladrillo + radio) 
          && bloque.estado == 1){
          bloque.estado = 0; //el bloque desaparece cuando lo toca la bola
          vely = vely * -1;
          //Puntuación variable de los ladrillos
          if (bloque.color == "#562588"){
            puntos = puntos + 1;
          }
          if (bloque.color == "#ffff00"){
            puntos = puntos + 5;
          }
          if (bloque.color == "#00ffff"){
            puntos = puntos + 10;
          }
          if (bloque.color == "#00ff00"){
            puntos = puntos + 15;
          }
          if (bloque.color == "#b4b4b4"){
            puntos = puntos + 30;
          }
      }
    }
    
    //Cuando fallas
    if (ybola > 570){
      estado = ESTADO.INIT;
      vidas = vidas - 1;
      fallo.play();
    }

    //Si las vidas llegan a 0 pierdes
    if (vidas == 0){
      estado = ESTADO.FIN;
      fin.play();
    }

    
  }

  //Limites raqueta 
  if (xtabla < 0) {
    xtabla = 0;
  }
  if (xtabla > 520){
    xtabla = 520;
  }
    
  //
  ctx.clearRect(0, 0, canvas.width, canvas.height);


    pala();
    bola();
    bloques();
    vida();
    puntuación();
    derrota();
    red();
    victoria();

  //Ejecutar update 
  requestAnimationFrame(update);

  if (estado == ESTADO.INIT) 
  {   
      xbola = 300;
      ybola = 500;
      xRaqueta = 260;
      yRaqueta = 550;
      //botones dificultad 
      //FACIL
      buttonF.onchange = () => {
        velx = 3;
        vely = -1;
        radio = 20;
        window.onkeydown = (e) => {
          // Movimientos
          switch (e.key) {
            case "ArrowLeft": //izq
              xtabla = xtabla - 40;
              break;
            case "ArrowRight": //drch
              xtabla = xtabla + 40;
              break;
            case " ":
              estado = ESTADO.JUGANDO;
            break;
          }
        }
      }
      //MEDIO
      buttonM.onchange = () => {
        velx = 6;
        vely = -2;
        radio = 15;
        window.onkeydown = (e) => {
          // Movimientos
          switch (e.key) {
            case "ArrowLeft": //izq
              xtabla = xtabla - 30;
              break;
            case "ArrowRight": //drch
              xtabla = xtabla + 30;
              break;
            case " ":
              estado = ESTADO.JUGANDO;
            break;
            }
          }
        }
      //DIFICIL
      buttonD.onchange = () => {
        velx = 10;
        vely = -3;
        radio = 10;
        window.onkeydown = (e) => {
          // Movimientos
          switch (e.key) {
            case "ArrowLeft": //izq
              xtabla = xtabla - 20;
              break;
            case "ArrowRight": //drch
              xtabla = xtabla + 20;
              break;
            case " ":
              estado = ESTADO.JUGANDO;
            break;
          }
        }
      }
      //para que cada vez que vuelva a empezar empiece moviendose la bola hacia arriba
      if(vely >0){
        vely = -vely;
      };
    }
  
  //estado ganas
  if (estado ==  ESTADO.WIN){
    estado = ESTADO.INIT;
  }
}

//mover raqueta según lo que entra por el teclado
window.onkeydown = (e) => {
    //-- Según la tecla se hace una cosa u otra
    switch (e.key) {
      case "ArrowLeft": //izq
        xtabla = xtabla - 30;
        break;
      case "ArrowRight": //drch
        xtabla = xtabla + 30;
        break;
      case " ":
        estado = ESTADO.JUGANDO;
      break;
    }
  }

update();