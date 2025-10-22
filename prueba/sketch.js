/*
Zona de variables GLOBALES.
Suelen guardar parámetros de configuración o valores útiles
para usar en la función draw.
*/

  let anchura = 200;
  let altura = 100;

/*
La función setup se ejecuta una sola vez al inicio del programa.
La utilizamos para inicializar algunos parámetros, variables,etc...
*/
function setup(){
  // Establecer el tamaño de la ventana gráfica
  createCanvas(400,400);
  // Desactivar animación
}

/*
La función draw se ejecuta después de setup
Aquí escribo el núcleo del programa.
Esta función se ejecuta una sola vez si usamos noLoop()
o en bucle si usamos loop(). Por defecto se ejecuta en bucle.
*/
function draw(){
  background(0);
  let d = dist(100,100,mouseX,mouseY);
/*4 cuadrados diferente color
//4 cuadrados diferente color
if (mouseX < width / 2 && mouseY < height / 2) {
    fill("white"); 
    rect(0, 0, width / 2, height / 2);
  } else if (mouseX > width / 2 && mouseY < height / 2) {
    fill("aqua"); 
    rect(width / 2, 0, width / 2, height / 2);
  } else if (mouseX < width / 2 && mouseY > height / 2) {
    fill("red"); 
    rect(0, height / 2, width / 2, height / 2);
  } else {
    fill("green"); 
    rect(width / 2, height / 2, width / 2, height / 2);
  }
}
  */

  if(mousex)
    fill("aqua");
  
  circle(100,100,140);
  line(100,100,mouseX,mouseY);

}







