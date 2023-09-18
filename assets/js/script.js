//used to create all elements
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
var answersEl = document.createElement("ul")
var checkAnswers = document.createElement("div")
var saveBtn = document.createElement("button")
gameOverDiv= document.createElement("div")

//questions array
allQuestions = {
    "Commonly used datatype do not include:" : ["stings" , "booleans" , "alerts" , "numbers" , 2],
    
    "Arrays in JavaScript and be used to store:" : ["other arrays" , "booleans" , "numbers and strings" , "all of the above" , 3],
    
    "String values must be closed withing ______ when being assigned to variables." : ["commas" , "curly brackets" , "quotes" , "parenthesis" , 2],
    
    "A very useful tool during developement debugging for printing content to the debugger is:" : ["JavaScript" , "terminal" , "for loops" , "console.log" , 3]
}

h1El.textContent = "Timed Quiz"
infoEl.textContent = "Select start to start the timer, You will have 75 seconds to complete the quiz. Every wrong answer will remove 15 seconds from your timer. Good Luck!"
startBtn.textContent = "Start"
initials.textContent = "Enter your initials: "
h2El.textContent = "All done"
saveBtn.textContent = "Save"

//styling
h1El.setAttribute("style", "margin:auto; padding-top:50px; text-align:center;");
infoEl.setAttribute("style", "margin:auto; padding:50px; text-align:center;");
startBtn.setAttribute("style", "position: absolute; left: 50%; background-color: pink; font-size: 20px;");
timer.setAttribute("style", "text-align: right;")
divEl.setAttribute("style", "display: flex; flex-direction:column; align-items: center; justify-content:center;")
textArea.setAttribute("style", "height: 16px; width: 100px;")
h2El.setAttribute("style", "text-align: center;")
finalScore.setAttribute("style", "text-align: center;")
gameOverDiv.setAttribute("style", "display: flex; flex-direction:column; align-items: center; justify-content:center;")



function init(){
body.appendChild(h1El);
body.appendChild(infoEl);
body.appendChild(startBtn);

}


//on start removes previous items and starts the quiz and timer
startBtn.addEventListener("click", function(){
    body.removeChild(h1El);
    body.removeChild(infoEl);
    body.removeChild(startBtn);
    body.appendChild(divEl)
    divEl.appendChild(questionsEl)
    divEl.appendChild(answersEl)
    currentQuestion = 0

    questionsEl.setAttribute("style","text-align: center; display: flex; justify-content:center; font-weight: bolder; font-size:25px;")

    questionsEl.classList.add("questions")
    answersEl.classList.add("answers")

    //timer countdown
    var timeLeft = 75;
    var startTime = setInterval(function(e){
        if(timeLeft < 0){
        gameOver();
        clearInterval(startTime);
        
        } else {
        timer.innerHTML = "Time remaining: " + timeLeft;
        getQuestions(currentQuestion)
        getAnswers(currentQuestion)
        

        divEl.appendChild(checkAnswers)
    


    function getQuestions(curr){
        var questions = Object.keys(allQuestions)[curr]
        questionsEl.innerHTML= "";
        questionsEl.innerHTML= questions;
    
    
    }
    
    function getAnswers(curr){
    //sets up the answers to the question
        var answers = allQuestions[Object.keys(allQuestions)[curr]];
    
        answersEl.innerHTML = "";
    
    
        for(var i = 0; i < answers.length-1; i += 1){
            text=document.createTextNode(answers[i])
            divText=document.createElement("li")
            divText.setAttribute("style", "text-align: center; font-size:25; border:solid; padding-top: 10px;")
    
            divText.appendChild(text)
            divText.addEventListener("click",checkingAnswers(i, answers))
            answersEl.appendChild(divText);
    
    
        answersEl.appendChild(divText);
    }}
    //checks if answer was correct. if not it will deduct time from the clock
    function checkingAnswers(i, arr) {

        return function() {
            var userAnswer=i
            correctAnswer= arr[arr.length-1]
    
            if (userAnswer === correctAnswer) {
                result(true);
            } else{
                result(false)
                timeLeft-=15;
            }
            if (currentQuestion<Object.keys(allQuestions).length-1){
                currentQuestion+=1
    
                getQuestions(currentQuestion)
                getAnswers(currentQuestion)
            }else{
                clearInterval(startTime);
                gameOver()
            }

        }
    }
    
    //shows results after answering a question
    function result(bool){
        correct = document.createTextNode("Correct")
        incorrect = document.createTextNode("Wrong")
        checkAnswers.innerHTML=""
        if(bool){
            checkAnswers.appendChild(correct)  
            clearInterval(result)      
        }else{
            checkAnswers.appendChild(incorrect)
            clearInterval(result)   
    
        }
    }
    //give score and allows you to input your initials
    function gameOver(){
        timer.innerHTML = ""
        divEl.removeChild(questionsEl)
        divEl.removeChild(answersEl)
        divEl.removeChild(checkAnswers)
        body.removeChild(divEl)
        body.appendChild(h2El)
        body.appendChild(finalScore)
        body.appendChild(gameOverDiv)
        gameOverDiv.appendChild(initials)
        gameOverDiv.appendChild(textArea)
        gameOverDiv.appendChild(saveBtn)
        finalScore.textContent = "Your final score is " + timeLeft
           
        
    
    //creates a blank score array or adds to a current array
    var highScores = JSON.parse(localStorage.getItem("scores")) || []
    

    //saves to local storage on click
    saveBtn.addEventListener ("click", function(){
        var score= {
            score: timeLeft.toString(),
            user: textArea.value
        }

        highScores.push(score);
        localStorage.setItem("scores",JSON.stringify(highScores));


        body.removeChild(h2El)
        body.removeChild(finalScore)
        body.removeChild(gameOverDiv)
    
        init()
    
    })}
}
timeLeft -= 1;
}, 1000)
});

init();