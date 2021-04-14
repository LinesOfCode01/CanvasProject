const canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');









// HE DRAW SCORE SHOULD BE  ADDED AFTER AFTER collisionDetection
const score = {
    points: 0,
    draw: function () {
        ctx.font = "20px Arial";
        ctx.fillStyle = "#0095DD";
        ctx.fillText("Score: "+this.points, 10, 30);
    }
}
//JUST TO TEST IF IT WORKS 

// let score = 0;
// function drawScore(){
//     ctx.font = "20px Arial";
//         ctx.fillStyle = "#0095DD";
//         ctx.fillText("Score: " +score, 10, 30);

// }

class Villan {
    constructor(x, y, w, h, img){

        this.health =200
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.img = img;
    }
    draw = () =>{
        if(this.health > 0){

            ctx.drawImage(this.img, this.x, this.y, this.w, this.h)

        }
    }
    //move function 
    




}
