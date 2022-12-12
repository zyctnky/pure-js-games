let cardsChosen = [];
let cardsChosenIds = [];
let cardsWon = [];

const gridDisplay = document.querySelector('#grid');
const resultDisplay = document.querySelector('#scoreResult');

let timer;

const btnStartGame = document.getElementById('btnStartGame');
const btnNewGame = document.getElementById('btnNewGame');
const startGameArea = document.getElementById('startGameArea');
const gridArea = document.getElementById('gridArea');
const resultArea = document.getElementById('resultArea');

const cardArray = [
    { id: 'team1', img: 'assets/img/team1.png', },
    { id: 'team2', img: 'assets/img/team2.png', },
    { id: 'team3', img: 'assets/img/team3.png', },
    { id: 'team4', img: 'assets/img/team4.png', },
    { id: 'team5', img: 'assets/img/team5.png', },
    { id: 'team6', img: 'assets/img/team6.png', },
    { id: 'team7', img: 'assets/img/team7.png', },
    { id: 'team8', img: 'assets/img/team8.png', },
    { id: 'team9', img: 'assets/img/team9.png', },
    { id: 'team10', img: 'assets/img/team10.png', },
    { id: 'team11', img: 'assets/img/team11.png', },
    { id: 'team12', img: 'assets/img/team12.png', },
    { id: 'team13', img: 'assets/img/team13.png', },
    { id: 'team14', img: 'assets/img/team14.png', },
    { id: 'team15', img: 'assets/img/team15.png', },
    { id: 'team16', img: 'assets/img/team16.png', },
    { id: 'team17', img: 'assets/img/team17.png', },
    { id: 'team18', img: 'assets/img/team18.png', },
    { id: 'team19', img: 'assets/img/team19.png', },
    { id: 'team20', img: 'assets/img/team20.png', },
    { id: 'team1', img: 'assets/img/team1.png', },
    { id: 'team2', img: 'assets/img/team2.png', },
    { id: 'team3', img: 'assets/img/team3.png', },
    { id: 'team4', img: 'assets/img/team4.png', },
    { id: 'team5', img: 'assets/img/team5.png', },
    { id: 'team6', img: 'assets/img/team6.png', },
    { id: 'team7', img: 'assets/img/team7.png', },
    { id: 'team8', img: 'assets/img/team8.png', },
    { id: 'team9', img: 'assets/img/team9.png', },
    { id: 'team10', img: 'assets/img/team10.png', },
    { id: 'team11', img: 'assets/img/team11.png', },
    { id: 'team12', img: 'assets/img/team12.png', },
    { id: 'team13', img: 'assets/img/team13.png', },
    { id: 'team14', img: 'assets/img/team14.png', },
    { id: 'team15', img: 'assets/img/team15.png', },
    { id: 'team16', img: 'assets/img/team16.png', },
    { id: 'team17', img: 'assets/img/team17.png', },
    { id: 'team18', img: 'assets/img/team18.png', },
    { id: 'team19', img: 'assets/img/team19.png', },
    { id: 'team20', img: 'assets/img/team20.png', },
];

btnStartGame.addEventListener('click', () => {
    cardArray.sort(() => 0.5 - Math.random());
    startGameArea.style.display = "none";
    gridArea.style.display = "flex";
    resultArea.style.display = "none";
    startTimer();
    createBoard();
});

btnNewGame.addEventListener('click', () => {
    location.reload();
})

function createBoard() {
    for (let i = 0; i < 40; i++) {
        const card = document.createElement('img');
        card.setAttribute('src', 'assets/img/green.png');
        card.setAttribute('data-id', i);
        card.classList.add('card');
        card.addEventListener('click', flipCard);
        gridDisplay.appendChild(card);
    }
}

function checkMatch() {
    const cards = document.querySelectorAll('.card');

    if (cardsChosen[0] == cardsChosen[1]) {
        cards[cardsChosenIds[0]].setAttribute('src', 'assets/img/white.png');
        cards[cardsChosenIds[1]].setAttribute('src', 'assets/img/white.png');
        cards[cardsChosenIds[0]].removeEventListener('click', flipCard);
        cards[cardsChosenIds[1]].removeEventListener('click', flipCard);
        cardsWon.push(cardsChosen);
    } else {
        cards[cardsChosenIds[0]].setAttribute('src', 'assets/img/green.png');
        cards[cardsChosenIds[1]].setAttribute('src', 'assets/img/green.png');
    }

    if (cardsWon.length == cardArray.length / 2) {
        clearInterval(timer);
        startGameArea.style.display = "none";
        gridArea.style.display = "none";
        resultArea.style.display = "flex";
        resultDisplay.innerHTML = document.getElementById('timer').innerHTML;
    }
}

function flipCard() {
    const cardId = this.getAttribute('data-id');
    if (cardsChosenIds.length < 2 && !cardsChosenIds.includes(cardId)) {
        cardsChosen.push(cardArray[cardId].id);
        cardsChosenIds.push(cardId);
        this.setAttribute('src', cardArray[cardId].img);
        if (cardsChosen.length === 2) {
            setTimeout(() => {
                checkMatch();
                cardsChosen = [];
                cardsChosenIds = [];
            }, 500);
        }
    }
}

function startTimer() {
    timer = setInterval(() => {
        document.getElementById('timer').innerHTML = (parseInt(document.getElementById('timer').innerHTML) + 1);
    }, 1000);
}