import { useCallback, useState, useRef } from "react";
import questions from "../questions";
import quizCompleted from '../assets/quiz-complete.png';
import QuestionTimer from "./QuestionTimer";
function Quiz() {
    const [usersAnswers, setUsersAnswers] = useState([]);
    const [answerState, setAnswerState] = useState('');
    const shuffleAnswers = useRef();
    const activeQuestionsIndex = answerState === '' ? usersAnswers.length : usersAnswers.length - 1;
    const quizIsCompleted = activeQuestionsIndex === questions.length;
    const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
        setAnswerState('answered');
        setUsersAnswers((prev) => { return [...prev, selectedAnswer]; });
        setTimeout(() => {
            if (selectedAnswer === questions[activeQuestionsIndex].answers[0]) {
                setAnswerState('correct');
            }
            else {
                setAnswerState('wrong');
            }
            setTimeout(() => {
                setAnswerState('');
            }, 2000);
        }, 1000);
    }, [activeQuestionsIndex]);
    const handleSkipAnswer = useCallback(() =>
        handleSelectAnswer(null)
        , [handleSelectAnswer]);
    if (quizIsCompleted) {
        return (<div id="summary">
            <img src={quizCompleted} alt="Completed Quiz" />
            <h2>Quiz Completed</h2>
        </div>);
    }

    if (!shuffleAnswers.current) {
        shuffleAnswers.current = [...questions[activeQuestionsIndex].answers];
        shuffleAnswers.current.sort(() => Math.random() - 0.5);
    }
    return (
        <div id="quiz">
            <div id="question">
                <QuestionTimer key={activeQuestionsIndex} timeout={10000} onTimeOut={handleSkipAnswer} />
                <h2>{questions[activeQuestionsIndex].text}</h2>
                <ul id="answers">
                    {shuffleAnswers.current.map((answer) => {
                        let cssClass = '';
                        const isSelected = usersAnswers[usersAnswers.length - 1] === answer;
                        if (answerState === 'answered' && isSelected) {
                            cssClass = 'selected';
                        }
                        if ((answerState === 'correct' || answerState === 'wrong') && isSelected) {
                            cssClass = answerState;
                        }
                        return (
                            <li key={answer} className="answer">
                                <button onClick={() => handleSelectAnswer(answer)} className={cssClass}>
                                    {answer}
                                </button>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    );
}
export default Quiz;
