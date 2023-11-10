const rows = 3;
const cols = 3;
let currentTile;
let emptyTile;
let count = 0;
const modal = document.getElementById('modal'); //Get modal
const menuButton = document.getElementById('menu-button'); //Get the button to open modal
const close = document.getElementsByClassName('close-button')[0]; //Get the element that closes modal
const newGame = document.getElementById('new-game'); //Get a new game button
let movesCounter = document.querySelector('#moves'); //Get moves counter button

//Initial puzzle array
let initialPuzzle = [
    ['4', '2', '8'],
    ['5', '1', '6'],
    ['7', '9', '3'] //1 for the empty tile
];

initialPuzzle = [
    ['1', '2', '5'],
    ['4', '3', '6'],
    ['9', '8', '7'] //1 for the empty tile
];

window.onload = function () {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {

            //Create img tag and get tile coords
            let tile = document.createElement('img');
            tile.id = r.toString() + '-' + c.toString();
            tile.src = initialPuzzle.shift() + '.jpg';

            //Add functionality to move tiles
            tile.addEventListener('dragstart', dragStart);
            tile.addEventListener('dragover', dragOver);
            tile.addEventListener('dragenter', dragEnter);
            tile.addEventListener('dragleave', dragLeave);
            tile.addEventListener('dragdrop', dragDrop);
            tile.addEventListener('dragend', dragEnd);

            document.getElementsByClassName('puzzle-container').append(tile);
        }
    }
};

function dragStart() {
    currentTile = this;
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave(e) {
    e.preventDefault();
}

function dragDrop() {
    emptyTile = this;
}

function dragEnd() {

    if (!emptyTile.src.includes('1.jpg')) {
        return;
    }

    let currentCoords = currentTile.id.split('-');
    let r = parseInt(currentCoords[0]);
    let c = parseInt(currentCoords[1]);

    let emptyCoords = emptyTile.id.split('-');
    let r1 = parseInt(emptyCoords[0]);
    let c1 = parseInt(emptyCoords[1]);

    let dragRight = r == r1 && c1 == c + 1;
    let dragLeft = r == r1 && c1 == c - 1;

    let dragDown = c == c1 && r1 == r + 1;
    let dragUp = c == c1 && r1 == r - 1;

    let isAdjacent = dragRight || dragLeft || dragDown || dragUp;

    if (isAdjacent) {
        let currentImg = currentTile.src;
        let emptyImg = emptyTile.src;

        currentTile.src = emptyImg;
        emptyTile.src = currentImg;

        count += 1;
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

movesCounter.addEventListener = ('click', function () {
    count += 1;
    movesCounter.innerHTML = 'Moves: ' + count;
});