document.querySelector(".startBtn").onclick = function () {
    window.location.href = `index.html?car=${carPicked}`;
};

// characters by Joey

let carPicked = ""

function policeCar() {
    carPicked = `policeCar`
    document.getElementById("character-box").style.backgroundImage = "url(./assets/Police.png)";
}

function furRedCar() {
    carPicked = `furRedCar`
    document.getElementById("character-box").style.backgroundImage = "url(./assets/FurRedCar.png)";
}

function frdWhiteCar() {
    carPicked = `frdWhiteCar`
    document.getElementById("character-box").style.backgroundImage = "url(./assets/FrdWhiteCar.png)";
}

function jgWhiteCar() {
    carPicked = `jgWhiteCar`
    document.getElementById("character-box").style.backgroundImage = "url(./assets/JgWhiteCar.png)";
}

function lamSilverCar() {
    carPicked = `lamSilverCar`
    document.getElementById("character-box").style.backgroundImage = "url(/assets/LamSilverCar.png)";
}

function poorSilverCar() {
    carPicked = `poorSilverCar`
    document.getElementById("character-box").style.backgroundImage = "url(./assets/PoorSilverCar.png)";
}