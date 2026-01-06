let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let newGameBtn = document.querySelector("#new-btn");

let turnO = true;
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
let moveCount = 0;
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerText = "O";
      turnO = false;
    } else {
      box.innerText = "x";
      turnO = true;
    }
    box.disabled = true;
    moveCount++;
    checkWinner();
  });
});

const showWinner = (winner) => {
  msg.innerText = `congratulation winner ${winner}`;
  msgContainer.style.display = "block";
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

const checkWinner = () => {
  let isWinner = false;
  for (let patterns of winPatterns) {
    let pos1Val = boxes[patterns[0]].innerText;
    let pos2Val = boxes[patterns[1]].innerText;
    let pos3Val = boxes[patterns[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        isWinner = true;
        disableBoxes();
        showWinner(pos1Val);
        return;
      }
    }
  }
  if(moveCount === 9 && !isWinner){
     msg.innerText = "Match Draw 🤝";
    msgContainer.style.display = "block";
  }
};

const resetGame = () => {
  turnO = true;
    moveCount = 0; 
  enableBoxes();
  msgContainer.style.display = "none";
};

newGameBtn.addEventListener("click", resetGame);

resetBtn.addEventListener("click", resetGame);
