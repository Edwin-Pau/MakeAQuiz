# HTTP Request API Documentation

## Quizzes

Get all quizzes stored.
```
GET /COMP4537/assignments/1/quizzes
```

Example JSON API response:
```
[
    {
        "QuizzesID": 5,
        "QuizTitle": "New Quiz 2!"
    },
    {
        "QuizzesID": 6,
        "QuizTitle": "Best Quiz Ever 2!!!"
    }
]
```
<hr>
Create a new quiz.

```
POST /COMP4537/assignments/1/quizzes
```

Request body:
```
{
    quizTitle: "This is the quiz's title."
}
```

Example JSON API response:
```
"200 OK Created new quiz with title This is the quiz's title."
```
<hr>

## Questions

Get all questions for a specific quiz using quizzesID in the query string.
```
GET /COMP4537/assignments/1/questions?quizzesID=1
```

Example JSON API response:
```
[
    {
        "QuizzesQuestionsID": 8, 
        "QuizzesID": 6,
        "QuestionsID": 13,
        "QuestionData": "This is data for a question!"
    },
    {   
        "QuizzesQuestionsID": 9,
        "QuizzesID": 6,
        "QuestionsID": 14,
        "QuestionData": "This is data for a question!"
    }
]
```
<hr>
Create a new question for a quiz.

```
POST /COMP4537/assignments/1/questions
```

Request body:
```
{
    questionData: "This is the question's data",
    correctAnswer: 0
}
```

Example JSON API response:
```
"200 OK Created new question with data..."
```

## Answers

Get all answers for a specific question using questionsID in the query string.
```
GET /COMP4537/assignments/1/answers?questionsID=4
```

Example JSON API response:
```
[
    {
        "AnswersID": 2,
        "AnswerData": "This is the data for an answer.",
        "QuestionsID": 4
    },
    {
        "AnswersID": 3,
        "AnswerData": "This is the data for an answer.",
        "QuestionsID": 4
    }
]
```
<hr>
Create a new answer for a question.

```
POST /COMP4537/assignments/1/answers
```

Request body:
```
{
    answerData: "This is the data for an answer.",
    questionsID: 4
}
```

Example JSON API response:
```
"200 OK Created new question with data..."
```

## Scores

Get all scores for a specific quiz using quizzesID in the query string.
```
GET /COMP4537/assignments/1/scores?quizzesID=4
```

Example JSON API response:
```
[
    {
        "ScoresID": 2,
        "Username": "Eddie",
        "UsersID": 2, 
        "QuizzesID": 2,
        "TotalScore": 3,
        "PercentScore": 100
    }
]
```
<hr>
Create a new score for a quiz.

```
POST /COMP4537/assignments/1/scores
```

Request body:
```
{
    totalScore: 5,
    scorePercentage: 100
}
```

Example JSON API response:
```
"200 OK Created new question with data..."
```