import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeScreen from './HomeScreen';
import Question from './Question';

const App = () => {
  const shuffleArray = (arr) => arr.sort(() => Math.random() - 0.5);
  const [questions, setQuestions] = useState([]);
  const [checked, setChecked] = useState(false);
  const [correct, setCorrect] = useState(0);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch("https://opentdb.com/api.php?amount=5&category=18&encode=base64");
        if (!res.ok) {
          throw new Error("Failed to fetch questions");
        }
        const data = await res.json();

        const questionsArray = data.results.map((question) => ({
          id: nanoid(),
          answers: shuffleArray([...question.incorrect_answers, question.correct_answer]),
          question: question.question,
          correct: question.correct_answer,
          selected: null,
          checked: false,
        }));

        setQuestions(questionsArray);
      } catch (error) {
        console.error("Error fetching questions:", error.message);
      }
    };

    fetchQuestions();
  }, []);

  const handleCheck = () => {
    const allSelected = questions.every((question) => question.selected !== null);

    if (!allSelected) {
      return;
    }

    setQuestions((prevQuestions) => prevQuestions.map((question) => ({ ...question, checked: true })));

    const correctCount = questions.filter((question) => question.correct === question.selected).length;
    setCorrect(correctCount);
    setChecked(true);
  };

  const handleClickAnswer = (id, answer) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) => (question.id === id ? { ...question, selected: answer } : question))
    );
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route
          path="/about"
          element={
            <>
              {questions.map((question) => (
                <Question
                  key={question.id}
                  q={question}
                  handleClickAnswer={handleClickAnswer}
                  id={question.id}
                />
              ))}
              <button onClick={handleCheck}>Check Answers</button>
              {checked && <p>Correct Answers: {correct}</p>}
            </>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
