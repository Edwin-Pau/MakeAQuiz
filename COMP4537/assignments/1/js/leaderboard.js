/**
 * Endpoints
 */
// let getQuestionsEndpoint = "https://assignment1-comp4537.herokuapp.com/COMP4537/assignments/1/questions"
// let getAnswersEndpoint = "https://assignment1-comp4537.herokuapp.com/COMP4537/assignments/1/answers"
// let getScoresEndpoint = "https://assignment1-comp4537.herokuapp.com/COMP4537/assignments/1/scores"
// let getQuizzesEndpoint = "https://assignment1-comp4537.herokuapp.com/COMP4537/assignments/1/quizzes"
let currentURL = window.location.href
let getQuestionsEndpoint = currentURL + "/COMP4537/assignments/1/questions"
let getAnswersEndpoint = currentURL + "/COMP4537/assignments/1/answers"
let getScoresEndpoint = currentURL + "/COMP4537/assignments/1/scores"
let getQuizzesEndpoint = currentURL + "/COMP4537/assignments/1/quizzes"

console.log(getQuestionsEndpoint)

/**
 * Script variables
 */
let divToInsertScores = document.getElementById("insert-scores")
let fetchedScoresArr = []

/**
 * Helper functions
 */
const insertAfter = (newNode, existingNode) => {
    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling)
}

const compare = (a, b) => {
    if (a.TotalScore > b.TotalScore ){
      return 1;
    }
    if (a.TotalScore < b.TotalScore ){
      return -1;
    }
    return 0;
}

/**
 * Render existing objects from local storage
 */
const renderScores = () => {
    console.log("Rendering scores...")
    
    const parentNode = document.getElementById("insert-scores")
    parentNode.innerHTML = ""

    fetchedScoresArr.sort(compare)

    fetchedScoresArr = fetchedScoresArr.reverse()

    for (let i = 0; i < fetchedScoresArr.length; i++) {
        let newScoreCard = buildScoreCardHTML(fetchedScoresArr[i], i)
        insertAfter(newScoreCard, divToInsertScores)
        divToInsertScores = newScoreCard
    }
}

/**
 * Build the card element for the question
 */
const buildScoreCardHTML = (scoreObj, index) => {
    const newOuterDiv = document.createElement("div")
    const newInnerDiv = document.createElement("div")
    newOuterDiv.appendChild(newInnerDiv)

    const newScoreUser = document.createElement("h3")
    newScoreUser.innerText = "Position: " + (index + 1) + "\n" + scoreObj.Username
    newScoreUser.style.color = "#920C15"
    newScoreUser.style.marginBottom = "0.1em"
    newInnerDiv.appendChild(newScoreUser)

    const newScoreText = document.createElement("p")
    newScoreText.style.marginBottom = "5px"
    newScoreText.innerHTML = "Score: " + scoreObj.TotalScore + " (" + scoreObj.PercentScore + "%)"
    newInnerDiv.appendChild(newScoreText)

    newOuterDiv.classList.add("card")
    newInnerDiv.classList.add("card-body")
    newScoreText.classList.add("form-control")

    newOuterDiv.style.marginBottom = "10px";

    return newOuterDiv
}

/**
 * Fetch scores array
 */
const fetchScores = async (selectedQuizID) => {
    const response = await fetch(getScoresEndpoint + `?quizzesID=${selectedQuizID}`);
    const scores = await response.json()

    if (scores.length > 0) {
        for (score of scores) {
            console.log(score)
            fetchedScoresArr.push(score)
        }
    }
}

/**
 * Entry point to the script
 */
const main = async () => {
    let selectedQuizID = localStorage.getItem("selectedQuiz")
    localStorage.clear()
    localStorage.setItem("selectedQuiz", "" + selectedQuizID)
    await fetchScores(selectedQuizID)
    renderScores()
}

main()
