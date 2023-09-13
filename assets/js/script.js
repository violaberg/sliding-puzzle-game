//Modal
const modal = document.getElementById('modal');

//Get the button to open modal
const menuButton = document.getElementById('menu-button');

//Get the element that closes modal
const close = document.getElementById('close')[0];

//Open the modal if button is clicked
menuButton.onclick = function() {
    modal.style.display = 'block';
}

//Close modal when close (x) element is clicked
span.onclick = function() {
    modal.style.display = 'none';
}

//If user clicks outside of modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}