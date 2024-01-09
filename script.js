const container = document.querySelector(".container");
const selectSize = document.querySelector(".selectSize");

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
    
    pixel.addEventListener("mouseover", () => {
        pixel.style.background = "blue";
    });
    
    pixel.addEventListener("mouseout", () => {
        pixel.style.background = "white";
    });

    pixel.style.cssText += `width: ${600 / size}px; height: ${600 / size}px;`;

    return pixel;
 }

 selectSize.addEventListener("click", () => {
    let userSelectSize = +prompt("Select grid size", 16);

    if(userSelectSize > 100 || userSelectSize < 1) {
        alert("Size can only be in in the range from 1 to 100");
        userSelectSize = 16;
    } else {
        recreateGrid(userSelectSize);
    }
 });