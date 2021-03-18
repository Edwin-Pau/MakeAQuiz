const fs = require('fs')
const path = require('path')

const serveFile = (query, req, res) => {
    let filename = "." + query.pathname
    let fileext = path.parse(query.pathname).ext

    if (query.pathname === "/") {
        filename = "/COMP4537/assignments/1/index.html"
    }

    fs.readFile("../" + filename, (err, data) => {
        try {
            let contentType = "text/html"

            if (fileext === ".css") {
                contentType = "text/css"
            }
            
            if (fileext === ".svg") {
                contentType = "image/svg+xml"
            } 

            if (fileext === ".txt") {
                contentType = "text/plain"
            }

            res.writeHead(200, {"Content-Type": `${contentType}`, "Access-Control-Allow-Origin": "*"})
            res.write(data)
            return res.end()
        } catch (err) {
            res.writeHead(404, {"Content-Type": "text/html"})
            return res.end("404 Not Found! " + query.pathname + " does not exist.")
        }
    })
}

const writeFile = (query, req, res, path = "./COMP4537/labs/4/readFile/", filename = "file.txt") => {
    try {
        console.log(`Writing to text file... "${query.query['text']}"`)
        
        const encoded = encodeURI(query.query['text']);
        console.log(encoded)

        fs.appendFile(path + filename, query.query['text'], (err) => { 
            if (err) { 
              console.log(err); 
            } 
            else { 
                // Get the file contents after the append operation 
                console.log("\nFile Contents of file after append:", 
                    fs.readFileSync(path + filename, "utf8")); 
            
                res.writeHead(200, {"Content-Type": "text/html", "Access-Control-Allow-Origin": "*"})
                res.write(`200 Successfully written text "${query.query['text']}" to text file.`)
                return res.end()
            } 
          })
        
    } catch (err) {
        res.writeHead(404, {"Content-Type": "text/html"})
        return res.end("500 Server Error! An internal server error has occurred.")
    }
}

module.exports.serveFile = serveFile
module.exports.writeFile = writeFile
