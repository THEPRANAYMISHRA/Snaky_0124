let inputDir={x:0,y:0};
const foodSound=new Audio("food.mp3");
const gameOverSound=new Audio("gameover.mp3");
const moveSound=new Audio("click.wav");
const bgSound=new Audio("bgSound.mp3");
const speed=4;
let level=1
let score=0
let highestScore=0
let lastPaintTime=0
let snakeArr=[
    {x:13,y:14}
]

let food={x:17,y:11}

let scorebox=document.getElementById("scorebox")
let highscorebox=document.getElementById("highscorebox")
let levelbox=document.getElementById("levelbox")
let gameBoard=document.getElementById("board")
let headEl=document.getElementsByClassName("head")


//game functions
function main(currTime){
    window.requestAnimationFrame(main);

    if((currTime- lastPaintTime)/1000 < 1/speed){
        return ;
    }else{
        lastPaintTime=currTime
        gameEngine()
    }

function isCrash(snake){
    //if snake bump itself
    for(let i=1;i<snakeArr.length;i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true
        }  
    }
    if(snake[0].x>=36 || snake[0].x<=0 || snake[0].y>=18 || snake[0].y<=0){
        return true
    }
}

function gameEngine(){
    //part-1:updating snake array & food
    if(isCrash(snakeArr)){
        bgSound.pause()
        gameOverSound.play()
        inputDir={x:0,y:0}
        setTimeout(() => {
            alert("Game Over ,Play again!")
        },1000);
        snakeArr=[{x:13,y:15}]
        if(score>highestScore){
            highestScore=score
        }
        level=0
        score=0
    }

    //if sanke ate food
    if(snakeArr[0].y==food.y && snakeArr[0].x==food.x){
        foodSound.play()
        score++
        snakeArr.unshift({
            x:snakeArr[0].x+inputDir.x,
            y:snakeArr[0].y+inputDir.y
        })
        let a=2;
        let b=34;
        let d=16

        if(score%5==0){
            level++
            speed++
        }

        food={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(d-a)*Math.random())}
    }

    //moving the snake
    for(let i=snakeArr.length-2;i>=0;i--){
        snakeArr[i+1]={...snakeArr[i]}
    }

    snakeArr[0].x+=inputDir.x
    snakeArr[0].y+=inputDir.y

    //part-2:render snake
    gameBoard.innerHTML="";
    scorebox.innerHTML=score
    highscorebox.innerHTML=highestScore
    levelbox.innerHTML=level

    snakeArr.forEach((e,i)=>{
            let snakeElement=document.createElement("div");
            snakeElement.style.gridRowStart =  e.y;
            snakeElement.style.gridColumnStart = e.x;

            if(i==0){
                snakeElement.classList.add("head")
            }else{
                snakeElement.classList.add("snake")
            }
            gameBoard.appendChild(snakeElement)
        })

    //part-2:render food
        let foodElement=document.createElement("div");
        foodElement.style.gridRowStart =  food.y;
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add("food")
        gameBoard.appendChild(foodElement)

    }
}








//main logic is here
window.requestAnimationFrame(main);

window.addEventListener("keydown",(e)=>{
    inputDir={x:0,y:1}//this will start the game
    moveSound.play()
    bgSound.play()
    switch (e.key) {
        case "ArrowUp":
            inputDir.x=0;
            inputDir.y=-1;
            break;
        case "ArrowDown":
            inputDir.x=0;
            inputDir.y=1;
            break;
        case "ArrowLeft":
            inputDir.x=-1;
            inputDir.y=0;
            break;
        case "ArrowRight":
            inputDir.x=1;
            inputDir.y=0;
            break;
    
        default:
            break;
    }
})