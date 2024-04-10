/*script.js*/
    document.addEventListener('DOMContentLoaded', () => {
    const submitNameButton = document.getElementById('submit-name-btn');
    const nameInput = document.getElementById('name-input');
    const welcomeScreen = document.getElementById('welcome-screen');
    const quizContainer = document.getElementById('quiz-container');
    const playerNameDisplay = document.getElementById('player-name');
    const startButton = document.getElementById('start-btn');
    const restartButton = document.getElementById('restart-btn');
    const questionContainer = document.getElementById('question');
    const choiceContainer = document.getElementById('choices');
    const progressContainer = document.getElementById('progress');
    const timerContainer = document.getElementById('timer');
    let currentQuestionIndex = 0;
    let score = 0;
    let timerId;

    const questions = [
        // Your questions here
    ];

    submitNameButton.addEventListener('click', () => {
        const playerName = nameInput.value.trim();
        if (playerName) {
            welcomeScreen.style.display = 'none';
            quizContainer.style.display = 'block';
            playerNameDisplay.innerText = `Player: ${playerName}`;
            resetGame();
        } else {
            alert('Please enter your name to start the quiz.');
        }
    });

    startButton.addEventListener('click', startGame);

    restartButton.addEventListener('click', () => {
        currentQuestionIndex = 0;
        score = 0;
        startButton.style.display = 'block';
        restartButton.style.display = 'none';
    });

        function startGame() {
        startButton.style.display = 'none';
        showQuestion();
    }

    function showQuestion() {
        const currentQuestion = questions[currentQuestionIndex];
        questionContainer.innerText = currentQuestion.question;

        choiceContainer.innerHTML = '';
        currentQuestion.choices.forEach(choice => {
            const button = document.createElement('button');
            button.innerText = choice;
            button.classList.add('choice');
            button.addEventListener('click', selectAnswer);
            choiceContainer.appendChild(button);
        });

        updateProgress();
        startTimer();
    }

    function selectAnswer(event) {
        if (timerId) {
            clearTimeout(timerId);
        }
        
        const selectedChoice = event.target.innerText;
        const currentQuestion = questions[currentQuestionIndex];
        
        if (selectedChoice === currentQuestion.correctAnswer) {
            score++;
        }

        nextQuestion();
    }

    function nextQuestion() {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            endGame();
        }
    }

    function endGame() {
        questionContainer.innerText = `Your Score: ${score} / ${questions.length}`;
        choiceContainer.innerHTML = '';
        progressContainer.innerText = '';
        timerContainer.innerText = '';
    }

    function updateProgress() {
        progressContainer.innerText = `Question ${currentQuestionIndex + 1} / ${questions.length}`;
    }

    function startTimer() {
        let timeRemaining = 10;
        timerContainer.innerText = `Time remaining: ${timeRemaining} seconds`;

        timerId = setInterval(() => {
            timeRemaining--;
            timerContainer.innerText = `Time remaining: ${timeRemaining} seconds`;
            if (timeRemaining <= 0) {
                clearInterval(timerId);
                nextQuestion();
            }
        }, 1000);
    }

    startButton.addEventListener('click', startGame);
    // Define functions like startGame, showQuestion, selectAnswer, nextQuestion, endGame, updateProgress, startTimer here
});

// Remember to include the JavaScript functions from your original script here, with modifications as needed.
