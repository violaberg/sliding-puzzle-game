let count = 0;
const body = document.body;
const puzzleOverlay = document.getElementById('puzzle-overlay'); //Create overlay when puzzle modal is open
const menuOverlay = document.getElementById('menu-overlay'); //Create overlay when menu modal is open
const modal = document.getElementById('modal'); //Get menu modal
const menuButton = document.getElementById('menu-button'); //Get the button to open menu modal
const close = document.getElementsByClassName('close-button')[0]; //Get the element that closes modal
const imgModal = document.getElementById('imgModal'); //Get complete puzzle modal
const imgButton = document.getElementById('show-img'); //Get the button to open image modal
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
        count = 0;
        movesCounter.innerHTML = 'Moves: ' + count;
    });

    for (let row = 1; row <= 3; row++) {
        for (let column = 1; column <= 3; column++) {
            const tileId = "tile" + row + column;
            const tile = document.getElementById(tileId);

            tile.addEventListener('click', function () {
                chooseTile(row, column);
                moveTiles(tileId, "tile33");

                //Check if puzzle is solved
                if (isPuzzleSolved()) {
                    alert('Congratulations! You solved the puzzle!');
                }
            });
        }
    }
});

function moveTiles(tile1, tile2) {
    const tile1Element = document.getElementById(tile1);
    const tile2Element = document.getElementById(tile2);

    if (!tile1Element || !tile2Element) {
        console.error('Error: One or both tiles not found.', tile1, tile2);
        return;
    }

    const tempId = tile1Element.id;
    tile1Element.id = tile2Element.id;
    tile2Element.id = tempId;

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

    console.log("Shuffling puzzle...");
    for (let row = 1; row <= 3; row++) {
        for (let column = 1; column <= 3; column++) {

            let secondRow = Math.floor(Math.random() * 3 + 1);
            let secondCol = Math.floor(Math.random() * 3 + 1);

            if (row !== secondRow || column !== secondCol) {
                const tile1 = "tile" + row + column;
                const tile2 = "tile" + secondRow + secondCol;
                console.log("Moving tiles:", tile1, tile2);
                moveTiles(tile1, tile2);
            }
        }
    }
}

newGame.addEventListener('click', shufflePuzzle);

function chooseTile(row, column) {
    let tile = document.getElementById("tile" + row + column);
    let tileClass = tile.className;
    if (tileClass != "tile9") {
        if (column < 3) {
            if (document.getElementById("tile" + row + (column + 1)).className == "tile9") {
                moveTiles("tile" + row + column, "tile" + row + (column + 1));
                return;
            }
        }

        if (column > 1) {
            if (document.getElementById("tile" + row + (column - 1)).className == "tile9") {
                moveTiles("tile" + row + column, "tile" + row + (column - 1));
                return;
            }
        }

        if (row > 1) {
            if (document.getElementById("tile" + (row - 1) + column).className == "tile9") {
                moveTiles("tile" + row + column, "tile" + (row - 1) + column);
                return;
            }
        }

        if (row < 3) {
            if (document.getElementById("tile" + (row + 1) + column).className == "tile9") {
                moveTiles("tile" + row + column, "tile" + (row + 1) + column);
                return;
            }
        }
    }
}

//Open menu modal if button is clicked
menuButton.onclick = function () {
    modal.style.display = 'block';

    // Disable the body
    body.style.overflow = 'hidden';
    menuOverlay.style.display = 'block';
};

//Close menu modal when close (x) element is clicked
close.onclick = function (event) {
    modal.style.display = 'none';

    // Enable the body
    body.style.overflow = 'auto';
    menuOverlay.style.display = 'none';
};

//Open image modal if button is clicked
imgButton.onclick = function () {
    imgModal.style.display = 'block';

    // Disable the body
    body.style.overflow = 'hidden';
    puzzleOverlay.style.display = 'block';
};

//Close image modal when user clicks on image
imgModal.onclick = function (event) {
    imgModal.style.display = 'none';

    // Enable the body
    body.style.overflow = 'auto';
    puzzleOverlay.style.display = 'none';
};

movesCounter.addEventListener('click', function () {
    count += 1;
    movesCounter.innerHTML = 'Moves: ' + count;
});