const modal = document.getElementById('modal'); //Get modal
const menuButton = document.getElementById('menu-button'); //Get the button to open modal
const close = document.getElementsByClassName('close-button')[0]; //Get the element that closes modal
const accordion = document.getElementsByClassName('accordion');
const menuText = document.getElementsByClassName('menu-text');
const newGame = document.getElementById('new-game'); //Get a new game button
let moves = document.querySelector('.moves'); //Get moves counter button
let i;

//Atach event listeners to tiles
document.addEventListener('DOMContentLoaded', function() {
    newGame.addEventListener('click', shufflePuzzle);

    for (let row = 1; row <= 3; row++) {
        for (let column = 1; column <= 3; column++) {
            const tile = document.getElementById('tile' + row + column);
            tile.addEventListener('click', function() {
                chooseTile(row, column);
            });
        }
    }
});

function moveTiles(tile1, tile2) {
    let temp = document.getElementById(tile1).className;
    document.getElementById(tile1).className = document.getElementById(tile2).className;
    document.getElementById(tile2).className = temp;
}

//Nested loops for each cell of the table
function shufflePuzzle() {
    for (let row = 1; row <= 3; row++) {
        for (let column = 1; column <= 3; column++) {

            let secondRow = Math.floor(Math.random() * 3 + 1);
            let secondCol = Math.floor(Math.random() * 3 + 1);

            moveTiles("tile" + row + column, "tile" + secondRow + secondCol);
        }
    }
}

function chooseTile(row, column) {
    let cell = document.getElementById("tile" + row + column);
    let tile = tile.className;
    if (tile != "tile9") {
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

moves = setInterval(updated);
let from = 0;
function updated() {
    let move = document.getElementById('moves');
    move.innerHTML = --upto;
    if (from == 100) {
        clearInterval(moves);
    }
}