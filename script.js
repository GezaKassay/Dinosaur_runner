let dinosaurLocation = 16;
let dinosaur = document.createElement("img");
dinosaur.src = "Assets//dinosaur-vector.jpg";


let treeLocation = 17;
let tree = document.createElement("img");
tree.src = "Assets//vector-black-white-tree-23990445.jpg";
document.getElementById(treeLocation).appendChild(tree); 

setImageSize();

function setImageSize() {
    let images = document.querySelectorAll("img");
    images.forEach((image) => {
        image.style.width = "50px"; 
        image.style.height = "90px";
    });
}

window.addEventListener("keydown", function (moveDino) {         
    if (moveDino.code === "ArrowUp") { 
        let jumpDino = dinosaurLocation - 15;        
        document.getElementById(jumpDino).appendChild(dinosaur);
             
    }      
});

let time = 0;
let intervalID;

function increaseTime() {    
    ++time;
    document.getElementById("Time").innerHTML = time;
    document.getElementById(dinosaurLocation).appendChild(dinosaur);
    setImageSize();
}
    
function startTimer() {
    document.getElementById("Time").innerHTML = "0";
    intervalID = setInterval(increaseTime, 1000);    
}

function startAndHide() {
    startTimer();
    document.getElementById("StartButton").style.visibility = "hidden";
}

document.getElementById("ReloadPageButton").style.visibility = "hidden";