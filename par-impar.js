const escolhasValidas = ["par", "impar"];

// Verifica se as escolhas do jogador são válidas
function validarEscolhas(escolhaJogador, numJogador) {
  if (!escolhasValidas.includes(escolhaJogador)) {
    console.log("Escolha inválida. Escolha par ou impar.");
    return false;
  }
  if (isNaN(numJogador)) {
    console.log("Número inválido. Escolha um número.");
    return false;
  }
  return true;
}

// Gera um número aleatório para o computador
function gerarNumeroComputador() {
  return Math.floor(Math.random() * 10) + 1;
}

// Verifica se a soma é par ou ímpar
function verificarParOuImpar(soma) {
  return soma % 2 == 0 ? "par" : "impar";
}

// Executa o jogo
function jogar(escolhaJogador, numJogador) {
  if (!validarEscolhas(escolhaJogador, numJogador)) {
    return;
  }
  const numComputador = gerarNumeroComputador();
  const soma = numJogador + numComputador;
  const escolhaComputador = verificarParOuImpar(soma);
  console.log(
    `Você escolheu ${escolhaJogador} e o computador escolheu ${escolhaComputador}. O resultado foi ${soma}.`
  );
  if (escolhaJogador == escolhaComputador) {
    console.log("Você ganhou!");
  } else {
    console.log("Você perdeu!");
  }
}

// Obtém as escolhas do jogador via argumentos no terminal
const escolhaJogador = process.argv[2];
const numJogador = parseInt(process.argv[3]);

// Inicia o jogo
jogar(escolhaJogador, numJogador);
