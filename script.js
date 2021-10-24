// make a simple game of pong
// three elements in the canvas: two paddles and a ball
// player 2 will use arrow up and arrow down

const game = document.getElementById("canvas")

game.setAttribute("width", getComputedStyle(game)["width"])
game.setAttribute("height", getComputedStyle(game)["height"])

const ctx = game.getContext("2d")

// constructor function
function Pong(x, y, color, width, height) {
    this.x = x
    this.y = y
    this.color = color
    this.width = width
    this.height = height
    this.alive = true
    this.render = function () {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}

// render paddles and ball in the canvas
let leftPaddle = new Pong(0, 0, "green", 15, 50)
let rightPaddle = new Pong(805, 450, "red", 15, 50)
let ball = new Pong(100, 100, "white", 10, 10 )
console.log("this is the left paddle", leftPaddle)
console.log("this is the right paddle", rightPaddle)
console.log("this is the ball", ball)

// set up gameLoop function
const gameLoop = () => {
    // clear the canvas
    ctx.clearRect(0, 0, game.width, game.height)
    // render the paddles
    if (leftPaddle.alive) {
        leftPaddle.render()
    }
    rightPaddle.render()
}

// set up keycode functionality for left paddle
// left paddle will use keys "w" for up and "s" for down
// set up boundaries for left paddle
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
                leftPaddle.y = game.height + leftPaddle.height
            }
            break
            }
        }

// declare a function that will stop our animation loop
let stopGameLoop = () => {clearInterval(gameInterval)}

// add event listener for left paddle
document.addEventListener("keydown", moveLeftPaddle)

// declare a timing function will determine how and when the game animates
let gameInterval = setInterval(gameLoop, 100)