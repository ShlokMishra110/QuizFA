document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-btn');
    const nextButton = document.getElementById('next-btn');
    const questionContainer = document.getElementById('question-container');
    const questionElement = document.getElementById('question');
    const answerButtonsElement = document.getElementById('answer-buttons');

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
        }
    ];

    let currentQuestionIndex = 0;

    startButton.addEventListener('click', startGame);
    nextButton.addEventListener('click', () => {
        currentQuestionIndex++;
        setNextQuestion();
    });

    function startGame() {
        startButton.style.display = 'none';
        currentQuestionIndex = 0;
        questionContainer.style.display = 'block';
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
            button.addEventListener('click', selectAnswer);
            answerButtonsElement.appendChild(button);
        });
    }

    function resetState() {
        nextButton.style.display = 'none';
        while (answerButtonsElement.firstChild) {
            answerButtonsElement.removeChild(answerButtonsElement.firstChild);
        }
    }

    function selectAnswer(e) {
        const selectedButton = e.target;
        const correct = selectedButton.innerText === questions[currentQuestionIndex].correct;
        if (correct) {
            selectedButton.style.backgroundColor = 'green';
        } else {
            selectedButton.style.backgroundColor = 'red';
        }
        if (questions.length > currentQuestionIndex + 1) {
            nextButton.style.display = 'block';
        } else {
            startButton.innerText = 'Restart';
            startButton.style.display = 'block';
        }
    }
});
