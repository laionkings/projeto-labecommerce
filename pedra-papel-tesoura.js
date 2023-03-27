// 1. Importar o objeto process
const process = require('process');

// 2. Função para gerar uma escolha aleatória do computador
function computadorEscolhe() {
  const escolhas = ['pedra', 'papel', 'tesoura'];
  const indiceAleatorio = Math.floor(Math.random() * escolhas.length);
  return escolhas[indiceAleatorio];
}

// 3. Recuperar a escolha do jogador
const jogadorEscolhe = process.argv[2];

// 4. Comparar as escolhas e determinar o resultado do jogo
const computadorEscolha = computadorEscolhe();
let resultado = '';

if (jogadorEscolhe === computadorEscolha) {
  resultado = 'Empate!';
} else if (
  (jogadorEscolhe === 'pedra' && computadorEscolha === 'tesoura') ||
  (jogadorEscolhe === 'papel' && computadorEscolha === 'pedra') ||
  (jogadorEscolhe === 'tesoura' && computadorEscolha === 'papel')
) {
  resultado = 'Você ganhou!';
} else {
  resultado = 'Você perdeu!';
}

// 5. Exibir o resultado do jogo no console
console.log(
  `Você escolheu ${jogadorEscolhe} e o computador escolheu ${computadorEscolha}. ${resultado}`
);
