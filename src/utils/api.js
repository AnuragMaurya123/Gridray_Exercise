import axios from 'axios';

// Function to fetch quiz questions from an API
export const fetchQuestions = async () => {
  try {
    // Make a GET request to the Open Trivia Database API to fetch 10 multiple choice questions
    const response = await axios.get('https://opentdb.com/api.php?amount=10&type=multiple');
    // Return the results from the API response
    return response.data.results;
  } catch (error) {
    // Log any errors that occur during the fetch request
    console.error('Error fetching questions:', error);
    // Return an empty array in case of an error
    return [];
  }
};
