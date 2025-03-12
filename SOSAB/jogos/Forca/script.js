const palavras = ['heejin', 'hyunjin', 'haseul', 'vivi', 'yeojin', 'choerry', 'kim lip', 'jinsoul', 'chuu', 'yves', 'hyeju', 'gowon'];

let palavraSecreta = palavras[Math.floor(Math.random() * palavras.length)].toUpperCase(); // Palavra secreta em maiúsculo

const palavraElement = document.querySelector('.palavra');
let tracos = [];

// Função para criar traços e lidar com espaços
function criarTracos() {
    palavraElement.innerHTML = '';  // Limpa qualquer conteúdo anterior
    tracos = [];  // Limpa o array de tracos
    palavraSecreta.split('').forEach(letra => {
        const traco = document.createElement('div');
        
        if (letra === ' ') {
            traco.classList.add('espaco');  // Adiciona uma classe especial para espaços
            traco.innerHTML = '&nbsp;';  // Espaço vazio (sem traço)
        } else {
            traco.classList.add('tracos');
            traco.innerText = '';  // Inicia com traço vazio
        }

        palavraElement.appendChild(traco);
        tracos.push(traco);  // Armazena cada traço (ou espaço) no array
    });
}

criarTracos();

const letras = document.querySelectorAll('.letra');

// Evento para verificar letra clicada
// Evento para verificar letra clicada
letras.forEach(botao => {
    botao.addEventListener('click', () => {
        verificarLetra(botao.innerText.toUpperCase());  // Passa a letra em maiúsculo
        
        botao.disabled = true;

        // Altera o estilo do botão desativado
        botao.style.backgroundColor = '#ccc';  // Muda a cor do botão desativado
        botao.style.cursor = 'default';  // Muda o cursor para default
    });
});


let erros = 0;

// Função para verificar se a letra está na palavra secreta
function verificarLetra(letra) {
    let acerto = false;
    
    // Verifica cada letra da palavra secreta
    palavraSecreta.split('').forEach((char, index) => {
        if (char === letra) {
            tracos[index].innerText = letra;  // Substitui o traço pela letra correta
            acerto = true;
        }
    });

    if (!acerto) {
        erros++;
        atualizarForca(erros);  // Atualiza a imagem da forca
        console.log(`Erro ${erros}`);
    }

    // Checa se o jogo acabou (opcional)
    checarFimDeJogo();
}

// Função para atualizar a imagem da forca conforme o número de erros
function atualizarForca(erros) {
    const forcaElement = document.querySelector('.forca img');
    forcaElement.src = `erro${erros}.png`; 
}

const jogar = document.getElementById('jogar');
const jogar2 = document.getElementById('jogar2');


// Função para reiniciar o jogo
function reiniciarJogo() {
    window.location.reload(); // Simplesmente recarrega a página para reiniciar o jogo
}

// Adiciona o evento de clique no botão "Jogar Novamente"
jogar.addEventListener('click', reiniciarJogo);

const modalVitoria = document.getElementById('modal');
const modalDerrota = document.getElementById('modal2');


// Função para verificar se o jogador ganhou ou perdeu
// Função para desabilitar todos os botões de letras
function desabilitarTodosBotoes() {
    letras.forEach(botao => {
        botao.disabled = true;
        botao.style.backgroundColor = '#ccc'; 
        botao.style.cursor = 'default';
    });
}

// Função para verificar se o jogador ganhou ou perdeu
function checarFimDeJogo() {
    const palavraCompleta = tracos.every(traco => traco.innerText.trim() !== '' || traco.classList.contains('espaco'));  // Verifica se todos os traços foram preenchidos, ignorando espaços

    if (palavraCompleta) {
        // Mostra a modal de vitória
        modalVitoria.style.display = 'flex';
        desabilitarTodosBotoes();  // Desabilita todos os botões após vitória
    } else if (erros >= 6) {  // Supondo que há 6 chances
        atualizarForca(erros);  // Atualiza a imagem do sexto erro
        const mensagemErro = document.getElementById('mensagemErro');
        mensagemErro.innerText = `Você errou! A palavra era: ${palavraSecreta}`;
        modalDerrota.style.display = 'flex';
        desabilitarTodosBotoes();  // Desabilita todos os botões após derrota
    }
}


// Evento para reiniciar o jogo quando clicar no botão "Jogar Novamente"
jogar.addEventListener('click', () => {
    window.location.reload(); // Recarrega a página para reiniciar o jogo
});

jogar2.addEventListener('click', () => {
    window.location.reload(); // Recarrega a página para reiniciar o jogo
});