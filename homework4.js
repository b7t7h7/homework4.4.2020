var startPageEl = document.querySelector("#Cover");
var startBtnEl = document.querySelector("#startBtn");
var sbLinkEl = document.querySelector("#sbLink");
var scoreboardEl = document.querySelector("#score-card");
var question1El = document.querySelector("#Question1");
var question2El = document.querySelector("#Question2");
var question3El = document.querySelector("#Question3");
var question5El = document.querySelector("#Question4");
var question5El = document.querySelector("#Question5");
var inputScoreEl = document.querySelector("#inputScoreInfo");
var questionArr = ["Question1", "Question2", "Question3", "Question4", "Question5"];
var answerBtn = document.querySelectorAll("button[correct]");
var correctFooterEl = document.querySelector("#correctFooter");
var incorrectFooterEl = document.querySelector("#incorrectFooter");
var scoreboardList = document.querySelector("#scoreboard");
var sbTryAgainBtn = document.querySelector("#tryAgain");
var sbClearBtn = document.querySelector("#clearBtn");


startPageEl.className = startPageEl.className.replace("hidden", "");


sbLinkEl.addEventListener("click", function(){
  showCard(scoreboardEl);
});


startBtnEl.addEventListener("click", function(){
  questionArr = ["Question1", "Question2", "Question3", "Question4", "Question5"];
  showRandomQuestion(questionArr, inputScoreEl);
  setTime(timerEl);
});


for(i=0; i<answerBtn.length; i++){
  var Btn = answerBtn.item(i);
  Btn.addEventListener("click", function(e){
    e=e||window.event;
    var btnEl = e.target||e.srcElement;
    var isCorrectReturn = rightAnswer(btnEl);
    if (isCorrectReturn == "true"){
      showRandomQuestion(questionArr, inputScoreEl);
    }
    else{
      secondsLeft = secondsLeft - 10;
      timerEl.textContent = secondsLeft;
    }
  });
}


var secondsLeft = 60;
var timerEl = document.getElementById("countdown");
var finalTime = document.getElementById("finalScore");

timerEl.textContent = secondsLeft;

var timerInterval;
function setTime(timerEl) {
    timerInterval = setInterval(function() {
    secondsLeft--;
    timerEl.textContent = secondsLeft;

    
    if(secondsLeft <= 0) {
      clearInterval(timerInterval);
      showCard(inputScoreEl);
      secondsLeft = 0;
      finalTime.textContent = secondsLeft;
    }

  }, 1000);
}

var initalsEl = document.getElementById("initalsInput");
var initialsSubmitBtn = document.getElementById("initalsSubmit");


initialsSubmitBtn.addEventListener("click", function(){
  var initalsSubmitted = initalsEl.value;
  var userInitialsArr = [initalsSubmitted, secondsLeft];
  initalsEl.value = "";


  var highScoresArr = JSON.parse(localStorage.getItem("highScoresArr"));
  
  if (highScoresArr == null){
    localStorage.setItem("highScoresArr", JSON.stringify(userInitialsArr));
  }
    
    else{
      for (i = 1; i < highScoresArr.length; i+=2) {
        currentHS = highScoresArr[i];
        
        var isHighscore = false;
        if(userInitialsArr[1] > highScoresArr[i]){
          highScoresArr.splice(i-1, 0, userInitialsArr[1]);
          highScoresArr.splice(i-1, 0, userInitialsArr[0]);
          isHighscore = true;
          break;
        }
      }
      
      if (isHighscore == false && highScoresArr.length < 10){
        highScoresArr.push(userInitialsArr[0]);
        highScoresArr.push(userInitialsArr[1]);
      }
      localStorage.setItem("highScoresArr", JSON.stringify(highScoresArr));
    }
  showCard(scoreboardEl);
});


sbTryAgainBtn.addEventListener("click", function(){
  showCard(startPageEl);
  secondsLeft=60;
  timerEl.textContent = secondsLeft;
});


sbClearBtn.addEventListener("click", function(){

  while (scoreboardList.children.length > 0) {
    scoreboardList.children.item(0).remove();
  }
  
  localStorage.removeItem("highScoresArr");
});






function showRandomQuestion(questionArr, inputScoreEl){ 
 
  if (questionArr.length == 0){
    showCard(inputScoreEl);
    clearInterval(timerInterval);
    finalTime.textContent = secondsLeft;

  }
  else{ 
    
    var i = Math.floor(Math.random() * questionArr.length);
    
    var chosenQ = document.getElementById(questionArr[i]);
    
    questionArr.splice(i, 1);
    
    showCard(chosenQ);
  }
}

function showCard(calledCard){
  var allCards = document.querySelectorAll(".container");
  
  for(i=0; i<allCards.length; i++){
   
    var currentCard = allCards.item(i);
   
    if(currentCard.className.includes("hidden") == false){
      currentCard.className += ' hidden';
    }   
  }
 
  calledCard.className = calledCard.className.replace("hidden", "");
  console.log(calledCard.className);


  if (calledCard == scoreboardEl){
    
    while (scoreboardList.children.length > 0) {
      scoreboardList.children.item(0).remove();
    }
 
    var highScoresArr = JSON.parse(localStorage.getItem("highScoresArr"));

    
    if (highScoresArr != null){
      for (var i = 0; i < highScoresArr.length; i+=2) {
        var currentHSli = highScoresArr[i] + ": " + highScoresArr[i+1];

        var li = document.createElement("li");
        li.textContent = currentHSli;

        scoreboardList.appendChild(li);
      }
    }
  }
}


function rightAnswer(btnEl){
  var isCorrect = btnEl.getAttribute("correct");
  if (isCorrect == "true"){
   
    correctFooterEl.className = correctFooterEl.className.replace("hidden", "");
    setTimeout(function(){
      correctFooterEl.className += ' hidden';
    }, 500);
  }
  else{
    
    incorrectFooterEl.className = incorrectFooterEl.className.replace("hidden", "");
    setTimeout(function(){
      incorrectFooterEl.className += ' hidden';
    }, 1000);
  }
  return isCorrect;
}
