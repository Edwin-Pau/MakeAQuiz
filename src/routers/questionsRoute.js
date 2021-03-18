const { readWriteQuiz } = require('../utils/quizDB')
const { collectRequestData } = require('../utils/collectRequestData')

const createQuestion = (query, req, res) => {
    try {
        collectRequestData(req, async (bodyObj) => {
            const rowQuestions = await readWriteQuiz.insert("Questions", "QuestionData", `"${bodyObj.questionData}"`)

            const rowQuizzesQuestions = await readWriteQuiz.insert(
                "QuizzesQuestions", 
                "QuizzesID, QuestionsID", 
                `${bodyObj.quizzesID}, ${rowQuestions.insertId}`
            )

            res.end(`200 OK Created new question with data ${bodyObj.questionData}!`);
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
}

module.exports.handleRequest = handleRequest
