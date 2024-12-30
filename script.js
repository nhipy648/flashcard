const flashcards = [
    { word: "サーバー", meaning: "Server" },
    { word: "ネットワーク", meaning: "Network" },
    { word: "データベース", meaning: "Database" },
    { word: "プログラミング", meaning: "Programming" },
    { word: "アルゴリズム", meaning: "Algorithm" }
];

let currentCardIndex = 0;
let isFlipped = false;

const flashcardElement = document.getElementById("flashcard");
const flipButton = document.getElementById("flipButton");
const passButton = document.getElementById("passButton");

function updateFlashcardView() {
    const currentCard = flashcards[currentCardIndex];
    flashcardElement.textContent = isFlipped ? currentCard.meaning : currentCard.word;
}

function flipFlashcard() {
    isFlipped = !isFlipped;
    updateFlashcardView();
}

function moveToNextCard() {
    currentCardIndex = (currentCardIndex + 1) % flashcards.length;
    isFlipped = false;
    updateFlashcardView();
}

// Add event listeners
flipButton.addEventListener("click", flipFlashcard);
passButton.addEventListener("click", moveToNextCard);

// Initialize the first flashcard
updateFlashcardView();
