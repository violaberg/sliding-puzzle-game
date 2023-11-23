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
            const tile = document.getElementById('tile' + row + column);
            tile.addEventListener('click', (function (currentRow, currentColumn) {
                return function () {
                    chooseTile(currentRow, currentColumn);
                    moveTiles('tile' + currentRow + currentColumn, 'tile33');

                    //Check if puzzle is solved
                    if (isPuzzleSolved()) {
                        alert('Congratulations! You solved the puzzle!');
                    }
                };
            })(row, column));
        }
    }
});

function moveTiles(tile1, tile2) {
    const tile1Element = document.getElementById(tile1);
    const tile2Element = document.getElementById(tile2);

    // Swap the src attribute of the two tiles
    const tempSrc = tile1Element.src;
    tile1Element.src = tile2Element.src;
    tile2Element.src = tempSrc;

    // Swap data attributes to update tile positions
    [tile1Element.dataset.row, tile2Element.dataset.row] = [tile2Element.dataset.row, tile1Element.dataset.row];
    [tile1Element.dataset.column, tile2Element.dataset.column] = [tile2Element.dataset.column, tile1Element.dataset.column];

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
                const tile1 = "tile" + row + column;
                const tile2 = "tile" + secondRow + secondCol;
                moveTiles(tile1, tile2);
            }
        }
    }
}

newGame.addEventListener('click', shufflePuzzle);

function chooseTile(row, column) {
    const tile = document.getElementById("tile" + row + column);
    const tileClass = tile.className;

    // Get the positions of the adjacent tiles
    const leftTile = document.getElementById("tile" + row + (column - 1));
    const rightTile = document.getElementById("tile" + row + (column + 1));
    const topTile = document.getElementById("tile" + (row - 1) + column);
    const bottomTile = document.getElementById("tile" + (row + 1) + column);

    // Check if any adjacent tile is the empty tile
    const isLeftEmpty = leftTile && leftTile.className.includes("tile9");
    const isRightEmpty = rightTile && rightTile.className.includes("tile9");
    const isTopEmpty = topTile && topTile.className.includes("tile9");
    const isBottomEmpty = bottomTile && bottomTile.className.includes("tile9");

    // Check if the current tile can be moved
    if (tileClass.includes("tile9") && (isLeftEmpty || isRightEmpty || isTopEmpty || isBottomEmpty)) {
        if (isLeftEmpty) {
            moveTiles("tile" + row + column, "tile" + row + (column - 1));
        } else if (isRightEmpty) {
            moveTiles("tile" + row + column, "tile" + row + (column + 1));
        } else if (isTopEmpty) {
            moveTiles("tile" + row + column, "tile" + (row - 1) + column);
        } else if (isBottomEmpty) {
            moveTiles("tile" + row + column, "tile" + (row + 1) + column);
        }
    } else {
        console.log(`No adjacent empty tile found for (${row}, ${column})`);
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