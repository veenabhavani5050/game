document.addEventListener("DOMContentLoaded", () => {
    const gameBoard = document.getElementById("game");
    const restartBtn = document.getElementById("restart");

    const cardIcons = [1, 2, 3, 4, 5, 6, 7, 8];
    let cards = [...cardIcons, ...cardIcons];
    let flippedCards = [];
    let matchedPairs = 0;


    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }


    function createBoard() {
        gameBoard.innerHTML = "";
        shuffle(cards);
        cards.forEach((icon, index) => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.dataset.icon = icon;

            card.innerHTML = `
        <div class="front">${icon}</div>
        <div class="back">?</div>
    `;

            card.addEventListener("click", flipCard);
            gameBoard.appendChild(card);
        });
    }


    function flipCard() {
        if (flippedCards.length < 2 && !this.classList.contains("flip")) {
            this.classList.add("flip");
            flippedCards.push(this);

            if (flippedCards.length === 2) {
                setTimeout(checkMatch, 500);
            }
        }
    }

    // Check for matching pairs
    function checkMatch() {
        const [card1, card2] = flippedCards;

        if (card1.dataset.icon === card2.dataset.icon) {
            matchedPairs++;
            if (matchedPairs === cardIcons.length) {
                setTimeout(() => alert("You win!"), 300);
            }
        } else {
            card1.classList.remove("flip");
            card2.classList.remove("flip");
        }

        flippedCards = [];
    }

    // Restart the game
    restartBtn.addEventListener("click", () => {
        matchedPairs = 0;
        flippedCards = [];
        createBoard();
    });

    // Initialize the game
    createBoard();
});
