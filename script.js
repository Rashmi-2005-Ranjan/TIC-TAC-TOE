let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

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

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    console.log("Box Was Clicked");
    if (turnO) {
      box.innerHTML = "O";
      box.classList.add("o-style")
      turnO = false;
    } else {
      box.innerHTML = "X";
      box.classList.add("x-style")
      turnO = true;
    }
    box.disabled = true;
    checkWinner();
  });
});
const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};
const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerHTML = "";
  }
};

const resetGame = () => {
  turnO = true;
  enableBoxes();
  msgContainer.classList.add("hide");
};
const showWinner = (winner) => {
  msg.innerHTML = `Congratulations Winner is ${winner} 😎`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const checkWinner = () => {
  let isDraw = true; // Assume it's a draw unless we find an empty box or a winner

  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerHTML;
    let pos2Val = boxes[pattern[1]].innerHTML;
    let pos3Val = boxes[pattern[2]].innerHTML;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        console.log(`Winner is ${pos1Val}`);
        showWinner(pos1Val);
        return; // Return early if a winner is found
      }
    }
  }

  // Check if there are any empty boxes left
  boxes.forEach((box) => {
    if (box.innerHTML === "") {
      isDraw = false; // If any box is empty, it's not a draw
    }
  });

  if (isDraw) {
    console.log("Match Draw Restart Again 👍");
    showDraw();
  }
};

// Function to show the draw message
const showDraw = () => {
  msg.innerHTML = `Match Draw Restart Again 👍`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
