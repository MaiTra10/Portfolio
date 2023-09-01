let welcomeBlock = document.getElementsByClassName('div_welcome')[0];
let container = document.getElementsByClassName('div_container')[0];

console.log(welcomeBlock)

function goToAPI() {

    welcomeBlock.classList.add('div_welcome-hide');
        
    setTimeout(function() {

        welcomeBlock.remove();
        container.classList.add('div_container-show');

    }, 250)

}