
const buttonPlay = document.getElementById('play');
buttonPlay.addEventListener('click', activate);

function activate() { 
    const modal = document.querySelector('div.modal');
    modal.classList.toggle('active');
}

export {activate}
