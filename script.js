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
    question: "Where were the apostles fishing when they couldn't catch fish all night?",
    choices: ["Sea of Sodom", "Sea of Galilee", "Sea of Helath", "Mediterranean Sea"],
    correctAnswer: "Sea of Galilee"
},
{
    question: "How many days later did Jesus come to see Lazarus after he died?",
    choices: ["Three Days", "Five Days", "Two Days", "Four Days"],
    correctAnswer: "Four Days"
},
{
    question: "What was the king's name in Esther's story?",
    choices: ["Nebucadnezar", "Ahab", "Xerxes", "Josiah"],
    correctAnswer: "Xerxes"
},
{
    question: "How many days did Esther pray for before going to see the king?",
    choices: ["7 days", "2 days", "4 days", "3 days"],
    correctAnswer: "3 days"
},
{
    question: "In what town did Zacchaeus live?",
    choices: ["Damascus", "Jericho", "Capernaum", "Bethlehem"],
    correctAnswer: "Jericho"
},
{
    question: "How many times more did Zacchaeus agree to pay back to those he cheated out on taxes?",
    choices: ["2 times more", "5 times more", "4 times more", "3 times more"],
    correctAnswer: "4 times more"
},
{
    question: "What was the montain name where Abraham went to sacrifice Isaac?",
    choices: ["Mount Zion", "Mount Moriah", "Mount Carmel", "Mount Tabor"],
    correctAnswer: "Mount Moriah"
},
{
    question: "What town was the paralytic man from?",
    choices: ["Capernaum", "Damascus", "Bethsaida", "Hebron"],
    correctAnswer: "Capernaum"
},
{
    question: "What was the name of the king that ruled during Daniel times in the Medo-Persian Empire?",
    choices: ["Hezekiah", "Ahab", "Darius", "Nebucadnezar"],
    correctAnswer: "Darius"
},
{
    question: "What sea did Jesus cross before the 2 fish and 5 breads miracle?",
    choices: ["Sea of Sodom", "Sea of Tiberias", "Sea of Galilee", "Mediteranean Sea"],
    correctAnswer: "Sea of Galilee"
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
        let timeRemaining = 15;
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
