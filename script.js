window.onload = () => {
    document.getElementById('startButton').onclick = () => {
        startGame();
    }
};

    const canvas = document.querySelector(`#canvas`);
    const ctx = canvas.getContext(`2d`);
    // function draw () {
    //     const ctx = ctx.canvas.with = 600;
    //     const ctx = ctx.canvas.height = 800;
    // }
    ctx.drawImage(roadImg, 0, 0, 600, 800);

function startGame(){   

//ROAD INFO

    let roadImg = new Image();
    roadImg.src = './assets/overheadRoad2.png';
    roadImg.onload = function(){
    
    }

//CAR INFO

    let carImg = new Image();
    carImg.src = './assets/PoliceTrans.png';

    let car = {
        x: 220,
        y: 550,
        h: 100,
        w: 60,

        draw: function () {
            ctx.drawImage(carImg, this.x, this.y, this.w, this.h)
        }
    }

//VILLIAN INFO

//     class Villan {
//         constructor(x, y, w, h, img){
    
//             this.health =200
//             this.x = x;
//             this.y = y;
//             this.w = w;
//             this.h = h;
//             this.img = img;
//         }
//         draw = () =>{
//             if(this.health > 0){
    
//                 ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
    
//             }
//         }

//     let villanImg = new Image()
//     villanImg.src ='./assets/sticker-png-motorcycle-cartoon-blog-cartoon-s-of-motorcycles-3d-computer-graphics-bicycle.png'
//     villanImg.onload = function(e){
//     ctx.drawImage(villanImg, 0, 0,80,80)
//  }

// // HE DRAW SCORE SHOULD BE  ADDED AFTER AFTER collisionDetection
//     const score={
//     points: 0,
//     draw: function () {
//         ctx.font = "20px Arial";
//         ctx.fillStyle = "#0095DD";
//         ctx.fillText("Score: "+this.points, 10, 30);
//     }
//  }
// //JUST TO TEST IF IT WORKS 

//     // let score = 0;
//     // function drawScore(){
//     //     ctx.font = "20px Arial";
//     //         ctx.fillStyle = "#0095DD";
//     //         ctx.fillText("Score: " +score, 10, 30);
//     // }

//   }

//CAR CONTROLS
    window.onkeydown = function (e) {
        console.log(e.key)

        if (e.key === 'ArrowLeft') {
            if (car.x > 0) {
                car.x -= 15
            }
        }

        if (e.key === 'ArrowRight') {
            if (car.x < 440) {
                car.x += 15
            }
        }

        if (e.key === 'ArrowUp') {
            if (car.y > 0) {
                car.y -= 15
            }
        }

        if (e.key === 'ArrowDown') {
            if (car.y < 440) {
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

    // class Obstacle {
    //     constructor(x, y, w, h) {
    //         this.x = x;
    //         this.y = y;
    //         this.w = w;
    //         this.h = h;

    //         this.color = `rgb(${Math.random() * 225}, ${Math.random() * 255}, ${Math.random() * 255}`
    //     }

    //     draw = () => {
    //         ctx.fillStyle = this.color
    //         ctx.fillRect(this.x, this.y, this.w, this.h)
    //     }

    //     move = () => {
    //         this.y += 5;
    //     }
    // }

    // let obstacles = [] //Part of setInterval function below:

    // setInterval (function () {
    //     obstacles.push(new Obstacle(Math.random() * 450, 0, Math.random() * 200 + 50, 30))

    //     score += 1
    // }, 1000)

    let gameInt = null;

    let score = 0;


//ANIMATE FUNCTION
    function animate() {
        gameInt = requestAnimationFrame(animate)

        ctx.clearRect(0, 0, 800, 2240)

        ctx.drawImage(roadImg, 0, 0, 800, 2240)

        ctx.font = '30px Arial';

        ctx.fillText(score, 10, 30, 50, 00)

        car.draw();

        obstacles.forEach(eachObstacle => {
            eachObstacle.move()
            eachObstacle.draw()
            detectCollision(car, eachObstacle)
        })
    }

    animate();

};
