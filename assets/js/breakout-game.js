const grid = document.querySelector('#grid');
const scoreDisplay = document.querySelector('#score');

const btnStartGame = document.getElementById('btnStartGame');
const btnNewGame = document.getElementById('btnNewGame');
const startGameArea = document.getElementById('startGameArea');
const gridArea = document.getElementById('gridArea');
const resultArea = document.getElementById('resultArea');

const blockWidth = 100;
const blockHeight = 20;
const boardWidth = 560;
const boardHeight = 560;
const ballDiameter = 20;

let user = null;
let ball = null;

let ballSpeed = 3;
let score = 0;

const userStart = [230, 10];
let userCurrentPosition = userStart;

const ballStart = [270, 40];
let ballCurrentPosition = ballStart;

let timerId;
let xDirection = (-1) * ballSpeed;
let yDirection = ballSpeed;

class Block {
    constructor(xAxis, yAxis) {
        this.bottomLeft = [xAxis, yAxis];
        this.bottomRight = [xAxis + blockWidth, yAxis];
        this.topLeft = [xAxis, yAxis + blockHeight];
        this.topRight = [xAxis + blockWidth, yAxis + blockHeight];
    }
}

const blocks = [
    new Block(10, 530),
    new Block(120, 530),
    new Block(230, 530),
    new Block(340, 530),
    new Block(450, 530),
    new Block(10, 500),
    new Block(120, 500),
    new Block(230, 500),
    new Block(340, 500),
    new Block(450, 500),
    new Block(10, 470),
    new Block(120, 470),
    new Block(230, 470),
    new Block(340, 470),
    new Block(450, 470),
    new Block(10, 440),
    new Block(120, 440),
    new Block(230, 440),
    new Block(340, 440),
    new Block(450, 440),
    new Block(10, 410),
    new Block(120, 410),
    new Block(230, 410),
    new Block(340, 410),
    new Block(450, 410),
    new Block(10, 380),
    new Block(120, 380),
    new Block(230, 380),
    new Block(340, 380),
    new Block(450, 380),
]


btnStartGame.addEventListener('click', () => {
    startGameArea.style.display = "none";
    gridArea.style.display = "flex";
    resultArea.style.display = "none";

    addBlock();

    user = document.createElement('div');
    user.classList.add('user');
    drawUser();
    grid.appendChild(user);

    ball = document.createElement('div');
    ball.classList.add('ball');
    drawBall();
    grid.appendChild(ball);

    timerId = setInterval(moveBall, 15);
    document.addEventListener('keydown', moveUser);
});

btnNewGame.addEventListener('click', () => {
    location.reload();
});

function addBlock() {
    for (let i = 0; i < blocks.length; i++) {
        const block = document.createElement('div');
        block.classList.add('block');
        block.style.left = blocks[i].bottomLeft[0] + 'px';
        block.style.bottom = blocks[i].bottomLeft[1] + 'px';
        grid.appendChild(block);
    }
}

function drawUser() {
    user.style.left = userCurrentPosition[0] + 'px';
    user.style.bottom = userCurrentPosition[1] + 'px';
}

function drawBall() {
    ball.style.left = ballCurrentPosition[0] + 'px';
    ball.style.bottom = ballCurrentPosition[1] + 'px';
}

function moveUser(e) {
    switch (e.key) {
        case 'ArrowLeft':
            if (userCurrentPosition[0] > 0) {
                userCurrentPosition[0] -= 10;
                drawUser();
            }
            break;
        case 'ArrowRight':
            if (userCurrentPosition[0] < boardWidth - blockWidth) {
                userCurrentPosition[0] += 10;
                drawUser();
            }
            break;
    }
}

function moveBall() {
    ballCurrentPosition[0] += xDirection;
    ballCurrentPosition[1] += yDirection;
    drawBall();
    checkForCollision();
}


function checkForCollision() {
    for (let i = 0; i < blocks.length; i++) {
        if (
            (ballCurrentPosition[0] > blocks[i].bottomLeft[0] && ballCurrentPosition[0] < blocks[i].bottomRight[0]) &&
            ((ballCurrentPosition[1] + ballDiameter) > blocks[i].bottomLeft[1] && ballCurrentPosition[1] < blocks[i].topLeft[1])
        ) {
            const allBlocks = Array.from(document.querySelectorAll('.block'));
            allBlocks[i].classList.remove('block');
            blocks.splice(i, 1);
            changeDirection();
            score++;

            if (blocks.length === 0) {
                startGameArea.style.display = "none";
                gridArea.style.display = "none";
                resultArea.style.display = "flex";

                clearInterval(timerId);
                document.removeEventListener('keydown', moveUser);
                scoreDisplay.innerHTML = 'YOU WIN!'
            }
        }
    }

    if (
        ballCurrentPosition[0] >= (boardWidth - ballDiameter) ||
        ballCurrentPosition[1] >= (boardHeight - ballDiameter) ||
        ballCurrentPosition[0] <= 0) {
        changeDirection()
    }

    if (
        ballCurrentPosition[0] > userCurrentPosition[0] &&
        ballCurrentPosition[0] < userCurrentPosition[0] + blockWidth &&
        ballCurrentPosition[1] > userCurrentPosition[1] &&
        ballCurrentPosition[1] < userCurrentPosition[1] + blockHeight
    ) {
        changeDirection();
    }

    if (ballCurrentPosition[1] <= 0) {
        startGameArea.style.display = "none";
        gridArea.style.display = "none";
        resultArea.style.display = "flex";

        clearInterval(timerId);
        scoreDisplay.innerHTML = 'YOU LOSE!';
        document.removeEventListener('keydown', moveUser);
    }
}

function changeDirection() {
    if (xDirection === ballSpeed && yDirection === ballSpeed) {
        yDirection = (-1) * ballSpeed;
        return;
    }
    if (xDirection == ballSpeed && yDirection == (-1) * ballSpeed) {
        xDirection = (-1) * ballSpeed;
        return;
    }
    if (xDirection == (-1) * ballSpeed && yDirection == (-1) * ballSpeed) {
        yDirection = ballSpeed;
        return;
    }
    if (xDirection == (-1) * ballSpeed && yDirection == ballSpeed) {
        xDirection = ballSpeed;
        return;
    }

}