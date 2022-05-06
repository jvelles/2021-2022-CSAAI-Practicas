console.log("Ejecutando JS....")

//-- Obtener elementos del DOM
const canvas = document.getElementById('canvas');
const img = document.getElementById('imagesrc');
const ctx = canvas.getContext('2d');

const img1 = document.getElementById('img1');
const img2 = document.getElementById('img2');
const img3 = document.getElementById('img3');
// Deslizador
const deslizador_R = document.getElementById('deslizador_R');
const deslizador_G = document.getElementById('deslizador_G');
const deslizador_B = document.getElementById('deslizador_B');

// Valor del deslizador
const range_value_R = document.getElementById('range_value_R');
const range_value_G = document.getElementById('range_value_G');
const range_value_B = document.getElementById('range_value_B');

//Botones
const gray = document.getElementById('gray');
const original = document.getElementById('original');
const especular = document.getElementById('especular');
const bocaabajo = document.getElementById('bocaabajo');
const negativo = document.getElementById('negativo');



img.onload = function () {

  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0,0);

  console.log("Imagen lista...");
};

img1.onclick = () => {
  img.src="bunny.jpg";
}
img2.onclick = () => {
  img.src="bunny1.jpg";
}
img3.onclick = () => {
  img.src="bunny2.jpg";
}

function colors(){

  ctx.drawImage(img, 0,0);

  let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  let data = imgData.data

  range_value_R.innerHTML = deslizador_R.value;
  range_value_G.innerHTML = deslizador_G.value;
  range_value_B.innerHTML = deslizador_B.value;

  var umbral_R = deslizador_R.value;
  var umbral_G = deslizador_G.value;
  var umbral_B = deslizador_B.value;

  for (let i = 0; i < data.length; i+=4) {
    if (data[i] > umbral_R)
      data[i] = umbral_R;
    if (data[i+1] > umbral_G)
      data[i+1] = umbral_G;
    if (data[i+2] > umbral_B)
      data[i+2] = umbral_B;
    }
  ctx.putImageData(imgData, 0, 0);
}

deslizador_R.oninput = () => {
  colors();
}
deslizador_G.oninput = () => {
  colors();
}
deslizador_B.oninput = () => {
  colors();
}

gray.onclick = () => {
  let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  let data = imgData.data
  for (let i = 0; i < data.length; i+=4) {
    var R = data[i];
    var G = data[i+1];
    var B = data[i+2];
    var gris = (3 * R + 4 * G + B)/8;
    gris = data[i] = data[i+1] = data[i+2];
    }
  ctx.putImageData(imgData, 0, 0);
}
original.onclick = () => {
    ctx.drawImage(img, 0,0);
    deslizador_R.value = 255;
    range_value_R.innerHTML = deslizador_R.value;
    deslizador_G.value = 255;
    range_value_G.innerHTML = deslizador_G.value;
    deslizador_B.value = 255;
    range_value_B.innerHTML = deslizador_B.value;

}

especular.onclick =() => {
      ctx.drawImage(img, 0,0);
      ctx.translate(img.width,0);
      ctx.scale(-1,1);
      ctx.drawImage(img, 0, 0);
}

bocaabajo.onclick = () =>{
  ctx.drawImage(img, 0,0);
  ctx.translate(0,img.height);
  ctx.scale(1,-1);
  ctx.drawImage(img, 0, 0);
}
negativo.onclick = () =>{
  ctx.drawImage(img, 0, 0);
  //-- Obtener la imagen del canvas en pixeles
  let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  //-- Obtener el array con todos los píxeles
  let data = imgData.data
  for (let i = 0; i < data.length; i+=4){
    var R = data[i];
    var G = data[i+1];
    var B = data[i+2];
    data[i] = 255 - R;
    data[i+1] = 255 - G;
    data[i+2] = 255 - B;
}
  ctx.putImageData(imgData, 0, 0);
}

console.log("Fin...");
