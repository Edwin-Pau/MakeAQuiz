const { readWriteQuiz } = require('../utils/quizDB')
const { collectRequestData } = require('../utils/collectRequestData')

const createQuiz = (query, req, res) => {
    try {
        collectRequestData(req, async (bodyObj) => {
            await readWriteQuiz.insert("Quizzes", "QuizTitle", `"${bodyObj.quizTitle}"`)
            res.end(`200 OK Created new quiz with title ${bodyObj.quizTitle}!`);
        })
    } catch (err) {
        console.log(err)
        res.writeHead(404, {"Content-Type": "text/html"})
        return res.end("500 Server error! Cannot create new quiz!")
    }
}

const getQuizzes = async (query, req, res) => {
    try {
        const results = await readWriteQuiz.select("SELECT * FROM Quizzes")
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
        createQuiz(query, req, res)
    }

    else if (req.method === "GET") {
        getQuizzes(query, req, res)
    }
}

module.exports.handleRequest = handleRequest
