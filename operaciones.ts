const canvas:any = document.getElementById('canvas1');
const ctx:any = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let numberOfParticles = 100;
let hue = 0;
let particlesArray: { update: () => void; }[] = [];

class Particle {
    public x:number;
    public y:number;
    public radius:number;
    public speedX:number;
    public speedY:number;

    constructor(){
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = (Math.random() * 10) + 2;
        this.speedX = (Math.random() * 3) - 1.5;
        this.speedY =  (Math.random() * 3) - 1.5;
    
    }
    draw(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2); //  la forma para crear las particulas 
        ctx.fillStyle = 'hsl(' + hue + ', 100%, 50%)';  //Para cambio de color de las particulas
        ctx.fill();  
    }
    update(){
          // para el rebote de las particulas sobre el lienzo
          this.x += this.speedX; 
          this.y += this.speedY;
  
          if(this.x + this.radius > canvas.width ||  // si el recorrido de la particula llega al ancho del lienzo reborata de la direccion contraria
               this.x - this.radius < 0) {
                  this.speedX = - this.speedX;
                  }
  
          if(this.y + this.radius > canvas.height || // si el recorrido de la particula llega a lo alto del lienzo reborata de la direccion contraria
               this.y + this.radius < 0){
                 this.speedY = - this.speedY;
                  }
             this.draw();
    }
}
function init(){
    for (var i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}
function animate(){
  //ctx.clearRect(0, 0, canvas.width, canvas.height);  //Para particulas
  //ctx.fillStyle = 'rgba(0,0,0, 0.040)'; //Para degradacion de lineas
  //ctx.fillRect(0, 0, canvas.width, canvas.height); //Para degradacion de lineas
  for(let i=0; i < particlesArray.length; i++){  // esto actualizará la posicion de las particulas y llamara al método draw para dibujar las particulas
    particlesArray[i].update();
}
hue++;  //Para cambio de color de las particulas
requestAnimationFrame(animate);
}

init();
animate();
document.getElementById("boton")?.addEventListener('click',animate, false);