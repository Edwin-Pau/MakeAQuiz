const { readWriteQuiz } = require('../utils/quizDB')
const { collectRequestData } = require('../utils/collectRequestData')

const createScore = (query, req, res) => {
    try {
        collectRequestData(req, async (bodyObj) => {
            let columns = "QuizzesID, Username, TotalScore, PercentScore"
            let values = `'${bodyObj.quizzesID}', '${bodyObj.username}', '${bodyObj.totalScore}', '${bodyObj.percentScore}'`

            const rowScores = await readWriteQuiz.insert(
                "Scores", 
                columns, 
                values
            )
            
            let responseObj = {
                scoresID: rowScores.insertId
            }

            res.end(JSON.stringify(responseObj));
        })
    } catch (err) {
        console.log(err)
        res.writeHead(404, {"Content-Type": "text/html"})
        return res.end("500 Server error! Cannot create new score!")
    }
}

const getScores = async (query, req, res) => {
    try {
        selectQuery = 
        "SELECT * " +
        "FROM Scores " +
        `WHERE QuizzesID = ${query.query.quizzesID} `

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
        createScore(query, req, res)
    }

    else if (req.method === "GET") {
        getScores(query, req, res)
    }
}

module.exports.handleRequest = handleRequest
