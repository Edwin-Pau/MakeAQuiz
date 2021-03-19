const mysql = require("mysql")
const util = require('util');

/**
 * Pool object for our SQL database to make a connection to.
 */
const pool = mysql.createPool({
    host: 'un0jueuv2mam78uv.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    user: 'ow1rvzy3bkvqzfl1',
    password: 'v3o4g6fi0ed0uflh',
    database: 'foat0jtgfjw566fd'
})

// Promisifies our queries.
const query = util.promisify(pool.query).bind(pool)

/**
 * Object that holds all the query strings for creating the tables in the database.
 */
const createTableQueries = {
    createQuizzesTableQuery: [[
        'CREATE TABLE IF NOT EXISTS Quizzes',
        '(QuizzesID int AUTO_INCREMENT PRIMARY KEY,',
        'QuizTitle VARCHAR(511))'
    ].join(' '), 'Quizzes'],

    createQuestionsTableQuery: [[
        'CREATE TABLE IF NOT EXISTS Questions',
        '(QuestionsID INT AUTO_INCREMENT PRIMARY KEY,',
        'QuestionData VARCHAR(511),',
        'CorrectAnswer INT)'
    ].join(' '), 'Questions'],

    createAnswersTableQuery: [[
        'CREATE TABLE IF NOT EXISTS Answers',
        '(AnswersID INT AUTO_INCREMENT PRIMARY KEY,',
        'AnswerData VARCHAR(511),',
        'QuestionsID INT,',
        'FOREIGN KEY(QuestionsID) REFERENCES Questions(QuestionsID))'
    ].join(' '), 'Answers'],

    createQuizzesQuestionsBridgeTableQuery: [
    "CREATE TABLE IF NOT EXISTS QuizzesQuestions (" +
        "QuizzesQuestionsID INT AUTO_INCREMENT PRIMARY KEY," +
	    "QuizzesID INT," +
	    "QuestionsID INT," +
	    "FOREIGN KEY(QuizzesID) REFERENCES Quizzes(QuizzesID)," +
	    "FOREIGN KEY(QuestionsID) REFERENCES Questions(QuestionsID)" +
    ")", 'QuizzesQuestions'],

    createUsersTableQuery: [[
        'CREATE TABLE IF NOT EXISTS Users',
        '(UsersID int AUTO_INCREMENT PRIMARY KEY,',
        'Username VARCHAR(511))'
    ].join(' '), 'Users'],

    createScoresTableQuery: [
        "CREATE TABLE IF NOT EXISTS Scores (" +
            "ScoresID INT AUTO_INCREMENT PRIMARY KEY," +
            "UsersID INT," +
            "QuizzesID INT," +
            "TotalScore INT," +
            "FOREIGN KEY(UsersID) REFERENCES Users(UsersID)," +
            "FOREIGN KEY(QuizzesID) REFERENCES Quizzes(QuizzesID)" +
        ")", 'Scores'],
}

/**
 * Quiz object contains methods to query our tables in the database.
 */
const readWriteQuiz = {
    /**
     * Creates new tables the first time the database is initialized.
     */
    createTables: () => {
        pool.getConnection((err, con) => {
            if (err) throw err
                        
            for (const [queryKey, queryValue] of Object.entries(createTableQueries)) {
                con.query(queryValue[0], (err, result) => {
                    if (err) throw err
                    else console.log(`${queryValue[1]} table created.`)
                })
            }

            con.release(err => {
                if (err) throw err
                console.log('Closed database connection.')
            })
        })
    },

    /**
     * Queries a table in the database and returns an array of rows.
     */
    select: async (selectQuery) => {
        try {
            const rows = await query(selectQuery)
            return rows
        } catch(err) {
            console.log(err)
            throw err
        }
    },

    /**
     * Inserts new data into a table.
     */
    insert: async (tableName, columns, values) => {
        try {
            // columns: should receive a string such as "(name, score)"
            // values: should correspond to the columns such as "'edwin', 100"

            const insertQuery = `INSERT INTO ${tableName} (${columns}) VALUES (${values})`
            const rows = await query(insertQuery)
            console.log(`Inserted new record ${values} for columns ${columns} into ${tableName} table.`)
            return rows
        } catch(err) {
            console.log(err)
            throw err
        }
    },

    /**
     * Deletes rows in a table.
     */
    delete: async (tableName, condition) => {
        try {
            const deleteQuery = `DELETE FROM ${tableName} ${condition}`
            const rows = await query(deleteQuery)
            console.log(`Deleted ${rows.affectedRows} row(s).`)
            return rows
        } catch(err) {
            console.log(err)
            throw err
        }
    },
}

// Tests:

// 1) First create all the tables. Only need to do this once.
// Quiz.createTables()

// 2) Insert
// Quiz.insert("Answers", "AnswersData", "Answer A")

// 3) Select
// let result = await Quiz.select("SELECT * FROM Answers")

// readWriteQuiz.createTables()

module.exports.readWriteQuiz = readWriteQuiz
