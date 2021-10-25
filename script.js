// make a simple game of pong
// three elements in the canvas: two paddles and a ball

const game = document.getElementById("canvas")
    canvas.height = 500
    canvas.width = 700

const ctx = game.getContext("2d")

// constructor function for paddle
function Paddle(x, y, color, width, height) {
    this.x = x
    this.y = y
    this.color = color
    this.height = 90
    this.width = 15
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
//constructor function for circle
function Circle(x, y, r) {
    this.x = x
    this.y = y
    this.r = r
    this.draw = () => {
        ctx.beginPath()
        ctx.arc(canvas.width / 2, canvas.height / 2, r, 0, Math.PI*2, false)
        ctx.fill()  
    }
}
//render ball in the middle of canvas
let ball = new Circle (100, 100, 20)
console.log("this is the ball", ball)


// set up gameLoop function
const gameLoop = () => {
    // clear the canvas
    ctx.clearRect(0, 0, game.width, game.height)
    // render the paddles
    leftPaddle.render ()
    rightPaddle.render ()
    ball.draw ()
}

// declare a function that will stop our animation loop
// let stopGameLoop = () => {clearInterval(gameInterval)}
                                
// add event listeners for paddles
document.addEventListener("keydown", moveLeftPaddle)
document.addEventListener("keydown", moveRightPaddle)
                                
// declare a timing function will determine how and when the game animates
let gameInterval = setInterval(gameLoop, 100)