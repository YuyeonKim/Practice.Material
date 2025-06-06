const startButton = document.querySelector("#start-button");
console.log(startButton);
startButton.addEventListener("click", startGame);

const gameScreen = document.querySelector("#game-screen");
console.log(gameScreen);

const welcomeScreen = document.querySelector("#welcome-screen");
console.log(welcomeScreen);

function startGame() {
  const newTop = gameScreen.offsetTop;
  console.log(newTop);
  window.scrollTo({ top: newTop, behavior: "smooth" });
  playGame();
}
function playGame() {
const myCards = [
    { id: 1, name: "card1", src: "card1.png" },
    { id: 2, name: "card2", src: "card2.png" },
    { id: 3, name: "card3", src: "card3.png" },
    { id: 4, name: "card4", src: "card4.png" },
    { id: 5, name: "card5", src: "card5.png" },
    { id: 6, name: "card6", src: "card6.png" },
    { id: 7, name: "card7", src: "card7.png" },
    { id: 8, name: "card8", src: "card8.png" },
    { id: 9, name: "card9", src: "card9.png" },
    { id: 10, name: "card10", src: "card10.png" },
    { id: 11, name: "card11", src: "card11.png" },
    { id: 12, name: "card12", src: "card12.png" },
    { id: 13, name: "card13", src: "card13.png" },
    { id: 14, name: "card14", src: "card14.png" },
    { id: 15, name: "card15", src: "card15.png" },
    { id: 16, name: "card16", src: "card16.png" }
  ];

  // Shuffle cards using Fisher-Yates shuffle algorithm
  function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  const shuffledCards = shuffleArray(myCards);

  let cardComposition = "";

  for (let i = 0; i < shuffledCards.length; i++) {
    cardComposition += `
  <div class="card-container">
        <div class="card" draggable="true">
          <div class="card-face"><img src="backofthecard.png" alt="Back" /></div>
          <div class="card-face flip">
            <img src="${shuffledCards[i].src}" alt="${shuffledCards[i].name}" class="card-front" />
          </div>
        </div>
      </div>
`;
  console.log(cardComposition);
}
}

// // scripts.js
// const card = document.querySelectorAll('.backofthecard');

// function flipCard() {
//   this.classList.toggle('flip');
// }

// card.forEach(card => card.addEventListener('click', flipCard));




const resetButton = document.querySelector("#reset-button");
  console.log(resetButton);

function resetGame() {
  dropBox.innerHTML = "";
  deck.innerHTML = "";
  draggedCard = null;
}

resetButton.addEventListener("click", function () {
  const newTop = welcomeScreen.offsetTop;
  console.log(newTop);
  window.scrollTo({ top: newTop, behavior: "smooth" });
  resetGame();
});



// Memory Game Script

document.addEventListener("DOMContentLoaded", () => {
  const cards = Array.from(document.querySelectorAll(".card"));
  let hasFlippedCard = false;
  let lockBoard = false;
  let firstCard, secondCard;

  // Shuffle cards
  (function shuffle() {
    cards.forEach(card => {
      let randomPos = Math.floor(Math.random() * 16);
      card.style.order = randomPos;
    });
  })();

  // Flip card
  function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add("flip");

    if (!hasFlippedCard) {
      hasFlippedCard = true;
      firstCard = this;
      return;
    }

    secondCard = this;
    checkForMatch();
  }

  // Check match
  function checkForMatch() {
    const firstImg = firstCard.querySelector(".back img").src;
    const secondImg = secondCard.querySelector(".back img").src;

    if (firstImg === secondImg) {
      disableCards();
    } else {
      unflipCards();
    }
  }

  // Keep cards flipped
  function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    resetBoard();
  }

  // Flip cards back
  function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
      firstCard.classList.remove("flip");
      secondCard.classList.remove("flip");
      resetBoard();
    }, 1000);
  }

  // Reset
  function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
  }

  // Add flip event listener
  cards.forEach(card => card.addEventListener("click", flipCard));

  // Reset game
  const resetButton = document.getElementById("reset-button");
  resetButton.addEventListener("click", () => {
    cards.forEach(card => {
      card.classList.remove("flip");
      card.addEventListener("click", flipCard);
    });
    shuffle();
    resetBoard();
  });
});
