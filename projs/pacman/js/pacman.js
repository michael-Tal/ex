'use strict'
var PACMAN = '<img src="pic/faceRight.jpeg">';

var gPacman;
function createPacman(board) {
    // TODO
    gPacman = {
        location: {
            i: 6,
            j: 6
        },
        superFood :SUPER_FOOD,
        isSuper: false
    }

    board[gPacman.location.i][gPacman.location.j] = PACMAN;
}

function movePacman(ev) {
    if (!gGame.isOn) return
    // use getNextLocation(), nextCell
    var nextLocation = getNextLocation(ev);

    var nextCell = gBoard[nextLocation.i][nextLocation.j];

    //place cherry in random spot every 15 sec
    // setTimeout (function(){
    //     var emptyCells = findEmptySells(gBoard)
    //     var randomCell = drawNum2(emptyCells)
    //     console.log(randomCell);
    // },15000)

    // return if cannot move
    if (nextCell === WALL) return;
    // hitting a ghost?  call gameOver
    if (nextCell ===SUPER_FOOD && gPacman.isSuper) return
    if (nextCell === SUPER_FOOD) {
            gPacman.isSuper = true;
            setTimeout(function () {
                gPacman.isSuper = false;

            }, 5000)
    }


    if (nextCell === GHOST) {
        if (gPacman.isSuper) eatGhost(nextLocation);
        else {
            gameOver()
            renderCell(gPacman.location, EMPTY)
            return
        }
    }
    if (nextCell === CHERRY) {
        updateScore(10)
    }
    if (nextCell === FOOD) {
        updateScore(1)
    }


    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    // update the DOM
    renderCell(gPacman.location, EMPTY)

    // Move the pacman
    // update the model

    gPacman.location = nextLocation;
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;

    // update the DOM
    renderCell(gPacman.location, PACMAN);

    var numsOfFoodCells = checkFoodInBoard(gBoard);
    var isGameFinished = isGameDone(numsOfFoodCells)
    if (isGameFinished) gameOver();

}

function eatGhost(location) {
    for (var i = 0; i < gGhosts.length; i++) {
        var currGhost = gGhosts[i];
        setTimeout(function () {
            if (currGhost.location === location) {
                var deleteGhost = gGhosts.splice(currGhost.location, 1)[0];
                gDeletedGhosts.push(deleteGhost);
            }
        }, 5000)
    }
}

function getNextLocation(ev) {
    // figure out nextLocation
    // console.log('ev.code', ev.code)
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }

    switch (ev.code) {   
        case 'ArrowUp':
            PACMAN = '<img src="pic/faceUp.jpeg">';
            nextLocation.i--
            break;
        case 'ArrowDown':
            PACMAN = '<img src="pic/faceDown.jpeg">';
            nextLocation.i++
            break;
        case 'ArrowLeft':
            PACMAN = '<img src="pic/faceLeft.jpeg">';
            nextLocation.j--
            break;
        case 'ArrowRight':
            PACMAN = '<img src="pic/faceRight.jpeg">';
            nextLocation.j++
            break;
        default: return null
    }
    return nextLocation;
}
