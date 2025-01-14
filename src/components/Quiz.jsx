// Import necessary components and hooks
import Question from './Question';
import Result from './Result';
import { useQuiz } from '../context/QuizContext'; // Custom hook to access the quiz context
import { useNavigate } from 'react-router-dom'; // Hook for navigation between pages

const Quiz = () => {
  const navigate = useNavigate(); // Initialize navigation hook
  // Destructure necessary values and functions from the quiz context
  const { 
    questions, 
    handleAnswer, 
    handleNext, 
    handlePrevious, 
    isCompleted, 
    userAnswers, 
    currentQuestionIndex,
    resetQuizData
  } = useQuiz();

  // Function to handle quitting the quiz and resetting all data
  const handleQuitQuiz = () => {
    resetQuizData(); // Reset quiz data in context and localStorage
    navigate("/"); // Navigate to the home page ("/")
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md sm:px-4 lg:px-6 xl:px-8">
      {/* Conditional rendering based on whether the quiz is completed */}
      {isCompleted ? (
        // Display the Result component once the quiz is completed
        <Result questions={questions} userAnswers={userAnswers} />
      ) : questions.length > 0 ? (
        <>
          {/* Display the current question */}
          <Question
            question={questions[currentQuestionIndex]} // Pass the current question
            onAnswer={handleAnswer} // Handle the user's answer selection
            currentAnswer={userAnswers[currentQuestionIndex]} // Show the current answer selected by the user
          />
          {/* Buttons to navigate between questions */}
          <div className="flex justify-between mt-6 space-x-4">
            {/* 'Previous' button */}
            <button
              onClick={handlePrevious} // Call the handlePrevious function
              disabled={currentQuestionIndex === 0} // Disable if it's the first question
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md disabled:opacity-50"
            >
              Previous
            </button>
            {/* 'Next' or 'Submit' button */}
            <button
              onClick={handleNext} // Call the handleNext function
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              {currentQuestionIndex === questions.length - 1 ? 'Submit' : 'Next'} {/* Conditional label */}
            </button>
          </div>
        </>
      ) : (
        // Display loading message if questions are not yet loaded
        <p className="text-center text-gray-500">Loading questions...</p>
      )}
      {/* 'Quit Quiz' button */}
      <div className="flex items-center justify-center mt-6">
        <button 
          className='px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-800' 
          onClick={handleQuitQuiz} // Call the handleQuitQuiz function
        >
          Quit Quiz
        </button>
      </div>
    </div>
  );
};

export default Quiz;
