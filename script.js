// Quiz
const quizData = [
    {
        question: "Qual é a principal fonte de irrigação na agricultura?",
        options: ["Água da chuva", "Água subterrânea", "Água do mar"],
        answer: "Água subterrânea"
    },
    {
        question: "Qual prática ajuda a economizar água?",
        options: ["Irrigação por aspersão", "Irrigação por gotejamento", "Inundação"],
        answer: "Irrigação por gotejamento"
    }
];

function loadQuiz() {
    const quizContainer = document.getElementById("quiz-container");
    quizData.forEach((q, index) => {
        let div = document.createElement("div");
        div.innerHTML = `<p>${q.question}</p>`;
        q.options.forEach(opt => {
            div.innerHTML += `
                <label>
                    <input type="radio" name="q${index}" value="${opt}"> ${opt}
                </label><br>
            `;
        });
        quizContainer.appendChild(div);
    });
}

function submitQuiz() {
    let score = 0;
    quizData.forEach((q, index) => {
        const selected = document.querySelector(`input[name="q${index}"]:checked`);
        if (selected && selected.value === q.answer) {
            score++;
        }
    });
    document.getElementById("quiz-result").innerText = `Você acertou ${score} de ${quizData.length} questões!`;
}

// Calculadora de água
function calcularAgua() {
    const plantas = document.getElementById("plantas").value;
    const agua = document.getElementById("agua").value;
    const total = plantas * agua;
    document.getElementById("resultado").innerText = `Consumo total: ${total} litros de água.`;
}

// Inicializar quiz
window.onload = loadQuiz;
