import { useCallback, useState, useRef } from "react";
import questions from "../questions";
import Question from "./Question";
import Summary from "./Summary";
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
    return <Summary userAnswers={usersAnswers} />;
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
