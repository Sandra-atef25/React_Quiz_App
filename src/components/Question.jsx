import { useState } from "react";
import Answers from "./Answers";
import QuestionTimer from "./QuestionTimer";
import questions from "../questions";
function Question({ questionIndex, onSelectAnswer, onSkipAnswer }) {
    const [answer, setAnswer] = useState({
        selectedAnswer: '',
        isCorrect: null
    })
    let timer = 10000;
    if (answer.selectedAnswer) {
        timer = 1000;
    }
    if (answer.isCorrect !== null) {
        timer = 2000;
    }
    function handleSelectanswer(answer) {
        setAnswer({
            selectedAnswer: answer,
            isCorrect: null
        });
        setTimeout(() => {
            setAnswer({
                selectedAnswer: answer,
                isCorrect: questions[questionIndex].answers[0] === answer
            })
            setTimeout(() => {
                onSelectAnswer(answer);

            }, 2000);
        }, 1000);
    }
    let answerState = '';
    if (answer.selectedAnswer && answer.isCorrect !== null) {
        answerState = answer.isCorrect ? 'correct' : 'wrong';
    }
    else if (answer.selectedAnswer) {
        answerState = 'answered';
    }
    return <div id="question">
        <QuestionTimer
            key={timer}
            mode={answerState}
            timeout={timer}
            onTimeOut={answer.selectedAnswer===''?onSkipAnswer:null}
        />
        <h2>{questions[questionIndex].text}</h2>
        <Answers
            answerState={answerState}
            answers={questions[questionIndex].answers}
            selectedAnswer={answer.selectedAnswer}
            onSelect={handleSelectanswer}
        />
    </div>
}
export default Question;