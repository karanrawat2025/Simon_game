var gamePattern = [];
var buttonColours=["red", "blue", "green", "yellow"];
var userClickedPattern=[];

$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  // console.log(userClickedPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

var started= false;
var level = 0;
$("body").keypress(function(){
  if(!started){
  $("h1").html("Level " + level);
  nextSequence();
  started= true;
}
});

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){

    if(gamePattern.length=== userClickedPattern.length){
    setTimeout(function(){
    nextSequence();
}, 1000);
}
}
  else{
    // var audio = new Audio("sounds/wrong.mp3");
    // audio.play();
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
}, 200);

    $("h1").html("Game Over, Press Any Key to Restart ");
    startOver();
}
}

function startOver(){
  level=0;
  gamePattern= [];
  started= false;
}

function nextSequence(){
  userClickedPattern=[];
  level++;
  $("h1").html("Level "+ level);
  var randomNumber= Math.floor(Math.random() * 4);
  var randomChosenColour= buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("." + currentColour).addClass("pressed");

  setTimeout(function(){
  $("." /* instead of . they have used # */+ currentColour).removeClass("pressed");
}, 100);
}
