-- --------------------------------------------------------
-- Host:                         un0jueuv2mam78uv.cbetxkdyhwsb.us-east-1.rds.amazonaws.com
-- Server version:               10.4.13-MariaDB-log - Source distribution
-- Server OS:                    Linux
-- HeidiSQL Version:             11.2.0.6213
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for foat0jtgfjw566fd
CREATE DATABASE IF NOT EXISTS `foat0jtgfjw566fd` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */;
USE `foat0jtgfjw566fd`;

-- Dumping structure for table foat0jtgfjw566fd.Answers
CREATE TABLE IF NOT EXISTS `Answers` (
  `AnswersID` int(11) NOT NULL AUTO_INCREMENT,
  `AnswerData` varchar(511) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `QuestionsID` int(11) DEFAULT NULL,
  PRIMARY KEY (`AnswersID`),
  KEY `QuestionsID` (`QuestionsID`),
  CONSTRAINT `Answers_ibfk_1` FOREIGN KEY (`QuestionsID`) REFERENCES `Questions` (`QuestionsID`)
) ENGINE=InnoDB AUTO_INCREMENT=93 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table foat0jtgfjw566fd.Answers: ~52 rows (approximately)
/*!40000 ALTER TABLE `Answers` DISABLE KEYS */;
INSERT INTO `Answers` (`AnswersID`, `AnswerData`, `QuestionsID`) VALUES
	(1, 'True', 1),
	(2, 'False', 1),
	(3, '', 1),
	(4, '', 1),
	(5, 'True', 2),
	(6, 'False', 2),
	(7, '', 2),
	(8, '', 2),
	(9, 'global variable', 3),
	(10, 'local variable', 3),
	(11, 'Both of the above.', 3),
	(12, 'None of the above.', 3),
	(13, 'indexOf()', 4),
	(14, 'join()', 4),
	(15, 'lastIndexOf()', 4),
	(16, 'map()', 4),
	(17, 'reverse()', 5),
	(18, 'shift()', 5),
	(19, 'slice()', 5),
	(20, 'some()', 5),
	(57, 'document.getElement(“geek”).innerHTML=”I am a Geek”;', 17),
	(58, 'document.getElementById(“geek”).innerHTML=”I am a Geek”;', 17),
	(59, 'document.getId(“geek”)=”I am a Geek”;', 17),
	(60, 'document.getElementById(“geek”).innerHTML=I am a Geek;', 17),
	(61, '“30”', 18),
	(62, ' 30', 18),
	(63, '5*6', 18),
	(64, '“5*6”', 18),
	(65, 'Client-side', 19),
	(66, 'Server-side', 19),
	(67, 'Local', 19),
	(68, 'Native', 19),
	(73, 'They help plants and flowers grow.', 21),
	(74, 'They keep other insects away from plants.', 21),
	(75, 'They pollinate flowers and plants and help them reproduce.', 21),
	(76, 'They rub off nutrients from one plant onto another.\n', 21),
	(77, 'Stigma', 22),
	(78, 'Pistil', 22),
	(79, 'Ovary', 22),
	(80, 'Stamen', 22),
	(81, 'By counting the number of rings in its trunk\n', 23),
	(82, 'By counting its leaves\n', 23),
	(83, 'By measuring its height\n', 23),
	(84, 'By counting its branches\n', 23),
	(85, 'So they\'re good for making potpourri\n', 24),
	(86, 'To attract birds and mammals\n', 24),
	(87, 'To repel insects and birds\n', 24),
	(88, 'To attract pollinators\n', 24),
	(89, 'A plant that will germinate, flower, and seed continuously through the year\n', 25),
	(90, 'A plant that will lose all of its leaves and flowers by winter, but stay alive\n', 25),
	(91, 'A plant that takes a year to fully mature\n', 25),
	(92, 'A plant that will germinate, flower, seed and then die all within one year\n', 25);
/*!40000 ALTER TABLE `Answers` ENABLE KEYS */;

-- Dumping structure for table foat0jtgfjw566fd.Questions
CREATE TABLE IF NOT EXISTS `Questions` (
  `QuestionsID` int(11) NOT NULL AUTO_INCREMENT,
  `QuestionData` varchar(511) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `CorrectAnswer` int(11) DEFAULT NULL,
  PRIMARY KEY (`QuestionsID`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table foat0jtgfjw566fd.Questions: ~13 rows (approximately)
/*!40000 ALTER TABLE `Questions` DISABLE KEYS */;
INSERT INTO `Questions` (`QuestionsID`, `QuestionData`, `CorrectAnswer`) VALUES
	(1, 'Can you access Cookie using JavaScript?', 0),
	(2, 'Can you pass a anonymous function as an argument to another function?', 0),
	(3, 'Which of the following type of variable is visible only within a function where it is defined?', 1),
	(4, 'Which of the following function of Array object returns the first (least) index of an element within the array equal to the specified value, or -1 if none is found?', 0),
	(5, 'Which of the following function of Array object returns true if at least one element in this array satisfies the provided testing function?', 3),
	(17, 'Choose the correct JavaScript syntax to change the content of the following HTML code.', 1),
	(18, 'var x=5; \nvar y=6; \nvar res=eval("x*y"); \ndocument.write(res); ', 1),
	(19, '_____ JavaScript statements embedded in an HTML page can respond to user events such as mouse-clicks, form input, and page navigation.', 0),
	(21, 'Why are honey bees so important to plants worldwide?\n', 2),
	(22, 'What are the "female" parts of a plant or flower called?', 1),
	(23, 'How can you tell how old a tree is?\n', 0),
	(24, 'What is the actual reason a plant or flower may smell so nice?\n', 3),
	(25, 'What is an annual plant?\n\n', 3);
/*!40000 ALTER TABLE `Questions` ENABLE KEYS */;

-- Dumping structure for table foat0jtgfjw566fd.Quizzes
CREATE TABLE IF NOT EXISTS `Quizzes` (
  `QuizzesID` int(11) NOT NULL AUTO_INCREMENT,
  `QuizTitle` varchar(511) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`QuizzesID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table foat0jtgfjw566fd.Quizzes: ~4 rows (approximately)
/*!40000 ALTER TABLE `Quizzes` DISABLE KEYS */;
INSERT INTO `Quizzes` (`QuizzesID`, `QuizTitle`) VALUES
	(1, 'Eddie\'s JavaScript Quiz'),
	(2, 'Web Developer Questions'),
	(4, 'Plant Quiz'),
	(5, 'Quiz 1');
/*!40000 ALTER TABLE `Quizzes` ENABLE KEYS */;

-- Dumping structure for table foat0jtgfjw566fd.QuizzesQuestions
CREATE TABLE IF NOT EXISTS `QuizzesQuestions` (
  `QuizzesQuestionsID` int(11) NOT NULL AUTO_INCREMENT,
  `QuizzesID` int(11) DEFAULT NULL,
  `QuestionsID` int(11) DEFAULT NULL,
  PRIMARY KEY (`QuizzesQuestionsID`),
  KEY `QuizzesID` (`QuizzesID`),
  KEY `QuestionsID` (`QuestionsID`),
  CONSTRAINT `QuizzesQuestions_ibfk_1` FOREIGN KEY (`QuizzesID`) REFERENCES `Quizzes` (`QuizzesID`),
  CONSTRAINT `QuizzesQuestions_ibfk_2` FOREIGN KEY (`QuestionsID`) REFERENCES `Questions` (`QuestionsID`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table foat0jtgfjw566fd.QuizzesQuestions: ~13 rows (approximately)
/*!40000 ALTER TABLE `QuizzesQuestions` DISABLE KEYS */;
INSERT INTO `QuizzesQuestions` (`QuizzesQuestionsID`, `QuizzesID`, `QuestionsID`) VALUES
	(1, 1, 1),
	(2, 1, 2),
	(3, 1, 3),
	(4, 1, 4),
	(5, 1, 5),
	(17, 2, 17),
	(18, 2, 18),
	(19, 2, 19),
	(21, 4, 21),
	(22, 4, 22),
	(23, 4, 23),
	(24, 4, 24),
	(25, 4, 25);
/*!40000 ALTER TABLE `QuizzesQuestions` ENABLE KEYS */;

-- Dumping structure for table foat0jtgfjw566fd.Scores
CREATE TABLE IF NOT EXISTS `Scores` (
  `ScoresID` int(11) NOT NULL AUTO_INCREMENT,
  `Username` varchar(511) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `UsersID` int(11) DEFAULT NULL,
  `QuizzesID` int(11) DEFAULT NULL,
  `TotalScore` int(11) DEFAULT NULL,
  `PercentScore` int(11) DEFAULT NULL,
  PRIMARY KEY (`ScoresID`),
  KEY `UsersID` (`UsersID`),
  KEY `QuizzesID` (`QuizzesID`),
  CONSTRAINT `Scores_ibfk_1` FOREIGN KEY (`UsersID`) REFERENCES `Users` (`UsersID`),
  CONSTRAINT `Scores_ibfk_2` FOREIGN KEY (`QuizzesID`) REFERENCES `Quizzes` (`QuizzesID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table foat0jtgfjw566fd.Scores: ~4 rows (approximately)
/*!40000 ALTER TABLE `Scores` DISABLE KEYS */;
INSERT INTO `Scores` (`ScoresID`, `Username`, `UsersID`, `QuizzesID`, `TotalScore`, `PercentScore`) VALUES
	(1, 'John', NULL, 1, 1, 20),
	(2, 'Eddie', NULL, 2, 3, 100),
	(3, '', NULL, 5, 0, 0),
	(4, '', NULL, 4, 3, 60);
/*!40000 ALTER TABLE `Scores` ENABLE KEYS */;

-- Dumping structure for table foat0jtgfjw566fd.Users
CREATE TABLE IF NOT EXISTS `Users` (
  `UsersID` int(11) NOT NULL AUTO_INCREMENT,
  `Username` varchar(511) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`UsersID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table foat0jtgfjw566fd.Users: ~0 rows (approximately)
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
