const MAX_LEFT = 15;
const MOVE_TREE = 1;
const ACTIVATE_NEXT_POS = 10;
const RESET_POS = 15;
const ACTIVATE_FLY_POS = 28;


let dinosaurLocation = 16;
let dinosaur = document.createElement("img");
dinosaur.src = "Assets//Tyrannosaurus-vector.jpg";
document.getElementById(dinosaurLocation).appendChild(dinosaur);

let treeLocationSets = [[31], [30, 31], [31]];
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

let flyDinoLocations = [[15], [15]];
let flyDinos = [];
let flyDinoNum = 0;

function createFlyDinoMatrix() {
    for (let i = 0; i < flyDinoLocations.length; ++i) {
        flyDinos[i] = [];
        for (let j = 0; j < flyDinoLocations[i].length; ++j) { 
            flyDinos[i][j] = `flyDino${++flyDinoNum}`;              
        }
    }
}
createFlyDinoMatrix();

function createFlyDinos() {
    for (let i = 0; i < flyDinos.length; ++i) {
        for (let j = 0; j < flyDinos[i].length; ++j) {            
            let img = document.createElement("img");
            img.id = flyDinos[i][j];
            img.src = "Assets//Pterodactyl-vector.jpg";
            img.style.visibility = "hidden";    
            document.body.appendChild(img);  
        }
    }
}
createFlyDinos();
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

let timeoutID;

window.addEventListener("keydown", function (moveDino) {         
    if (moveDino.code === "ArrowUp") { 
        dinosaurLocation -= RESET_POS;        
        document.getElementById(dinosaurLocation).appendChild(dinosaur);               
        timeoutID = setTimeout(landDino, 3000);          
    } 
    if (moveDino.code === "ArrowDown") {
        clearInterval(timeoutID);
        landDino();       
    }     
});

let prevTime = 0;
let positionsActive = 1;

function moveTrees() {
    if (time - prevTime === ACTIVATE_NEXT_POS && positionsActive < 
        treeLocationSets.length) {
        ++positionsActive;
        prevTime = time;
    }
    for (let i = 0; i < positionsActive; ++i) {
        for (let j = 0; j < treeLocationSets[i].length; ++j) {
            treeLocationSets[i][j] -= MOVE_TREE;
            if (treeLocationSets[i][j] === MAX_LEFT) {
                treeLocationSets[i][j] += RESET_POS;                             
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

let flyDinoPos = 0;
let someNum = 0;

function moveFlyDino() {
    if (time - someNum === ACTIVATE_FLY_POS && flyDinoPos < 
        flyDinoLocations.length) {
        ++flyDinoPos; 
        someNum = 16;    
    }
    for (let i = 0; i < flyDinoPos; ++i) {
        for (let j = 0; j < flyDinoLocations[i].length; ++j) {
            flyDinoLocations[i][j] -= MOVE_TREE;
            if (flyDinoLocations[i][j] === 0) {
                flyDinoLocations[i][j] += RESET_POS;
            }            
            document.getElementById(flyDinos[i][j]).style.visibility = 
                "visible";          
            document.getElementById(flyDinoLocations[i][j])
                .appendChild(document.getElementById(flyDinos[i][j]));                        
            if (flyDinoLocations[i][j] === dinosaurLocation) {
                checkCollision(flyDinoLocations[i][j]);   
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
    moveFlyDino();       
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