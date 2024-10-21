let numeroSecreto = Math.floor(Math.random() * 20) + 1;
let tentativas = 0;
let vozFeminina;

// Função para iniciar o jogo
function iniciarJogo() {
    numeroSecreto = Math.floor(Math.random() * 20) + 1; // Gera um novo número secreto
    tentativas = 0; // Reinicia o contador de tentativas
    document.getElementById('result').innerHTML = ''; 
    document.getElementById('adivinhar').disabled = false; 
    document.getElementById('chute').value = ''; 
    falar('Game!! do Numero Secreto! Descubra o Numero !!');
    falar('Vamos jogar??');
    falar('Escolha um número, entre 1 e 20!!');
}

// Função para falar o texto com a voz 
function falar(texto) {
    if (vozFeminina) {
        const utterance = new SpeechSynthesisUtterance(texto);
        utterance.voice = vozFeminina; 
        speechSynthesis.speak(utterance);
    }
}

// Função para carregar as vozes disponíveis
function carregarVozes() {
    const vozes = speechSynthesis.getVoices();
    // Tenta encontrar uma voz feminina
    vozFeminina = vozes.find(voz => 
        voz.name.toLowerCase().includes('female') && voz.lang.startsWith('pt')
    );

    // Se não encontrar, pode tentar pegar qualquer voz em português
    if (!vozFeminina) {
        vozFeminina = vozes.find(voz => voz.lang.startsWith('pt'));
    }

    // Se ainda não encontrar, usa a primeira voz disponível
    if (!vozFeminina) {
        vozFeminina = vozes[0]; 
    }
}

// Chama a função para carregar as vozes ao carregar a página
window.speechSynthesis.onvoiceschanged = carregarVozes;

// Chama a função para iniciar o jogo ao carregar a página
iniciarJogo();

document.getElementById('adivinhar').addEventListener('click', () => {
    const chuteInput = document.getElementById('chute');
    const chute = parseInt(chuteInput.value);
    tentativas++;
    let mensagem;

    if (chute === numeroSecreto) {
        mensagem = `Parabéns!! Você Acertou!${numeroSecreto}, é o munero secreto. com ${tentativas} ${tentativas > 1 ? 'tentativas' : 'tentativa'}.`;
        document.getElementById('result').innerHTML = mensagem;
        falar(mensagem);
        document.getElementById('adivinhar').disabled = true; 
    } else if (chute > numeroSecreto) {
        mensagem = 'O Número Secreto é Menor Que! ' + chute;
    } else {
        mensagem = 'O Número Secreto é Maior Que! ' + chute;
    }

    document.getElementById('result').innerHTML = mensagem;
    chuteInput.value = '';
    falar(mensagem); 
});


document.getElementById('novo').addEventListener('click', iniciarJogo);