const questions = [
    {
        question: "What do you like to do in your free time?",
        options: [
            "Read books or articles",
            "Spend time outdoors",
            "Work with computers or technology",
            "Engage in creative activities (drawing, music, crafts)",
        ],
    },
    // Добавьте больше вопросов здесь
];

let currentQuestionIndex = 0;

function showQuestion() {
    const questionElement = document.getElementById("question");
    const optionsElement = document.getElementById("options");

    const currentQuestion = questions[currentQuestionIndex];

    questionElement.textContent = currentQuestion.question;
    optionsElement.innerHTML = "";

    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.onclick = () => handleAnswer(index);
        optionsElement.appendChild(button);
    });
}

function handleAnswer(optionIndex) {
    // Обработка ответа пользователя и переход к следующему вопросу
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    const questionElement = document.getElementById("question");
    const optionsElement = document.getElementById("options");

    questionElement.textContent = "Thank you for completing the quiz!";
    optionsElement.innerHTML = "<p>Your results will be analyzed.</p>";
}

// Показать первый вопрос
showQuestion();
