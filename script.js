//your JS code here. If required.
// Get DOM elements
const player1Input = document.querySelector("#player1");
const player2Input = document.querySelector("#player2");
const board = document.querySelector(".board");
const messageDiv = document.querySelector(".message");
const boxes = document.querySelectorAll(".cell");
const submit = document.querySelector("#submit");
const reset = document.querySelector("#reset");

// Game state variables
let player1Name = "";
let player2Name = "";
let turnO = true; // true = player1 (X), false = player2 (O)
let count = 0;

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

// Start Game button handler
submit.addEventListener("click", (event) => {
  event.preventDefault();

  player1Name = player1Input.value.trim();
  player2Name = player2Input.value.trim();

  if (player1Name && player2Name) {
    board.style.display = "grid";
    messageDiv.innerText = `${player1Name}, you're up!`;

    player1Input.parentElement.style.display = "none";
    player2Input.parentElement.style.display = "none";
    submit.style.display = "none";
  } else {
    alert("Please enter names for both players.");
  }
});

// Cell click handler
boxes.forEach((cell) => {
  cell.addEventListener("click", () => {
    if (cell.innerText !== "") return;

    cell.innerText = turnO ? "X" : "O";
    count++;

    const winner = checkWinner();
    if (winner) {
      messageDiv.innerText = `${
        winner === "X" ? player1Name : player2Name
      } congratulations you won! `;
      disableBoard();
      return;
    }

    if (count === 9) {
      messageDiv.innerText = "It's a draw!";
      return;
    }

    turnO = !turnO;
    messageDiv.innerText = `${turnO ? player1Name : player2Name}, you're up!`;
  });
});

// Winner check function
function checkWinner() {
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (
      boxes[a].innerText &&
      boxes[a].innerText === boxes[b].innerText &&
      boxes[a].innerText === boxes[c].innerText
    ) {
      return boxes[a].innerText;
    }
  }
  return null;
}

// Disable board after win
function disableBoard() {
  boxes.forEach((cell) => {
    cell.style.pointerEvents = "none";
  });
}

// Reset button handler
reset.addEventListener("click", () => {
  player1Input.value = "";
  player2Input.value = "";
  player1Input.parentElement.style.display = "block";
  player2Input.parentElement.style.display = "block";
  submit.style.display = "block";

  board.style.display = "none";
  messageDiv.innerText = "";

  boxes.forEach((cell) => {
    cell.innerText = "";
    cell.style.pointerEvents = "auto";
  });

  turnO = true;
  count = 0;
});
