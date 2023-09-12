function moveTiles(cell1, cell2) {
    let temp = document.getElementById(cell1).className;
    document.getElementById(cell1).className = document.getElementById(cell2).className;
    document.getElementById(cell2).className = temp;
}

//Nested loops for each cell of the table

function shufflePuzzle() {
    for (let row = 1; row <= 3; row++) {
        for (let column = 1; column <= 3; column++) {

            let secondRow = Math.floor(Math.random() * 3 + 1);
            let secondCol = Math.floor(Math.random() * 3 + 1);

            moveTiles("cell" + row + column, "cell" + secondRow + secondCol);
        }
    }
}

function chooseTile(row, column) {
    let cell = document.getElementById("cell" + row + column);
    let tile = cell.className;
    if (tile != "tile9") {
        if (column < 3) {
            if (document.getElementById("cell" + row + (column + 1)).className == "tile9") {
                moveTiles("cell" + row + column, "cell" + row + (column + 1));
                return;
            }
        }
        
        if (column > 1) {
            if (document.getElementById("cell" + row + (column - 1)).className == "tile9") {
                moveTiles("cell" + row + column, "cell" + row + (column - 1));
                return;
            }
        }
        
        if (row > 1) {
            if (document.getElementById("cell" + (row - 1) + column).className == "tile9") {
                moveTiles("cell" + row + column, "cell" + (row - 1) + column);
                return;
            }
        }
        
        if (row < 3) {
            if (document.getElementById("cell" + (row + 1) + column).className == "tile9") {
                moveTiles("cell" + row + column, "cell" + (row + 1) + column);
                return;
            }
        }
    }

}
