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
        box.className = 'box bg-body';
        
        const letterSpan = document.createElement('span');
        letterSpan.className = 'letter';
        
        box.appendChild(letterSpan);
        gameBoxes.appendChild(box);
    });

    let index = 0;
    const interval = setInterval(() => {
        if (index < sequence.length) {
            gameBoxes.children[index].querySelector('.letter').textContent = sequence[index];
            index++;
        } else {
            clearInterval(interval);
            setTimeout(() => {
                gameBoxes.innerHTML = '';
                sequence.forEach(() => {
                    const box = document.createElement('div');
                    box.className = 'box bg-body';

                     const letterSpan = document.createElement('span');
                    letterSpan.className = 'letter';

                    box.appendChild(letterSpan);
                    gameBoxes.appendChild(box);
                });
            }, 500);
        }
    }, 500);
}

function handleKeyPress(letter) {
    if (userInput.length < sequence.length) {
        gameBoxes.children[userInput.length].querySelector('.letter').textContent = letter;
        userInput.push(letter);
    }
    updateSubmitButton();
}

function handleDelete() {
    if (userInput.length > 0) {
        userInput.pop();
        gameBoxes.children[userInput.length].querySelector('.letter').textContent = '';
    }
    updateSubmitButton();
}

function updateSubmitButton() {
    submitButton.disabled = userInput.length !== sequence.length;
}

function checkAnswer() {
    let errorFound = false;
    const errors = [];
    for (let i = 0; i < sequence.length; i++) {
        if (userInput[i] !== sequence[i]) {
            //const letterElement = gameBoxes.children[i].querySelector('.letter');
            //letterElement.classList.add('shake'); // Animación de error
            gameBoxes.children[i].classList.add('shake'); // Animación de error

            errors.push(i);
            errorFound = true;
        }
    }

    if (!errorFound) {
        level++;
        if (level > highScore) {
            highScore = level;
            localStorage.setItem('highScore', highScore); // Guardar nuevo récord
            updateHighScoreDisplay();
        }
        startLevel();
    } else {
        setTimeout(() => {
            errors.forEach(index => {
                const letterElement = gameBoxes.children[index].querySelector('.letter');
                letterElement.classList.add('fade-out');

                setTimeout(() => {
                    letterElement.classList.remove('fade-out');
                    letterElement.textContent = sequence[index]; // Mostrar la letra correcta
                    letterElement.classList.add('fade-in');
                }, 500);
            });

            setTimeout(() => {
                alert('Fallaste. Reiniciando el juego...');
                level = 3;
                startLevel();
            }, 2000); // Espera para que se vea la animación completa

        }, 1000); // Tiempo para ver el primer efecto de vibración
    }
}

function restartGame() {
    level = 3;
    startLevel();
}


// Agregar event listener para el teclado físico
document.addEventListener('keydown', (event) => {
    const key = event.key.toUpperCase(); // Convertir a mayúsculas

    // Verificar si la tecla es una letra válida (A-Z)
    if (/^[A-Z]$/.test(key)) {
        // Buscar la tecla correspondiente en el teclado virtual
        const virtualKey = Array.from(keyboard.children).find(
            (keyElement) => keyElement.textContent === key
        );

        // Simular un clic en la tecla virtual si existe
        if (virtualKey) {
            virtualKey.click();
        }
    }

    // Verificar si la tecla es "Enter"
    if (event.key === 'Enter') {
        // Verificar si el botón "Enviar" está habilitado
        if (!submitButton.disabled) {
            submitButton.click();
        }
    }

    // Verificar si la tecla es "Backspace" (Retroceso)
    if (event.key === 'Backspace') {
        // Buscar la tecla "←" en el teclado virtual
        const deleteKey = Array.from(keyboard.children).find(
            (keyElement) => keyElement.textContent === '←'
        );

        // Simular un clic en la tecla "←" si existe
        if (deleteKey) {
            deleteKey.click();
        }
    }
});