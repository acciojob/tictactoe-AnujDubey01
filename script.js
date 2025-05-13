const player1Input = document.getElementById("player1");
const player2Input = document.getElementById("player2");
const submitBtn = document.getElementById("submit");
const board = document.getElementById("board");
const cells = document.querySelectorAll(".cell");
const messageDiv = document.querySelector(".message");
const heading = document.querySelector("h1");

let player1 = "";
let player2 = "";
let currentPlayer = "";
let currentSymbol = "X";
let gameActive = false;

const winPatterns = [
  [1,2,3],
  [4,5,6],
  [7,8,9],
  [1,4,7],
  [2,5,8],
  [3,6,9],
  [1,5,9],
  [3,5,7]
];

submitBtn.addEventListener("click", () => {
  player1 = player1Input.value.trim();
  player2 = player2Input.value.trim();

  if (!player1 || !player2) {
    alert("Please enter both player names.");
    return;
  }

  heading.style.display = "block";
  board.style.display = "grid";
  submitBtn.style.display = "none";
  player1Input.style.display = "none";
  player2Input.style.display = "none";

  currentPlayer = player1;
  currentSymbol = "X";
  gameActive = true;
  messageDiv.innerText = `${currentPlayer}, you're up`;
});

cells.forEach(cell => {
  cell.addEventListener("click", () => {
    if (!gameActive || cell.innerText !== "") return;

    cell.innerText = currentSymbol;

    if (checkWinner(currentSymbol)) {
      messageDiv.innerText = `${currentPlayer} congratulations you won!`;
      gameActive = false;
      return;
    }

    if ([...cells].every(c => c.innerText !== "")) {
      messageDiv.innerText = "It's a draw!";
      gameActive = false;
      return;
    }

    // Switch player
    if (currentSymbol === "X") {
      currentSymbol = "O";
      currentPlayer = player2;
    } else {
      currentSymbol = "X";
      currentPlayer = player1;
    }

    messageDiv.innerText = `${currentPlayer}, you're up`;
  });
});

function checkWinner(symbol) {
  return winPatterns.some(pattern =>
    pattern.every(id => document.getElementById(id.toString()).innerText === symbol)
  );
}
