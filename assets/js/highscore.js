var ulEL = document.getElementById("highscore")
var scores = JSON.parse(localStorage.getItem("scores")) || []
console.log(scores)

ulEL.innerHTML = scores
.map(score => {
    return `<li>${score.user}-${score.score}</li>`
})
.join(" ")