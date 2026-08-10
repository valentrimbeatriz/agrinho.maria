document.addEventListener("DOMContentLoaded", () => {

    // ==============================
    // CALCULADORA DE EMISSÕES
    // ==============================

    const carro = document.getElementById("carro");
    const energia = document.getElementById("energia");
    const voos = document.getElementById("voos");

    const calculatorButton = document.querySelector(".calculator-button");
    const result = document.querySelector(".result");
    const resultValue = result.querySelector("strong");

    calculatorButton.addEventListener("click", () => {

        const kmCarro = Number(carro.value) || 0;
        const consumoEnergia = Number(energia.value) || 0;
        const numeroVoos = Number(voos.value) || 0;

        /*
         * Valores aproximados utilizados apenas
         * para fins educativos.
         */

        // Carro:
        // aproximadamente 0,12 kg de CO₂ por km
        const emissaoCarro = kmCarro * 0.12;

        // Energia:
        // aproximadamente 0,08 kg de CO₂ por kWh
        const emissaoEnergia = consumoEnergia * 0.08;

        // Voos:
        // estimativa anual convertida para uma média mensal
        const emissaoVoos = (numeroVoos * 250) / 12;

        // Soma das emissões
        const emissaoTotal =
            emissaoCarro +
            emissaoEnergia +
            emissaoVoos;

        resultValue.textContent =
            `${emissaoTotal.toFixed(1)} kg de CO₂`;

        result.classList.add("show");

    });


    // ==============================
    // QUIZ SUSTENTÁVEL
    // ==============================

    const quiz = document.querySelector(".quiz");

    const perguntas = [
        {
            pergunta: "Qual dessas fontes de energia é considerada renovável?",
            alternativas: [
                "Carvão mineral",
                "Petróleo",
                "Energia solar",
                "Gás natural"
            ],
            correta: 2
        },

        {
            pergunta: "Qual atitude ajuda a reduzir a produção de lixo?",
            alternativas: [
                "Comprar produtos descartáveis",
                "Reutilizar materiais",
                "Jogar tudo no lixo comum",
                "Evitar a reciclagem"
            ],
            correta: 1
        },

        {
            pergunta: "Qual desses meios de transporte tende a emitir menos CO₂?",
            alternativas: [
                "Carro particular",
                "Motocicleta",
                "Bicicleta",
                "Avião"
            ],
            correta: 2
        },

        {
            pergunta: "O que significa economia circular?",
            alternativas: [
                "Usar e descartar rapidamente",
                "Reduzir, reutilizar e reciclar materiais",
                "Aumentar o consumo",
                "Produzir mais lixo"
            ],
            correta: 1
        },

        {
            pergunta: "Por que preservar a biodiversidade é importante?",
            alternativas: [
                "Porque os ecossistemas ajudam a manter o equilíbrio ambiental",
                "Porque aumenta a produção de plástico",
                "Porque elimina a necessidade de água",
                "Porque aumenta a poluição"
            ],
            correta: 0
        }
    ];

    let perguntaAtual = 0;
    let pontuacao = 0;


    function mostrarPergunta() {

        const pergunta = perguntas[perguntaAtual];

        quiz.innerHTML = "";

        const titulo = document.createElement("h3");

        titulo.textContent =
            `Pergunta ${perguntaAtual + 1} de ${perguntas.length}`;

        quiz.appendChild(titulo);


        const texto = document.createElement("p");

        texto.textContent = pergunta.pergunta;

        quiz.appendChild(texto);


        pergunta.alternativas.forEach((alternativa, index) => {

            const label = document.createElement("label");

            label.innerHTML = `
                <input
                    type="radio"
                    name="resposta"
                    value="${index}"
                >
                ${alternativa}
            `;

            quiz.appendChild(label);

        });


        const button = document.createElement("button");

        button.className = "neon-btn quiz-button";

        button.textContent =
            perguntaAtual === perguntas.length - 1
                ? "Finalizar quiz"
                : "Próxima pergunta";

        button.addEventListener("click", verificarResposta);

        quiz.appendChild(button);
    }


    function verificarResposta() {

        const respostaSelecionada =
            document.querySelector('input[name="resposta"]:checked');

        if (!respostaSelecionada) {
            alert("Selecione uma alternativa antes de continuar.");
            return;
        }

        const resposta =
            Number(respostaSelecionada.value);

        if (resposta === perguntas[perguntaAtual].correta) {
            pontuacao++;
        }

        perguntaAtual++;

        if (perguntaAtual < perguntas.length) {

            mostrarPergunta();

        } else {

            mostrarResultadoQuiz();

        }
    }


    function mostrarResultadoQuiz() {

        let mensagem;

        if (pontuacao === 5) {
            mensagem = "Excelente! Você domina sustentabilidade! 🌱";
        } else if (pontuacao >= 3) {
            mensagem = "Muito bem! Você já conhece bastante sobre sustentabilidade.";
        } else {
            mensagem = "Você pode aprender ainda mais sobre sustentabilidade!";
        }

        quiz.innerHTML = `
            <h3>Quiz finalizado!</h3>

            <p class="quiz-score">
                Você acertou
                <strong>${pontuacao}</strong>
                de
                <strong>${perguntas.length}</strong>
                perguntas.
            </p>

            <p>${mensagem}</p>

            <button class="neon-btn quiz-button" id="restartQuiz">
                Refazer quiz
            </button>
        `;

        document
            .getElementById("restartQuiz")
            .addEventListener("click", reiniciarQuiz);
    }


    function reiniciarQuiz() {

        perguntaAtual = 0;
        pontuacao = 0;

        mostrarPergunta();
    }


    // Inicia o quiz
    mostrarPergunta();

});
