const MAX_LEFT = 15;
const MOVE_OBJECT = 1;
const ACTIVATE_NEXT_TREE_POS = 10;
const RESET_POS = 15;
const ACTIVATE_FLY = 29;
const ACTIVATE_NEXT_FLY = 5;
const DELAY_TIME = 500;
const DELAY_JUMP = 1500;

function createTable() {
    let cellID = 0;
    let table = document.createElement("table");   
    for (let i = 0; i < 2; ++i) {
        let row = table.insertRow();
        for (let j = 0; j < 15; ++j) {
            let cell = row.insertCell();
            cell.id = ++cellID;                
        }
    }
    document.getElementById("tableContainer").appendChild(table);   
}
createTable();

let dinosaurLocation = 16;
let dinosaur = document.createElement("img");
dinosaur.src = "Assets//Tyrannosaurus-vector.jpg";
document.getElementById(dinosaurLocation).appendChild(dinosaur);


const treeLocationSets = [[31], [30, 31], [31]];
const trees = [];
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

const flyDinoLocations = [[14, 15], [15], [15]];
const flyDinos = [];
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

function landDino() {
    dinosaurLocation += RESET_POS;
    document.getElementById(dinosaurLocation).appendChild(dinosaur);     
}

let timeoutID;

window.addEventListener("keydown", function (moveDino) {         
    if (moveDino.code === "ArrowUp") { 
        dinosaurLocation -= RESET_POS;        
        document.getElementById(dinosaurLocation).appendChild(dinosaur);               
        timeoutID = setTimeout(landDino, DELAY_JUMP);          
    } 
    if (moveDino.code === "ArrowDown") {
        clearInterval(timeoutID);
        landDino();       
    }     
});

let prevTime = 0;
let positionsActive = 1;

function moveTrees() {
    if (time - prevTime === ACTIVATE_NEXT_TREE_POS && 
        positionsActive < treeLocationSets.length) {
        ++positionsActive;
        prevTime = time;
    }
    for (let i = 0; i < positionsActive; ++i) {
        for (let j = 0; j < treeLocationSets[i].length; ++j) {
            treeLocationSets[i][j] -= MOVE_OBJECT;
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

let flyDinoPos = 1;
let appearTime = ACTIVATE_FLY;

function moveFlyDino() {
    if (time - appearTime === ACTIVATE_NEXT_FLY && 
        flyDinoPos < flyDinoLocations.length) {
        ++flyDinoPos; 
        appearTime = time;    
    }
    for (let i = 0; i < flyDinoPos; ++i) {
        for (let j = 0; j < flyDinoLocations[i].length; ++j) {
            flyDinoLocations[i][j] -= MOVE_OBJECT;
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
    if (time >= ACTIVATE_FLY) {
        moveFlyDino(); 
    }       
}
    
function startTimer() {
    document.getElementById("Time").innerHTML = "0";
    intervalID = setInterval(increaseTime, DELAY_TIME);    
}

function startAndHide() {
    startTimer();
    document.getElementById("StartButton").style.visibility = "hidden";
}

document.getElementById("ReloadPageButton").style.visibility = "hidden";