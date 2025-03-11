const perguntas = [
    {
        pergunta: "Qual é a capital da França?",
        opcoes: ["Londres", "Berlim", "Paris", "Roma"],
        resposta: 2
    },
    {
        pergunta: "Quanto é 7 x 8?",
        opcoes: ["54", "56", "48", "58"],
        resposta: 1
    },
    {
        pergunta: "Quem escreveu 'Dom Quixote'?",
        opcoes: ["Machado de Assis", "Miguel de Cervantes", "William Shakespeare", "José de Alencar"],
        resposta: 1
    },
    {
        pergunta: "Qual é o maior oceano do mundo?",
        opcoes: ["Atlântico", "Índico", "Pacífico", "Ártico"],
        resposta: 2
    },
    {
        pergunta: "Quem pintou a Mona Lisa?",
        opcoes: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Michelangelo"],
        resposta: 1
    },
    {
        pergunta: "Quantos planetas existem no Sistema Solar?",
        opcoes: ["7", "8", "9", "10"],
        resposta: 1
    },
    {
        pergunta: "Qual é a fórmula química da água?",
        opcoes: ["H2O", "CO2", "O2", "NaCl"],
        resposta: 0
    },
    {
        pergunta: "Qual é o animal terrestre mais rápido do mundo?",
        opcoes: ["Leão", "Antílope", "Guepardo", "Cavalo"],
        resposta: 2
    },
    {
        pergunta: "Quem descobriu o Brasil?",
        opcoes: ["Cristóvão Colombo", "Pedro Álvares Cabral", "Vasco da Gama", "Américo Vespúcio"],
        resposta: 1
    },
    {
        pergunta: "Qual é o menor país do mundo?",
        opcoes: ["Mônaco", "Malta", "Vaticano", "San Marino"],
        resposta: 2
    }
];

let perguntaAtual = 0;
let pontuacao = 0;

const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const nextButton = document.getElementById('next-button');
const scoreDisplay = document.getElementById('score-display');
const scoreContainer = document.getElementById('score-container');
const scoreEl = document.getElementById('score');

function mostrarPergunta() {
    const pergunta = perguntas[perguntaAtual];
    questionEl.textContent = pergunta.pergunta;
    optionsEl.innerHTML = '';
    pergunta.opcoes.forEach((opcao, index) => {
        const button = document.createElement('button');
        button.textContent = opcao;
        button.classList.add('option');
        button.addEventListener('click', () => verificarResposta(index));
        optionsEl.appendChild(button);
    });
    nextButton.disabled = true;
}

function verificarResposta(index) {
    const pergunta = perguntas[perguntaAtual];
    const botoes = document.querySelectorAll('.option');
    if (index === pergunta.resposta) {
        pontuacao++;
        botoes[index].style.backgroundColor = '#47e04f';
    } else {
        botoes[index].style.backgroundColor = '#dc3545';
        botoes[pergunta.resposta].style.backgroundColor = '#47e04f';
    }
    botoes.forEach(button => (button.disabled = true));
    atualizarPontuacao();
    nextButton.disabled = false;
}

function atualizarPontuacao() {
    scoreDisplay.textContent = `Pontuação: ${pontuacao} / ${perguntas.length}`;
}

function proximaPergunta() {
    perguntaAtual++;
    if (perguntaAtual < perguntas.length) {
        mostrarPergunta();
    } else {
        mostrarPontuacaoFinal();
    }
}

function mostrarPontuacaoFinal() {
    // Esconde o container do quiz
    document.getElementById('quiz-container').classList.add('hidden');
    
    // Esconde o botão de "Próxima Pergunta"
    nextButton.classList.add('hidden');
    
    // Exibe o container de pontuação
    scoreContainer.classList.remove('hidden');
    
    // Exibe a pontuação
    scoreEl.textContent = `Você acertou ${pontuacao} de ${perguntas.length} perguntas!`;
    
    // Criar o botão de "Jogar Novamente"
    const jogarNovamenteButton = document.createElement('button');
    jogarNovamenteButton.textContent = 'Jogar Novamente';
    jogarNovamenteButton.classList.add('btn', 'btnJogar');
    
    // Adiciona a ação de recarregar a página ao clicar no botão
    jogarNovamenteButton.addEventListener('click', function() {
        location.reload(); // Recarrega a página para reiniciar o quiz
    });
    
    // Adiciona o botão "Jogar Novamente" ao DOM
    scoreContainer.appendChild(jogarNovamenteButton);
}


mostrarPergunta();
nextButton.addEventListener('click', proximaPergunta);