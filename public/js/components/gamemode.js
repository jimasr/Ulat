const modeBody = document.querySelector('.mode-body');
const buttons = modeBody.querySelectorAll('button');

for(const button of buttons) {
    button.addEventListener('click', ()=>{
        const selected = modeBody.querySelector('.selected');
        selected.classList.toggle('selected');
        button.classList.toggle('selected');
    });
}