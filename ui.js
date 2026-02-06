/* UI and page interaction utilities. Handles setup and multiplayer code generation*/

/* Handle the start quiz button click*/
function handleStartQuiz() {
    const p1 = document.getElementById('player1').value.trim();
    const p2 = document.getElementById('player2').value.trim();
    timerValue = parseInt(document.getElementById('timer').value);
    const multiplayerChecked = document.getElementById('multiplayer').checked;

/* Generate and display a game code for multiplayer mode*/
    if (multiplayerChecked) {
        const code = Math.random().toString(36).substr(2, 9);
        alert('Your game code is: ' + code + '. Share it with your friend to join. (Backend needed for online multiplayer)');
    }

    if (!initializeQuiz(p1, p2, timerValue)) {
        return;
    }

    document.getElementById('setup').style.display = 'none';
    document.getElementById('quiz').style.display = 'block';
    shuffleArray(questions);
    loadQuestion();
}

/* Quiz Controls js.
 * Attach all event listeners to buttons and inputs.*/
function attachEventListeners() {
    document.getElementById('startQuiz').addEventListener('click', handleStartQuiz);
    document.getElementById('player1Submit').addEventListener('click', submitPlayer1Answer);
    document.getElementById('player2Submit').addEventListener('click', submitPlayer2Answer);
    document.getElementById('nextQuestion').addEventListener('click', nextQuestion);
    document.getElementById('restart').addEventListener('click', restartQuiz);
}

/* Initialize all UI event listeners on page load*/
document.addEventListener('DOMContentLoaded', attachEventListeners);
