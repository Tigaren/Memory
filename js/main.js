const cards = document.querySelectorAll('.memory-card');
const resetBtn = document.querySelector('.reset');

let hasFlippedCard = false;
let lockBoord = false;
let firstCard, secondCard;

function reset() {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoord();
}

function flipCard() {
    if (lockBoord) return;
    if (this === firstCard) return;
    this.classList.toggle('flip');

    if (!hasFlippedCard) {
        //first click
        hasFlippedCard = true;
        firstCard = this;

        return;
    }
    //second click
    hasFlippedCard = false;
    secondCard = this;

    checkForMatch();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoord();
}

function unflipCards() {
    lockBoord = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoord();
    }, 1500);
}

function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

    isMatch ? disableCards() : unflipCards();
}

function resetBoord() {
    [hasFlippedCard, lockBoord] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})();


cards.forEach(card => card.addEventListener('click', flipCard));
resetBtn.addEventListener('click', reset);

