let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let count = 0; // To Track Draw
let player1, player2; // Player names
let isSinglePlayer = false; // To check if it's single player mode
let playerMark; // Player's mark (X or O)
let computerMark; // Computer's mark (X or O)
let currentPlayer = 1; // Track current player (1 or 2)

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

// Prompt for game mode and player names
const startGame = () => {
  alert("Welcome to Tic-Tac-Toe");
  let mode = prompt("Enter '1' for Single Player or '2' for Multiplayer:");
  if (mode === '1') {
    isSinglePlayer = true;
    player1 = prompt("Enter your name:");
    player2 = "Computer";
    let mark = prompt("Enter '1' for X or '2' for O:");
    if (mark === '1') {
      playerMark = "X"; // Player is X
      computerMark = "O"; // Computer is O
    } else if (mark === '2') {
      playerMark = "O"; // Player is O
      computerMark = "X"; // Computer is X
    } else {
      alert("Invalid input. Please enter '1' for X or '2' for O.");
      startGame(); // Restart the game
      return;
    }
  } else if (mode === '2') {
    isSinglePlayer = false;
    player1 = prompt("Enter Player 1 name:");
    player2 = prompt("Enter Player 2 name:");
    let mark = prompt(`${player1}, enter '1' for X or '2' for O:`);
    if (mark === '1') {
      playerMark = "X"; // Player 1 is X
      computerMark = "O"; // Player 2 is O
    } else if (mark === '2') {
      playerMark = "O"; // Player 1 is O
      computerMark = "X"; // Player 2 is X
    } else {
      alert("Invalid input. Please enter '1' for X or '2' for O.");
      startGame(); // Restart the game
      return;
    }
  } else {
    alert("Invalid input. Please enter '1' for Single Player or '2' for Multiplayer.");
    startGame(); // Restart the game
    return;
  }
  resetGame();
};

const resetGame = () => {
  count = 0;
  currentPlayer = 1;
  enableBoxes();
  msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.innerText === "") {
      if (currentPlayer === 1) {
        box.innerText = playerMark; // Player 1's mark
      } else {
        box.innerText = computerMark; // Player 2's mark
      }
      box.disabled = true;
      count++;

      let isWinner = checkWinner();

      if (isWinner) return;

      if (count < 9) {
        if (isSinglePlayer) {
          computerPlay(); // Computer's turn
        } else {
          currentPlayer = currentPlayer === 1 ? 2 : 1; // Switch to the other player
        }
      }
    }
  });
});

// Computer's turn logic
const computerPlay = () => {
  let availableBoxes = Array.from(boxes).filter(box => box.innerText === "");
  if (availableBoxes.length > 0) {
    let randomBox = availableBoxes[Math.floor(Math.random() * availableBoxes.length)];
    randomBox.innerText = computerMark; // Computer plays the opposite of player
    randomBox.disabled = true;
    count++;

    checkWinner();
  }
};

const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val === playerMark ? player1 : player2); // Show the winner
        return true;
      }
    }
  }

  if (count === 9) {
    gameDraw();
  }
  return false;
};

newGameBtn.addEventListener("click", startGame);
resetBtn.addEventListener("click", resetGame);

// Start the game on page load
startGame();