import { useRef } from "react";
function Answers({ answers, selectedAnswer, answerState, onSelect }) {
  const shuffleAnswers = useRef();

  if (!shuffleAnswers.current) {
    shuffleAnswers.current = [...answers];
    shuffleAnswers.current.sort(() => Math.random() - 0.5);
  }
  return (
    <ul id="answers">
      {shuffleAnswers.current.map((answer) => {
        let cssClass = "";
        const isSelected = selectedAnswer === answer;
        if (answerState === "answered" && isSelected) {
          cssClass = "selected";
        }
        if (
          (answerState === "correct" || answerState === "wrong") &&
          isSelected
        ) {
          cssClass = answerState;
        }
        return (
          <li key={answer} className="answer">
            <button onClick={() => onSelect(answer)} className={cssClass} disabled={answerState!==''}>
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
export default Answers;
