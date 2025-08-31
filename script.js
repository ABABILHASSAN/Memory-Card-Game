const gameBoard = document.getElementById("gameBoard");
const restartBtn = document.getElementById("restartBtn");
const statusText = document.getElementById("status");

let cardValues = ["🍎", "🍌", "🍇", "🍉", "🍓", "🍒", "🍍", "🥝"];
let cards = [];
let flippedCards = [];
let matchedCount = 0;

function shuffle(array) {
  return array.sort(() => 0.5 - Math.random());
}

function createBoard() {
  gameBoard.innerHTML = "";
  matchedCount = 0;
  statusText.innerText = "Find all pairs!";
  const shuffled = shuffle([...cardValues, ...cardValues]);

  shuffled.forEach(value => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.value = value;
    card.innerText = value;
    card.addEventListener("click", flipCard);
    gameBoard.appendChild(card);
  });
}

function flipCard(e) {
  const card = e.target;
  if (card.classList.contains("flipped") || flippedCards.length === 2) return;

  card.classList.add("flipped");
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    checkMatch();
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;

  if (card1.dataset.value === card2.dataset.value) {
    flippedCards = [];
    matchedCount++;
    if (matchedCount === cardValues.length) {
      statusText.innerText = "🎉 You found all pairs!";
    }
  } else {
    setTimeout(() => {
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
      flippedCards = [];
    }, 1000);
  }
}

restartBtn.addEventListener("click", createBoard);

createBoard();
