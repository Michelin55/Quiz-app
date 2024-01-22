// Button.js
import React from 'react';
import he from 'he';

const Button = (props) => (
  <button className="question--answers" value={props.value} onClick={props.onClick}>
    {he.decode(props.value)}
  </button>
);

export default Button;
