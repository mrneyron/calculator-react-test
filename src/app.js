import React from 'react';
import './styles.css';
import Calculator from './calculator';
import ReactDOM from "react-dom";

/**
 * Главный компонент
 */
const App = () => {
  return (
    <Calculator />
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
