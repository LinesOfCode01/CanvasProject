document.querySelector(".startBtn").onclick = function () {
    window.location.href = `index.html?car=${carPicked}`;
};

// Characters



let carPicked = ""
function whiteCar() {
    carPicked = 'whiteCar'
    document.getElementById("character-box").style.backgroundImage = "url(./assets/whitecar.png)";
}

function blueCar() {
    carPicked = `blueCar`
    document.getElementById("character-box").style.backgroundImage = "url(./assets/bluecar.png)";
}

function blackCar() {
    carPicked = `blackCar`
    document.getElementById("character-box").style.backgroundImage = "url(./assets/blackcar.jpg)";
}

function policeCar() {
    carPicked = `policeCar`
    document.getElementById("character-box").style.backgroundImage = "url(./assets/PoliceTrans.png)";
}