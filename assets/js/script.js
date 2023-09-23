const modal = document.getElementById('modal'); //Get modal
const menuButton = document.getElementById('menu-button'); //Get the button to open modal
const close = document.getElementsByClassName('close-button')[0]; //Get the element that closes modal
const newGame = document.getElementById('new-game'); //Get a new game button
let movesCounter = document.querySelector('#moves'); //Get moves counter button

//Initial puzzle array
const initialPuzzle = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 0] //0 for the empty tile
];

//Check if puzzle is solved
function isPuzzleSolved() {
    let tileNumbers = [];

    //Collect the numbers of tiles
    for (let row = 1; row <= 3; row++) {
        for (let column = 1; column <= 3; column++) {
            const tile = document.getElementById('tile' + row + column);
            tileNumbers.push(parseInt(tile.textContent));
        }
    }

    //Check if tiles are in sequence
    for (let i = 0; i < tileNumbers.length - 1; i++) {
        if (tileNumbers[i] !== i + 1) {
            return false;
        }
    }

    //The last tile is an empty one
    return tileNumbers[tileNumbers - 1] === '9';
}

//Change puzzle to array
function isSolvable(puzzle) {
    const flatPuzzle = puzzle.flat();
    const size = flatPuzzle.length;

    let inversions = 0;
    for (let i = 0; i < size - 1; i++) {
        for (let j = 0; j < size; j++) {
            if (flatPuzzle[i] !== 0 && flatPuzzle[j] !== 0 && flatPuzzle[i] > flatPuzzle[j]) {
                inversions++;
            }
        }
    }

    return inversions % 2 === 0;
}

//Atach event listeners to tiles
document.addEventListener('DOMContentLoaded', function () {
    newGame.addEventListener('click', function () {
        shufflePuzzle();
        let count = 0;
        movesCounter.innerHTML = 'Moves: ' + count;
    });

    for (let row = 1; row <= 3; row++) {
        for (let column = 1; column <= 3; column++) {
            const tile = document.getElementById('tile' + row + column);
            tile.addEventListener('click', function () {
                chooseTile(row, column);
                moveTiles('tile' + row + column, 'tile tile9');

                //Check if puzzle is solved
                if (isPuzzleSolved()) {
                    alert('Congratulations! You solved the puzzle!');
                }
            });
        }
    }
});
function moveTiles(tile1, tile2) {
    let temp = document.getElementById(tile1).className;
    document.getElementById(tile1).className = document.getElementById(tile2).className;
    document.getElementById(tile2).className = temp;
    
    //Count moves
    count++;
    movesCounter.innerHTML = 'Moves: ' + count;
}

//Nested loops for each cell of the table
function shufflePuzzle() {
    if (!isSolvable(initialPuzzle)) {
        alert('Puzzle is not solvable! Please start new game!');
        return;
    }

    document.getElementById('moves').innerHTML = 'Moves: 0';

    for (let row = 1; row <= 3; row++) {
        for (let column = 1; column <= 3; column++) {

            let secondRow = Math.floor(Math.random() * 3 + 1);
            let secondCol = Math.floor(Math.random() * 3 + 1);
            
            if (row !== secondRow || column !== secondCol) {
                moveTiles("tile" + row + column, "tile" + secondRow + secondCol);
            }
        }
    }
}

newGame.addEventListener('click', shufflePuzzle);

function chooseTile(row, column) {
        let tile = document.getElementById("tile" + row + column);
        let tileClass = tile.className;
        if (tileClass != "tile tile9") {
            if (column < 3) {
                if (document.getElementById("tile" + row + (column + 1)).className == "tile tile9") {
                    moveTiles("tile" + row + column, "tile" + row + (column + 1));
                    return;
                }
            }

            if (column > 1) {
                if (document.getElementById("tile" + row + (column - 1)).className == "tile tile9") {
                    moveTiles("tile" + row + column, "tile" + row + (column - 1));
                    return;
                }
            }

            if (row > 1) {
                if (document.getElementById("tile" + (row - 1) + column).className == "tile tile9") {
                    moveTiles("tile" + row + column, "tile" + (row - 1) + column);
                    return;
                }
            }

            if (row < 3) {
                if (document.getElementById("tile" + (row + 1) + column).className == "tile tile9") {
                    moveTiles("tile" + row + column, "tile" + (row + 1) + column);
                    return;
                }
            }
        }
    }

    //Open the modal if button is clicked
    menuButton.onclick = function () {
        modal.style.display = 'block';
    };

    //Close modal when close (x) element is clicked
    close.onclick = function (event) {
        modal.style.display = 'none';
    };

let count = 0;
movesCounter.addEventListener = ('click', function () {
    count += 1;
    movesCounter.innerHTML = 'Moves: ' + count;
    });