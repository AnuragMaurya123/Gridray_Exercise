// Import necessary libraries and components
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QuizProvider } from "./context/QuizContext";
import CreateQuiz from "./components/CreateQuiz";
import Quiz from "./components/Quiz";
import Choice from "./components/Choice";

function App() {
  return (
    // Wrap the application with QuizProvider to share quiz-related state across components
    <QuizProvider>
      <Router>
        {/* Main container */}
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 sm:px-6 md:px-8">
          {/* Define routes for different pages */}
          <Routes>
            {/* Home page */}
            <Route path="/" element={<Choice />} />

            {/* Quiz page */}
            <Route path="/quiz" element={<Quiz />} />

            {/* Create quiz page */}
            <Route path="/createquiz" element={<CreateQuiz />} />
          </Routes>
        </div>
      </Router>
    </QuizProvider>
  );
}

export default App;
