const cellElements = document.querySelectorAll("[data-cell]");
const board = document.querySelector("[data-board");
const winningMessageTextElement = document.querySelector("[data-winning-message-text]");

const winningMessage = document.querySelector("[data-winning-message]");
const restartButtton = document.querySelector("[data-restart-button]");

let isCircleTurn;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 8],
]

document.addEventListener('DOMContentLoaded', function() {
  console.log("O JavaScript está sendo executado.");

  var startButton = document.querySelector('[data-start-button]');
  var startDiv = document.querySelector('.start');

  // Verifica se a mensagem de início já foi exibida
  var startMessageShown = sessionStorage.getItem('startMessageShown');
  console.log("A mensagem de início foi exibida anteriormente? " + startMessageShown);
  
  if (!startMessageShown) {
      console.log("Exibindo a mensagem de início.");
      startDiv.style.display = 'block'; // mostra a mensagem de início
  }

  startButton.addEventListener('click', function() {
      console.log("Botão de iniciar clicado.");
      startDiv.style.display = 'none'; // esconde a mensagem de início ao clicar no botão
      sessionStorage.setItem('startMessageShown', true); // salva que a mensagem de início foi exibida
      // Aqui você pode adicionar o código para iniciar o jogo da velha
  });
});
const startGame = () => {
  isCircleTurn = false;

  for (const cell of cellElements){
  cell.classList.remove('circle');
  cell.classList.remove('x');
  cell.removeEventListener("click", handleClick)
  cell.addEventListener("click", handleClick, { once:true});
  }


  setBoardHoverClass();
  winningMessage.classList.remove('show-winning-message');
};

const endGame = (isDraw) => {
  if(isDraw) {
    winningMessageTextElement.innerText = "Empate!";
  } else {
    winningMessageTextElement.innerText = isCircleTurn 
    ? "O Venceu!" 
    : " X Venceu!";
  }

  winningMessage.classList.add("show-winning-message");
};


const checkForWin = (currentPlayer) => {
  return winningCombinations.some(combination => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentPlayer);
    });
  });
};

const checkForDraw = () => {
  return [...cellElements].every(cell => {
    return cell.classList.contains('x') || cell.classList.contains('circle');
  })
};

const placeMark = (cell, classToAdd) => {
  cell.classList.add(classToAdd);
};

const setBoardHoverClass = () => {
  board.classList.remove('circle');
  board.classList.remove('x');

  if(isCircleTurn){
    board.classList.add("circle");
  } else{
    board.classList.add("x");
  }
};

const swapTurns = () =>{
  isCircleTurn = !isCircleTurn

  setBoardHoverClass();
};

const handleClick = (e) => {
  //Coloar a marca (X ou Ciruclo)
  const cell = e.target;
  const classToAdd = isCircleTurn ? "circle" : "x";

  placeMark(cell, classToAdd);

  //Verificar por vitoria
  const isWin = checkForWin(classToAdd);

  //Verificar por empate

  const isDraw = checkForDraw();

  if (isWin){
    endGame(false)
  } else if(isDraw){
    endGame(true);
  } else {
    //Mudar simbolo
    swapTurns();
  }

};

startGame();

restartButtton.addEventListener('click', startGame);

document.addEventListener('DOMContentLoaded', function() {
  var startDiv = document.querySelector('.start');
  startDiv.style.display = 'flex'; // Força o elemento a ser exibido como flexível
  startDiv.style.flexDirection = 'column'; // Define a direção da flexbox como coluna para posicionar o texto acima do botão
  startDiv.style.justifyContent = 'center'; // Centraliza verticalmente os elementos
  startDiv.style.alignItems = 'center'; // Centraliza horizontalmente os elementos
});
