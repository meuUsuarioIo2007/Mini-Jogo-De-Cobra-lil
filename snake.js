const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const box = 20;
const canvasSize = 400;

let snake = [];
snake[0] = { x: 9 * box, y: 10 * box };

let direction;

let food = {
    x: Math.floor(Math.random() * (canvasSize / box)) * box,
    y: Math.floor(Math.random() * (canvasSize / box)) * box
};

const snakeHeadImg = new Image();
snakeHeadImg.src = 'https://example.com/snake_head.png'; // Substitua pelo caminho correto da imagem da cabeça

const snakeBodyImg = new Image();
snakeBodyImg.src = 'https://example.com/snake_body.png'; // Substitua pelo caminho correto da imagem do corpo

const foodImg = new Image();
foodImg.src = 'https://via.placeholder.com/20x20.png?text=F'; // Substitua pelo caminho correto da imagem da comida

document.addEventListener('keydown', changeDirection);

function changeDirection(event) {
    if (event.keyCode == 37 && direction != 'RIGHT') {
        direction = 'LEFT';
    } else if (event.keyCode == 38 && direction != 'DOWN') {
        direction = 'UP';
    } else if (event.keyCode == 39 && direction != 'LEFT') {
        direction = 'RIGHT';
    } else if (event.keyCode == 40 && direction != 'UP') {
        direction = 'DOWN';
    }
}

function collision(newHead, snakeArray) {
    for (let i = 0; i < snakeArray.length; i++) {
        if (newHead.x == snakeArray[i].x && newHead.y == snakeArray[i].y) {
            return true;
        }
    }
    return false;
}

function draw() {
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(0, 0, canvasSize, canvasSize);

    for (let i = 0; i < snake.length; i++) {
        if (i == 0) {
            ctx.drawImage(snakeHeadImg, snake[i].x, snake[i].y, box, box);
        } else {
            ctx.drawImage(snakeBodyImg, snake[i].x, snake[i].y, box, box);
        }
    }

    ctx.drawImage(foodImg, food.x, food.y, box, box);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction == 'LEFT') snakeX -= box;
    if (direction == 'UP') snakeY -= box;
    if (direction == 'RIGHT') snakeX += box;
    if (direction == 'DOWN') snakeY += box;

    if (snakeX == food.x && snakeY == food.y) {
        food = {
            x: Math.floor(Math.random() * (canvasSize / box)) * box,
            y: Math.floor(Math.random() * (canvasSize / box)) * box
        };
    } else {
        snake.pop();
    }

    let newHead = { x: snakeX, y: snakeY };

    if (snakeX < 0 || snakeY < 0 || snakeX >= canvasSize || snakeY >= canvasSize || collision(newHead, snake)) {
        clearInterval(game);
        alert("Game Over! Press F5 to Restart.");
    }

    snake.unshift(newHead);
}

let game = setInterval(draw, 100);
