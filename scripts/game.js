function resetGameStatus() {
    activePlayer = 0;
    currentround = 1;
    gameisover = false;
    gameOverElement.firstElementChild.innerHTML = 'You won! <span id="winner-name">PLAYER NAME</span>';
    gameOverElement.style.display = 'none';


      let gameBoardIndex = 0;
    for (let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++){
          gameData[i][j] = 0;
          const gameBoardItemELement = gameBoardElement.children[gameBoardIndex];
          gameBoardItemELement.textContent = '';
          gameBoardItemELement.classList.remove('disabled');
          gameBoardIndex++;
        }
    }
}

function startNewGame() {
  if (players[0].name === "" || players[1].name === "") {
    alert("please set custom player names for both player!");
    return;
  }
resetGameStatus();

  activePlayerNameElement.textContent = players[activePlayer].name;
  gameAreaElement.style.display = 'block';
}

function switchPlayer() {
  if (activePlayer === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }
  activePlayerNameElement.textContent = players[activePlayer].name;
}

function selectGameField(event) {
  if (event.target.tagName !== "LI" || gameisover) {
    return;
  }

  const selectedField = event.target;
  const selectedColumn = selectedField.dataset.col - 1;
  const selectedRow = selectedField.dataset.row - 1;

  if (gameData[selectedRow][selectedColumn] > 0) {
    alert("please select an empty field!");
    return;
  }

  selectedField.textContent = players[activePlayer].symbol;
  selectedField.classList.add('disabled');

  gameData[selectedRow][selectedColumn] = activePlayer + 1;
  
  const winnerId = checkforGameOver();


  if (winnerId !== 0){
    endGame(winnerId);
  }

  currentround++;
  switchPlayer();
}

function checkforGameOver() {
  //checking rows for equality
  for (let i = 0; i < 3; i++) {
    if (
      gameData[i][0] > 0 &&
      gameData[i][0] === gameData[i][1] &&
      gameData[i][1] === gameData[i][2]
    ) {
      return gameData[i][0];
    }
  }
  //checking columns for equality
  for (let i = 0; i < 3; i++) {
    if (
      gameData[0][i] > 0 &&
      gameData[0][i] === gameData[1][i] &&
      gameData[0][i] === gameData[2][i]
    ) {
      return gameData[0][i];
    }
  }
  //Diagonal top left bottom right
  if (
    gameData[0][0] > 0 &&
    gameData[0][0] === gameData[1][1] &&
    gameData[1][1] === gameData[2][2]
  ){
    return gameData[0][0];
  };

  //Diagonal:top right to bottom left
  if (
    gameData[2][0] > 0 &&
    gameData[2][0] === gameData[1][1] &&
    gameData[1][1] === gameData[0][2]
  ){
    return gameData[2][0];
  };

  if(currentround === 9){
    return -1;
  }

  return 0;
  //   if (
  //     gameData[1][0] > 0 &&
  //     gameData[1][0] === gameData[1][1] &&
  //     gameData[1][1] === gameData[1][2]
  //   ) {
  //     return gameData[1][0];
  //   }
  //   if (
  //     gameData[2][0] > 0 &&
  //     gameData[2][0] === gameData[2][1] &&
  //     gameData[2][1] === gameData[2][2]
  //   ) {
  //     return gameData[2][0];
  //   }
}

function endGame(winnerId){
    gameisover = true;
    gameOverElement.style.display = 'block';

    if(winnerId >  0){
        const winnerName = players[winnerId - 1].name;
        gameOverElement.firstElementChild.firstElementChild.textContent = winnerName
    } else {
        gameOverElement.firstElementChild.textContent = 'It\s a draw!'
    }
}








