window.addEventListener('DOMContentLoaded', () => {

var gameArea = document.querySelector("#gameArea").getContext("2d");

var GameOver = false;
    
var score = 0;
    
var snake = [
    {x: 200, y: 350},
    {x: 190, y: 350},
    {x: 180, y: 350},
    {x: 170, y: 350},
    {x: 160, y: 350}
];
    
var ateFood = false;
    
function drawSnake() {
    gameArea.clearRect(0, 0, 600, 600);
    for (part of snake) {
        gameArea.fillStyle = "greenyellow";
        gameArea.fillRect(part['x'], part['y'], 10, 10);
    }
}
  
function updateSnake() {
    let head = {x: snake[0]['x'] + mx, y: snake[0]['y'] + my};
    snake.unshift(head);
    if (!ateFood) {
        snake.pop();
    } else {
        score += 10;
        document.querySelector("#score").innerHTML = score;
    }
}
    
var mx = 10, my = 0;
document.addEventListener('keydown', ()=> {
    const LEFT = 37;
    const goingLeft = mx === -10;
    const UP = 38;
    const goingUp = my === -10;
    const RIGHT = 39;
    const goingRight = mx === 10;
    const DOWN = 40;
    const goingDown = my === 10;
    const keyPressed = event.keyCode;
    
    if (keyPressed === LEFT && !goingRight) { mx=-10; my=0; }
    if (keyPressed === UP && !goingDown) { mx=0; my=-10; }
    if (keyPressed === RIGHT && !goingLeft) { mx=10; my=0; }
    if (keyPressed === DOWN && !goingUp) { mx=0; my=10; }
});
    
var food = [
    {x: 0, y: 0}
];

function generateFood() {
    food['x'] = Math.round(Math.floor(Math.random() * 600) / 10) * 10;
    food['y'] = Math.round(Math.floor(Math.random() * 600) / 10) * 10;
    for (part of snake) {
        if (part['x']===food['x'] && part['y']===food['y']) {
            generateFood();
        }
    }
}

function drawFood() {
    gameArea.fillStyle = "orangered";
    gameArea.fillRect(food['x'], food['y'], 10, 10);
}
    
function checkFood() {
    if (snake[0]['x']===food['x'] && snake[0]['y']===food['y']) {
        ateFood = true;
        generateFood();
    } else {
        ateFood = false;
    }
}
    
function endGame() {
    if (snake[0]['x']<0 || snake[0]['x']>600 || snake[0]['y']<0 || snake[0]['y']>600) {
        GameOver = true;
    }
    for (let i=1; i < snake.length; i++) {
        if (snake[0]['x']===snake[i]['x'] && snake[0]['y']===snake[i]['y']) {
            GameOver = true;
        }
    }
}
    
function runGame() {
    setTimeout(()=> {
    updateSnake();
    drawSnake();
    drawFood();
    endGame();
    checkFood();
    if (!GameOver) {
    runGame();
    } else {
        drawSnake();
        alert("Snake ded! You kill my snake!");
        location.reload();
    }
    }, 100);
}

generateFood();
runGame();
    
});