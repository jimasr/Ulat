const storage = window.localStorage;

/**
 * This function display highscore to the highscore panel
 */
function displayHighscore() {
    const list = document.querySelector('.list-highscore');
    const row = document.querySelector('.row');

    list.innerHTML = "";

    let scores = getHighscore();
    let i = 0;
    for(const s of scores) {
        if(s != null && s != 'undefined') {
            let cloneRow = row.cloneNode(true);
            let number = cloneRow.querySelector('.number');
            let name = cloneRow.querySelector('.name');
            let score = cloneRow.querySelector('.score');

            number.textContent = i + 1 + '.';
            name.textContent = s.name;
            score.textContent = s.score;

            cloneRow.removeAttribute('id');
            console.log(cloneRow);

            list.append(cloneRow);
            i++;
        }
    } 

}

/**
 * This function set a new highscore in a descending order
 */
function setHighscore(scores, score, name) {

    let i = 0;
    let s = scores.score
    while(scores[i] != null && scores[i] != 'undefined' && scores[i].score > score && i < scores.length) {
        i++;
    }

    //replace value
    let j = scores.length - 1 ;
    while(j > i) {
        scores[j] = scores[j-1];
        j--;
    }

    scores[i] = {
        name : name,
        score : score
    };

    storage.setItem("score", JSON.stringify(scores));
}

/**
 * This function returns the highscore stored in the local storage
 * @returns Array of object score if not null
 */
function getHighscore() {
    //score is an array with a size of 5
    if(storage.getItem("score") != 'undefined' && storage.getItem("score") != null) {
        return JSON.parse(storage.getItem("score"));
    }
    return new Array(5);
}

export { displayHighscore, setHighscore, getHighscore }