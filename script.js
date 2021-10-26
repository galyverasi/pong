// three elements in the canvas: two paddles and a ball

const game = document.getElementById("canvas")
const ctx = game.getContext("2d")

// declare variable for the score
let leftScore = 0
let rightScore = 0

// write a function that will keep score on the left
function scoreText() {
    ctx.font = "30px Arial"
    ctx.fillStyle = "#FFFFFF"
    ctx.fillText(leftScore, 175, 30)
    ctx.fillText(rightScore, 525, 30)
}
// console.log("this is score", scoreText)

// declare a variable for the net
const netWidth = 4
const netHeight = canvas.height
const net = {
    x: canvas.width / 2 - netWidth /2,
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
    this.height = 90
    this.width = 15
    this.speed= 20
    this.render = function () {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}

// render left paddle in the canvas
let leftPaddle = new Paddle(5, canvas.height / 2 - 45, "white", 15, 90)
console.log("this is the left paddle", leftPaddle)
// render right padde in the canvas
let rightPaddle = new Paddle(680, canvas.height / 2 - 45, "white", 15, 90)
console.log("this is the right paddle", rightPaddle)

// set up keycode functionality for left paddle
// left paddle will use keys "w" for up and "s" for down
// set up canvas boundaries for left paddle
    const moveLeftPaddle = (e) => {
        switch (e.keyCode) {
        // left paddle board goes up
        case (87):
            leftPaddle.y -= 10
        if (leftPaddle.y <= 0) {
            leftPaddle.y = 0
        }
        break
        // left paddle board goes down
        case (83):
            leftPaddle.y += 10
        if (leftPaddle.y + leftPaddle.height >= game.height) {
            leftPaddle.y = game.height - leftPaddle.height
        }
        break
            }
        }

// set up keycode functionality for right paddle
// right paddle will use keys arrow up and arrow down
// set up canvas boundaries for right paddle
    const moveRightPaddle = (e) => {
        switch (e.keyCode) {
        // right paddle board goes up
        case (38):
            rightPaddle.y -= 10
        if (rightPaddle.y <= 0) {
            rightPaddle.y = 0
        }
        break
        // right paddle board goes down
        case (40):
            rightPaddle.y += 10
        if (rightPaddle.y + rightPaddle.height >= game.height) {
            rightPaddle.y = game.height - rightPaddle.height
        }
        break
            }
        }
            
// create a function for the ball in the canvas
function drawBall() {
    ctx.beginPath()
    ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2)
    ctx.fillStyle = "white"
    ctx.fill()
}
// render ball in the middle of canvas and set speed
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 20,
    dx: 4,
    dy: 3,
}
// console.log("this is the ball", ball)
// function drawBall(x, y, size) {
//     ctx.beginPath()
//     ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
//     ctx.fillStyle = "white"
//     ctx.fill()
// }
// let ball = new drawBall (canvas.width/2, canvas.height /2, 20)

// declare a function that will detect collision on the left paddle
function leftPaddleHit () {
    if (ball.x - ball.size < leftPaddle.x &&
         ball.y + ball.size > leftPaddle.y &&
         leftPaddle.x - leftPaddle.width < ball.x && 
         leftPaddle.y + leftPaddle.height > ball.y) {
        console.log("touch left")
    }
}

// declare a function that will detect collission on the right paddle
function rightPaddleHit () {
    if (ball.x + ball.size > rightPaddle.x &&
         ball.y + ball.size > rightPaddle.y &&
         rightPaddle.x + rightPaddle.width > ball.x && 
         rightPaddle.y + rightPaddle.height > ball.y) {
        console.log("touch right")
    }
}

// create a function that will animate the ball
function gameLoop() {
    ctx.clearRect(0,0, canvas.width, canvas.height)
    
    // leftPaddle.y += leftPaddle.dy
    // rightPaddle.y += rightPaddle.dy
    
    drawNet()
    drawBall()
    // change position
    ball.x += ball.dx
    ball.y += ball.dy
    
    rightPaddleHit()
    leftPaddleHit()

    // set left and right boundaries
    if  (ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
        ball.dx *= -1
    } function detectWall() {
        if  (ball.x + ball.size > canvas.width) {
            console.log("hit right side")
            leftScore++
        } else if (ball.x - ball.size < 0) {
            console.log("hit left side")
            rightScore++
        }
    }

    // set top and bottom boundaries
    if  (ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
        ball.dy *= -1
    }

    requestAnimationFrame(gameLoop)
    // render the paddles
    leftPaddle.render()
    rightPaddle.render()
    scoreText()
    detectWall()
}
gameLoop()

// declare a function that will stop our animation loop
// let stopGameLoop = () => {clearInterval(gameInterval)}
                                
// add event listeners for paddles
document.addEventListener("keydown", moveLeftPaddle)
document.addEventListener("keydown", moveRightPaddle)
                                
// declare a timing function will determine how and when the game animates
// let gameInterval = setInterval(gameLoop, 1000)