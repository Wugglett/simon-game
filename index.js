var title = "Level  "
var level = 1;
var sequence = [];
var index = 0;
var isGameOver = true;
var highscore = 0;

var buttons = [];
$(".simon-button").each(function() {
    buttons.push($(this));
})

$("button").click(function() {
    if(!isGameOver) {
        if(sequence[index].is($(this))) {
            index++;
            if(index === level) {
                level++;
                nextLevel();
            }
        }
        else {
            gameOver();
            var audio = new Audio('sounds/wrong.mp3');
            audio.play();
        }
    }
    buttonPress($(this));
})

$(document).keydown(function() {
    if(isGameOver) {
        startGame();
    }
});

function buttonPress(btn) {
    btn.toggleClass("pressed");
    if(btn.hasClass("bluebtn")){
        var audio = new Audio('sounds/blue.mp3');
        audio.play();
    }
    else if(btn.hasClass("greenbtn")){
        var audio = new Audio('sounds/green.mp3');
        audio.play();
    }
    else if(btn.hasClass("redbtn")){
        var audio = new Audio('sounds/red.mp3');
        audio.play();
    }
    else if(btn.hasClass("yellowbtn")){
        var audio = new Audio('sounds/yellow.mp3');
        audio.play();
    }
    setTimeout(function() {
        btn.toggleClass("pressed");
    }, 250);
}

function startGame() {
    level = 1;
    isGameOver = false;
    $("h1").html(title + level);
    $("h2").html("Highscore: " + highscore);
    nextLevel();
}

function nextLevel() {
    index = 0;
    $("h1").html(title + level);
    if(level > highscore) {
        highscore = level;
        $("h2").html("Highscore: " + highscore);
    }
    var randButton = Math.floor(Math.random() * 4);
    sequence.push(buttons[randButton]);
    setTimeout(function(){buttonPress(buttons[randButton]);}, 1000);
}

function gameOver() {
    isGameOver = true;
    $("h1").html("Game Over");
    sequence = [];
}