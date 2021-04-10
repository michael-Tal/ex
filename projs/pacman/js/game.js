'use strict'
const WALL = '#'
const FOOD = '.'
const EMPTY = ' ';
const SUPER_FOOD = '💩';
const CHERRY = '🍒'

var gIntervalCherry;

var gBoard;
var gGame = {
    score: 0,
    isOn: false
}
function init() {
    gBoard = buildBoard()
    console.log(gBoard)
    createPacman(gBoard);
    createGhosts(gBoard);
    printMat(gBoard, '.board-container');
    gGame.isOn = true;
    putCherryInRandomCell()
}

function buildBoard() {
    var SIZE = 10;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD;
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL;
            }
            if (i === 1 && j === 1 || i === 1 && j === 8
                || i === 8 && j === 1 || i === 8 && j === 8) board[i][j] = SUPER_FOOD;
        }
    }
    // console.log(board);
    return board;
}



function updateScore(diff) {
    // update model
    gGame.score += diff;
    console.log(gGame.score);
    // and dom
    var elScore = document.querySelector('h2 span');
    elScore.innerText = gGame.score;
}

function gameOver() {
    console.log('Game Over');
    gGame.isOn = false;  
    clearInterval(gIntervalCherry);
    clearInterval(gIntervalGhosts);
    gIntervalGhosts = null
    var elModal = document.querySelector('.modal')
    elModal.style.display = 'block'
    var elTextGameOver = document.querySelector('.over')
    elTextGameOver.style.display = 'block'

    // TODO
}

function restartGame() {
    var elModal = document.querySelector('.modal')
    elModal.style.display = 'none'
    var elTextGameOver = document.querySelector('.over')
    elTextGameOver.style.display = 'none'
    var elTextGameDone = document.querySelector('.done')
    elTextGameDone.style.display = 'none'
    gBoard;
    gGame = {
        score: 0,
        isOn: false
    }
    init()
}


function putCherryInRandomCell() {
    if (!gGame.isOn) return;
    gIntervalCherry = setInterval(function () {
        var emptyCells = findEmptySells(gBoard);
        var randomCell = drawNum2(emptyCells);
        gBoard[randomCell.i][randomCell.j] = CHERRY;
        renderCell(randomCell, CHERRY);
    }, 15000)
}



function checkFoodInBoard(board) {
    var res = [];
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            var cell = board[i][j];
            if (cell === FOOD) res.push(cell);
        }
    }
    return res;
}

function isGameDone(cells) {
    if (cells.length) return false;
    clearInterval(gIntervalCherry);
    clearInterval(gIntervalGhosts);
    gGame.isOn = false;
    gIntervalGhosts = null;
    var elModal = document.querySelector('.modal');
    elModal.style.display = 'block';
    var elTextGameDone = document.querySelector('.done');
    elTextGameDone.style.display = 'block';
}

function findEmptySells(board) {
    var res = [];
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            var currCell = board[i][j];
            var cell = { i: i, j: j }
            if (currCell !== SUPER_FOOD && currCell !== PACMAN
                && currCell !== GHOST && currCell !== WALL && currCell!==FOOD
            ) res.push(cell);
        }
    }
    return res;
}