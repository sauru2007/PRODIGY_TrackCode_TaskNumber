const boardElement = document.getElementById("board");
    const resultElement = document.getElementById("result");
    const popup = document.getElementById("popup");

    let board = Array(9).fill("");
    let currentPlayer = "X";
    let humanPlayer = "X";
    let aiPlayer = "O";
    let gameMode = "";
    let gameActive = false;

    
    function selectMode(mode) {
      gameMode = mode;
      resetGame();
      popup.style.display = "flex"; // Show the popup to choose X or O
    }

    
    function chooseSymbol(symbol) {
      humanPlayer = symbol;
      aiPlayer = symbol === "X" ? "O" : "X";
      currentPlayer = "X"; // X always starts first
      popup.style.display = "none";
      resetGame();
      if (gameMode === "ai" && humanPlayer !== "X") {
        aiMove();
      }
    }

    
    function resetGame() {
      board = Array(9).fill("");
      gameActive = true;
      resultElement.textContent = "";
      createBoard();
    }

    
    function createBoard() {
      boardElement.innerHTML = "";
      board.forEach((cell, index) => {
        const cellDiv = document.createElement("div");
        cellDiv.classList.add("cell");
        cellDiv.textContent = cell;
        if (cell === "X") cellDiv.classList.add("X");
        if (cell === "O") cellDiv.classList.add("O");
        cellDiv.addEventListener("click", () => makeMove(index));
        boardElement.appendChild(cellDiv);
      });
    }

    
    function makeMove(index) {
      if (!gameActive || board[index] !== "") return;

      board[index] = currentPlayer;
      createBoard();

      if (checkWin()) {
        resultElement.textContent = `${currentPlayer} Wins!`;
        gameActive = false;
        return;
      }

      if (board.every(cell => cell !== "")) {
        resultElement.textContent = "It's a Draw!";
        gameActive = false;
        return;
      }

      currentPlayer = currentPlayer === "X" ? "O" : "X";

      
      if (gameMode === "ai" && currentPlayer === aiPlayer) {
        setTimeout(aiMove, 500);
      }
    }

    
    function aiMove() {
      const emptyCells = board.map((cell, index) => (cell === "" ? index : null)).filter(i => i !== null);
      const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      board[randomIndex] = aiPlayer;
      currentPlayer = humanPlayer;
      createBoard();

      if (checkWin()) {
        resultElement.textContent = `AI (${aiPlayer}) Wins!`;
        gameActive = false;
      }
    }

    
    function checkWin() {
      const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             
      ];
      return winPatterns.some(pattern =>
        pattern.every(index => board[index] === currentPlayer)
      );
    }

   
    resetGame();