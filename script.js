const container = document.querySelector(".container");
const selectSize = document.getElementById("selectSize");
const standartModeButton = document.getElementById("standartMode");
const randomModeButton = document.getElementById("randomMode");
const eracerModeButton = document.getElementById("eracerMode");
const clearButton = document.getElementById("clear");
const progressiveModeButton = document.getElementById("progressiveMode");

let currentMode = "standart";

let mouseDown = false;
document.body.onmousedown = () => { mouseDown = true; };
document.body.onmouseup = () => { mouseDown = false; };

selectSize.addEventListener("click", () => {
    let userSelectSize = +prompt("Select grid size", 16);

    if(userSelectSize > 100 || userSelectSize < 1) {
        alert("Size can only be in the range from 1 to 100");
        userSelectSize = 16;
    } else {
        recreateGrid(userSelectSize);
    }
 });

standartModeButton.onclick = () => currentMode = "standart";
randomModeButton.onclick = () => currentMode = "random";
eracerModeButton.onclick = () => currentMode = "eracer";
progressiveModeButton.onclick = () => currentMode = "progressive";
clearButton.onclick = () => clearGrid();

recreateGrid(16);

function recreateGrid(size) {
    const gridOfPixels = document.querySelectorAll(".pixel");

    gridOfPixels.forEach( pixel => pixel.remove()); 

    for(let i = 0; i < size*size; i++) {
        container.appendChild(createPixel(size));
    }
}

 function createPixel (size) {
    const pixel = document.createElement("div");

    pixel.classList.add("pixel");
    
    pixel.addEventListener("mouseover", changeColor);
    pixel.addEventListener("mousedown", changeColor);

    pixel.style.cssText += `width: ${600 / size}px; height: ${600 / size}px; background-color: rgba(0, 0, 0, 0);`;

    return pixel;
}

function changeColor(e) {
    if(e.type === "mouseover" && !mouseDown) return;   
    switch(currentMode) {
        case "standart":
            e.target.style.backgroundColor = "rgba(0, 0, 0, 1)";
            break;           
        case "random":
            let randomR = Math.floor(Math.random() * 256);
            let randomG = Math.floor(Math.random() * 256);
            let randomB = Math.floor(Math.random() * 256);
            e.target.style.backgroundColor = `rgba(${randomR},${randomG},${randomB}, 1)`;
            break;
        case "eracer":
            e.target.style.backgroundColor = "rgba(0, 0, 0, 0)";
            break;
        case "progressive": 
            let alpha = parseFloat(e.target.style.backgroundColor.split(" ")[3]);
            alpha += 0.1;
            e.target.style.backgroundColor = `rgba(0, 0, 0, ${alpha})`;
            break;
    }   
}

function clearGrid() {
    const gridOfPixels = document.querySelectorAll(".pixel");

    gridOfPixels.forEach( pixel => pixel.style.backgroundColor = "rgba(0, 0, 0, 0)");
}