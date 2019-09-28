const ROW = 20;
const COLUMN = 10;
const SQUARE = 20; // SIZE in pixels
const EMPTY = "#292c31"; // color of an empty square
//window.open("http://localhost:8080/gameover.html","_self");
localStorage.setItem("recording_data_enabled",'1');
const canvas = document.getElementById("tetris");
const context = canvas.getContext("2d");
const scoreElement = document.getElementById("score");
const playerElement = document.getElementById("player");
const levelElement = document.getElementById("level");
var name = localStorage.getItem("name");


playerElement.innerHTML = name;


// the Tetrominoes and their colors
const TETROMINOES = [
    [L, "#ff9000"],
    [J, "#06ff00"],
    [Z, "#ff00f6"],
    [S, "#fff000"],
    [T, "#1800ff"],
    [I, "#00fcff"],
    [O, "#ff0000"],
];

function drawSquare(x, y, color) {
    context.fillStyle = color;
    context.fillRect(x * SQUARE, y * SQUARE, SQUARE, SQUARE);
    context.strokeStyle = "#41454c";
    context.strokeRect(x * SQUARE, y * SQUARE, SQUARE, SQUARE);
}

// create the board
let board = []; // the board for the game should have 20 rows and 10 columns
for (r = 0; r < ROW; r++) {
    board[r] = [];
    for (c = 0; c < COLUMN; c++) {
        board[r][c] = EMPTY; // initially it's utterly white
    }
}

function drawBoard() {
    for (r = 0; r < ROW; r++) {
        for (c = 0; c < COLUMN; c++) {
            drawSquare(c, r, board[r][c]); // board[r][c] = EMPTY first, but later it'll have locked elements of personal colors on it
        }
    }
}

drawBoard();

// generate random tetrominoes
function randomTetromino() {
    let r = randomN = Math.floor(Math.random() * TETROMINOES.length) // random from 0 to 6
    return new Tetromino(TETROMINOES[r][0], TETROMINOES[r][1]);
}

let p = randomTetromino(); //object of a random tetromino

// The Object Tetromino
function Tetromino(tetromino, color) {
    this.tetromino = tetromino;
    this.color = color;
    this.tetrominoN = 0; // starting from the 1st pattern (of 4 possible rotations)
    //this.activeTetromino = this.tetromino[this.tetrominoN];
    this.activeTetromino = this.tetromino[0];
    this.x = 3;  // | starter coordinates
    this.y = -2; // |
}

Tetromino.prototype.fill = function (color) {
    for (r = 0; r < this.activeTetromino.length; r++) {
        for (c = 0; c < this.activeTetromino.length; c++) {
            // we draw only occupied squares
            if (this.activeTetromino[r][c]) {
                drawSquare(this.x + c, this.y + r, color);
            }
        }
    }
}

Tetromino.prototype.draw = function () {// draws a tetromino to the board
    this.fill(this.color);
}

Tetromino.prototype.unDraw = function () { // undraws a tetromino
    this.fill(EMPTY);
}

Tetromino.prototype.moveLeft = function () {
    if (!this.collision(-1, 0, this.activeTetromino)) {
        this.unDraw();
        this.x--;
        this.draw();
    }
    // p.moveDown();
}

Tetromino.prototype.moveRight = function () {
    if (!this.collision(1, 0, this.activeTetromino)) {
        this.unDraw();
        this.x++;
        this.draw();
    }
    // p.moveDown();
}

Tetromino.prototype.moveDown = function () {
    if (!this.collision(0, 1, this.activeTetromino)) {
        this.unDraw();
        this.y++;
        this.draw();
    } else {
        // lock the tetromino and generate a new one
        this.lock();
        p = randomTetromino();
    }

    clearInterval(interval);
    interval = setInterval(func, 1000);
}

// rotate the tetromino
Tetromino.prototype.rotate = function () {
    let nextPattern = this.tetromino[(this.tetrominoN + 1) % this.tetromino.length]; // loop switching between patterns
    let kick = 0;

    if (this.collision(0, 0, nextPattern)) { // avoiding getting out of borders
        if (this.x > COLUMN / 2) {
            // it's the right wall
            kick = -1; // we need to move the Tetromino to the left
        } else {
            // it's the left wall
            kick = 1; // we need to move the Tetromino to the right
        }
    }

    if (!this.collision(kick, 0, nextPattern)) {
        this.unDraw();
        this.x += kick;
        this.tetrominoN = (this.tetrominoN + 1) % this.tetromino.length; // (0+1)%4 => 1
        this.activeTetromino = this.tetromino[this.tetrominoN];
        this.draw();
    }

    // p.moveDown();
}

let score = 0;

Tetromino.prototype.lock = function () {
    for (r = 0; r < this.activeTetromino.length; r++) {
        for (c = 0; c < this.activeTetromino.length; c++) {
            // we skip the empty squares
            if (!this.activeTetromino[r][c]) {
                continue;
            }
            // Tetrominos to lock on top = game over
            if (this.y + r < 0) {

               // alert("Game Over");
                // stop request animation frame
                gameOver = true;

                let end_score = score;//document.getElementById("score");
                localStorage.setItem("score", end_score);
                window.open("https://localhost:8080/gameover.html","_self"); //  HTTPS !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                break;
            }
            // we lock the Tetromino
            board[this.y + r][this.x + c] = this.color;
        }
    }
    // remove full rows
    let combo = 0;
    for (r = 0; r < ROW; r++) {
        let isRowFull = true;
        for (c = 0; c < COLUMN; c++) {
            isRowFull = isRowFull && (board[r][c] != EMPTY);
        }

        if (isRowFull) {
            combo++;
            for (y = r; y > 1; y--) {
                for (c = 0; c < COLUMN; c++) {
                    board[y][c] = board[y - 1][c]; // moving down all the rows above the full one
                }
            }
            // the top row simply becomes white, there's no row above it
            for (c = 0; c < COLUMN; c++) {
                board[0][c] = EMPTY;
            }
            //score += 10;
        }
    }
    // update the board
    drawBoard();

    // update the score
    score += combo * 10 * level;
    if (score >= level * level * 5 * 10) {
        clearInterval(interval);
        interval = setInterval(func, 1000 * 0.9 ^ (level)); // to avoid values less than 0
        level++;
    }
    scoreElement.innerHTML = score;
    levelElement.innerHTML = level;
}
//let player = "";
var level = 1;
//var newlevel_multiplier = 1
levelElement.innerHTML = level;
Tetromino.prototype.collision = function (x, y, Tetromino) {
    for (r = 0; r < Tetromino.length; r++) {
        for (c = 0; c < Tetromino.length; c++) {
            // if the square is empty, we skip it
            if (!Tetromino[r][c]) {
                continue;
            }
            // coordinates of the Tetromino after movement
            let newX = this.x + c + x;
            let newY = this.y + r + y;

            // conditions
            if (newX < 0 || newX >= COLUMN || newY >= ROW) {
                return true;
            }
            // skip newY < 0 board[-1] will crush our game
            if (newY < 0) {
                continue;
            }
            // check if there is a locked Tetromino alrady in place
            if (board[newY][newX] != EMPTY) {
                return true;
            }
        }
    }
    return false;
}

document.addEventListener("keydown", KEY_LISTENER);

function KEY_LISTENER(event) {
    if (event.keyCode == 37) {
        p.moveLeft();
        dropStart = Date.now();
    } else if (event.keyCode == 38) {
        p.rotate();
        dropStart = Date.now();
    } else if (event.keyCode == 39) {
        p.moveRight();
        dropStart = Date.now();
    } else if (event.keyCode == 40) {
        p.moveDown();
    }
}

let dropStart = Date.now();
let gameOver = false;

function func() {
    if (!gameOver) {
        p.moveDown();
    } else {
        clearInterval(interval);
    }
}

var interval = setInterval(func, 1000)

var highscores = document.getElementById("highscores");


if (gameOver) {


}

