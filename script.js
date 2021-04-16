//GLOBAL VARIABLES
const canvas = document.querySelector(`#canvas`);
const ctx = canvas.getContext(`2d`);
canvas.width = window.innerWidth
canvas.height = window.innerHeight

let canvasY2 = 0;
let canvasY = -canvas.height;


 let audio = new Audio( "./assets/01 Into The dream (ft. Jakub Tirco) (1).mp3");
 audio.play();

// ctx.drawImage(roadImg, 1000, 600, 1000, 900);
const urlParams = new URLSearchParams(window.location.search);
const carPicked = urlParams.get('car');
console.log(carPicked)


document.getElementById('exitButton').onclick = () => {
    location.href = "start.html"
}

//Boat info 
let boatImg = new Image;
boatImg.src= './assets/FrdWhiteCar.png'

//ROAD INFO
let roadImg = new Image();
roadImg.src = './assets/overheadBeachBackgroundResize.jpg';


//CAR SELECTOR OBJECT
const cars = {

    policeCar: './assets/Police.png',
    frdWhiteCar: './assets/FrdWhiteCar.png',
    furRedCar: './assets/FurRedCar.png',
    jgWhiteCar: './assets/JgWhiteCar.png',
    lamSilverCar: './assets/LamSilverCar.png',
    poorSilverCar: './assets/PoorSilverCar.png'

}


//CAR INFO
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

let carKeys = new Car(canvas.width - 50, canvas.height - 100, 50, 100, cars[carPicked])

carKeys.loadCar();


//VILLAN INFO
class Villan {
    constructor(health, x, y, w, h, src, bh) {

        this.health = health;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.src = src;
        this.villanImg = new Image()
        this.speed = 3
        this.bh = bh;
    }

    draw = () => {
        if (this.y < this.bh) this.y += 3;
        //ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
        ctx.drawImage(this.villanImg, this.x, this.y, this.w, this.h)
        ctx.fillStyle = 'red'
        ctx.fillRect(this.x, this.y - 50, 200, 25)
        ctx.fillStyle = 'green'
        ctx.fillRect(this.x, this.y - 50, Math.max(0, this.health / 100 * 200), 25)
        if (this.health <= 0) {
            this.dead()
        }
    };

    loadVillan = () => {

        this.villanImg.src = this.src
        this.villanImg.onload = this.draw
    }

    dead = () => {
        this.src = deadVillan
        cancelAnimationFrame(gameInt)
        restartGame()
    }


    // let deadVillan = new Image();
    // deadVillan.src = './assets/JgWhiteCar.png'

    // 
    //}

    //VILLAN MOVE FUNCTION
    villanMove = () => {
        this.y -= this.speed
        if (this.y <= 0) {
            this.speed = 0
            if (this.x <= canvas.width - this.w) {
                this.x++
            } else if (this.x <= canvas.width / 2) {
                this.x--
            }
        }

    }

}

let startX = canvas.width - (canvas.width / 4)


let mafia = new Villan(Math.floor(startX + Math.random() * canvas.width / 3), canvas.height -= 5, 80, 120, "./assets/PoorSilverCar.png", 100)





document.getElementById('exitButton').onclick = () => {
    location.href = "start.html"
}
mafia.loadVillan()



//CAR CONTROLS
window.onkeydown = function (e) {
    console.log(e.key)

    if (e.key === 'ArrowLeft') {
        if (carKeys.x > canvas.width - (canvas.width / 3)) {
            carKeys.x -= 20
        }
    }

    if (e.key === 'ArrowRight') {
        if (carKeys.x < canvas.width - carKeys.w) {
            carKeys.x += 20
        }
    }

    if (e.key === 'ArrowUp') {
        if (carKeys.y > 0) {
            carKeys.y -= 10
        }
    }

    if (e.key === 'ArrowDown') {
        if (carKeys.y < canvas.height - carKeys.h) {
            carKeys.y += 10
        }
    }
}


//COLLISION DETECTION
function detectCollision(rect1, rect2) {
    if (rect1.x < rect2.x + rect2.w &&
        rect1.x + rect1.w > rect2.x &&
        rect1.y < rect2.y + rect2.h &&
        rect1.y + rect1.h > rect2.y) {

        console.log("COLLISION")
        cancelAnimationFrame(gameInt)
        alert("Game Over")
    }
}

function mafiaCollision(rect1, rect2) {
    if (rect1.x < rect2.x + rect2.w && rect1.x + rect1.w > rect2.x && rect1.y < rect2.y + rect2.h && rect1.y + rect1.h > rect2.y) {

        console.log("COLLISION")
        score += 100
        rect2.health--
        // Villan.bh -= 5
        //rect2.health = Math.min(100, rect1.health + .5)
        //rect2.bh -= 5

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

//OBSTACLE SET INTERVAL FUNCTION:
setInterval(function () {
    obstacles.push(new Obstacle(Math.floor(startX + Math.random() * canvas.width / 3), 0, Math.random() * 200 + 50, 30))

    score += 1
}, 6000)

let obstacles = []

let gameInt = null;

let score = 0;

// let stopGame = null

//ANIMATE FUNCTION

function animate() {
    gameInt = requestAnimationFrame(animate)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(roadImg, 0, ++canvasY, canvas.width, canvas.height +5)
    ctx.drawImage(roadImg,0, ++canvasY2, canvas.width, canvas.height +5);
    if( canvasY >= canvas.height) canvasY = -canvas.height;
    if(canvasY2 >= canvas.height) canvasY2 = -canvas.height;
    


    ctx.font = '50px Times Bold';

    ctx.fillText(score, 30, 70, 50, 0)

    carKeys.drawCar()

    obstacles.forEach(eachObstacle => {
        eachObstacle.move()
        eachObstacle.draw()
        detectCollision(carKeys, eachObstacle)
    })

    mafia.villanMove()
    mafia.draw()

    mafiaCollision(carKeys, mafia)

}


animate();
