console.log("Initializing calculator");

display = document.getElementById("display");
equal = document.getElementById("equal");
del = document.getElementById("del");
c = document.getElementById("c");
sqrt = document.getElementById("sqrt");

//-- Digitos y operadores
let digito = document.getElementsByClassName("digito");
let operacion = document.getElementsByClassName("operacion");


//-- Estados de la calculadora
const ESTADO = {
 INIT: 0,
 OP1: 1,
 OPERATION: 2,
 OP2: 3,
}

 let estado = ESTADO.INIT;

 //-- Digitos
 for(i=0; i<digito.length; i++){
    digito[i].onclick=(ev)=>{
    digitos(ev.target.value);
    console.log(`ESTADO ${estado}`);
   }
 }

 //-- Operadores
 for(i=0; i<operacion.length; i++){
    operacion[i].onclick=(ev)=>{
        operaciones(ev.target.value);
     console.log(`ESTADO ${estado}`);
   }
 }

 function digitos(num){
   if (estado == ESTADO.INIT) {
     display.innerHTML = num;
     estado = ESTADO.OP1;
   }else if (estado == ESTADO.OP1){
     display.innerHTML += num;
   } else if (estado == ESTADO.OPERATION) {
     display.innerHTML += num;
     estado = ESTADO.OP2;
   }else if (estado == ESTADO.OP2) {
     display.innerHTML +=  num;
   }
   
 }

 function operaciones(opera){
   if (estado == ESTADO.OP1) {
     display.innerHTML += opera;
     estado = ESTADO.OPERATION;
   }
  
}

 // Igual
 equal.onclick = () => {
   display.innerHTML = eval(display.innerHTML);
   estado = ESTADO.OP1;
   
 }

 // Borrar todo
c.onclick = () => {
  display.innerHTML = "";
  estado = ESTADO.OP1;

}

// Borrar lo ultimo añadido
del.onclick = () => {
  if (display.innerHTML == "0"){
    display.innerHTML = "";
  }else{
    display.innerHTML = display.innerHTML.slice(0,-1);
  }
  estado = ESTADO.OP1;
  
}

// Raiz
sqrt.onclick = () => {
 display.innerHTML = Math.sqrt(display.innerHTML);
}
