const sections = document.querySelectorAll('.section');
const gameBoxes = document.getElementById('gameBoxes');
const keyboard = document.getElementById('keyboard');
const levelDisplay = document.getElementById('level');
const submitButton = document.getElementById('submit');
const highScoreDisplay = document.createElement('div'); // Nuevo elemento para el récord

gameBoxes.parentElement.insertBefore(highScoreDisplay, gameBoxes); // Mostrar arriba del juego

let level = 3;
let sequence = [];
let userInput = [];
let highScore = localStorage.getItem('highScore') || 3; // Cargar récord guardado o iniciar en 3

// Mostrar el récord
function updateHighScoreDisplay() {
    highScoreDisplay.textContent = `Récord: Nivel ${highScore}`;
    highScoreDisplay.className = 'fw-bold text-primary';
}

updateHighScoreDisplay();

function showSection(id) {
    sections.forEach(section => section.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

function startGame() {
    level = 3;
    showSection('game');
    generateKeyboard();
    startLevel();
}

function generateKeyboard() {
    keyboard.innerHTML = '';
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    alphabet.split('').forEach(letter => {
        const key = document.createElement('div');
        key.className = 'key';
        key.classList.add('btn');
        key.classList.add('btn-outline-secondary');
        key.textContent = letter;
        key.onclick = () => handleKeyPress(letter);
        keyboard.appendChild(key);
    });

    const deleteKey = document.createElement('div');
    deleteKey.className = 'key delete-key';
    deleteKey.classList.add('btn');
    deleteKey.classList.add('btn-outline-danger');
    deleteKey.textContent = '←';
    deleteKey.onclick = handleDelete;
    keyboard.appendChild(deleteKey);
}

function startLevel() {
    userInput = [];
    sequence = Array.from({ length: level }, () => String.fromCharCode(65 + Math.floor(Math.random() * 26)));
    levelDisplay.textContent = `Nivel: ${level}`;
    displaySequence();
    updateSubmitButton();
}

function displaySequence() {
    gameBoxes.innerHTML = '';
    sequence.forEach(() => {
        const box = document.createElement('div');
        box.className = 'box';
        box.classList.add('bg-body');
        gameBoxes.appendChild(box);
    });

    let index = 0;
    const interval = setInterval(() => {
        if (index < sequence.length) {
            gameBoxes.children[index].textContent = sequence[index];
            index++;
        } else {
            clearInterval(interval);
            setTimeout(() => {
                gameBoxes.innerHTML = '';
                sequence.forEach(() => {
                    const box = document.createElement('div');
                    box.className = 'box';
                    box.classList.add('bg-body');
                    gameBoxes.appendChild(box);
                });
            }, 500);
        }
    }, 500);
}

function handleKeyPress(letter) {
    if (userInput.length < sequence.length) {
        gameBoxes.children[userInput.length].textContent = letter;
        userInput.push(letter);
    }
    updateSubmitButton();
}

function handleDelete() {
    if (userInput.length > 0) {
        userInput.pop();
        gameBoxes.children[userInput.length].textContent = '';
    }
    updateSubmitButton();
}

function updateSubmitButton() {
    submitButton.disabled = userInput.length !== sequence.length;
}

function checkAnswer() {
    if (userInput.join('') === sequence.join('')) {
        level++;
        if (level > highScore) {
            highScore = level;
            localStorage.setItem('highScore', highScore); // Guardar nuevo récord
            updateHighScoreDisplay();
        }
        startLevel();
    } else {
        alert('Fallaste. Reiniciando el juego...');
        level = 3;
        startLevel();
    }
}

function restartGame() {
    level = 3;
    startLevel();
}