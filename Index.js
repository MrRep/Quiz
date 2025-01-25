// Елементи для управління меню
const menuToggle = document.getElementById('menuToggle');
const sideMenu = document.getElementById('sideMenu');
let isMenuOpen = false;

// Функція відкриття/закриття меню
function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    sideMenu?.classList.toggle('open', isMenuOpen);
    document.body.classList.toggle('menu-active', isMenuOpen);
}

// Подія для відкриття меню
menuToggle?.addEventListener('click', toggleMenu);

// Функція перевірки взаємодії з модальним вікном
function isClickInsideModal(modal, trigger, event) {
    return modal.contains(event.target) || event.target === trigger;
}

// --- Модальне вікно 1 ---
const myInfoOpen = document.getElementById('myInfoOpen');
const myModal = document.getElementById('myModal');
const closeBtn = document.querySelector('.close');
let isModalOpen = false;

function toggleModal(open) {
    isModalOpen = open;
    myModal?.classList.toggle('active', isModalOpen);
}

myInfoOpen?.addEventListener('click', () => toggleModal(true));
closeBtn?.addEventListener('click', () => toggleModal(false));

// --- Модальне вікно 2 ---
const myInfoOpenWindows = document.getElementById('myInfoOpenWindows');
const myModalWindows = document.getElementById('myModalWindows');
const closeBtnWindows = document.querySelector('.closeWindows');
let isModalOpenWindows = false;

function toggleModalWindows(open) {
    isModalOpenWindows = open;
    myModalWindows?.classList.toggle('active', isModalOpenWindows);
}

myInfoOpenWindows?.addEventListener('click', () => toggleModalWindows(true));
closeBtnWindows?.addEventListener('click', () => toggleModalWindows(false));

// --- Модальне вікно 3 ---
const myInfoOpenWindowsWW = document.getElementById('myInfoOpenWindowsWW');
const myModalWindowsWW = document.getElementById('myModalWindowsWW');
const closeBtnWindowsWW = document.querySelector('.closeWindowsWW');
let isModalOpenWindowsWW = false;

function toggleModalWindowsWW(open) {
    isModalOpenWindowsWW = open;
    myModalWindowsWW?.classList.toggle('active', isModalOpenWindowsWW);
}

myInfoOpenWindowsWW?.addEventListener('click', () => toggleModalWindowsWW(true));
closeBtnWindowsWW?.addEventListener('click', () => toggleModalWindowsWW(false));

// Обробка кліків для закриття модальних вікон або меню
document.addEventListener('click', (event) => {
    if (isModalOpen && !isClickInsideModal(myModal, myInfoOpen, event)) toggleModal(false);
    if (isModalOpenWindows && !isClickInsideModal(myModalWindows, myInfoOpenWindows, event)) toggleModalWindows(false);
    if (isModalOpenWindowsWW && !isClickInsideModal(myModalWindowsWW, myInfoOpenWindowsWW, event)) toggleModalWindowsWW(false);

    const clickOutsideMenu =
        !sideMenu?.contains(event.target) &&
        event.target !== menuToggle &&
        (!isClickInsideModal(myModal, myInfoOpen, event) &&
            !isClickInsideModal(myModalWindows, myInfoOpenWindows, event) &&
            !isClickInsideModal(myModalWindowsWW, myInfoOpenWindowsWW, event));

    if (isMenuOpen && clickOutsideMenu) toggleMenu();
});

// Закриття меню або модальних вікон при натисканні Escape
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        if (isModalOpen) toggleModal(false);
        if (isModalOpenWindows) toggleModalWindows(false);
        if (isModalOpenWindowsWW) toggleModalWindowsWW(false);
        if (isMenuOpen) toggleMenu();
    }
});

let correctAnswersCount = 0;
let totalQuestionsCount = 0;
let timerElement = document.getElementById('timer');
let timeRemaining = 30; // Таймер на 30 секунд
let timerInterval;
let isGameStarted = false;

// Початок гри
function startGame() {
    clearInterval(timerInterval); // Зупиняємо таймер, якщо він був активний
    timeRemaining = 30; // Скидаємо таймер на початкове значення
    document.querySelector('.start-page').style.display = 'none'; // Сховати стартову сторінку
    document.querySelector('.game-content').style.display = 'block'; // Показати контент гри
    isGameStarted = true;
    correctAnswersCount = 0; // Скидаємо кількість правильних відповідей
    totalQuestionsCount = 0; // Скидаємо кількість загальних питань
    loadQuestion(); // Завантажуємо перше питання
    startTimer(timeRemaining); // Запускаємо таймер
}

// Функція таймера
function startTimer(duration) {
    timerElement.textContent = `Час: ${Math.floor(duration / 60)}:${duration % 60 < 10 ? '0' : ''}${duration % 60}`;
    
    timerInterval = setInterval(() => {
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        timerElement.textContent = `Час: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            timerElement.textContent = `Час вийшов!`;
            endGame();
        }

        timeRemaining--;
    }, 1000);
}

// Завершення гри
function endGame() {
    const questionElement = document.querySelector('.text');
    const answersContainer = document.querySelector('.info');
    questionElement.style.display = 'none';
    answersContainer.innerHTML = '';

    // Створюємо блок з результатами
    const resultsContainer = document.createElement('div');
    resultsContainer.classList.add('results-container');
    resultsContainer.style.position = 'fixed';
    resultsContainer.style.top = '50%';
    resultsContainer.style.left = '50%';
    resultsContainer.style.transform = 'translate(-50%, -50%)';
    resultsContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    resultsContainer.style.color = 'white';
    resultsContainer.style.textAlign = 'center';
    resultsContainer.style.padding = '20px';
    resultsContainer.style.borderRadius = '10px';
    resultsContainer.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';

    const percentage = Math.round((correctAnswersCount / totalQuestionsCount) * 100);

    resultsContainer.innerHTML = `
        <h1>Гра завершена!</h1>
        <p>Правильних відповідей: ${correctAnswersCount}</p>
        <p>Неправильних відповідей: ${totalQuestionsCount - correctAnswersCount}</p>
        <p>Відсоток правильних відповідей: ${percentage}%</p>
        <button class="retry-button" onclick="retryGame()">Спробувати знову</button>
    `;

    document.body.appendChild(resultsContainer);
}

// Функція для спробувати знову
function retryGame() {
    // Очищаємо правильні і неправильні відповіді
    correctAnswersCount = 0;
    totalQuestionsCount = 0;

    // Показуємо стартову сторінку
    document.querySelector('.start-page').style.display = 'flex'; // Показуємо стартову сторінку
    document.querySelector('.game-content').style.display = 'none'; // Сховуємо гру

    // Видаляємо вікно з результатами гри
    const resultsContainer = document.querySelector('.results-container');
    if (resultsContainer) {
        resultsContainer.remove(); // Видаляємо результат гри
    }

    // Скидаємо таймер
    clearInterval(timerInterval);
    timerElement.textContent = `Час: 00:30`; // Оновлюємо таймер на початкове значення
}

// Завантаження питання
function loadQuestion() {
    const questionElement = document.querySelector('.text');
    const answersContainer = document.querySelector('.info');
    answersContainer.innerHTML = ''; // Очищуємо попередні варіанти відповідей

    const currentQuestion = generateRandomQuestion();
    questionElement.style.display = 'block'; // Показуємо питання
    questionElement.textContent = currentQuestion.question;

    currentQuestion.answers.forEach((answer) => {
        const answerElement = document.createElement('div');
        answerElement.classList.add('main');
        answerElement.textContent = answer;
        answerElement.addEventListener('click', () =>
            handleAnswerClick(answer, currentQuestion.correct)
        );
        answersContainer.appendChild(answerElement);
    });
}

// Обробка кліку на відповідь
function handleAnswerClick(selectedAnswer, correctAnswer) {
    totalQuestionsCount++;
    if (selectedAnswer === correctAnswer) {
        correctAnswersCount++;
    }
    loadQuestion(); // Завантажуємо нове питання
}

// Функція для генерації випадкового числа
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Генерація випадкового питання
function generateRandomQuestion() {
    const num1 = getRandomNumber(1, 50);
    const num2 = getRandomNumber(1, 50);
    const operations = ['+', '-', '*', '/'];
    const operation = operations[getRandomNumber(0, operations.length - 1)];

    let correctAnswer;
    switch (operation) {
        case '+':
            correctAnswer = num1 + num2;
            break;
        case '-':
            correctAnswer = num1 - num2;
            break;
        case '*':
            correctAnswer = num1 * num2;
            break;
        case '/':
            correctAnswer = Math.round((num1 / num2) * 10) / 10;
            break;
    }

    const question = {
        question: `${num1} ${operation} ${num2}`,
        correct: correctAnswer,
        answers: generateAnswers(correctAnswer),
    };

    return question;
}

// Генерація варіантів відповідей
function generateAnswers(correctAnswer) {
    const answers = new Set();
    answers.add(correctAnswer);

    while (answers.size < 5) {
        const randomAnswer = correctAnswer + getRandomNumber(-10, 10);
        answers.add(randomAnswer);
    }

    return Array.from(answers).sort(() => Math.random() - 0.5);
}

