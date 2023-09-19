const modal = document.getElementById('modal'); //Get modal
const menuButton = document.getElementById('menu-button'); //Get the button to open modal
const close = document.getElementsByClassName('close-button')[0]; //Get the element that closes modal
const accordion = document.getElementsByClassName('accordion');
const menuText = document.getElementsByClassName('menu-text');
const newGame = document.getElementById('new-game'); //Get a new game button
let moves = document.querySelector('.moves'); //Get moves counter button
let i;

let rows = 3;
let columns = 3;
let currentTile;
let nextTile; //empty tile

//let imgSeq = ['1', '2', '3', '4',' 5', '6', '7', '8',' 9'];

imgSeq = ['4', '2', '8', '5', '1', '6', '7', '9', '3']; //3 for the empty tile

window.onload = function() {
    for (let r = 0; r < rows; r++) {
        for (let c =0; c < columns; c++) {

            let tile = document.createElement('tile');
            tile.id = r.toString() + '-' + c.toString();
            tile.src = imgSeq.shift() + '.jpg'; //Uses js instead of 9 div in html

            //Tile movement function
            tile.addEventListener('moveOut', moveOut); //Click tile to move
            tile.addEventListener('moveIt', moveIt); //Hold and move
            tile.addEventListener('moveIn', moveIn); //Move over other tile
            tile.addEventListener('leave', leave); //Moved image leaving
            tile.addEventListener('put', put); //Put tile over other and leave it
            tile.addEventListener('finish', finish); //Last move to swap tiles

            document.getElementsByClassName('puzzle-container').append(tile);
        }
    }
}

function moveOut() {
    currentTile = this; //tile being moved
}

function moveIt(event) {
    event.preventDefault;
}

function moveIn(event) {
    event.preventDefault;
}

function leave() {
}

function put() {
    nextTile = this;
}

function finish() {
    if (nextTile.src.includes('tile3.jpg')) {
        return;
    }

    let currentCoordinations = currentTile.id.split('-'); //splits position into array 3-3 => ['3', '3']
    let r = parseInt(currentCoordinations[0]);
    let c = parseInt(currentCoordinations[1]);

    let nextCoordinations = nextTile.id.split('-');
    let r2 = parseInt(nextCoordinations[0]);
    let c2 = parseInt(nextCoordinations[1]);

    let moveLeft = r == r2 && c2 == c - 1;
    let moveRight = r == r2 && c2 == c + 1;

    let moveUp = c == c2 && r2 == r - 1;
    let moveDown = c == c2 && r2 == r + 1;

    let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

    if (isAdjacent) {
        let presentTile = currentTile.src;
        let newTile = nextTile.src;

        currentTile.src = newTile;
        nextTile.src = presentTile;

        let moves = setInterval(updated);
        let upto = 0;
        function updated() {
            let move = document.getElementById('moves');
            move.innerHTML = --upto;
            if (upto == 100) {
                clearInterval(moves);
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
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
};

for (i = 0; i < accordion.length; i++) {
    accordion[i].addEventListener('click', function () {
        this.classList.toggle('active');

        menuText = this.nextElementSibling;
        if (menuText.style.display === 'block') {
            menuText.style.display = 'none';
        } else {
            menuText.style.display = 'block';
        }
    });
};