document.addEventListener("DOMContentLoaded", () => {
  // Elementos do DOM
  const gameBoard = document.getElementById("game-board");
  const resetBtn = document.getElementById("reset-btn");
  const playAgainBtn = document.getElementById("play-again-btn");
  const winMessage = document.getElementById("win-message");
  const moveCountElement = document.getElementById("move-count");
  const pairsCountElement = document.getElementById("pairs-count");
  const finalMovesElement = document.getElementById("final-moves");

  // Variáveis do jogo
  let cards = [];
  let flippedCards = [];
  let matchedPairs = 0;
  let moveCount = 0;
  let canFlip = true;

  // Símbolos para as cartas
  const symbols = ["🍎", "🍌", "🍒", "🍇", "🍊", "🍓", "🍉", "🍑"];

  // Inicializar o jogo
  function initGame() {
    // Limpar o tabuleiro
    gameBoard.innerHTML = "";
    flippedCards = [];
    matchedPairs = 0;
    moveCount = 0;
    canFlip = true;

    // Atualizar a interface
    updateMoveCount();
    updatePairsCount();

    // Criar pares de cartas
    let cardValues = [...symbols, ...symbols];

    // Embaralhar as cartas
    cardValues = shuffleArray(cardValues);

    // Criar as cartas no tabuleiro
    cardValues.forEach((symbol, index) => {
      const card = document.createElement("div");
      card.className = "card";
      card.dataset.symbol = symbol;

      const cardInner = document.createElement("div");
      cardInner.className = "card-inner";

      const cardFront = document.createElement("div");
      cardFront.className = "card-front";
      cardFront.textContent = "?";

      const cardBack = document.createElement("div");
      cardBack.className = "card-back";
      cardBack.textContent = symbol;

      cardInner.appendChild(cardFront);
      cardInner.appendChild(cardBack);
      card.appendChild(cardInner);

      card.addEventListener("click", () => flipCard(card));

      gameBoard.appendChild(card);
      cards.push(card);
    });
  }

  // Embaralhar array
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // Virar uma carta
  function flipCard(card) {
    // Verificar se pode virar a carta
    if (
      !canFlip ||
      card.classList.contains("flipped") ||
      card.classList.contains("matched")
    ) {
      return;
    }

    // Virar a carta
    card.classList.add("flipped");
    flippedCards.push(card);

    // Verificar se temos duas cartas viradas
    if (flippedCards.length === 2) {
      canFlip = false;
      moveCount++;
      updateMoveCount();

      // Verificar se as cartas são iguais
      const [card1, card2] = flippedCards;

      if (card1.dataset.symbol === card2.dataset.symbol) {
        // Par encontrado
        card1.classList.add("matched");
        card2.classList.add("matched");
        matchedPairs++;
        updatePairsCount();

        flippedCards = [];
        canFlip = true;

        // Verificar vitória
        if (matchedPairs === symbols.length) {
          setTimeout(showWinMessage, 500);
        }
      } else {
        // Par não encontrado - virar as cartas de volta
        setTimeout(() => {
          card1.classList.remove("flipped");
          card2.classList.remove("flipped");
          flippedCards = [];
          canFlip = true;
        }, 1000);
      }
    }
  }

  // Atualizar contador de jogadas
  function updateMoveCount() {
    moveCountElement.textContent = moveCount;
  }

  // Atualizar contador de pares
  function updatePairsCount() {
    pairsCountElement.textContent = `${matchedPairs}/${symbols.length}`;
  }

  // Mostrar mensagem de vitória
  function showWinMessage() {
    finalMovesElement.textContent = moveCount;
    winMessage.classList.add("show");
  }

  // Reiniciar o jogo
  function resetGame() {
    winMessage.classList.remove("show");
    initGame();
  }

  // Event listeners
  resetBtn.addEventListener("click", resetGame);
  playAgainBtn.addEventListener("click", resetGame);

  // Iniciar o jogo
  initGame();
});
