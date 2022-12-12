const mole = document.querySelector('.mole');
const timeLeftDisplay = document.querySelector('#time-left');
const scoreDisplay = document.querySelector('#score');
const grid = document.querySelector('#grid');

const btnStartGame = document.getElementById('btnStartGame');
const btnNewGame = document.getElementById('btnNewGame');
const startGameArea = document.getElementById('startGameArea');
const gridArea = document.getElementById('gridArea');
const resultArea = document.getElementById('resultArea');

let result = 0;
let hitPosition
let currentTime = 30;
let timerId = null;
let countDownTimerId = null;

btnStartGame.addEventListener('click', () => {
    startGameArea.style.display = "none";
    gridArea.style.display = "flex";
    resultArea.style.display = "none";

    startGame();
});

btnNewGame.addEventListener('click', () => {
    location.reload();
});

function startGame() {
    for (let i = 0; i < 25; i++) {
        const div = document.createElement('div');
        div.setAttribute('class', 'square');
        div.setAttribute('id', `s${i}`);
        grid.appendChild(div);
    }

    countDownTimerId = setInterval(countDown, 1000);
    moveMole();
}

function randomSquare() {
    const squares = document.querySelectorAll('.square');
    squares.forEach(square => {
        square.addEventListener('mousedown', () => {
            if (square.id == hitPosition) {
                result++;
                scoreDisplay.textContent = result;
                hitPosition = null;
            }
        });
    });

    squares.forEach(square => {
        square.classList.remove('mole');
        square.style.backgroundColor = '#fff';
    });

    let randomSquare = squares[Math.floor(Math.random() * 25)];
    randomSquare.classList.add('mole');

    hitPosition = randomSquare.id;

    document.getElementsByClassName('mole')[0].style.backgroundColor = generateRandomColor();
}

function moveMole() {
    timerId = setInterval(randomSquare, 500);
}

function countDown() {
    currentTime--;
    timeLeftDisplay.textContent = currentTime;
    if (currentTime == 0) {
        clearInterval(countDownTimerId);
        clearInterval(timerId);

        startGameArea.style.display = "none";
        gridArea.style.display = "none";
        resultArea.style.display = "flex";

        document.getElementById('scoreResult').textContent = result;
    }
}

function generateRandomColor() {
    var makingColorCode = '0123456789ABCDE';
    var finalCode = '#';
    for (var counter = 0; counter < 6; counter++) {
        finalCode = finalCode + makingColorCode[Math.floor(Math.random() * 15)];
    }
    return finalCode;
}
