//Global variables
const canvas = document.querySelector(`#canvas`);
const ctx = canvas.getContext(`2d`);
canvas.width = window.innerWidth
canvas.height = window.innerHeight
// ctx.drawImage(roadImg, 1000, 600, 1000, 900);
const urlParams = new URLSearchParams(window.location.search);
const carPicked = urlParams.get('car');
console.log(carPicked)




//ROAD INFOroa

let roadImg = new Image();
roadImg.src = './assets/overheadRoad2.png';

const cars = {
    whiteCar: './assets/whitecar.png',
    blackCar: './assets/blackcar.jpg',
    blueCar: './assets/bluecar.png',
    policeCar: './assets/PoliceTrans.png'
}


//CAR INFO

// let carImg = new Image();
// carImg.src = cars[carPicked];

// let car = {
//     x: 900,
//     y: canvas.height - 100,
//     h: 100,
//     w: 60,

//     draw: function () {
//         ctx.drawImage(carImg, this.x, this.y, this.w, this.h)
//     }
// }




class Car {
    constructor(x, y, w, h, src) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.src = src;
        this.carImg = new Image();
        this.speed = -2;

    }

    loadCar = () => {

        this.carImg.src = this.src
        this.carImg.onload = this.drawCar
    }

    drawCar = () => {

        ctx.drawImage(this.carImg, this.x, this.y, this.w, this.h)
    }
}


let ferrari = new Car(canvas.width - 50, canvas.height - 100, 50, 100, cars[carPicked])
ferrari.loadCar();
// let police = new Car(canvas.width / 2 + 10, 100, 50, 100, './assets/PoliceTrans.png')
// police.loadCar();



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
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.src = src;
        this.villanImg = new Image()
        this.speed = 3
    }
    loadVillan = () => {

        this.villanImg.src = this.src
        this.villanImg.onload = this.draw
    }
    draw = () => {


        ctx.drawImage(this.villanImg, this.x, this.y, this.w, this.h)
    }
    //move function 
    popMove = () => {
        this.y += this.speed
    }


}
let mafia = new Villan(
    canvas.width - 160, 20, 100, 60, "./assets/FerrariEnzoTrans.png"
)

mafia.loadVillan();








document.getElementById('exitButton').onclick = () => {
    location.href = "start.html"
}



//CAR CONTROLS
window.onkeydown = function (e) {
    console.log(e.key)

    if (e.key === 'ArrowLeft') {
        if (ferrari.x > canvas.width - (canvas.width / 3)) {
            ferrari.x -= 15
        }
    }

    if (e.key === 'ArrowRight') {
        if (ferrari.x < canvas.width - ferrari.w) {
            ferrari.x += 15
        }
    }

    if (e.key === 'ArrowUp') {
        if (ferrari.y > 0) {
            ferrari.y -= 15
        }
    }

    if (e.key === 'ArrowDown') {
        if (ferrari.y < canvas.height - ferrari.h) {
            ferrari.y += 15
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
    ctx.drawImage(roadImg, 0, 0, canvas.width, canvas.height)

    ctx.font = '30px Arial';

    ctx.fillText(score, 10, 30, 50, 00)


    ferrari.drawCar()


    obstacles.forEach(eachObstacle => {
        eachObstacle.move()
        eachObstacle.draw()
        detectCollision(ferrari, eachObstacle)
    })
}





animate();




