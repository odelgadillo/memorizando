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
let isShowingSequence = false; // Indica si las letras están siendo mostradas


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

    // Deshabilitar el teclado durante la presentación de la secuencia
    disableKeyboard(true);

    let index = 0;
    const interval = setInterval(() => {
        if (index < sequence.length) {
            gameBoxes.children[index].querySelector('.letter').textContent = sequence[index];
            index++;
        } else {
            clearInterval(interval);
            setTimeout(() => {
                // Limpiar las letras y habilitar el teclado después de un breve retraso
                gameBoxes.innerHTML = '';
                sequence.forEach(() => {
                    const box = document.createElement('div');
                    box.className = 'box bg-body';

                    const letterSpan = document.createElement('span');
                    letterSpan.className = 'letter';

                    box.appendChild(letterSpan);
                    gameBoxes.appendChild(box);
                });
                disableKeyboard(false); // Habilitar el teclado después de mostrar la secuencia
            }, 500);
        }
    }, 500);
}

function disableKeyboard(disabled) {
    isShowingSequence = disabled;

    // Deshabilitar/habilitar el teclado virtual
    Array.from(keyboard.children).forEach(key => {
        key.classList.toggle('disabled', disabled);
        key.style.pointerEvents = disabled ? 'none' : 'auto'; // Bloquear clics
    });
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

            // Mostrar confeti y mensaje de récord superado
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
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
                // Usar SweetAlert en lugar de alert nativo
                Swal.fire({
                    title: '¡Fallaste!',
                    text: 'Reiniciando el juego...',
                    icon: 'error',
                    confirmButtonText: 'OK'
                }).then(() => {
                    level = 3;
                    startLevel();
                });
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
    if (isShowingSequence) return; // Ignorar pulsaciones mientras se muestra la secuencia

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

            // Agregar efecto visual temporal
            virtualKey.classList.add('key-highlight');
            setTimeout(() => {
                virtualKey.classList.remove('key-highlight');
            }, 200); // Duración del efecto: 200 ms
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

            // Agregar efecto visual temporal
            deleteKey.classList.add('key-highlight-backspace');
            setTimeout(() => {
                deleteKey.classList.remove('key-highlight-backspace');
            }, 200); // Duración del efecto: 200 ms
        }
    }
});

function resetHighScore() {
    // Mostrar una alerta de confirmación antes de borrar el récord
    Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción borrará tu récord máximo alcanzado.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, borrar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            // Borrar el récord del localStorage
            localStorage.removeItem('highScore');
            highScore = 3; // Reiniciar el récord a 3 (nivel inicial)
            updateHighScoreDisplay(); // Actualizar la visualización del récord

            // Mostrar una alerta de éxito
            Swal.fire({
                title: 'Récord borrado',
                text: 'El récord máximo ha sido restablecido.',
                icon: 'success',
                confirmButtonText: 'OK'
            });
        }
    });
}

function setTheme(theme) {
    // Resaltar la opción seleccionada
    const themeButtons = document.querySelectorAll('[data-bs-theme-value]');
    themeButtons.forEach(button => {
        if (button.getAttribute('data-bs-theme-value') === theme) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}