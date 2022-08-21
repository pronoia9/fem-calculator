import React, { createContext, useContext, useState } from 'react';

const StateContext = createContext();
let showResult = false;

export const ContextProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark');
  const [input, setInput] = useState('');
  const [calculations, setCalculations] = useState('');
  const [result, setResult] = useState('');

  const themeButtonHandler = (event) => {
    setTheme(event.target.value);
  };

  const addInput = (num) => {
    if (showResult) {
      showResult = false;
      // reset(`${parseFloat(num)}`);
    } else setInput(`${parseFloat(input + num)}`);
  };

  const addDecimal = () => {
    if (!showResult) setInput(`${parseFloat(input)}${!input.includes('.') ? '.' : ''}`);
  };

  const addition = () => `${parseFloat(result) + parseFloat(input)}`;
  const subtraction = () => `${parseFloat(result) - parseFloat(input)}`;
  const multiplication = () => `${parseFloat(result) * parseFloat(input)}`;
  const division = () => `${parseFloat(result) / parseFloat(input)}`;

  const calculate = (btn) => {
    // check input
    if (!input) return;

    // set calculations
    setCalculations(`${calculations.length ? calculations + ' ' : ''}${input}${!showResult ? ' ' + btn : ''}`);

    // set a variable for res: state update isnt instant and it bugs setInput later when called from getResults()
    let res = result;
    // do calculation and set the new result
    if (result) {
      if (btn === '+') res = addition();
      else if (btn === '-') res = subtraction();
      else if (btn === '*') res = multiplication();
      else if (btn === '/') res = division();
      setResult(res);
    }
    // if theres no prev result, set result to input
    else setResult(input);

    // clear input
    setInput(!showResult ? '' : res);
  };

  const getResult = () => {
    showResult = true;
    // if theres an input, do calculation with the last operator in calculations string
    if (input) calculate(calculations.charAt(calculations.length - 1));
    // if theres no new input, remove the last operation from calcs string and show the result
    else {
      setCalculations(calculations.slice(0, calculations.length - 2));
      setInput(result);
    }
  };

  const reset = () => {
    setInput('');
    setCalculations('');
    setResult('');
  };

  const del = () => {
    if (!showResult && input.length > 0) setInput(input.slice(0, input.length - 1));
  };

  const buttons = [
    { button: '7', type: 'number', style: '', click: addInput },
    { button: '8', type: 'number', style: '', click: addInput },
    { button: '9', type: 'number', style: '', click: addInput },
    { button: 'DEL', type: 'operator', style: '', click: del },
    { button: '4', type: 'number', style: '', click: addInput },
    { button: '5', type: 'number', style: '', click: addInput },
    { button: '6', type: 'number', style: '', click: addInput },
    { button: '+', type: 'operator', style: '', click: calculate },
    { button: '1', type: 'number', style: '', click: addInput },
    { button: '2', type: 'number', style: '', click: addInput },
    { button: '3', type: 'number', style: '', click: addInput },
    { button: '-', type: 'operator', style: '', click: calculate },
    { button: '.', type: 'operator', style: '', click: addDecimal },
    { button: '0', type: 'number', style: '', click: addInput },
    { button: '/', type: 'operator', style: '', click: calculate },
    { button: 'x', type: 'operator', style: '', click: calculate },
    { button: 'RESET', type: 'operator', style: ' double-size', click: reset },
    { button: '=', type: 'operator', style: ' double-size', click: getResult },
  ];

  return (
    <StateContext.Provider value={{ theme, input, calculations, result, buttons, showResult, themeButtonHandler }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
