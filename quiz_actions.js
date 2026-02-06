/**
 * Core quiz functionality
 * Handles question loading, option management, submissions, and scoring
 */

let currentQuestion = 0;
let player1Score = 0;
let player2Score = 0;
let player1Answer = null;
let player2Answer = null;
let selectedOption1 = null;
let selectedOption2 = null;
let isMultiplayer = false;
let timerValue = 0;

/**
 * Initialize the quiz with player names and settings
 * @param {string} p1 - Player 1 name
 * @param {string} p2 - Player 2 name (optional)
 * @param {number} timerSeconds - Timer duration in seconds
 */
function initializeQuiz(p1, p2, timerSeconds) {
    if (!p1) {
        alert('Player 1 name is required.');
        return false;
    }

    timerValue = timerSeconds;
    document.getElementById('player1Name').textContent = p1;

    if (p2) {
        isMultiplayer = true;
        document.getElementById('player2Name').textContent = p2;
        document.getElementById('player2Section').style.display = 'block';
    }

    return true;
}

/**
 * Shuffle function to randomize question order each run
 * @param {array} arr - Array to shuffle
 */
function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

/**
 * Load and display a question
 */
function loadQuestion() {
    if (currentQuestion >= questions.length) {
        showResults();
        return;
    }

    const q = questions[currentQuestion];
    document.getElementById('question').textContent = q.question;
    document.getElementById('progressBar').style.width =
        ((currentQuestion + 1) / questions.length * 100) + '%';
    document.getElementById('reveal').style.display = 'none';

    player1Answer = null;
    player2Answer = null;
    selectedOption1 = null;
    selectedOption2 = null;

    loadOptions('player1Options', 'player1Submit');
    if (isMultiplayer) {
        loadOptions('player2Options', 'player2Submit');
    }

    document.getElementById('nextQuestion').disabled = false;

    if (timerValue > 0) {
        startTimer(timerValue, () => {
            handleTimeUp();
        });
    } else {
        hideTimerDisplay();
    }
}

/**
 * Handle timer expiring - auto-submit empty answers
 */
function handleTimeUp() {
    if (!player1Answer) {
        player1Answer = '';
        document.getElementById('player1Submit').disabled = true;
    }
    if (isMultiplayer && !player2Answer) {
        player2Answer = '';
        document.getElementById('player2Submit').disabled = true;
    }
    checkSubmissions();
}

/**
 * Load answer options for a player
 * @param {string} containerId - ID of container for options
 * @param {string} submitId - ID of submit button
 */
function loadOptions(containerId, submitId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    questions[currentQuestion].options.forEach(option => {
        const btn = document.createElement('button');
        btn.className = 'btn btn-outline-primary m-1';
        btn.textContent = option;
        btn.addEventListener('click', () => {
            // Remove selected from other buttons
            container.querySelectorAll('.btn').forEach(b => {
                b.classList.remove('btn-primary');
                b.classList.add('btn-outline-primary');
            });
            // Add selected to this button
            btn.classList.remove('btn-outline-primary');
            btn.classList.add('btn-primary');

            if (containerId === 'player1Options') {
                selectedOption1 = option;
            } else {
                selectedOption2 = option;
            }
        });
        container.appendChild(btn);
    });

    document.getElementById(submitId).disabled = false;
}

/**
 * Handle player 1 answer submission
 */
function submitPlayer1Answer() {
    if (!selectedOption1) return;
    player1Answer = selectedOption1;
    document.getElementById('player1Submit').disabled = true;
    checkSubmissions();
}

/**
 * Handle player 2 answer submission
 */
function submitPlayer2Answer() {
    if (!selectedOption2) return;
    player2Answer = selectedOption2;
    document.getElementById('player2Submit').disabled = true;
    checkSubmissions();
}

/**
 * Check if both players have submitted (or in single player mode)
 */
function checkSubmissions() {
    if (!isMultiplayer || (player1Answer !== null && player2Answer !== null)) {
        revealAnswer();
    }
}

/**
 * Reveal the correct answer and update scores
 */
function revealAnswer() {
    clearTimer();
    const q = questions[currentQuestion];

    document.getElementById('correctAnswer').textContent = `Correct Answer: ${q.correct}`;

    let feedback = '';

    if (player1Answer === q.correct) {
        player1Score++;
        feedback += 'Player 1: <span class="correct">Correct!</span> ';
    } else {
        feedback += 'Player 1: <span class="incorrect">Incorrect.</span> ';
    }

    document.getElementById('player1Score').textContent = player1Score;

    if (isMultiplayer) {
        if (player2Answer === q.correct) {
            player2Score++;
            feedback += 'Player 2: <span class="correct">Correct!</span>';
        } else {
            feedback += 'Player 2: <span class="incorrect">Incorrect.</span>';
        }
        document.getElementById('player2Score').textContent = player2Score;
    }

    document.getElementById('feedback').innerHTML = feedback;
    document.getElementById('reveal').style.display = 'block';
}

/**
 * Move to the next question
 */
function nextQuestion() {
    document.getElementById('nextQuestion').disabled = true;
    clearTimer();
    currentQuestion++;
    loadQuestion();
}

/**
 * Display final results
 */
function showResults() {
    document.getElementById('quiz').style.display = 'none';
    document.getElementById('results').style.display = 'block';

    let scores = `Player 1 (${document.getElementById('player1Name').textContent}): ${player1Score}`;
    if (isMultiplayer) {
        scores += ` | Player 2 (${document.getElementById('player2Name').textContent}): ${player2Score}`;
    }
    document.getElementById('finalScores').textContent = scores;
}

/**
 * Restart the quiz
 */
function restartQuiz() {
    location.reload();
}
