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
let divToInsertQuizzes = document.getElementById("insert-quizzes")

/**
 * Helper functions
 */
const insertAfter = (newNode, existingNode) => {
    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling)
}

/**
 * Build the card element for the quiz
 */
const buildQuizCardHTML = (quizObj) => {
    const newOuterDiv = document.createElement("div")
    const newInnerDiv = document.createElement("div")
    newOuterDiv.appendChild(newInnerDiv)

    const newQuizID = document.createElement("h3")
    newQuizID.innerText = "QuizzesID: " + quizObj.QuizzesID
    newQuizID.style.color = "#CA4646"
    newQuizID.style.fontWeight = "bold"
    newQuizID.style.marginBottom = "0.5em"
    newInnerDiv.appendChild(newQuizID)

    const newQuizTitle = document.createElement("h3")
    newQuizTitle.innerText = "QuizTitle: " + quizObj.QuizTitle
    newQuizTitle.style.color = "#CA4646"
    newQuizTitle.style.fontWeight = "bold"
    newInnerDiv.appendChild(newQuizTitle)

    newOuterDiv.classList.add("card")
    newOuterDiv.classList.add("quiz-card")
    newInnerDiv.classList.add("card-body")

    newOuterDiv.style.marginBottom = "1em";
    newOuterDiv.setAttribute("id", "" + quizObj.QuizzesID)
    newOuterDiv.style.borderRadius = "20px"
    return newOuterDiv
}

/**
 * Fetches all the quizzes using the GET endpoint
 */
const fetchQuizzes = async () => {
    const response = await fetch(getQuizzesEndpoint);
    const quizzes = await response.json();
    return quizzes;
}

/**
 * Event handler for selecting a quiz
 */
const quizSelectionEventHandler = (event) => {
    let target = event.currentTarget;
    console.log(target)
    let id = target.id
    console.log("Quiz selected: " + id)
    localStorage.setItem("selectedQuiz", "" + id)
    location.href = "./leaderboard.html";
}

/**
 * Attach event handlers
 */
const addCardClickListener = (quizCard) => {
    quizCard.addEventListener("click", quizSelectionEventHandler)
}

/**
 * Entry point to the script
 */
const main = async () => {
    localStorage.setItem("selectedQuiz", null)

    const quizzesArr = await fetchQuizzes()
    quizzesArr.forEach(quizObj => {
        const quizCard = buildQuizCardHTML(quizObj)
        divToInsertQuizzes.appendChild(quizCard)
        addCardClickListener(quizCard)
    })
}

main()
