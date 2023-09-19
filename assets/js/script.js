const modal = document.getElementById('modal'); //Get modal
const menuButton = document.getElementById('menu-button'); //Get the button to open modal
const close = document.getElementsByClassName('close-button')[0]; //Get the element that closes modal
const accordion = document.getElementsByClassName('accordion');
let menuText = document.getElementsByClassName('menu-text');
const newGame = document.getElementById('new-game'); //Get a new game button
let movesCounter = document.querySelector('#moves'); //Get moves counter button
let i;

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
    return tileNumbers[tileNumbers - 1] === 'tile tile9';
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
};

//Atach event listeners to tiles
document.addEventListener('DOMContentLoaded', function() {
    newGame.addEventListener('click', shufflePuzzle);

    for (let row = 1; row <= 3; row++) {
        for (let column = 1; column <= 3; column++) {
            const tile = document.getElementById('tile' + row + column);
            tile.addEventListener('click', function() {
                chooseTile(row, column);
                moveTiles('tile' + row + column, 'tile tile9');

                //Check if puzzle is solved
                if (isPuzzleSolved()) {
                    alert ('Congratulations! You solved the puzzle!');
                }
            });
        }
    }
});

function moveTiles(tile1, tile2) {
    let temp = document.getElementById(tile1).className;
    document.getElementById(tile1).className = document.getElementById(tile2).className;
    document.getElementById(tile2).className = temp;
    movesCounter.innerHTML = 'Moves: ' (++moves);
}

//Nested loops for each cell of the table
function shufflePuzzle() {
    if (!isSolvable(initialPuzzle)) {
        alert ('Puzzle is not solvable! Please start new game!');
        return;
    }

    moves = 0; //Resets move count back to 0 when shuffling
    document.getElementById('moves').innerHTML = 'Moves: 0';
    for (let row = 1; row <= 3; row++) {
        for (let column = 1; column <= 3; column++) {

            let secondRow = Math.floor(Math.random() * 3 + 1);
            let secondCol = Math.floor(Math.random() * 3 + 1);

            moveTiles("tile" + row + column, "tile" + secondRow + secondCol);
        }
    }
}

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

//If user clicks outside of modal, close it
window.addEventListener = ('click', function (event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

for (i = 0; i < accordion.length; i++) {
    accordion[i].addEventListener('click', function () {
        this.classList.toggle('active');

        let menuText = this.nextElementSibling;
        if (menuText.style.maxHeight) {
            menuText.style.maxHeight = null;
        } else {
            menuText.style.maxHeight = menuText.scrollHeight + 'px';
        }
    });
};

let count;
let moves;

document.getElementById('moves'),
count = 0;
moves.addEventListener = ('click', function () {
    count += 1;
    moves.innerHTML = 'Moves: ' + count;
});