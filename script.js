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
       {
    question: "What does the word Israel mean?",
    choices: ["My People", "The choesen", "Prevails with God", "Stays with God"],
    correctAnswer: "Prevails with God"
},
{
    question: "Who was the only female judge in Israel?",
    choices: ["Deborah", "Naomi", "Rachael", "Elisheba"],
    correctAnswer: "Deborah"
},
{
    question: "Who is considered thw 13th apostle to take Judah's place?",
    choices: ["Josiah", "Luke", "Matthias", "James"],
    correctAnswer: "Matthias"
},
{
    question: "What is the name of the first 5 books of the bible?",
    choices: ["The Torah", "The Pentateuch", "The Law", "The Midrah"],
    correctAnswer: "The Pentateuch"
},
{
    question: "Which of the following biblical figures does NOT have a recorded bible dream?",
    choices: ["Pilate's wife", "Solomon", "Mary", "Joseph"],
    correctAnswer: "Pilate's wife"
},
{
    question: "What is the shortest book of the Bible",
    choices: ["Jude", "Philemon", "3 John", "Obadiah"],
    correctAnswer: "Jude"
},
{
    question: "How many languages was the bible written in?",
    choices: ["2", "3", "1", "4"],
    correctAnswer: "3"
},
{
    question: "Which prophet did King Hezekiah consult when Sennacharib threatened Jerusalem?",
    choices: ["Zechariah", "Micah", "Isaiah", "Elijah"],
    correctAnswer: "Isaiah"
},
{
    question: "In which book of the Bible will you find the story of the Tower of Babel?",
    choices: ["Genesis", "Exodus", "Deuteronomy", "Numbers"],
    correctAnswer: "Genesis"
},
{
    question: "Which prophet was taken to Egypt against his will after the fall of Jerusalem?",
    choices: ["Joseph", "Daniel", "Jeremiah", "Malechi"],
    correctAnswer: "Jeremiah"
}
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
        clearTimeout(timerId); // Stop the timer
    }

    const selectedChoice = event.target.innerText;
    const currentQuestion = questions[currentQuestionIndex];

    if (selectedChoice === currentQuestion.correctAnswer) {
        score++;
    } else {
        // Store the index of the incorrect answer
        incorrectAnswers.push(currentQuestionIndex);
    }

    // Move to the next question immediately
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

    // Display incorrect questions with correct answers
    if (incorrectAnswers.length > 0) {
        const resultsContainer = document.createElement('div');
        resultsContainer.innerHTML = '<h3>You answered the following questions incorrectly:</h3>';
        incorrectAnswers.forEach((index) => {
            const question = questions[index];
            const resultItem = document.createElement('div');
            resultItem.innerHTML = `<strong>Q: ${question.question}</strong><br/>Correct Answer: ${question.correctAnswer}`;
            resultsContainer.appendChild(resultItem);
        });
        quizContainer.appendChild(resultsContainer);
    } else {
        const perfectScoreMessage = document.createElement('div');
        perfectScoreMessage.innerHTML = '<h3>Congratulations! You answered all questions correctly!</h3>';
        quizContainer.appendChild(perfectScoreMessage);
    }
}

    function updateProgress() {
        progressContainer.innerText = `Question ${currentQuestionIndex + 1} / ${questions.length}`;
    }

    function startTimer() {
        let timeRemaining = 20;
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
