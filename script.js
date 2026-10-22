const cells = document.querySelectorAll(".cell");
const turnText = document.querySelector(".turn");
const resultText = document.querySelector(".result");
const resetButton = document.querySelector(".reset");

let currentPlayer = "X";
let gameActive = true;

const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach((cell) => {
    cell.addEventListener("click", () => {

        if (cell.textContent !== "" || !gameActive) {
            return;
        }

        cell.textContent = currentPlayer;

        checkWinner();

        if (gameActive) {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            turnText.textContent = `Player ${currentPlayer}'s Turn`;
        }
    });
});

function checkWinner() {

    for (let pattern of winningPatterns) {

        const [a, b, c] = pattern;

        if (
            cells[a].textContent !== "" &&
            cells[a].textContent === cells[b].textContent &&
            cells[b].textContent === cells[c].textContent
        ) {
            resultText.textContent = `Player ${currentPlayer} Wins!`;
            gameActive = false;

            cells.forEach(cell => {
                cell.disabled = true;
            });

            return;
        }
    }

    const draw = [...cells].every(cell => cell.textContent !== "");

    if (draw) {
        resultText.textContent = "It's a Draw!";
        gameActive = false;
    }
}

resetButton.addEventListener("click", resetGame);

function resetGame() {

    cells.forEach(cell => {
        cell.textContent = "";
        cell.disabled = false;
    });

    currentPlayer = "X";
    gameActive = true;

    turnText.textContent = "Player X's Turn";
    resultText.textContent = "";
}