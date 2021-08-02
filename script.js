'use strict';

//GLOBAL VARIABLES
const canvas = document.querySelector(`#canvas`);
const ctx = canvas.getContext(`2d`);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let canvasY2 = 0;
let canvasY = -canvas.height;
const urlParams = new URLSearchParams(window.location.search);
const carPicked = urlParams.get('car');
let obstacles = [];
let gameInt = null;
let score = 0;
const modal = document.querySelector('.modal');

const openModal = function () {
  modal.classList.remove('hidden');
};

//AUDIO TRACK
let audio = new Audio("./assets/DavidBowie_LetsDance_GE.mp3");
audio.play();

//GAME PLAY FUNCTION (LOADS, DRAWS ANIMATIONS, CAR CONTROLS)
window.onload = () => {
  document.getElementById('restartButton').onclick = () => {
    location.href = '';
  };

  document.getElementById('exitButton').onclick = () => {
    location.href = 'index.html';
  };

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
    poorSilverCar: './assets/PoorSilverCar.png',
  };

  //CAR CLASS INFO
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
      this.carImg.src = this.src;
      this.carImg.onload = this.drawCar;
    };

    //DRAWS CAR
    drawCar = () => {
      ctx.drawImage(this.carImg, this.x, this.y, this.w, this.h);
    };
  }

  let carKeys = new Car(
    canvas.width - 50,
    canvas.height - 100,
    60,
    110,
    cars[carPicked]
  );
  carKeys.loadCar();

  //PLAYER CAR CONTROLS
  window.onkeydown = function (e) {
    if (e.key === 'ArrowLeft') {
      if (carKeys.x > canvas.width - canvas.width / 3) {
        carKeys.x -= 20;
      }
    }

    if (e.key === 'ArrowRight') {
      if (carKeys.x < canvas.width - carKeys.w) {
        carKeys.x += 20;
      }
    }

    if (e.key === 'ArrowUp') {
      if (carKeys.y > 0) {
        carKeys.y -= 10;
      }
    }

    if (e.key === 'ArrowDown') {
      if (carKeys.y < canvas.height - carKeys.h) {
        carKeys.y += 10;
      }
    }
  };

  //VILLAN CLASS INFO
  class Villan {
    constructor(x, y, w, h, src, health, bh) {
      this.health = health;
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
      this.src = src;
      this.villanImg = new Image();
      this.speed = 2;
      this.bh = bh;
      this.direction = 1;
      this.lateral = 1;
    }

    //DRAWS VILLAN CAR AND HEALTH METER
    draw = () => {
      ctx.drawImage(this.villanImg, this.x, this.y, this.w, this.h);
      ctx.fillStyle = 'red';
      ctx.fillRect(this.x, this.y - 50, 200, 25);
      ctx.fillStyle = 'green';
      ctx.fillRect(
        this.x,
        this.y - 50,
        Math.max(0, (this.health / 100) * 200),
        25
      );
      if (this.health <= 0) {
        this.dead();
      }
    };

    loadVillan = () => {
      this.villanImg.src = this.src;
      this.villanImg.onload = this.draw;
    };

    dead = () => {
      this.villanImg.src = './assets/PoorSilverCarDamaged.png';
      cancelAnimationFrame(gameInt);
      openModal();
    };

    //VILLAN MOVEMENT FUNCTION
    villanMove = () => {
      this.y -= this.speed * this.direction;
      this.x -= this.speed * this.lateral * 0.2;
      if (this.y <= 0) {
        this.direction = -1;
      }
      if (this.y > canvas.height) {
        this.direction = 1;
      }
      if (this.x > canvas.width) {
        this.lateral = 1;
      }
      if (this.x < (canvas.width * 2) / 3) {
        this.lateral = -2;
      }
    };
  }

  //VILLAN STARTING POSITION
  let startX = canvas.width - canvas.width / 3;

  //DRAWS VILLAN CAR
  let mafia = new Villan(
    Math.floor(startX + (Math.random() * canvas.width) / 4),
    (canvas.height -= 5),
    60,
    110,
    './assets/PoorSilverCar.png',
    120,
    0
  );
  mafia.loadVillan();

  //VILLAN COLLISION DETECTION
  function mafiaCollision(rect1, rect2) {
    if (
      rect1.x < rect2.x + rect2.w &&
      rect1.x + rect1.w > rect2.x &&
      rect1.y < rect2.y + rect2.h &&
      rect1.y + rect1.h > rect2.y
    ) {
      score += 100;
      rect2.health--;
    }
  }

  //OBSTACLES CLASS (POT HOLES, BOAT):
  //POT HOLES
  class Obstacle {
    constructor(x, y, w, h, src) {
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
      this.src = src;
      this.obstacleImg = new Image();

      this.color = `rgb(${Math.random() * 225}, ${Math.random() * 255}, ${
        Math.random() * 255
      }`;
    }
    loadObstacle = () => {
      this.obstacleImg.src = this.src;
      this.obstacleImg.onload = this.drawObstacle;
    };
    drawObstacle = () => {
      ctx.drawImage(this.obstacleImg, this.x, this.y, this.w, this.h);
      this.y++;
    };
    move = () => {
      this.y += 1;
    };
  }

  //BOAT
  class Boat {
    constructor(x, y, w, h, src) {
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
      this.src = src;
      this.obstacleImg = new Image();
    }
    loadboat = () => {
      this.obstacleImg.src = this.src;
      this.obstacleImg.onload = this.drawObstacle;
    };
    drawboat = () => {
      ctx.drawImage(this.obstacleImg, this.x, this.y, this.w, this.h);
      this.y--;
    };
    move = () => {
      this.y += 1;
    };
  }
  let boats = [];

  // OBSTACLES (BOAT AND POT HOLES) - MOVEMENT INTERVAL FUNCTION:
  //BOAT
  setInterval(function () {
    let boat = new Boat(
      (Math.random() * canvas.width) / 3,
      canvas.height,
      225,
      225,
      './assets/Boat.png'
    );
    boat.loadboat();

    boats.push(boat);
  }, 6500);

  //POT HOLES
  setInterval(function () {
    let potHoles = new Obstacle(
      Math.random() * canvas.width + 950,
      -90,
      80,
      80,
      './assets/pothole.png'
    );
    potHoles.loadObstacle();
    obstacles.push(potHoles);
    score += 5;
  }, 400);

  //POT HOLES COLLISION DETECTION
  function detectCollision(rect1, rect2) {
    if (
      rect1.x < rect2.x + rect2.w &&
      rect1.x + rect1.w > rect2.x &&
      rect1.y < rect2.y + rect2.h &&
      rect1.y + rect1.h > rect2.y
    ) {
      cancelAnimationFrame(gameInt);
      openModal();
    }
  }

  //ANIMATE FUNCTION
  function animate() {
    gameInt = requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(roadImg, 0, ++canvasY, canvas.width, canvas.height + 5);
    ctx.drawImage(roadImg, 0, ++canvasY2, canvas.width, canvas.height + 5);
    if (canvasY >= canvas.height) canvasY = -canvas.height;
    if (canvasY2 >= canvas.height) canvasY2 = -canvas.height;

    ctx.font = '80px gamefont Bolder';

    ctx.fillText(`SCORE ${score}`, 30, 70, 150, 40);

    carKeys.drawCar();

    obstacles.forEach(eachObstacle => {
      eachObstacle.move();
      eachObstacle.drawObstacle();
      detectCollision(carKeys, eachObstacle);
    });

    mafia.villanMove();
    mafia.draw();

    boats.forEach(boat => {
      boat.drawboat();
    });
    mafiaCollision(carKeys, mafia);
  }

  animate();
};
