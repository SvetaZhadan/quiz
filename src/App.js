import { useState, useEffect } from 'react';
import './index.scss';

import Game from './components/Game';
import Result from './components/Result';

function App() {
  const [start, setStart] = useState(false);
  const [step, setStep] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [answers, setAnswers] = useState([]); 

  const [quest, setQuest] = useState([]);
  const [cat, setCat] = useState('html');

  const [res, setRes] = useState(false)

  const onClickRes = () => {
      setRes(true)
  }
  useEffect(() => {
    import(`./data/${cat}-questions.json`)
      .then((module) => setQuest(module.default))
      .catch((error) => console.error('Ошибка загрузки вопросов:', error));
  }, [cat]);

  const question = quest[step];

  const onClickStart = () => {
    setStart(true);
    setStep(0);
    setCorrect(0);
  };

  const onClickVariant = (index) => {
    if (selectedIndex !== null) return;
  
    setSelectedIndex(index);
  
    const isCorrect = index === question.correct;
    setAnswers((prev) => [
      ...prev,
      {
        question: question.title,
        selected: index,
        correct: question.correct,
        variants: question.variants,
        isCorrect,
      },
    ]);
  
    if (isCorrect) {
      setCorrect(prev => prev + 1);
    }
  
    setTimeout(() => {
      setStep(prev => prev + 1);
      setSelectedIndex(null);
    }, 300);
  };
  

  const onClickRestart = () => {
    setStep(0);
    setCorrect(0);
    setSelectedIndex(null);
    setStart(true);
    setRes(false)
    setAnswers([])
  };

  const categories = [
    { name: 'html', id: 0 },
    { name: 'css', id: 1 },
    { name: 'js', id: 2 }
  ];

  const onClickCategory = (categoryName) => {
    setCat(categoryName);
    setStart(false);
    setStep(0);
    setCorrect(0);
    setRes(false)
    setAnswers([])
  };

  function Category({ title, onClick, isActive }) {
    return (
      <div className={`category ${isActive ? 'active' : ''}`} onClick={onClick}>
        <h4>{title}</h4>
      </div>
    );
  }

  return (
    <div className="App">
      <div className="select-category">
        {categories.map((catItem) => (
          <Category
            key={catItem.id}
            title={catItem.name}
            onClick={() => onClickCategory(catItem.name)}
            isActive={catItem.name === cat}
          />
        ))}
      </div>

      <div className="container">
        {!start ? (
          <button onClick={onClickStart}>Начать</button>
        ) : step < quest.length ? (
          <Game
            questions={quest}
            step={step}
            question={question}
            onClickVariant={onClickVariant}
            selectedIndex={selectedIndex}
          />
        ) : (
          <Result
            correct={correct}
            onClickRestart={onClickRestart}
            questions={quest}
            answers={answers}
            onClickRes = {onClickRes}
            res={res}
          />
        )}
      </div>
    </div>
  );
}

export default App;
