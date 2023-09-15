const modal = document.getElementById('modal'); //Get modal
const menuButton = document.getElementById('menu-button'); //Get the button to open modal
const close = document.getElementsByClassName('close-button')[0]; //Get the element that closes modal
const accordion = document.getElementsByClassName('accordion');
const menuText = document.getElementsByClassName('menu-text');
const newGame = document.getElementById('new-game'); //Get a new game button
let movesCounter = document.getElementById('moves-counter'); //Get moves counter button
let i;

document.addEventListener('DOMContentLoaded', function() {
    const puzzle = document.getElementsByClassName('puzzle-container');
    const tiles = [];

    //Create puzzle pieces
    for (i = 1; i <= 8; i++) {
        const tile = document.createElement('div');
        tile.classList.add('puzzle-tile');
        tile.textContent = i;
        tiles.push(tile);
    }

    //Add empty tile
    const emptyTile = document.createElement('div');
    emptyTile.classList.add('puzzle-tile-empty');
    tiles.push(emptyTile);

    shuffleTiles();

    //Add tiles to puzzle container
    tiles.forEach((tile) => {
        puzzle.appendChild(tile);
    });

    //Event listeners for tile movement
        tiles.addEventListener('click', (event) => {
            const clickedTile = event.target;
            if (clickedTile.classList.contains('puzzle-tile')) {
                if (isAdjacentToEmpty(clickedTile)) {
                swapTiles(clickedTile, emptyTile);
                    if (isPuzzleSolved()) {
                    alert ("Congratulations! You solved the puzzle!");
                    }
                }
            }
        });

    //Check if tile is adjacent to the empty tile
    function isAdjacentToEmpty(tile) {
        const tileIndex = tiles.indexOf(tile);
        const emptyIndex = tiles.indexOf(emptyTile);

        const rowDiff = Math.abs(Math.floor(tileIndex / 3) - Math.floor(emptyIndex / 3));
        const colDiff = Math.abs((tileIndex % 3) - (emptyIndex % 3));

        return (rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1);
    }

    //Function to swap tiles
    function swapTiles(tile1, tile2) {
        const index1 = tiles.indexOf(tile1);
        const index2 = tiles.indexOf(tile2);

        tiles[index1] = tile2;
        tiles[index2] = tile1;

        updatePuzzle();
    }

    //Function to shuffle tiles
    function shuffleTiles() {
        for (let i = tiles.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
        }
    }

    //Function to update puzzle
    function updatePuzzle() {
        tiles.forEach((tile) => {
            puzzle.appendChild(tile);
        });
    }

    //Check if puzzle is solved
    function isPuzzleSolved() {
        for (let i = 0; i < tiles.length - 1; i++) {
            if (tiles[i].textContent !== i + 1 + '') {
                return false;
            }
        }
        return true;
    }
});

//Open the modal if button is clicked
menuButton.onclick = function() {
    modal.style.display = 'block';
}

//Close modal when close (x) element is clicked
close.onclick = function(event) {
    modal.style.display = 'none';
}

//If user clicks outside of modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

for (i = 0; i < accordion.length; i++) {
    accordion[i].addEventListener('click', function() {
        this.classList.toggle('active');

        menuText = this.nextElementSibling;
        if (menuText.style.display === 'block') {
            menuText.style.display = 'none';
        } else {
            menuText.style.display = 'block';
        }
    });
}

//Event listener for new game button
newGame.addEventListener('click', function(event) {
    if (event.target === newGame) {
        shuffleTiles();

        movesCounter = 0;
        updateMovesCounter();
    }
});

movesCounter = 0;

function updateMovesCounter() {
    movesCounter.textContent = `Moves: ${movesCounter}`;
}