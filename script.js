let userQuestion = '';
let currentQuestionIndex = 0;

function startGame() {
    console.log("Start button clicked");
    document.getElementById('welcome-overlay').style.display = 'none';
    document.getElementById('question-container').style.display = 'block';
    document.body.style.filter = 'none';
}

function submitQuestion() {
    userQuestion = document.getElementById('user-question').value;
    console.log("Question submitted: " + userQuestion);
    document.getElementById('question-container').style.display = 'none';
    document.getElementById('answer-container').style.display = 'block';
    askChatGPT(userQuestion);
}

async function askChatGPT(message) {
    try {
        const response = await fetch('http://localhost:3000/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: message })
        });

        const data = await response.json();
        console.log("ChatGPT response: " + data.reply);
        showQuestion(data.reply);
    } catch (error) {
        console.error("Error occurred:", error);
    }
}

function showQuestion(questionText) {
    const questions = [
        questionText,
        // Add more questions as needed
    ];

    const options = [
        ["Read books", "Spend time outdoors", "Work with technology", "Do creative activities"],
        ["Fiction", "Non-fiction", "Science", "Fantasy"],
        ["Relax at home", "Go out with friends", "Work on a hobby", "Exercise"],
        // Add corresponding options for each question
    ];

    if (currentQuestionIndex < questions.length) {
        document.getElementById('chatgpt-question').textContent = questions[currentQuestionIndex];
        const answerButtons = document.getElementsByClassName('answer-button');
        for (let i = 0; i < answerButtons.length; i++) {
            answerButtons[i].textContent = options[currentQuestionIndex][i];
        }
    } else {
        showResult();
    }
}

function selectAnswer(index) {
    console.log("Selected answer: " + index);
    currentQuestionIndex++;
    showQuestion();
}

function submitCustomAnswer() {
    const customAnswer = document.getElementById('custom-answer').value;
    console.log("Custom answer submitted: " + customAnswer);
    currentQuestionIndex++;
    showQuestion();
}

function showResult() {
    document.getElementById('chatgpt-question').textContent = "Thank you for completing the quiz!";
    document.getElementById('answer-container').innerHTML = "<p>Your results will be analyzed.</p>";
}
