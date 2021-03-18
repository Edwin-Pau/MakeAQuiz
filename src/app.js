const http = require("http")
const url = require("url")
const sf = require("./utils/serveFile")
const quizzesRoute = require("./routers/quizzesRoute")
const questionsRoute = require("./routers/questionsRoute")
const answersRoute = require("./routers/answersRoute")

// Global variables
const port = process.env.PORT || 8080

http.createServer((req, res) => {
    const query = url.parse(req.url, true)
    
    if (query.pathname.includes("/assignments/1/quizzes")) {
        quizzesRoute.handleRequest(query, req, res)
    }

    else if (query.pathname.includes("/assignments/1/questions")) {
        questionsRoute.handleRequest(query, req, res)
    }

    else if (query.pathname.includes("/assignments/1/answers")) {
        answersRoute.handleRequest(query, req, res)
    }

    else {
        sf.serveFile(query, req, res)
    }

}).listen(port, () => {
    console.log('Server is up on port ' + port + "\n")
})
