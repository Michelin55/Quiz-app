// HomeScreen.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomeScreen  = () => {
    const navigate = useNavigate();

    const navigateToAbout = () => {
      navigate('/about');
    };
  
  return (
    <div className="intro--container">
    <div className="intro--display">
      <h2 className="intro--title">Quizzical</h2>
      <p className="intro--description">Some description if needed </p>
      <button className="intro--button" onClick={navigateToAbout}>
        Start Quiz
      </button>
    </div>
  </div>
  );
};

export default HomeScreen;
