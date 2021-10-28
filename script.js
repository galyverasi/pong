// three elements in the canvas: two paddles and a ball
const game = document.getElementById("canvas")
const ctx = game.getContext("2d")

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
// declare a variable for the net
const netWidth = 4
const netHeight = canvas.height
const net = {
    x: canvas.width / 2 - netWidth / 2,
    y: 0,
    width: netWidth,
    height: netHeight,
    color: "#FFF"
}
// declare a function for the net
function drawNet() {
    ctx.fillStyle = net.color
    ctx.fillRect(net.x, net.y, net.width, net.height)
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
        ball.y + ball.x < leftPaddle.y + leftPaddle.height
    ) { moveRight()
        console.log("hit left paddle")
    }
}
// declare a function that will increase ball speed when it hits paddle
function moveRight() {
    ball.dx *= 1
    ball.dy *= -1
}
// declare a function that will detect collision on the right paddle
function rightPaddleHit() {
    if (ball.x + ball.r > rightPaddle.x &&
        ball.y + ball.r > rightPaddle.y &&
        rightPaddle.x + rightPaddle.width > ball.x &&
        rightPaddle.y + rightPaddle.height > ball.y
    ) { moveLeft()
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
    // hits the left wall, rightScore goes up
    // } else if (ball.y - ball.r < 0 && ball.x + ball.r) {
    //     console.log("hit left wall")
    //     rightScore++
    // }
    } else if (ball.x - ball.r < 0) {
        rightScore++
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
function updateBall () {
    // bottom right corner is the starting direction of ball 
    ball.x += ball.dx
    ball.y += ball.dy
}
function gameLoop() {
    gamePlay()
}
function gameStart() {
    let framePerSecond = 50
    setInterval(gameLoop, 1000/framePerSecond)
}
function hidePlayBtn () {
    document.getElementById("playBtn").style.display = "none"
}
function reload() {
    reload = location.reload();
}
// add event listeners for paddles
document.addEventListener("keydown", moveLeftPaddle)
document.addEventListener("keydown", moveRightPaddle)
document.getElementById("startBtn").addEventListener("click", gameStart)
