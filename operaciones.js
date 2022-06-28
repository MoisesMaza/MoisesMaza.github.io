const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let numeroParticulas = 100;  // numero de particulas
const arrayParticulas = [];
let hue = 0;

class Particulas {
    constructor(){
        this.x = Math.random() * canvas.width;  //cada vez que crea un nuevo objeto particulas le dan un valor random, para el eje x
        this.y = Math.random() * canvas.height;
        this.radius = (Math.random() *  10) + 2; // tamaño
        this.velocidadX = (Math.random() * 3) - 1.5; // velocidad hacia x
        this.velocidadY = (Math.random() * 3) - 1.5; // velocidad hacia y
    }
    draw(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2); //  la forma para crear las particulas 
        ctx.fillStyle = 'hsl(' + hue + ', 100%, 50%)';  //Para cambio de color de las particulas
        ctx.fill();
    }
    update(){   // para el rebote de las particulas sobre el lienzo
        this.x += this.velocidadX; 
        this.y += this.velocidadY;

        if(this.x + this.radius > canvas.width ||  // si el recorrido de la particula llega al ancho del lienzo reborata de la direccion contraria
             this.x - this.radius < 0) {
                this.velocidadX = - this.velocidadX;
                }

        if(this.y + this.radius > canvas.height || // si el recorrido de la particula llega a lo alto del lienzo reborata de la direccion contraria
             this.y + this.radius < 0){
               this.velocidadY = - this.velocidadY;
                }
           this.draw();
            }
}
function init(){  // este bucle hará lo de la clase Particulas, dependiendo el numero que le hayamos asignado al numero de particulas
    for( let i=0; i < numeroParticulas; i++){
        arrayParticulas.push(new Particulas());
    }
}

function animacion(){
  //ctx.clearRect(0, 0, canvas.width, canvas.height);  //Para particulas
  //ctx.fillStyle = 'rgba(0,0,0, 0.040)'; //Para degradacion de lineas
  //ctx.fillRect(0, 0, canvas.width, canvas.height); //Para degradacion de lineas
    for(let i=0; i < arrayParticulas.length; i++){  // esto actualizará la posicion de las particulas y llamara al método draw para dibujar las particulas
        arrayParticulas[i].update();
    }
    hue++;  //Para cambio de color de las particulas
    requestAnimationFrame(animacion);
}

init();
animacion();

document.getElementById("boton").addEventListener('click', animacion, false);   // al pulsar el botón aumentará la velocidad de las particulas
