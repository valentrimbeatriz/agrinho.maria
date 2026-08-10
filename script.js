
// Dados do Quiz
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

// Carregar o Quiz na tela
function loadQuiz() {
    const quizContainer = document.getElementById("quiz-container");
    if (!quizContainer) return;

    quizData.forEach((q, index) => {
        const div = document.createElement("div");
        div.className = "quiz-question-group"; // Classe útil para estilização no CSS
        
        // Uso de parágrafo estruturado para a pergunta
        div.innerHTML = `<p class="quiz-question"><strong>${index + 1}. ${q.question}</strong></p>`;
        
        q.options.forEach(opt => {
            div.innerHTML += `
                <label class="quiz-option">
                    <input type="radio" name="q${index}" value="${opt}"> ${opt}
                </label><br>
            `;
        });
        quizContainer.appendChild(div);
    });
}

// Avaliar as respostas do Quiz
function submitQuiz() {
    let score = 0;
    let respondeuTodas = true;

    quizData.forEach((q, index) => {
        const selected = document.querySelector(`input[name="q${index}"]:checked`);
        if (selected) {
            if (selected.value === q.answer) {
                score++;
            }
        } else {
            respondeuTodas = false;
        }
    });

    const resultElement = document.getElementById("quiz-result");
    
    if (!respondeuTodas) {
        resultElement.innerText = "Por favor, responda todas as perguntas antes de enviar!";
        resultElement.style.color = "#d9534f"; // Cor de aviso (opcional)
        return;
    }

    resultElement.innerText = `Você acertou ${score} de ${quizData.length} questões!`;
    resultElement.style.color = "#2b2b2b";
}

// Calculadora de água com validação de dados
function calcularAgua() {
    const plantasInput = document.getElementById("plantas");
    const aguaInput = document.getElementById("agua");
    const resultElement = document.getElementById("resultado");

    const plantas = parseFloat(plantasInput.value);
    const agua = parseFloat(aguaInput.value);

    // Validação para campos vazios, negativos ou inválidos
    if (isNaN(plantas) || isNaN(agua) || plantas < 0 || agua < 0) {
        resultElement.innerText = "Por favor, insira valores válidos e maiores ou iguais a zero.";
        resultElement.style.color = "#d9534f";
        return;
    }

    const total = (plantas * agua).toFixed(1); // Limita em 1 casa decimal
    resultElement.innerText = `Consumo total estimado: ${total} litros de água.`;
    resultElement.style.color = "#2b2b2b";
}

// Inicialização dos Eventos após o carregamento da página
document.addEventListener("DOMContentLoaded", () => {
    // Inicializa o quiz
    loadQuiz();

    // Vincula o evento do botão do Quiz
    const btnSubmitQuiz = document.getElementById("btn-submit-quiz");
    if (btnSubmitQuiz) {
        btnSubmitQuiz.addEventListener("click", submitQuiz);
    }

    // Vincula o evento do botão da Calculadora
    const btnCalcular = document.getElementById("btn-calcular");
    if (btnCalcular) {
        btnCalcular.addEventListener("click", calcularAgua);
    }
});
