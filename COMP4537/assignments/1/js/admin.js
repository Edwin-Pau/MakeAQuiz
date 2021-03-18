/**
 * Script variables
 */
let divToInsertQuestions = document.getElementById("insert-questions")
let currentQuestionNum = localStorage.length + 1

/**
 * Maps a number to a letter for the MC answer and vice versa
 */
let letterMapper = {
    0: "a",
    1: "b",
    2: "c",
    3: "d",
    "a": 0,
    "b": 1,
    "c": 2,
    "d": 3
}

/**
 * Helper functions
 */
const insertAfter = (newNode, existingNode) => {
    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling)
}


const setAnswers = (questionObj, answersArr) => {
    if (answersArr.length !== 4) {
        console.log("Warning: answersArr should only have four answer strings!")
    }
    questionObj.answers['a'] = answersArr[0]
    questionObj.answers['b'] = answersArr[1]
    questionObj.answers['c'] = answersArr[2]
    questionObj.answers['d'] = answersArr[3]
}

/**
 * Build the card element for the question
 */
const buildQuestionCardHTML = (questionObj) => {
    const newOuterDiv = document.createElement("div")
    const newInnerDiv = document.createElement("div")
    newOuterDiv.appendChild(newInnerDiv)

    const newQuestionTitle = document.createElement("h3")
    newQuestionTitle.innerText = "Question " + questionObj.questionNumber
    newQuestionTitle.style.color = "#920C15"
    newQuestionTitle.style.fontWeight = "bold";
    newQuestionTitle.style.marginBottom = "0.5em"
    newInnerDiv.appendChild(newQuestionTitle)

    const newTextArea = document.createElement("textarea")
    newTextArea.style.marginBottom = "1em"
    newTextArea.innerHTML = questionObj.question
    newInnerDiv.appendChild(newTextArea)

    newOuterDiv.classList.add("card")
    newInnerDiv.classList.add("card-body")
    newTextArea.classList.add("form-control")

    newOuterDiv.style.marginBottom = "1em";

    return newOuterDiv
}

 /**
  * Build the answer elements
  */
 const buildAnswerElementsHTML = (cardOuterDiv, questionObj) => {

    const newForm = document.createElement("form")

    for (i = 0; i < 4; i++) {
        const newDiv = document.createElement("div")
        newDiv.classList.add("form-group")
        newDiv.classList.add("row")

        // Build the radio button
        const newRadio = document.createElement("INPUT")
        newRadio.classList.add("col-sm-1")
        newRadio.classList.add("col-form-label")
        newRadio.classList.add("col-form-label-sm")
        newRadio.setAttribute("type", "radio")
        newRadio.setAttribute("name", "radioQuestion" + currentQuestionNum)
        newRadio.style.marginTop = "0.9em"
        newDiv.appendChild(newRadio)

        if (letterMapper[questionObj.correctAnswer] === i) {
            newRadio.checked = true
        }
        
        // Build the answer text area
        const newTextarea = document.createElement("textarea")
        newTextarea.classList.add("form-control")
        newTextarea.classList.add("col-sm-6")
        newTextarea.style.height = "2.5em"
        newTextarea.setAttribute("type", "text")
        newTextarea.value = questionObj.answers[letterMapper[i]]
        newDiv.appendChild(newTextarea)

        // Attach everything to the form
        newForm.appendChild(newDiv)
    }
    cardOuterDiv.childNodes[0].appendChild(newForm)
 }

/**
 * Use the above two functions to build one entire question element
 */
const buildMultipleChoiceQuestionHTML = (questionObj) => {
    const newQuestionCard = buildQuestionCardHTML(questionObj)
    buildAnswerElementsHTML(newQuestionCard, questionObj)
    divToInsertQuestions.appendChild(newQuestionCard)
}

/**
 * Save all user input from question fields into local storage
 */
const saveMultipleChoiceQuestions = () => {
    const questionsArr = []
    const answersArr = []
    const correctAnswersArr = []

    const questions = document.querySelectorAll(".card-body > textarea")
    questions.forEach((question) => {
        questionsArr.push(question.value)
    })

    const answerForms = document.querySelectorAll(".card-body > form")
    answerForms.forEach((form) => {
        let correctAnswer = null
        const answersTextArr = []

        const answersCorrectChoice = form.querySelectorAll("div > input.col-form-label")
        answersCorrectChoice.forEach((answer, i) => {
            if (answer.checked) {
                correctAnswer = letterMapper[i]
            }
        })

        const answersText = form.querySelectorAll("div > textarea")
        answersText.forEach((answer) => {
            answersTextArr.push(answer.value)
        })

        correctAnswersArr.push(correctAnswer)
        answersArr.push(answersTextArr)
    })

    if ((questionsArr.length !== answersArr.length) || (questionsArr.length !== correctAnswersArr.length)) {
        console.log("ERROR: Array sizes do not match!")
        return
    }

    for (let i = 0; i < questionsArr.length; i++) {
        const questionJson = window.localStorage.getItem(i + 1)
        const questionObj = JSON.parse(questionJson)
        questionObj.questionNumber = i + 1
        questionObj.question = questionsArr[i]
        questionObj.correctAnswer = correctAnswersArr[i]
        setAnswers(questionObj, answersArr[i])

        localStorage.setItem(i + 1, JSON.stringify(questionObj))
    }
}

/**
 * Event handlers for button clicks
 */
const addButtonEventHandler = () => {
    console.log("Creating a new multiple choice question...")
    question = new MultipleChoiceQuestion()
    question.questionNumber = currentQuestionNum
    localStorage.setItem(currentQuestionNum, JSON.stringify(question))
    buildMultipleChoiceQuestionHTML(question)
    currentQuestionNum++
}

const displaySavedMessage = () => {
    const divToInsertMessage = document.getElementById("delete-button")
    const savedMessage = document.createElement("div")
    const date = new Date()

    savedMessage.classList.add("alert")
    savedMessage.classList.add("alert-primary")
    savedMessage.classList.add("w-50")
    savedMessage.classList.add("p-2")
    savedMessage.setAttribute("role", "alert")
    savedMessage.style.fontSize = "0.9em"
    savedMessage.innerHTML = `Last saved on ${date}`

    insertAfter(savedMessage, divToInsertMessage)
    setTimeout(() => {
        savedMessage.remove()
    }, 2000)
}

const saveButtonEventHandler = () => {
    console.log("Saving all multiple choice questions...")
    saveMultipleChoiceQuestions()
    displaySavedMessage()
}

const deleteButtonEventHandler = () => {
    if (localStorage.length > 0) {
        console.log("Deleting the last multiple choice question...")
        saveMultipleChoiceQuestions()

        localStorage.removeItem(currentQuestionNum - 1)

        if (currentQuestionNum > 1) {
            currentQuestionNum--
        }

        const parentNode = document.getElementById("insert-questions")
        parentNode.innerHTML = ""

        renderQuestions()
    }
}

/**
 * Render existing objects from local storage
 */
const renderQuestions = () => {
    for (let i = 0; i < localStorage.length; i++) {
        questionJson = localStorage.getItem(i + 1)
        questionObj = JSON.parse(questionJson)
        buildMultipleChoiceQuestionHTML(questionObj)
    }
}

/**
 * Attach event handlers
 */
const addButtonListeners = () => {
    document.getElementById("add-button").addEventListener("click", addButtonEventHandler)
    document.getElementById("save-button").addEventListener("click", saveButtonEventHandler)
    document.getElementById("delete-button").addEventListener("click", deleteButtonEventHandler)
}

/**
 * Entry point to the script
 */
const main = () => {
    addButtonListeners()
    renderQuestions()
    setInterval(saveButtonEventHandler, 2000)
}

main()
