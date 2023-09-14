const modal = document.getElementById('modal'); //Get modal
const menuButton = document.getElementById('menu-button'); //Get the button to open modal
const close = document.getElementsByClassName('close-button')[0]; //Get the element that closes modal
const accordion = document.getElementsByClassName('accordion');
const menuText = document.getElementsByClassName('menu-text');
let i;

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