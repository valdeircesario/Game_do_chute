let numeroSecreto = Math.floor(Math.random() * 20) + 1;
let tentativas = 0;

function iniciarJogo() {
    numeroSecreto = Math.floor(Math.random() * 20) + 1; // Gera um novo número secreto
    tentativas = 0; // Reinicia o contador de tentativas
    document.getElementById('result').innerHTML = ''; // Limpa o resultado anterior
    document.getElementById('adivinhar').disabled = false; // Habilita o botão de adivinhar
    document.getElementById('chute').value = ''; // Limpa o campo de entrada
}

// Chama a função para iniciar o jogo ao carregar a página
iniciarJogo();

document.getElementById('adivinhar').addEventListener('click', () => {
    const chuteInput = document.getElementById('chute');
    const chute = parseInt(chuteInput.value);
    tentativas++;
    let mensagem;

    if (chute === numeroSecreto) {
        mensagem = `Parabéns! Você acertou o número ${numeroSecreto} com ${tentativas} ${tentativas > 1 ? 'tentativas' : 'tentativa'}.`;
        document.getElementById('result').innerHTML = mensagem;
        document.getElementById('adivinhar').disabled = true; // Desabilita o botão após a vitória
    } else if (chute > numeroSecreto) {
        mensagem = 'O número secreto é menor.';
    } else {
        mensagem = 'O número secreto é maior.';
    }

    document.getElementById('result').innerHTML = mensagem;
    chuteInput.value = ''; // Limpa o campo de entrada
});

// Adiciona o evento ao botão "Novo Jogo"
document.getElementById('novo').addEventListener('click', iniciarJogo);