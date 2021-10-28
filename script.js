// three elements in the canvas: two paddles and a ball
const game = document.getElementById("canvas")
const ctx = game.getContext("2d")

// static game
ctx.beginPath()
ctx.setLineDash([5, 10])
ctx.moveTo(300, 0)
ctx.lineTo(300, 400)
ctx.strokeStyle = "white"
ctx.stroke()
ctx.fillStyle = "#FFFFFF"
ctx.fillRect(0, 175, 8, 50)
ctx.fillRect(592, 175, 8, 50)
ctx.beginPath()
ctx.arc(300, 200, 10, 0, Math.PI * 2)
ctx.fillStyle = "white"
ctx.fill()

// declare variable for the score
let leftScore = 0
let rightScore = 0

// write a function that will display score
function scoreText() {
    ctx.font = "20px Arial"
    ctx.fillStyle = "#FFFFFF"
    ctx.fillText(leftScore, 150, 30)
    ctx.fillText(rightScore, 450, 30)
}

function drawNet() {
    ctx.beginPath();
    ctx.setLineDash([5, 10]);
    ctx.moveTo(300, 0);
    ctx.lineTo(300, 400);
    ctx.strokeStyle = "white";
    ctx.stroke();
}
// constructor function for paddle
function Paddle(x, y, color, width, height) {
    this.x = x
    this.y = y
    this.color = color
    this.height = height
    this.width = width
    this.render = function () {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}
// render left paddle in the canvas
const leftPaddle = new Paddle(0, canvas.height / 2 - 25, "white", 8, 50)

// render right padde in the canvas
const rightPaddle = new Paddle(592, canvas.height / 2 - 25, "white", 8, 50)

// set up keycode functionality for left paddle
// left paddle will use keys "w" for up and "s" for down
const moveLeftPaddle = (e) => {
    switch (e.keyCode) {
        // left paddle board goes up
        case (87):
            leftPaddle.y -= 50
            if (leftPaddle.y <= 0) {
                leftPaddle.y = 0
            }
            break
        // left paddle board goes down
        case (83):
            leftPaddle.y += 50
            if (leftPaddle.y + leftPaddle.height >= game.height) {
                leftPaddle.y = game.height - leftPaddle.height
            }
            break
    }
}
// set up keycode functionality for right paddle
// right paddle will use keys arrow up and arrow down
const moveRightPaddle = (e) => {
    switch (e.keyCode) {
        // right paddle board goes up
        case (38):
            rightPaddle.y -= 50
            if (rightPaddle.y <= 0) {
                rightPaddle.y = 0
            }
            break
        // right paddle board goes down
        case (40):
            rightPaddle.y += 50
            if (rightPaddle.y + rightPaddle.height >= game.height) {
                rightPaddle.y = game.height - rightPaddle.height
            }
            break
    }
}
// create a function for the ball in the canvas
function drawBall() {
    ctx.beginPath()
    ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2)
    ctx.fillStyle = "white"
    ctx.fill()
}
// render ball in the middle of canvas and set speed
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    r: 10,
    // increment relating to movement in the x axis
    dx: 3,
    // increment relating to movement in the y axis
    dy: 3,
}
// declare a function that will detect collision on the left paddle
function leftPaddleHit() {
    if (ball.x - ball.r < leftPaddle.x + leftPaddle.width &&
        ball.y - ball.r > leftPaddle.y &&
        // ball.x - ball.r < leftPaddle.x &&
        ball.y + ball.r < leftPaddle.y + leftPaddle.height
    ) {
        moveRight()
        console.log("hit left paddle")
    }
}
// declare a function that will increase ball speed when it hits paddle
function moveRight() {
    ball.dx *= -1
    ball.dy *= -1
}
// declare a function that will detect collision on the right paddle
function rightPaddleHit() {
    if (ball.x + ball.r > rightPaddle.x &&
        ball.y + ball.r > rightPaddle.y &&
        rightPaddle.x + rightPaddle.width > ball.x &&
        rightPaddle.y + rightPaddle.height > ball.y
    ) {
        moveLeft()
        console.log("hit right paddle")
    }
}
// declare a function that will increase ball speed when it hits paddle
function moveLeft() {
    ball.dx *= -1
    ball.dy *= -1
}
function hitWall() {
    // hits the right wall, leftScore goes up
    if (ball.x + ball.r > canvas.width) {
        console.log("hit right wall")
        leftScore++
    } else if (ball.x - ball.r < 0) {
        rightScore++
        console.log("hit left wall")
    }
    // set left and right boundaries
    if (ball.x + ball.r > canvas.width || ball.x - ball.r < 0) {
        // direction of ball
        ball.dx *= -1
    }
    // set top and bottom boundaries
    if (ball.y + ball.r > canvas.height || ball.y - ball.r < 0) {
        // direction of ball
        ball.dy *= -1
    }
}
let gameOver = false

// create a function that will animate the ball
function gamePlay() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    if (!gameOver) {
        updateBall()
    } else return
        drawBall()
        drawNet()
        scoreText()
        leftPaddleHit()
        rightPaddleHit()
        hitWall()
        leftPaddle.render()
        rightPaddle.render()
    if (leftScore === 100 || rightScore === 100) {
        gameOver = true
    }
}
function updateBall() {
    // bottom right corner is the starting direction of ball 
    ball.x += ball.dx
    ball.y += ball.dy
}
function gameLoop() {
    gamePlay()
}
function gameStart() {
    let framePerSecond = 50
    setInterval(gameLoop, 1000 / framePerSecond)
}
function reload() {
    reload = location.reload();
}
// add event listeners for paddles
document.addEventListener("keydown", moveLeftPaddle)
document.addEventListener("keydown", moveRightPaddle)
document.getElementById("startBtn").addEventListener("click", gameStart)
