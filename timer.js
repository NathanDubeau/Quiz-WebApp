/* Timer functions for quiz questions. Handles countdown timers for per question time limits*/

let timerInterval = null;

/**
 * Start a countdown timer for a question
 * @param {number} duration - Duration in seconds
 * @param {function} onTimeUp - Callback function when time runs out
 */
function startTimer(duration, onTimeUp) {
    let timeLeft = duration;
    document.getElementById('timerDisplay').style.display = 'block';
    document.getElementById('timeLeft').textContent = timeLeft;

    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('timeLeft').textContent = timeLeft;

        if (timeLeft <= 0) {
            clearTimer();
            if (onTimeUp) {
                onTimeUp();
            }
        }
    }, 1000);
}

/* Clear/stop the current timer*/
function clearTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

/* Hide the timer display from users*/
function hideTimerDisplay() {
    document.getElementById('timerDisplay').style.display = 'none';
}
