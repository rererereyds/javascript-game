let audio = new Audio('sound/bgSong.mp3');

if (typeof audio.loop == 'boolean')
{
    audio.loop = true;
}
else
{
    audio.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);
} 
audio.play();

function getScores() {
    const scores = JSON.parse(localStorage.getItem("gameScores"));
    const scoreBoardUL = document.querySelector('.scoreBoardUL');
    
    for (x = 0; x < scores.length; x++) {
        let scoreLi = document.createElement('li');
        let textVal = scores[x].name + ': ' + scores[x].score + ' PTS';
        scoreLi.appendChild(document.createTextNode(textVal));
        scoreBoardUL.appendChild(scoreLi);
    }

}

function resetScores() {
    localStorage.setItem("gameScores", null);
}

// uncomment to reset scores
// resetScores();
getScores();
