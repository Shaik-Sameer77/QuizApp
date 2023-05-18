import React, { useState, useEffect } from "react";
import "./QuizApp.css"

const QuizApp = () => {
  const questionsData = [
    {
      question: "What is the capital of France?",
      options: ["A. Paris",
        "B. Rome",
        "C. London",
        "D. Berlin"],
      correctAnswer: "A. Paris",
    },
    {
      question: "What is the name of the tallest mountain in the world?",
      options: ["A. Mount Everest",
        "B. K2",
        "C. Kangchenjunga",
        "D. Kilimanjaro"],
      correctAnswer: "A. Mount Everest",
    },
    {
      question: "Who is the current president of the United States?",
      options: ["A. Barack Obama",
      "B. Donald Trump",
      "C. Joe Biden",
      "D. Hillary Clinton"],
      correctAnswer: "C. Joe Biden",
    },
    {
      question: "Question 2",
      options: [1, 2, 3, 4],
      correctAnswer: 2,
    },
    {
      question: "Question 1",
      options: ["hi", 2, 3, 4],
      correctAnswer: "hi",
    },
    {
      question: "Question 2",
      options: [1, 2, 3, 4],
      correctAnswer: 2,
    },
    {
      question: "Question 1",
      options: ["hi", 2, 3, 4],
      correctAnswer: "hi",
    },
    {
      question: "Question 2",
      options: [1, 2, 3, 4],
      correctAnswer: 2,
    },
    {
      question: "Question 1",
      options: ["hi", 2, 3, 4],
      correctAnswer: "hi",
    },
    {
      question: "Question 2",
      options: [1, 2, 3, 4],
      correctAnswer: 2,
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [score, setScore] = useState(0);
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    if (selectedOption !== "") {
      const currentQuestionData = questionsData[currentQuestion];
      if (selectedOption === currentQuestionData.correctAnswer) {
        setScore((prevScore) => prevScore + 2);
      }

      setSelectedOption("");
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    }
  };

  const handleSubmitQuiz = () => {
    if (selectedOption !== "") {
      const currentQuestionData = questionsData[currentQuestion];
      if (selectedOption === currentQuestionData.correctAnswer) {
        setScore((prevScore) => prevScore + 2);
      }
    }

    setIsQuizSubmitted(true);
  };

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedOption("");
    setIsQuizSubmitted(false);
    setTimeLeft(600);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    if (timeLeft === 0) {
      clearInterval(timer);
      setIsQuizSubmitted(true);
    }

    return () => {
      clearInterval(timer);
    };
  }, [timeLeft]);

  return (
    <div className="container">
      <h1>Quiz App</h1>
      {isQuizSubmitted ? (
        <div>
          <h2>Quiz Results</h2>
          <p>Your score: {score} / {questionsData.length * 2}</p>
          {score >= 12 ? (
            <p>Congratulations! You passed the quiz.</p>
          ) : (
            <p>Sorry, you failed the quiz.</p>
          )}
          <button onClick={handleRestartQuiz}>Restart Quiz</button>
        </div>
      ) : (
        <div>
          <h2>Question {currentQuestion + 1}</h2>
          <p>{questionsData[currentQuestion].question}</p>
          <ul>
            {questionsData[currentQuestion].options.map((option, index) => (
              <li key={index}>
                <label>
                  <input
                    type="radio"
                    name="option"
                    value={option}
                    checked={selectedOption === option}
                    onChange={() => handleOptionSelect(option)}
                  />
                  {option}
                </label>
              </li>
            ))}
          </ul>
          {currentQuestion === questionsData.length - 1 ? (
            <button onClick={handleSubmitQuiz}>Submit Quiz</button>
          ) : (
            <button onClick={handleNextQuestion}>Next</button>
          )}
          <div>
            <h3>Time Remaining: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizApp;
