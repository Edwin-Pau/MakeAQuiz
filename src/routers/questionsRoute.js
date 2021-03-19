const { readWriteQuiz } = require('../utils/quizDB')
const { collectRequestData } = require('../utils/collectRequestData')

const createQuestion = (query, req, res) => {
    try {
        collectRequestData(req, async (bodyObj) => {
            let columns = "QuestionData"
            let values = `'${bodyObj.questionData}'`

            if (bodyObj.correctAnswer) {
                columns = "QuestionData, CorrectAnswer"
                values = `'${bodyObj.questionData}', '${bodyObj.correctAnswer}'`
            }

            const rowQuestions = await readWriteQuiz.insert(
                "Questions", 
                columns, 
                values
            )

            const rowQuizzesQuestions = await readWriteQuiz.insert(
                "QuizzesQuestions", 
                "QuizzesID, QuestionsID", 
                `${bodyObj.quizzesID}, ${rowQuestions.insertId}`
            )
            
            let responseObj = {
                questionsID: rowQuestions.insertId
            }

            res.end(JSON.stringify(responseObj));
        })
    } catch (err) {
        console.log(err)
        res.writeHead(404, {"Content-Type": "text/html"})
        return res.end("500 Server error! Cannot create new quiz!")
    }
}

const deleteQuestions = (query, req, res) => {
    try {
        collectRequestData(req, async (bodyObj) => {
            const rowQuizzesQuestions = await readWriteQuiz.delete(
                "QuizzesQuestions", 
                `WHERE QuestionsID = ${bodyObj.questionsID}`
            )

            const rowQuestions = await readWriteQuiz.delete(
                "Questions", 
                `WHERE QuestionsID = ${bodyObj.questionsID}`
            )

            res.end(`200 OK Deleted question with ID ${bodyObj.questionsID}!`);
        })
    } catch (err) {
        console.log(err)
        res.writeHead(404, {"Content-Type": "text/html"})
        return res.end("500 Server error! Cannot create new quiz!")
    }
}

const getQuestions = async (query, req, res) => {
    try {
        selectQuery = 
        "SELECT * " +
        "FROM QuizzesQuestions " +
        "INNER JOIN Questions " +
        "ON QuizzesQuestions.QuestionsID = Questions.QuestionsID " +
        `WHERE QuizzesQuestions.QuizzesID = ${query.query.quizzesID} `

        const results = await readWriteQuiz.select(selectQuery)
        const jsonResults = JSON.stringify(results)
        console.log(jsonResults)

        return res.end(jsonResults)
    } catch (err) {
        console.log(err)
        res.writeHead(404, {"Content-Type": "text/html"})
        return res.end("500 Server error! Cannot get all quizzes!")
    }
}

const handleRequest = (query, req, res) => {
    if (req.method === "POST") {
        createQuestion(query, req, res)
    }

    else if (req.method === "GET") {
        getQuestions(query, req, res)
    }

    else if (req.method === "PUT") {
        deleteQuestions(query, req, res)
    }
}

module.exports.handleRequest = handleRequest
