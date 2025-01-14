/* eslint-disable react/prop-types */
const Question = ({ question, onAnswer, currentAnswer }) => {
  // Function to handle the change in selected answer
  const handleChange = (e) => {
    onAnswer(e.target.value); // Pass the selected answer to the onAnswer function
  };

  return (
    <div className="space-y-6">
      {/* Display the question */}
      <h2 className="text-xl font-semibold text-gray-800 sm:text-2xl md:text-3xl">{question.question}</h2>
      
      {/* Map through all the answer options and display them */}
      {question.incorrect_answers.concat(question.correct_answer).sort().map((option, index) => (
        <div key={index} className="flex items-center space-x-2 sm:space-x-4">
          {/* Radio button input for each option */}
          <input
            type="radio"
            name="answer" // Name to group all radio buttons
            value={option} // Value of the option
            checked={currentAnswer === option} // Check if this option is selected
            onChange={handleChange} // Handle change when the option is selected
            className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" // Responsive radio button size
          />
          {/* Label displaying the answer option */}
          <label className="text-gray-700 text-sm sm:text-base">{option}</label>
        </div>
      ))}
    </div>
  );
};

export default Question;
