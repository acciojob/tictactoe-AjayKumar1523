//your JS code here. If required.
document.addEventListener("DOMContentLoaded", () => {

  let player1 = "";
  let player2 = "";
  let currentPlayer = "";
  let currentSymbol = "X";
  let gameActive = true;

  const submitBtn = document.getElementById("submit");
  const gameDiv = document.getElementById("game");
  const inputDiv = document.getElementById("player-input");
  const message = document.querySelector(".message");
  const cells = document.querySelectorAll(".cell");

  const board = ["", "", "", "", "", "", "", "", ""];

  const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];

  submitBtn.addEventListener("click", () => {
    player1 = document.getElementById("player-1").value;
    player2 = document.getElementById("player-2").value;

    if (player1 === "" || player2 === "") {
      alert("Enter both names");
      return;
    }

    inputDiv.style.display = "none";
    gameDiv.style.display = "block";

    currentPlayer = player1;
    message.textContent = `${currentPlayer}, you're up`;
  });

  cells.forEach((cell, index) => {
    cell.addEventListener("click", () => handleClick(cell, index));
  });

  function handleClick(cell, index) {
    if (board[index] !== "" || !gameActive) return;

    board[index] = currentSymbol;
    cell.textContent = currentSymbol;

    if (checkWin()) {
      message.textContent = `${currentPlayer} congratulations you won!`;
      gameActive = false;
      return;
    }

    // Switch player
    if (currentPlayer === player1) {
      currentPlayer = player2;
      currentSymbol = "O";
    } else {
      currentPlayer = player1;
      currentSymbol = "X";
    }

    message.textContent = `${currentPlayer}, you're up`;
  }

  function checkWin() {
    return winPatterns.some(pattern => {
      const [a, b, c] = pattern;
      return (
        board[a] &&
        board[a] === board[b] &&
        board[a] === board[c]
      );
    });
  }

});