document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-btn');
    const submitButton = document.getElementById('submit-btn');
    const questionContainer = document.getElementById('question-container');
    const questionElement = document.getElementById('question');
    const answerButtonsElement = document.getElementById('answer-buttons');
    const resultElement = document.getElementById('result');
    const scoreElement = document.getElementById('score');
    const restartButton = document.getElementById('restart-btn');

    const questions = [
        {
            question: 'What is the capital of France?',
            answers: ['Paris', 'London', 'Rome', 'Berlin'],
            correct: 'Paris'
        },
        {
            question: 'Who is the CEO of Tesla?',
            answers: ['Jeff Bezos', 'Elon Musk', 'Bill Gates', 'Mark Zuckerberg'],
            correct: 'Elon Musk'
        },
        {
            question: 'What is the largest planet in our solar system?',
            answers: ['Earth', 'Jupiter', 'Saturn', 'Mars'],
            correct: 'Jupiter'
        },
        {
            question: 'What is the boiling point of water?',
            answers: ['90°C', '100°C', '110°C', '120°C'],
            correct: '100°C'
        },
        {
            question: 'What is the name of the First Missile launched?',
            answers: ['Prithvi', 'Agni', 'Brahmos', 'Dhanush'],
            correct: 'Prithvi'
        }
    ];

    let currentQuestionIndex = 0;
    let selectedAnswer = null;
    let score = 0;

    startButton.addEventListener('click', startGame);
    submitButton.addEventListener('click', submitAnswer);
    restartButton.addEventListener('click', startGame);

    function startGame() {
        startButton.style.display = 'none';
        restartButton.style.display = 'none';
        score = 0;
        currentQuestionIndex = 0;
        questionContainer.style.display = 'block';
        resultElement.style.display = 'none';
        scoreElement.style.display = 'none';
        setNextQuestion();
    }

    function setNextQuestion() {
        resetState();
        showQuestion(questions[currentQuestionIndex]);
    }

    function showQuestion(question) {
        questionElement.innerText = question.question;
        question.answers.forEach(answer => {
            const button = document.createElement('button');
            button.innerText = answer;
            button.classList.add('btn');
            button.addEventListener('click', () => {
                selectAnswer(button);
            });
            answerButtonsElement.appendChild(button);
        });
    }

    function resetState() {
        submitButton.style.display = 'block';
        selectedAnswer = null;
        while (answerButtonsElement.firstChild) {
            answerButtonsElement.removeChild(answerButtonsElement.firstChild);
        }
    }

    function selectAnswer(button) {
        Array.from(answerButtonsElement.children).forEach(btn => {
            btn.classList.remove('selected');
        });
        button.classList.add('selected');
        selectedAnswer = button.innerText;
    }

    function submitAnswer() {
        if (!selectedAnswer) return;
        const correct = selectedAnswer === questions[currentQuestionIndex].correct;
        Array.from(answerButtonsElement.children).forEach(button => {
            button.disabled = true;
            if (button.innerText === questions[currentQuestionIndex].correct) {
                button.classList.add('correct');
            } else {
                button.classList.add('wrong');
            }
        });
        resultElement.style.display = 'block';
        if (correct) {
            resultElement.innerText = 'Correct!';
            resultElement.style.color = 'green';
            score++;
        } else {
            resultElement.innerText = 'Wrong!';
            resultElement.style.color = 'red';
        }
        submitButton.style.display = 'none';
        currentQuestionIndex++;
        setTimeout(() => {
            if (questions.length > currentQuestionIndex) {
                resultElement.style.display = 'none';
                setNextQuestion();
            } else {
                questionContainer.style.display = 'none';
                scoreElement.innerText = `Your score: ${score} out of ${questions.length}`;
                scoreElement.style.display = 'block';
                restartButton.style.display = 'block';
            }
        }, 1000);
    }
});
