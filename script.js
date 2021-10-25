// make a simple game of pong
// three elements in the canvas: two paddles and a ball

const game = document.getElementById("canvas")
    canvas.height = 500
    canvas.width = 700

const ctx = game.getContext("2d")
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
console.log(net)
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
    this.speed= 10
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
    dy: 3
}
console.log("this is the ball", ball)
// create a function that will animate the ball
function gameLoop() {
    ctx.clearRect(0,0, canvas.width, canvas.height)
    
    // leftPaddle.y += leftPaddle.dy
    // rightPaddle.y += rightPaddle.dy

drawBall()
    // change position
    ball.x += ball.dx
    ball.y += ball.dy
    
    // detect left and right boundaries
    if  (ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
        ball.dx *= -1
    }
    // detect top and bottom boundaries
    if  (ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
        ball.dy *= -1
    }
    requestAnimationFrame(gameLoop)
    // render the paddles
    leftPaddle.render()
    rightPaddle.render()
    drawNet()

}
gameLoop()

// //declare a function that will check for collision between paddle and ball
// function detectHit(paddle, ball) {
//     return  paddle.x < ball.x + ball.width &&
//             paddle.x + paddle.width > ball.x &&
//             paddle.y < ball.y + ball.height &&
//             paddle.y + paddle.height > ball.y
// }
// console.log(detectHit)
// if (detectHit(ball, leftPaddle)) {
//     ball.dx *= -1
//     ball.x = leftPaddle.x + leftPaddle.width
// }
// else if (detectHit(ball, rightPaddle)) {
//     ball.dx *= -1
//     ball.x = rightPaddle.x - ball.width
// }


// set up gameLoop function

// const gameLoop = () => {
//     requestAnimationFrame(animateBall)
//     // clear the canvas
//     ctx.clearRect(0, 0, canvas.width, canvas.height)

//     // speed of paddles
// }
// gameLoop()

// declare a function that will stop our animation loop
// let stopGameLoop = () => {clearInterval(gameInterval)}
                                
// add event listeners for paddles
document.addEventListener("keydown", moveLeftPaddle)
document.addEventListener("keydown", moveRightPaddle)
                                
// declare a timing function will determine how and when the game animates
// let gameInterval = setInterval(gameLoop, 1000)