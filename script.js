let flashcards = [];
let currentCardIndex = 0;
let isFlipped = false;

// Các phần tử HTML
const flashcardElement = document.getElementById("flashcard");
const flipButton = document.getElementById("flipButton");
const passButton = document.getElementById("passButton");
const topicSelect = document.getElementById("topicSelect");

// Hàm hiển thị flashcard
function updateFlashcard() {
    if (flashcards.length === 0) {
        flashcardElement.textContent = "Không có từ vựng!";
        return;
    }
    const currentCard = flashcards[currentCardIndex];
    flashcardElement.textContent = isFlipped ? currentCard.meaning : currentCard.word;
}

// Lật flashcard
function flipFlashcard() {
    isFlipped = !isFlipped;
    updateFlashcard();
}

// Chuyển sang flashcard tiếp theo
function moveToNextCard() {
    if (flashcards.length === 0) return;
    currentCardIndex = (currentCardIndex + 1) % flashcards.length;
    isFlipped = false;
    updateFlashcard();
}

// Hiển thị danh sách chủ đề
async function loadTopics() {
    try {
        const response = await fetch('flashcards.json'); // Tải dữ liệu từ JSON
        if (!response.ok) throw new Error("Không thể tải flashcards");
        const data = await response.json();

        // Thêm danh sách chủ đề vào dropdown
        const topics = data.topics;
        topics.forEach((topic, index) => {
            const option = document.createElement("option");
            option.value = index;
            option.textContent = topic.topic;
            topicSelect.appendChild(option);
        });

        // Chọn chủ đề đầu tiên (nếu cần)
        topicSelect.addEventListener("change", (event) => {
            loadFlashcards(event.target.value);
        });
    } catch (error) {
        console.error("Lỗi khi tải chủ đề:", error);
    }
}

// Tải flashcards theo chủ đề
function loadFlashcards(topicIndex) {
    currentCardIndex = 0;
    isFlipped = false;
    fetch('flashcards.json')
        .then(response => response.json())
        .then(data => {
            flashcards = data.topics[topicIndex].words;
            updateFlashcard();
        })
        .catch(error => console.error("Lỗi khi tải flashcards:", error));
}

// Gắn sự kiện vào các nút
flipButton.addEventListener("click", flipFlashcard);
passButton.addEventListener("click", moveToNextCard);

// Tải danh sách chủ đề khi trang được tải
loadTopics();
