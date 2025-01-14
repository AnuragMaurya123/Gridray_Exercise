import { useNavigate } from "react-router-dom"; // Import navigate hook for navigation
import { useQuiz } from "../context/QuizContext"; // Import the context to interact with quiz data

export default function Choice() {
  const { computeCustomQuiz } = useQuiz(); // Retrieve the computeCustomQuiz function from context
  const navigate = useNavigate(); // Hook to programmatically navigate to different routes

  // Function to handle fetching the quiz data and navigating to the quiz page
  const handleQuestionApi = async () => {
    try {
      // Call computeCustomQuiz to fetch quiz data
      await computeCustomQuiz(); 
      // Navigate to the quiz page after quiz data is successfully fetched
      navigate("/quiz");
    } catch (error) {
      // Catch and log any errors during the API call
      console.error("Error loading quiz data:", error);
    }
  };

  // Function to handle navigation to the "create quiz" page
  const handleCreateQuiz = () => {
    navigate("/createquiz"); // Navigate to the create quiz page
  };

  return (
    <div className="w-full max-w-md sm:max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      {/* Container for the buttons with a gap between them */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-5">
        
        {/* Button to start the computer-generated quiz */}
        <button
          className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 w-full sm:w-auto mb-4 sm:mb-0"
          onClick={handleQuestionApi} // Trigger handleQuestionApi on click
        >
          Computer Quiz
        </button>
        
        {/* Button to navigate to the create quiz page */}
        <button
          className="bg-yellow-400 text-black px-6 py-3 rounded-lg hover:bg-yellow-500 w-full sm:w-auto"
          onClick={handleCreateQuiz} // Trigger handleCreateQuiz on click
        >
          Create Quiz
        </button>
      </div>
    </div>
  );
}
