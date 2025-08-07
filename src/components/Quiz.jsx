import { useCallback, useState, useRef } from "react";
import questions from "../questions";
import quizCompleted from "../assets/quiz-complete.png";
import Question from "./Question";
function Quiz() {
  const [usersAnswers, setUsersAnswers] = useState([]);
  const activeQuestionsIndex = usersAnswers.length;
  const quizIsCompleted = activeQuestionsIndex === questions.length;
  const handleSelectAnswer = useCallback(function handleSelectAnswer(
    selectedAnswer
  ) {
    setUsersAnswers((prev) => {
      return [...prev, selectedAnswer];
    });
  },
  []);
  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );
  if (quizIsCompleted) {
    return (
      <div id="summary">
        <img src={quizCompleted} alt="Completed Quiz" />
        <h2>Quiz Completed</h2>
      </div>
    );
  }

  return (
    <div id="quiz">
      <Question
        key={activeQuestionsIndex}
        questionIndex={activeQuestionsIndex}
        onSelectAnswer={handleSelectAnswer}
        onSkipAnswer={handleSkipAnswer}
      />
    </div>
  );
}
export default Quiz;
