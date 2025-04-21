import { useState } from "react";

const Result = ({ questions, correct, onClickRestart, answers, onClickRes, res }) => {



    return (
        <div className="result">
            {correct === 0
                ? <img src="/sad.png" alt="sad" />
                : <img src="https://cdn-icons-png.flaticon.com/512/2278/2278992.png" alt="success" />
            }            <h2>Вы отгадали {correct} ответа из {questions.length}</h2>

            <button onClick={onClickRes}>Посмотреть результат</button>
            {res == true ?
                <ul className="results-list">
                    {answers.map((answer, index) => (
                        <li key={index} className={answer.isCorrect ? 'correct' : 'wrong'}>
                            <strong>{index + 1}. {answer.question}</strong>
                            <div>
                                Ваш ответ: {answer.variants[answer.selected]}<br />
                                Правильный ответ: {answer.variants[answer.correct]}
                            </div>
                        </li>
                    ))}
                </ul> : ''
            }


            <button onClick={onClickRestart}>Попробовать снова</button>
        </div>
    );
}

export default Result;