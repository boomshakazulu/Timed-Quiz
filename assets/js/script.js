var body = document.body;
var h1El = document.createElement("h1");
var h2El = document.createElement("h2");
var h3El = document.createElement("h3")
var divEl = document.createElement("div")
var infoEl = document.createElement("p");
var startBtn = document.createElement("button")
var timer = document.getElementById("timer")
var finalScore = document.createElement("p")
var initials = document.createElement("p")
var textArea = document.createElement("textarea")
var questionsEl = document.createElement("p")
var answersEl = document.createElement("div")
var checkAnswers = document.createElement("div")


h1El.textContent = "Timed Quiz"
infoEl.textContent = "Select start to start the timer, You will have 75 seconds to complete the quiz. Every wrong answer will remove 15 seconds from your timer. Good Luck!"
startBtn.textContent = "Start"
finalScore.textContent = "Your final score is " //+ score
initials.textContent = "Enter your initials: "
h2El.textContent = "All done"

h1El.setAttribute("style", "margin:auto; padding-top:50px; text-align:center;");
infoEl.setAttribute("style", "margin:auto; padding:50px; text-align:center;");
startBtn.setAttribute("style", "position: absolute; left: 50%; background-color: pink; font-size: 20px;");
timer.setAttribute("style", "text-align: right;")
divEl.setAttribute("style", "display: flex; align-items: baseline; justify-content:center;")
textArea.setAttribute("style", "height: 16px; width: 100px;")
h2El.setAttribute("style", "text-align: center;")
finalScore.setAttribute("style", "text-align: center;")

function init(){
body.appendChild(h1El);
body.appendChild(infoEl);
body.appendChild(startBtn);

}



startBtn.addEventListener("click", function(){
    body.removeChild(h1El);
    body.removeChild(infoEl);
    body.removeChild(startBtn);

    var timeLeft = 1;
    var startTime = setInterval(function(){
        if(timeLeft < 0){
        gameOver();
        clearInterval(startTime);
        
        } else {
        timer.innerHTML = "Time remaining: " + timeLeft;
        quiz()
    }
    timeLeft -= 1;
}, 1000)

    

    function gameOver(){
        body.appendChild(h2El)
        body.appendChild(finalScore)
        body.appendChild(divEl)
        divEl.appendChild(initials)
        divEl.appendChild(textArea)

    }

    function quiz(){
        body.appendChild(divEl)
        divEl.appendChild(questionsEl)
        divEl.appendChild(answersEl)
        divEl.appendChild(checkAnswers)

        current= 0;

        allQuestions = {
            "Commonly used datatype do not include:" : ["stings", "booleans", "alerts", "numbers", 2],
            "Arrays in JavaScript and be used to store:" : ["other arrays", "booleans", "numbers and strings","all of the above", 3],
            "String values must be closed withing ______ when being assigned to variables." : ["commas","curly brackets","quotes","parenthesis", 2],
            "A very useful tool during developement debugging for printing content to the debugger is:" : ["JavaScript", "terminal", "for loops", "console.log", 3]
        }
    }
});

init()