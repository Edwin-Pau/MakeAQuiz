const { readWriteQuiz } = require('../utils/quizDB')
const { collectRequestData } = require('../utils/collectRequestData')

const createAnswer = (query, req, res) => {
    try {
        collectRequestData(req, async (bodyObj) => {
            const rowAnswers = await readWriteQuiz.insert(
                "Answers",
                "AnswerData, QuestionsID", 
                `"${bodyObj.answerData}", ${bodyObj.questionsID}`)

            res.end(`200 OK Created new question with data "${bodyObj.answerData}".`);
        })
    } catch (err) {
        console.log(err)
        res.writeHead(404, {"Content-Type": "text/html"})
        return res.end("500 Server error! Cannot create new quiz!")
    }
}

const deleteAnswers = (query, req, res) => {
    try {
        collectRequestData(req, async (bodyObj) => {
            const rowAnswers = await readWriteQuiz.delete(
                "Answers", 
                `WHERE AnswersID = ${bodyObj.answersID}`
            )

            res.end(`200 OK Deleted answer with ID ${bodyObj.answersID}!`);
        })
    } catch (err) {
        console.log(err)
        res.writeHead(404, {"Content-Type": "text/html"})
        return res.end("500 Server error! Cannot create new quiz!")
    }
}

const getAnswers = async (query, req, res) => {
    try {
        selectQuery = 
        "SELECT * " +
        "FROM Answers " +
        `WHERE QuestionsID = ${query.query.questionsID} `

        const results = await readWriteQuiz.select(selectQuery)
        const jsonResults = JSON.stringify(results)
        console.log(jsonResults)

        return res.end(jsonResults)
    } catch (err) {
        console.log(err)
        res.writeHead(404, {"Content-Type": "text/html"})
        return res.end("500 Server error! Cannot get answers!")
    }
}

const handleRequest = (query, req, res) => {
    if (req.method === "POST") {
        createAnswer(query, req, res)
    }

    else if (req.method === "GET") {
        getAnswers(query, req, res)
    }

    else if (req.method === "PUT") {
        deleteAnswers(query, req, res)
    }
}

module.exports.handleRequest = handleRequest
