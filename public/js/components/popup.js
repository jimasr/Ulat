const highscore = document.querySelector('div.highscore');
const back = document.getElementById('return');
const score = document.getElementById('score');
const gameMode = document.querySelector('div.mode');

/**
 * This function toggle the mode panel
 */
function toggleGameMode() {
    score.classList.toggle('hide');
    gameMode.classList.toggle('active');
    back.classList.toggle('hide');
}

/**
 * This function toggle the main menu panel
 */
function toggleModal() { 
    const modal = document.querySelector('div.modal');
    modal.classList.toggle('active');
}

/**
 * This function serves to returning to the main menu after navigating to other pages
 */
function goBack() {
    if(highscore.classList.contains('active')) {
        highscore.classList.toggle('active');
    }

    if(gameMode.classList.contains('active')) {
        gameMode.classList.toggle('active');
    }

    score.classList.toggle('hide');
    back.classList.toggle('hide');

}

/**
 * This function toggle score display
 */
function toggleHighscore() {
    score.classList.toggle('hide');
    highscore.classList.toggle('active');
    back.classList.toggle('hide');
}

export { toggleModal, toggleGameMode, toggleHighscore, goBack }
