function toggleGameMode() {
    const gameMode = document.querySelector('div.mode');
    const back = document.getElementById('return');
    const score = document.getElementById('score');

    score.classList.toggle('hide');
    gameMode.classList.toggle('active')
    back.classList.toggle('hide')
}

function toggleModal() { 
    const modal = document.querySelector('div.modal');
    modal.classList.toggle('active');
}

export { toggleModal, toggleGameMode }
