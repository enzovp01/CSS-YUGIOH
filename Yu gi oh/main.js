const cartas = document.querySelector("#cartas");
const images = [
    "Argila.png",
    "Aviário.png",
    "Bolha.png",
    "Burstinatrix.png",
    "Neos.jpg",
    "Oceânico.png"
];

let cartasHTML = "";

images.forEach(img => {
    cartasHTML += `<div class="memory-card" data-card="${img}">
      <img class="front-face" src="img/${img}"/>
      <img class="back-face" src="img/Back.jpg">
    </div>`;
  });

  cartas.innerHTML = cartasHTML + cartasHTML;

/** Fim da Renderização HTML */

const cards = document.querySelectorAll(".memory-card");
let firstCard, secondCard;
let lockCards = false;

function flipCard() {
  if (lockCards) return false;
  this.classList.add("flip");

  if (!firstCard) {
    firstCard = this;
    return false;
  }

  secondCard = this;

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.card === secondCard.dataset.card;

  !isMatch ? unFlipCards() : resetCards(isMatch);
}

function unFlipCards() {
  lockCards = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    resetCards();
  }, 1000);
}

function resetCards(isMatch = false) {
  if (isMatch) {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
  }

  [firstCard, secondCard, lockCards] = [null, null, false];
}

cards.forEach(card => card.addEventListener("click", flipCard));