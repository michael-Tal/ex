// 'use-strict'
const MINES = '💥'
const FLAG = '🚩'

var gBoard = null
var gLives = 3;
var gLevel = {
    size: 4,
    mines: 2
}
var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}

var gMinesLeft;
var gNumOfMinsAround;
var gTimeInterval;
var startTime;

function init() {
    gBoard = buildBoard()
    setMinesNegsCount(gBoard);
    gMinesLeft = gLevel.mines;
    printMat(gBoard, '.game');
    gTimeInterval;
}

function buildBoard() {
    var SIZE = gLevel.size;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            var cell = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false
            }
            board[i][j] = (cell);
        }
    }
    getRandomMines(board);

    return board;
}

function getRandomMines(board) {
    for (var i = 0; i < gLevel.mines; i++) {
        var randomI = getRandomInt(0, board.length);
        var randomJ = getRandomInt(0, board.length);
        while (board[randomI][randomJ].isMine === true) {
            randomI = getRandomInt(0, board.length);
            randomJ = getRandomInt(0, board.length);
        }
        board[randomI][randomJ].isMine = true;
    }
}

function setMinesNegsCount(mat) {
    for (var i = 0; i < mat.length; i++) {
        for (var j = 0; j < mat[0].length; j++) {
            var cell = mat[i][j]
            if (cell.isMine) continue;
            cell.minesAroundCount = setMinesNegsCountInBoard(mat, i, j)
        }
    }
}

function setMinesNegsCountInBoard(mat, rowIdx, colIdx) {
    var minesAroundCount = 0;
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i > mat.length - 1) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j > mat[0].length - 1) continue
            if (i === rowIdx && j === colIdx) continue
            var cell = mat[i][j];
            if (cell.isMine) minesAroundCount++
        }
    }
    return minesAroundCount
}

function cellClicked(elBtn, i, j) {
    if (!gGame.isOn) {
        startTime = new Date().getTime();
        gTimeInterval = setInterval(clockRunning, 1)
        gGame.isOn = true
    }
    var cell = gBoard[i][j];
    if (cell.isShown) return
    if (cell.isMine) {
        elBtn.innerText = MINES;
        gLives--
        // var elLive = document.querySelector('.lives');
        // console.log(elLive.innerText.length)
        // if (elLive.innerText === '❤️❤️❤️') elLive.innerText = 'hi';
        // if (elLive.innerText.length === 4) elLive.innerText = '❤️';
        // if (elLive.innerText.length === 2) elLive.innerText = '';
        if (gLives === 0) {
            gameOver();
        }
        return;
    }
    gNumOfMinsAround = cell.minesAroundCount;
    cell.isShown = true;
    if (cell.minesAroundCount === 0 && !cell.isMine) revealNegsZero(gBoard, i, j);
    //update The Model
    if (gBoard.isMine) return;
    //update The DOM
    elBtn.innerText = gNumOfMinsAround;

    checkGameOver(gBoard);
}

function revealNegsZero(mat, rowIdx, colIdx) {
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i > mat.length - 1) continue;
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j > mat[0].length - 1) continue;
            if (i === rowIdx && j === colIdx) continue;
            var currCell = mat[i][j];
            var cell = { i: i, j: j };
            currCell.isShown = true;
            // var elCell = document.querySelector(`.cell${location.i}-${location.j}`);
            console.log('hi');
            renderCell(cell, currCell.minesAroundCount);
            // ********complete recorshion.************
            // gNumOfMinsAround--
            if (currCell.minesAroundCount === 0 &&
                 !currCell.isMine && !currCell.isShown) revealNegsZero(mat, cell.i, cell.j);
        }
    }
}

function gameOver() {
    clearInterval(gTimeInterval);
    gGame.isOn = false
    var elBtn = document.querySelector('.rst');
    elBtn.innerText = '😭';
    gBoard = null
    gNumOfMinsAround;
}

function restartGame() {
    gGame.isOn = false;
    clearInterval(gTimeInterval);
    gTimeInterval = 0;
    var elTime = document.querySelector('.clock');
    elTime.innerText = 0;
    var elTime = document.querySelector('.rst');
    elTime.innerText = '😃';
    init()
}

function cellMarked(elBtn, i, j) {
    event.preventDefault()
    var cell = gBoard[i][j];
    if (!cell.isMarked) {
        gGame.markedCount++
        cell.isMarked = true;
        if (gMinesLeft > 0) {
            gMinesLeft--
            var elCount = document.querySelector('.mines');
            elCount.innerText = gMinesLeft;
            checkGameOver(gBoard)
        }
        elBtn.innerText = FLAG;
    } else {
        elBtn.innerText = '';
        gGame.markedCount--
        cell.isMarked = false;
        gMinesLeft--
        var elCount = document.querySelector('.mines');
        elCount.innerText = gMinesLeft;
        checkGameOver(gBoard)
    }
}

function checkGameOver(board) {
    var countShowenCells = 0;
    var numOfMarked = 0
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            var cell = board[i][j];
            if (cell.isShown && !cell.isMine) countShowenCells++;
            if (cell.isMine && cell.isMarked) numOfMarked++
        }
    }
    var numOfCellsThatShown = gLevel.size ** 2 - gLevel.mines;
    if (countShowenCells === numOfCellsThatShown
        && numOfMarked === gLevel.mines) gameDone()
}

function gameDone() {
    clearInterval(gTimeInterval);
    var elTime = document.querySelector('.rst');
    elTime.innerText = '😍';
    gGame.isOn = false;
    gBoard = null;
}

function clockRunning() {
    var countTime = new Date().getTime();
    var diff = countTime - startTime
    var elTime = document.querySelector('.clock');
    elTime.innerText = diff / 1000;
}

function levelEasy() {
    gLevel.size = 4;
    gLevel.mines = 2;
    restartGame();
}
function levelMid() {
    gLevel.size = 8;
    gLevel.mines = 12;
    restartGame();
}
function levelHard() {
    gLevel.size = 12;
    gLevel.mines = 30;
    restartGame();
}