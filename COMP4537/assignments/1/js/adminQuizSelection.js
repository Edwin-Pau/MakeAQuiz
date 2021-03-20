/**
 * Endpoints
 */
const getQuestionsEndpoint = "http://https://assignment1-comp4537.herokuapp.com/COMP4537/assignments/1/questions"
const getAnswersEndpoint = "http://https://assignment1-comp4537.herokuapp.com/COMP4537/assignments/1/answers"
const getScoresEndpoint = "http://https://assignment1-comp4537.herokuapp.com/COMP4537/assignments/1/scores"
const getQuizzesEndpoint = "http://https://assignment1-comp4537.herokuapp.com/COMP4537/assignments/1/scores"

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

const createQuiz = async () => {
    const quizTitleInput = document.getElementById("quizTitleInput")

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    let urlencoded = new URLSearchParams();
    urlencoded.append("quizTitle", "" + quizTitleInput.value);

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    };

    const response = await fetch(getQuizzesEndpoint, requestOptions)

    return response
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
    location.href = "./admin.html";
}

const addButtonEventHandler = async () => {
    console.log("Creating a new quiz...")
    let response;
    try {
        response = await createQuiz()
    } catch(err) {
        console.log(err)
        throw err
    }
    
    let jsonResponse;
    if (response.ok) {
      jsonResponse = await response.json();
    } else {
      console.log("HTTP-Error: " + response.status);
    }

    console.log(jsonResponse)
    localStorage.setItem("selectedQuiz", "" + jsonResponse)
    location.href = "./admin.html";
}

/**
 * Attach event handlers
 */
const addCardClickListener = (quizCard) => {
    quizCard.addEventListener("click", quizSelectionEventHandler)
}

const addQuizClickListener = () => {
    document.getElementById("add-button").addEventListener("click", addButtonEventHandler)
}

/**
 * Entry point to the script
 */
const main = async () => {
    localStorage.clear()

    const quizzesArr = await fetchQuizzes()
    quizzesArr.forEach(quizObj => {
        const quizCard = buildQuizCardHTML(quizObj)
        divToInsertQuizzes.appendChild(quizCard)
        addCardClickListener(quizCard)
    })

    addQuizClickListener()
}

main()
