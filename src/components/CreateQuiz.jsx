import { useState } from "react";
import { useQuiz } from "../context/QuizContext";
import { useNavigate } from "react-router-dom";

const CreateQuiz = () => {
  const navigate = useNavigate();
  const { saveCustomQuiz } = useQuiz();
  const [questions, setQuestions] = useState([
    { question: "", incorrect_answers: ["", "", ""], correct_answer: "" },
  ]);

  // Handles the change in the question text
  const handleQuestionChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].question = value;
    setQuestions(updatedQuestions);
  };

  // Handles the change in an incorrect answer option
  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].incorrect_answers[optionIndex] = value;
    setQuestions(updatedQuestions);
  };

  // Handles the change in the correct answer
  const handleCorrectAnswerChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].correct_answer = value;
    setQuestions(updatedQuestions);
  };

  // Adds a new question to the quiz
  const addQuestion = () => {
    setQuestions([
      ...questions,
      { question: "", incorrect_answers: ["", "", ""], correct_answer: "" },
    ]);
  };

  // Handles the form submission (save quiz and navigate)
  const handleSubmit = () => {
    saveCustomQuiz(questions);
    navigate("/quiz");
  };

  // Exits and navigates back to the home page
  const handleExit = () => {
    navigate("/");
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      {/* Header Section with Title and Exit Button */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-800">
          Create Your Custom Quiz
        </h2>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-800"
          onClick={handleExit}
        >
          Exit
        </button>
      </div>

      {/* Iterate over questions and allow user to input questions and answers */}
      {questions.map((q, index) => (
        <div key={index} className="space-y-4 mt-6">
          {/* Question Input */}
          <label className="block text-gray-600 font-medium">
            Question {index + 1}
          </label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder={`Enter Question ${index + 1}`}
            value={q.question}
            onChange={(e) => handleQuestionChange(index, e.target.value)}
          />

          {/* Incorrect Answer Inputs */}
          <label className="block text-gray-600 font-medium mt-2">
            Incorrect Answers:
          </label>
          {q.incorrect_answers.map((option, optionIndex) => (
            <div key={optionIndex} className="flex items-center space-x-2">
              <input
                type="text"
                className="w-full sm:w-1/2 p-2 border border-gray-300 rounded-md"
                placeholder={`Option ${optionIndex + 1}`}
                value={option}
                onChange={(e) =>
                  handleOptionChange(index, optionIndex, e.target.value)
                }
              />
            </div>
          ))}

          {/* Correct Answer Input */}
          <label className="block text-gray-600 font-medium mt-4">
            Correct Answer:
          </label>
          <input
            type="text"
            className="w-full sm:w-1/2 p-2 border border-gray-300 rounded-md"
            placeholder="Enter Correct Answer"
            value={q.correct_answer}
            onChange={(e) => handleCorrectAnswerChange(index, e.target.value)}
          />
        </div>
      ))}

      {/* Add Question Button and Save Quiz Button */}
      <div className="mt-6 flex flex-col sm:flex-row justify-between items-center sm:items-start space-y-4 sm:space-y-0">
        {/* Button to Add a New Question */}
        <button
          onClick={addQuestion}
          className="w-full sm:w-auto px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Add Question
        </button>

        {/* Button to Submit the Quiz (Save and Navigate) */}
        <button
          onClick={handleSubmit}
          className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Save Quiz
        </button>
      </div>
    </div>
  );
};

export default CreateQuiz;
