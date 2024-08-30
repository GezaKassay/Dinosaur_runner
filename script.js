const MAX_LEFT = 15;
const MOVE_TREE = 1;
const ACTIVATE_NEXT_POS = 10;
const RESET_POS = 15;


let dinosaurLocation = 16;
let dinosaur = document.createElement("img");
dinosaur.src = "Assets//dinosaur-vector.jpg";
document.getElementById(dinosaurLocation).appendChild(dinosaur);

let treeLocationSets = [[31], [30, 31], [31], [15]];
let trees = [];
let treeNum = 0;

function createTreeMatrix() {
    for (let i = 0; i < treeLocationSets.length; ++i) {
        trees[i] = [];
        for (let j = 0; j < treeLocationSets[i].length; ++j) {
            trees[i][j] = `tree${++treeNum}`;
        }
    }
}
createTreeMatrix();

function createTrees() {
    for (let i = 0; i < trees.length; ++i) {
        for (let j = 0; j < trees[i].length; ++j) {
            let img = document.createElement("img");
            img.id = trees[i][j];
            img.src = "Assets//vector-black-white-tree-23990445.jpg";
            img.style.visibility = "hidden";    
            document.body.appendChild(img);            
        }
    }
}
createTrees();
setImageSize();

function setImageSize() {
    let images = document.querySelectorAll("img");
    images.forEach((image) => {
        image.style.width = "50px"; 
        image.style.height = "90px";
    });
}

function landDino() {
    dinosaurLocation += RESET_POS;
    document.getElementById(dinosaurLocation).appendChild(dinosaur);     
}

window.addEventListener("keydown", function (moveDino) {         
    if (moveDino.code === "ArrowUp") { 
        dinosaurLocation -= RESET_POS;        
        document.getElementById(dinosaurLocation).appendChild(dinosaur);               
        setTimeout(landDino, 3000);          
    } 
    if (moveDino.code === "ArrowDown") {
        landDino();
    }     
});

let prevTime = 0;
let positionsActive = 1;

function moveTrees() {
    if (time - prevTime === ACTIVATE_NEXT_POS) {
        ++positionsActive;
        prevTime = time;
    }
    for (let i = 0; i < positionsActive; ++i) {
        for (let j = 0; j < treeLocationSets[i].length; ++j) {
            treeLocationSets[i][j] -= MOVE_TREE;
            if (treeLocationSets[i][j] === MAX_LEFT) {
                treeLocationSets[i][j] += RESET_POS;                             
            } else if (treeLocationSets[i][j] === 0) {
                treeLocationSets[i][j] += 14;
            }
            document.getElementById(trees[i][j]).style.visibility = 
                "visible";          
            document.getElementById(treeLocationSets[i][j])
                .appendChild(document.getElementById(trees[i][j]));               
            if (treeLocationSets[i][j] === dinosaurLocation) {
                checkCollision(treeLocationSets[i][j]);   
            }               
        }
    }
}

function checkCollision(location) {                 
    clearInterval(intervalID); 
    document.getElementById(location).innerHTML = " ";
    document.getElementById(location).appendChild(dinosaur); 
    document.getElementById("playerPoints").innerHTML = `You scored ${time}` + 
        ` points`;    
    time = 0;
    document.getElementById("ReloadPageButton").style.visibility = "visible";           
}

let time = 0;
let intervalID;

function increaseTime() {    
    ++time;
    document.getElementById("Time").innerHTML = time;   
    moveTrees();   
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