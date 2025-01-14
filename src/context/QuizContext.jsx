/* eslint-disable react/prop-types */
// Import necessary hooks and utilities
import { createContext, useContext, useEffect, useState } from "react";
import { fetchQuestions } from "../utils/api";

// Create a context to provide quiz-related state and actions
const QuizContext = createContext();

// QuizProvider component to wrap around other components and provide quiz state and actions
export const QuizProvider = ({ children }) => {
  
  // State for quiz questions, initially populated from localStorage or an empty array
  const [questions, setQuestions] = useState(() => {
    const storedQuestions = localStorage.getItem("customQuiz");
    return storedQuestions ? JSON.parse(storedQuestions) : [];
  });

  // State for score, initially populated from localStorage or 0
  const [score, setScore] = useState(() => {
    const storedScore = localStorage.getItem("score");
    return storedScore !== null ? JSON.parse(storedScore) : 0;
  });

  // State for user answers, initially populated from localStorage or an empty array
  const [userAnswers, setUserAnswers] = useState(() => {
    const storedAnswers = localStorage.getItem("userAnswers");
    return storedAnswers ? JSON.parse(storedAnswers) : [];
  });

  // State for the current question index, initially populated from localStorage or 0
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(() => {
    const storedIndex = localStorage.getItem("currentQuestionIndex");
    return storedIndex !== null ? JSON.parse(storedIndex) : 0;
  });

  // State for tracking whether the quiz is completed, initially populated from localStorage or false
  const [isCompleted, setIsCompleted] = useState(() => {
    const storedCompleted = localStorage.getItem("isCompleted");
    return storedCompleted !== null ? JSON.parse(storedCompleted) : false;
  });

  // Calculate total score based on user answers and correct answers
  const totalScore = questions.reduce((total, question, index) => {
    return total + (question.correct_answer === userAnswers[index] ? 1 : 0);
  }, 0);

  // Persist the score in localStorage when it changes
  useEffect(() => {
    localStorage.setItem("score", JSON.stringify(score));
  }, [score]);

  // Persist the user answers in localStorage when they change
  useEffect(() => {
    localStorage.setItem("userAnswers", JSON.stringify(userAnswers));
  }, [userAnswers]);

  // Persist the current question index in localStorage when it changes
  useEffect(() => {
    localStorage.setItem("currentQuestionIndex", JSON.stringify(currentQuestionIndex));
  }, [currentQuestionIndex]);

  // Persist the completion status in localStorage when it changes
  useEffect(() => {
    localStorage.setItem("isCompleted", JSON.stringify(isCompleted));
  }, [isCompleted]);

  // Fetch custom quiz questions and store them in state and localStorage
  const computeCustomQuiz = async () => {
    try {
      const fetchedQuestions = await fetchQuestions();
      setQuestions(fetchedQuestions);
      localStorage.setItem("customQuiz", JSON.stringify(fetchedQuestions));
    } catch (error) {
      console.error("Failed to fetch questions:", error);
      alert("Failed to load the quiz. Please try again.");
    }
  };

  // Add score to the current score value
  const addScore = (value) => {
    const newScore = score + value;
    setScore(newScore);
  };

  // Save the custom quiz questions in localStorage and update state
  const saveCustomQuiz = (customQuiz) => {
    localStorage.setItem("customQuiz", JSON.stringify(customQuiz));
    setQuestions(customQuiz);
  };

  // Handle the user's answer for the current question
  const handleAnswer = (answer) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestionIndex] = answer;
    setUserAnswers(updatedAnswers);
  };

  // Move to the next question, or mark quiz as completed if it's the last question
  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      setIsCompleted(true);
    }
  };

  // Move to the previous question
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    }
  };

  // Reset all quiz data in state and localStorage
  const resetQuizData = () => {
    // Clear localStorage
    localStorage.removeItem("customQuiz");
    localStorage.removeItem("userAnswers");
    localStorage.removeItem("currentQuestionIndex");
    localStorage.removeItem("isCompleted");
    localStorage.removeItem("score");
    
    // Reset state to initial values
    setQuestions([]);
    setUserAnswers([]);
    setCurrentQuestionIndex(0);
    setIsCompleted(false);
    setScore(0);
  };

  return (
    // Provide quiz state and actions to child components
    <QuizContext.Provider
      value={{
        questions,
        setQuestions,
        score,
        addScore,
        saveCustomQuiz,
        handleAnswer,
        handleNext,
        handlePrevious,
        isCompleted,
        userAnswers,
        currentQuestionIndex,
        computeCustomQuiz,
        totalScore,
        resetQuizData
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

// Custom hook to access quiz context in other components
export const useQuiz = () => useContext(QuizContext);
