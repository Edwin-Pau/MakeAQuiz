/**
 * Maps a number to a letter for the MC answer and vice versa
 */
const letterMapper = {
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
 * Array that contains key words to highlight
 */
const keywordsArr = ["let", "var", "const", "for", "{", "}", "(", ")", "+", "-", "*", "/", "="]

const main = () => {
    const msg_notSupported = "Web Storage is not supported in this environment.";
    const msg_error = "There are no questions created for the quiz yet, please visit the Admin page to create questions first."

    if (typeof (Storage) == "undefined") {
        document.getElementById("questionsStud").innerHTML = msg_notSupported
        window.stop();
    }

    if (localStorage.length == 0 ){
        alert(msg_error);
    } else{
        numOfQuestions = localStorage.length;
        questions = [];
        numOfCorrectAnswer = 0;

        for (let i=0; i<numOfQuestions; i++){
            let vname = i + 1;
            questions[i] = JSON.parse(localStorage.getItem(vname));

            let qDiv = document.createElement("div");
            qDiv.setAttribute("id", vname);
            qDiv.classList.add("card");
            qDiv.style.margin = "0.5em";
            document.getElementById("questionsStud").appendChild(qDiv);

            let pTitle = document.createElement("p");
            pTitle.innerHTML = "Question " + (i + 1);
            pTitle.style.color = "#920C15";
            pTitle.style.marginTop = "0.5em";
            pTitle.style.marginBottom = "0.5em";
            pTitle.style.marginLeft = "1em";
            pTitle.style.fontWeight = "bold";
            document.getElementById(vname).appendChild(pTitle);

            let pQuestion = document.createElement("p");
            let pQuestionRaw = questions[i].question;
            
            pQuestionRaw = pQuestionRaw.replace(/(let|var|const|for|{|}|\(|\)|\+|\-|\*|\/|\=")/g, 
                           `<span class="key-words">$1</span>`)

            pQuestionRaw = "<pre>" + pQuestionRaw + "</pre>"

            pQuestion.innerHTML = pQuestionRaw
            pQuestion.readOnly = "true";
            pQuestion.classList.add("form-control");
            pQuestion.style.marginTop = "0.5em";
            pQuestion.style.marginBottom = "0.5em";
            pQuestion.style.marginLeft = "1em";
            pQuestion.style.height = "auto";
            pQuestion.style.width = "auto";
            pQuestion.style.minHeight = "20px";
            document.getElementById(vname).appendChild(pQuestion);

            let pAnsTitle = document.createElement("p");
            pAnsTitle.innerHTML = "Answers*";
            pAnsTitle.style.marginTop = "0.5em";
            pAnsTitle.style.marginBottom = "0.5em";
            pAnsTitle.style.marginLeft = "1em";
            pAnsTitle.style.fontWeight = "bold";
            document.getElementById(vname).appendChild(pAnsTitle);
            
            let divAns = [];
            let radioAns = [];
            let selection = [];
            
            for (let j=0; j<4; j++){
                divAns[j] = document.createElement("div");
                divAns[j].style.height = "auto"
                radioAns[j] = document.createElement("input");
                selection[j] = document.createElement("div");

                divAns[j].classList.add("form-group");
                divAns[j].classList.add("row");

                radioAns[j].setAttribute("type", "radio");
                radioAns[j].setAttribute("name", "question"+i);
                radioAns[j].setAttribute("id", "question"+i+"radio"+j);
                radioAns[j].classList.add("col-sm-1");
                radioAns[j].classList.add("col-form-label");
                radioAns[j].classList.add("col-form-label-sm");
                radioAns[j].style.marginTop = "0.9em"
                radioAns[j].style.marginLeft = "1em"

                answerCoverter = {0:'a', 1: 'b', 2: 'c', 3: 'd'};
                selection[j].readOnly = "true";
                selection[j].innerHTML = "<pre>" + questions[i].answers[answerCoverter[j]] + "</pre>";
                selection[j].style.height = "auto"
                selection[j].setAttribute("id", "question"+i+""+j);
                selection[j].classList.add("form-control");
                selection[j].classList.add("col-sm-6");


                divAns[j].appendChild(radioAns[j]);
                divAns[j].appendChild(selection[j]);
                document.getElementById(vname).appendChild(divAns[j]);
            }
        }
    }
}

main()

function checkAnswer(questionKey){
    let questionJson = localStorage.getItem(questionKey + 1)
    let questionObj = JSON.parse(questionJson)
    let correctAnswer = questionObj.correctAnswer
    let userAnswer = null

    for (let i = 0; i < 4; i++) {
        if (document.getElementById("question"+questionKey+"radio"+i).checked) {
            userAnswer = letterMapper[i]
        }
    }

    for (let i = 0; i < 4; i++) {
        if (letterMapper[userAnswer] === i) {
            document.getElementById("question"+questionKey+i).style.color = "white"
            document.getElementById("question"+questionKey+i).style.backgroundColor = "#CA4646"
            document.getElementById("question"+questionKey+i).style.fontWeight = "bold"
        }

        if (letterMapper[correctAnswer] === i) {
            document.getElementById("question"+questionKey+i).style.color = "white"
            document.getElementById("question"+questionKey+i).style.backgroundColor = "#28A745"
            document.getElementById("question"+questionKey+i).style.fontWeight = "bold"
        } 
    }

    if (correctAnswer === userAnswer && correctAnswer !== null) {
        return true
    }
    return false
}

function lockAnswers() {
    for (let i = 0; i < localStorage.length; i++) {
        for (let j=0; j<4;j++){
            document.getElementById("question"+i+"radio"+j).setAttribute("disabled", "disabled");
        }
    }
}

function submit(){
    const numOfQuestions = localStorage.length
    let numOfCorrectAnswer = 0
    let scorePercentage = 0
    let testResult = ""

    if (numOfQuestions === 0) {
        return
    }

    lockAnswers()
    for (let i = 0; i < localStorage.length; i++) {
        if (checkAnswer(i)) {
            numOfCorrectAnswer++
        }
    }

    scorePercentage = Math.round((numOfCorrectAnswer / numOfQuestions) * 100)
    testResult = "Score: " + numOfCorrectAnswer +"/" + numOfQuestions + " (" + scorePercentage + "%)"
    document.getElementById("testResult").innerHTML = testResult;
}
