let userClickedPattern = []
let gamePattern = []
let buttonColours = ["red", "blue", "green", "yellow"]
let id
let level = 0
let started = false

$(document).on('keypress', ()=> {
    if(!started){
    nextSequence()
    started = true
    }
})

function nextSequence() {
    userClickedPattern = []
    let randomNumber = Math.floor(Math.random() * 4)
    let randomChosenColour = buttonColours[randomNumber]
    gamePattern.push(randomChosenColour)
    playSound(randomChosenColour)
    flushAnimation(randomChosenColour)
    animatePress(randomChosenColour)
    level++
    $('h1').text(`Level ${level}`)
}

$('.btn').on("click", function handler(){
    let userChosenColor = $(this).attr('id')
    userClickedPattern.push(userChosenColor)
    playSound(userChosenColor)
    flushAnimation(userChosenColor)
    animatePress(userChosenColor)
    checkAnswer(userClickedPattern.length - 1)
})

function playSound(name){
    let audio = new Audio(`./sounds/${name}.mp3`)
    audio.play()
}

function checkAnswer(currentLevel) {
    
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) 
    {
        // console.log('right')
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(()=> {
                nextSequence()
            },1000)
        }
    } else {

        playSound('wrong')
         $('body').addClass('game-over')
        setTimeout(()=> {
             $('body').removeClass('game-over')
        },200)
       startOver()
        $('h1').text('Game over! Try again! You’re out of sync!')
    }
}

function flushAnimation(name) {
    id = '#' + name
    $(id).fadeOut(100).fadeIn(100);
}

function animatePress(currentColor){
    id = '#' + currentColor
    $(id).addClass( 'pressed')
    setTimeout(()=>{
        $(id).removeClass('pressed')
    },100)
}

function startOver() {
    level = 0
    gamePattern = []
    started = false
}