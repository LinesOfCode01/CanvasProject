//Global variables
const canvas = document.querySelector(`#canvas`);
const ctx = canvas.getContext(`2d`);
canvas.width = window.innerWidth
canvas.height = window.innerHeight
// ctx.drawImage(roadImg, 1000, 600, 1000, 900);

//ROAD INFOroa

let roadImg = new Image();
roadImg.src = './assets/overheadRoad2.png';





//CAR INFO

let carImg = new Image();
carImg.src = './assets/PoliceTrans.png';

let car = {
    x: 900,
    y: canvas.height - 100,
    h: 100,
    w: 60,

    draw: function () {
        ctx.drawImage(carImg, this.x, this.y, this.w, this.h)
    }
}



// // HE DRAW SCORE SHOULD BE  ADDED AFTER AFTER collisionDetection
//     const score={
//     points: 0,
//     draw: function () {
//         ctx.font = "20px Arial";
//         ctx.fillStyle = "#0095DD";
//         ctx.fillText("Score: " +score, 10, 30);

// }

//VILLAN INFO
// let villanImg = new Image();
// villanImg.src ='./assets/FerrariEnzoTrans.png'

class Villan {
    constructor(x, y, w, h, src) {

        this.health = this.health;
        this.x =x;
        this.y = y;
        this.w =w;
        this.h = h;
        this.src = src;
        this.villanImg = new Image()
        this.speed = 3
    }
    loadVillan = () => {

        this.villanImg.src = this.src
        this.villanImg.onload = this.draw
    }
    draw= () => {

        
        ctx.drawImage(this.villanImg, this.x, this.y, this.w, this.h)
    }
    //move function 
    popMove = () => {
        this.y += this.speed
    }


}
let mafia = new Villan(
  canvas.width-160, 20g, 100, 60,  "./assets/FerrariEnzoTrans.png" 
)

mafia.loadVillan();








document.getElementById('exitButton').onclick = () => {
    location.href = "start.html"
}



//CAR CONTROLS
window.onkeydown = function (e) {
    console.log(e.key)

    if (e.key === 'ArrowLeft') {
        if (car.x > canvas.width - (canvas.width / 3)) {
            car.x -= 15
        }
    }

    if (e.key === 'ArrowRight') {
        if (car.x < canvas.width - car.w) {
            car.x += 15
        }
    }

    if (e.key === 'ArrowUp') {
        if (car.y > 0) {
            car.y -= 15
        }
    }

    if (e.key === 'ArrowDown') {
        if (car.y < canvas.height - car.h) {
            car.y += 15
        }
    }
}

//COLLISION DETECTION

function detectCollision(rect1, rect2) {
    if (rect1.x < rect2.x + rect2.w && rect1.x + rect1.w > rect2.x && rect1.y < rect2.y + rect2.h && rect1.y + rect1.h > rect2.y) {

        console.log("COLLISION")
        cancelAnimationFrame(gameInt)
        alert("Game Over")
    }
}

//OBSTACLE CODE

class Obstacle {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        this.color = `rgb(${Math.random() * 225}, ${Math.random() * 255}, ${Math.random() * 255}`
    }

    draw = () => {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.w, this.h)
    }

    move = () => {
        this.y += 1;
    }
}

let obstacles = [] //Part of setInterval function below:

setInterval(function () {
    obstacles.push(new Obstacle(Math.random() * canvas.width, 0, Math.random() * 200 + 50, 30))

    score += 1
}, 1000)

let gameInt = null;

let score = 0;


//ANIMATE FUNCTION
function animate() {
    gameInt = requestAnimationFrame(animate)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(roadImg, canvas.width - 500, 0, 500, canvas.height)

    ctx.font = '30px Arial';

    ctx.fillText(score, 10, 30, 50, 00)

    car.draw();
    mafia.draw();

    obstacles.forEach(eachObstacle => {
        eachObstacle.move()
        eachObstacle.draw()
        detectCollision(car, eachObstacle)
    })
}

animate();

