document.addEventListener("DOMContentLoaded", () => {
    const colorBox = document.getElementById("colorBox");
    const options = document.querySelectorAll(".options");
    const scoreDisplay = document.getElementById("score");
    const highscoreDisplay = document.getElementById("highscore");
    const gameStatus = document.getElementById("gameStatus");
    const newGameButton = document.getElementById("newGameButton");
    const reshuffleButton = document.getElementById("reshuffleBtn");
    let highscoreValue = localStorage.getItem("highscore") || 0;
    highscoreDisplay.textContent = highscoreValue;
    let targetColor;
    let score = 0;
    let gameActive = true;

    const getRandomColor = () => {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `rgb(${r}, ${g}, ${b})`;
    }

    const generateNewOptions = () => {
        if (!gameActive) return;

        const correctIndex = Math.floor(Math.random() * options.length);
        options.forEach((option, index) => {
            const newColor = index === correctIndex ? targetColor : getRandomColor();
            option.style.backgroundColor = newColor;
            option.onclick = () => checkGuess(newColor);
        });

        gameStatus.textContent = "Pick a color!";
        gameStatus.style.color = targetColor;
    }

    const startNewGame = () => {
        score = 0;
        scoreDisplay.textContent = score;
        gameActive = true;
        targetColor = getRandomColor();
        colorBox.style.backgroundColor = targetColor;
        generateNewOptions();
    }

    const checkGuess = (selectedColor) => {
        if (!gameActive) return;

        if (selectedColor === targetColor) {
            gameStatus.textContent = "Correct! ✅ 🎉";
            gameStatus.style.color = "green";
            score++;
            scoreDisplay.textContent = score;

            if (score > highscoreValue){
                highscoreValue =score;
                localStorage.setItem ("highscore", highscoreValue);
                highscoreDisplay.textContent = highscoreValue;
            }

            colorBox.classList.add('correct');
            setTimeout(() => colorBox.classList.remove('correct'), 500);

            gameActive = false;

            setTimeout(() => {
                gameActive = true;
                targetColor = getRandomColor();
                colorBox.style.backgroundColor = targetColor;
                generateNewOptions();
            }, 800);
        } else {
            gameStatus.textContent = "Wrong! ❌ Game Over!";
            gameStatus.style.color = "red";
            scoreDisplay.textContent = score;
            gameActive = false;

            colorBox.classList.add('wrong');
            setTimeout(()=> colorBox.classList.remove('wrong'), 500);
        }
    }

    newGameButton.addEventListener("click", startNewGame);
    reshuffleButton.addEventListener("click", generateNewOptions);

    startNewGame();
});
