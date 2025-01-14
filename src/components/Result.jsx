/* eslint-disable react/prop-types */

// Import the custom hook to access quiz context
import { useQuiz } from "../context/QuizContext";

// Result component to display the user's score and answers to the quiz questions
const Result = ({ questions, userAnswers }) => {
  // Destructure totalScore from the quiz context
  const { totalScore } = useQuiz();

  return (
    <div className="space-y-4 px-4 sm:px-6 md:px-8">
      {/* Display the total score and total number of questions */}
      <h2 className="text-2xl font-semibold text-gray-800 text-center sm:text-left">
        Your Score: {totalScore}/{questions.length}
      </h2>
      
      {/* List all questions and the user's answers */}
      <ul className="space-y-3 mt-4">
        {questions.map((question, index) => (
          <li key={index} className="p-4 bg-gray-50 rounded-md shadow-sm">
            {/* Display the question */}
            <strong className="text-gray-700">Q:</strong> {question.question}
            <br />
            {/* Display the user's answer */}
            <strong className="text-gray-600">Your Answer:</strong> {userAnswers[index]}
            <br />
            {/* Display the correct answer */}
            <strong className="text-green-500">Correct Answer:</strong> {question.correct_answer}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Result;
