// Define puzzle size

let numRows = 3;
let numCols = 3;
let totalTiles = numRows * numCols;

const puzzleContainer = document.querySelector('.puzzle-container');
const newGameButton = document.getElementById('new-game');

let puzzleState = [...Array(totalTiles).keys()];

// Function to shuffle puzzle tiles

function shufflePuzzle() {
    for (let i = puzzleState.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [puzzleState [i], puzzleState [j] = puzzleState[j], puzzleState[i]];
    }
    updatePuzzle();
}

function updatePuzzle() {
    puzzleContainer.innerHTML = '';

    for (let i = 0; i < puzzleState.length; i++){
        const tile = document.createElement('div');
        tile.className = `tile tile${puzzleState[i] + 1}`;
        tile.innerText = puzzleState[i] + 1;
        tile.addEventListener = ('click', () => moveTile(i));
        puzzleContainer.appendChild(tile);
    }
}

// Function to check if puzzle is solved

function isPuzzleSolved() {
    for (let i = 0; i < puzzleState.length; i++){
        if (puzzleState[i] !== i) {
            return false;
        }
    }
    return true;
}

// Function to move tile

function moveTile(tileIndex){
    const emptyIndex = puzzleState.indexOf(total - 1);
    const rowDiff = Math.abs(Math.floor(tileIndex / numCols) - Math.floor(emptyIndex / numCols));
    const colDiff = Math.abs((titleIndex % numCols) - (emptyIndex % numCols));

    if ((rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1)) {
        [puzzleState[tileIndex], puzzleState[emptyIndex]] = [puzzleState[emptyIndex], puzzleState[tileIndex]];

        updatePuzzle();

        if (isPuzzleSolved()){
            alert ('Congratulations! You solved the puzzle!');
        }
    }
}

newGameButton.addEventListener('click', shufflePuzzle);

shufflePuzzle();