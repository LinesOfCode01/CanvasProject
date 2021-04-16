document.querySelector(".startBtn").onclick = function () {
    window.location.href = `index.html?car=${carPicked}`;
};

// characters by Joey

let carPicked = ""

function policeCar() {
    carPicked = `policeCar`
    document.getElementById("character-box").style.backgroundImage = "url(./assets/Police.png)";
    var audio = document.getElementById("police-audio");
    audio.play();

}

function furRedCar() {
    carPicked = `furRedCar`
    document.getElementById("character-box").style.backgroundImage = "url(./assets/FurRedCar.png)";
    var audio = document.getElementById("fur-audio");
    audio.play();
}

function frdWhiteCar() {
    carPicked = `frdWhiteCar`
    document.getElementById("character-box").style.backgroundImage = "url(./assets/FrdWhiteCar.png)";
    var audio = document.getElementById("frd-audio");
    audio.play();
}

function jgWhiteCar() {
    carPicked = `jgWhiteCar`
    document.getElementById("character-box").style.backgroundImage = "url(./assets/JgWhiteCar.png)";
    var audio = document.getElementById("white-audio");
    audio.play();
}

function lamSilverCar() {
    carPicked = `lamSilverCar`
    document.getElementById("character-box").style.backgroundImage = "url(/assets/LamSilverCar.png)";
    var audio = document.getElementById("lam-audio");
    audio.play();
}

function poorSilverCar() {
    carPicked = `poorSilverCar`
    document.getElementById("character-box").style.backgroundImage = "url(./assets/PoorSilverCar.png)";
    var audio = document.getElementById("silver-audio");
    audio.play();
}

