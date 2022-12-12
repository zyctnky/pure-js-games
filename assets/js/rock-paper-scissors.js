const computerChoiseDisplay = document.getElementById('computer-choise');
const userChoiseDisplay = document.getElementById('user-choise');
const userScoreDisplay = document.getElementById('userScore');
const computerScoreDisplay = document.getElementById('computerScore');

const scoreArea = document.getElementById('scoreArea');
const resultArea = document.getElementById('resultArea');
const resultImage = document.getElementById('resultImage');
const resultText = document.getElementById('resultText');

const userChoiseArea = document.getElementById('userChoiseArea');
const computerChoiseArea = document.getElementById('computerChoiseArea');

const userChoices = document.querySelectorAll('.userChoise');
const computerChoices = document.querySelectorAll('.computerChoise');

const btnNewGame = document.getElementById('btnNewGame');

let userChoise;
let computerChoise;
let userPoint = 0;
let computerPoint = 0;

userChoices.forEach(
    possibleChoice => {
        possibleChoice.addEventListener('click', (e) => {
            userChoise = e.target.id;

            var current = document.getElementsByClassName('imgSelected');
            if (current.length > 0)
                current[0].classList.remove('imgSelected');

            e.target.classList.add("imgSelected");

            generateComputerChoise();
            getResult();
        });
    }
);

btnNewGame.addEventListener('click', (e) => {
    location.reload();
});

function generateComputerChoise() {
    const randomNumber = Math.floor(Math.random() * userChoices.length) + 1;

    if (randomNumber === 1) computerChoise = 'rock';
    else if (randomNumber === 2) computerChoise = 'scissors';
    else if (randomNumber === 3) computerChoise = 'paper';

    computerChoices.forEach(cc => cc.classList.remove('imgSelected'));
    document.getElementById(`computer${computerChoise}`).classList.add('imgSelected');
}

function getResult() {
    if (computerChoise == 'rock' && userChoise == "paper") userPoint++;
    if (computerChoise == 'rock' && userChoise == "scissors") computerPoint++;
    if (computerChoise == 'paper' && userChoise == "scissors") userPoint++;
    if (computerChoise == 'paper' && userChoise == "rock") computerPoint++;
    if (computerChoise == 'scissors' && userChoise == "rock") userPoint++;
    if (computerChoise == 'scissors' && userChoise == "paper") computerPoint++;

    userScoreDisplay.innerHTML = userPoint;
    computerScoreDisplay.innerHTML = computerPoint;

    if (userPoint == 5) {
        resultText.innerHTML = "You Win!";
        resultImage.src = "assets/img/avatar1.png";
    }
    if (computerPoint == 5) {
        resultText.innerHTML = "Computer Win!";
        resultImage.src = "assets/img/computer.png";
    }

    if (userPoint == 5 || computerPoint == 5) {
        scoreArea.style.display = "none";
        resultArea.style.display = "flex";
        userChoiseArea.style.display = "none"
        computerChoiseArea.style.display = "none";
    } else {
        scoreArea.style.display = "flex";
        resultArea.style.display = "none";
        userChoiseArea.style.display = "flex"
        computerChoiseArea.style.display = "flex";
    }
}


