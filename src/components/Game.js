

const Game = ({ questions, step, question, onClickVariant, selectedIndex }) => {
    const percentage = Math.round((step / questions.length) * 100);

    return (
        <>
            <div className="progress">
                <div style={{ width: `${percentage}%` }} className="progress__inner"></div>
            </div>

            <h1>{question.title}</h1>
            <ul>
                {question.variants.map((text, index) => {
                    let className = '';
                    if (selectedIndex !== null) {
                        if (index === question.correct) {
                            className = 'correct';
                        } else if (index === selectedIndex) {
                            className = 'incorrect';
                        }
                    }

                    return (
                        <li
                            key={index}
                            onClick={() => onClickVariant(index)}
                            className={className}
                        >
                            {text}
                        </li>
                    );
                })}
            </ul>
        </>
    );
}

export default Game;