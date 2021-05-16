import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import ButtonComponent from './ButtonComponent';
import { useStyles } from './styles';
import { deafultSymbols } from './symbols';
import { getTextMathConst, getFactorial, getNumFromLongText } from './common';

function Calculator() {
  const classes = useStyles();
  const [calcText, setCalcText] = useState('');
  const [firstNum, setFirstNum] = useState(null);
  const [secondNum, setSecondNum] = useState(null);
  const [operation, setOperation] = useState(null);
  const [openScientific, setOpenScientific] = useState(false);
  const [isTwoOperand, setIsTwoOperand] = useState(true);
  const [helperText, setHelperText] = useState(' ');

  const getNumFromMathConst = (text) => {
    if (text === 'e') {
      return Math.E;
    }
    if (text === 'π') {
      return Math.PI;
    } else {
      return parseFloat(text, 10);
    }
  };

  const handleSetOperation = (sym) => {
    setFirstNum(null);
    if (calcText !== '') {
      setFirstNum(getNumFromMathConst(calcText));
    }
    setOperation(sym);
    setCalcText('');
    setSecondNum(null);
  };

  const handleInputDot = () => {
    if (!(/\./).test(calcText)) {
      setCalcText(`${calcText}.`);
    }
  };

  const handleClearAll = () => {
    setCalcText('');
    setFirstNum(null);
    setSecondNum(null);
    setOperation(null);
    setHelperText(' ');
  };

  const handleToggleSign = () => {
    if (calcText === 'e') {
      setCalcText(Math.E * -1);
    } else if (calcText === 'π') {
      setCalcText(Math.PI * -1);
    } else {
      setCalcText(calcText * -1);
    }
  };

  const handleClearLast = () => {
    setCalcText(calcText.toString().substring(0, calcText.length - 1) || '');
  };

  const handleResult = () => {
    setCalcText('');
    if ((operation !== null) && (calcText !== '')) {
      if (isTwoOperand) {
        setSecondNum(getNumFromMathConst(calcText));
      } else {
        setSecondNum(getNumFromLongText(calcText, operation));
      }
    }
  };

  const handleClickButton = (sym) => {
    setCalcText(calcText + sym);
    if (sym === '±') {
      handleToggleSign();
    }
    if (sym === '=') {
      handleResult();
    }
    if (sym === 'C') {
      handleClearAll();
    }
    if (['/', '*', '+', '-', '%', 'x^y'].findIndex((x) => x === sym) !== -1) {
      setIsTwoOperand(true);
      handleSetOperation(sym);
    }
  };

  const handleKeyDown = (event) => {
    const { key } = event;
    if ((/^\d+$/).test(key)) {
      setCalcText(calcText + key);
    } else if (['/', '*', '+', '-', '%'].findIndex((x) => x === key) !== -1) {
      handleSetOperation(key);
    } else if (key === '.') {
      handleInputDot();
    } else if (key === '^') {
      handleSetOperation('x^y');
    } else if (key === 'Backspace') {
      handleClearLast();
    } else if ((key === 'Enter') || (key === '=')) {
      handleResult();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [calcText]);

  const handleClickMathConst = (text) => {
    if (isTwoOperand) {
      setCalcText(text);
    } else {
      if (text === 'e') {
        setSecondNum(Math.E);
      }
      if (text === 'π') {
        setSecondNum(Math.PI);
      }
      setCalcText(calcText + text);
    }
  };

  const handleClickFactorial = (text) => {
    setIsTwoOperand(false);
    if (calcText !== '') {
      setHelperText(`${calcText}! = ${getFactorial(getNumFromMathConst(calcText))}`);
    }
  };

  const handleClickMoreFunc = (text) => {
    setIsTwoOperand(false);
    setCalcText(`${text}(`);
    setOperation(text);
  };

  useEffect(() => {
    if (isTwoOperand) {
      if (firstNum !== null) {
        setHelperText(`${getTextMathConst(firstNum)} `);
        if (operation !== null) {
          setHelperText(`${getTextMathConst(firstNum)} ${operation} ${secondNum !== null
            ? getTextMathConst(secondNum)
            : calcText}`);
        }
        if (operation === 'x^y') {
          setHelperText(`${getTextMathConst(firstNum)}^${secondNum !== null
            ? getTextMathConst(secondNum)
            : calcText}`);
        }
      }
    } 
    return () => {
      setHelperText(' ');
    };
  }, [firstNum, operation, secondNum]);

  useEffect(() => {
    if (isTwoOperand) {
      if ((firstNum !== null) && (secondNum !== null)) {
        switch (operation) {
          case '+': setHelperText(`${firstNum} + ${getTextMathConst(secondNum)} = ${firstNum + secondNum}`); break;
          case '-': setHelperText(`${firstNum} - ${getTextMathConst(secondNum)} = ${firstNum - secondNum}`); break;
          case '*': setHelperText(`${firstNum} * ${getTextMathConst(secondNum)} = ${firstNum * secondNum}`); break;
          case '/': setHelperText(`${firstNum} / ${getTextMathConst(secondNum)} = ${firstNum / secondNum}`); break;
          case '%': setHelperText(`${firstNum} % ${getTextMathConst(secondNum)} = ${(firstNum * secondNum) / 100}`); break;
          case 'x^y': setHelperText(`${firstNum}^${getTextMathConst(secondNum)} = ${firstNum ** secondNum}`); break;
          default: break;
        }
      }
    } else {
      switch (operation) {
        case 'ln': setHelperText(`${operation}(${getTextMathConst(secondNum)}) = ${Math.log(secondNum)}`); break;
        case 'log': setHelperText(`${operation}(${getTextMathConst(secondNum)}) = ${Math.log10(secondNum)}`); break;
        case 'sin': setHelperText(`${operation}(${getTextMathConst(secondNum)}) = ${Math.sin(secondNum)}`); break;
        case 'cos': setHelperText(`${operation}(${getTextMathConst(secondNum)}) = ${Math.cos(secondNum)}`); break;
        case 'tan': setHelperText(`${operation}(${getTextMathConst(secondNum)}) = ${Math.tan(secondNum)}`); break;
        case '√': setHelperText(`${operation}(${getTextMathConst(secondNum)}) = ${Math.sqrt(secondNum)}`); break;
        default: break;
      }
    }
  }, [secondNum]);

  return (
    <div className={classes.root}>
      <Grid container className={classes.container} spacing={1}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography component="p" variant="h6">Calculator</Typography>
          </Paper>
        </Grid>
      </Grid>
      <Grid container className={classes.container} spacing={1}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Grid className={classes.container} container spacing={1}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  value={getTextMathConst(calcText)}
                  helperText={helperText}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={8} sm={6} md={4} lg={3} xl={2}>
                <Grid container className={classes.container} spacing={1}>
                  {deafultSymbols.map((sym) => (
                    <ButtonComponent
                      text={sym.text}
                      xs={3}
                      color={sym.color}
                      key={sym.text}
                      handleClick={() => handleClickButton(sym.text)}
                    />
                  ))}
                  <ButtonComponent
                    text="More"
                    xs={3}
                    color="primary"
                    handleClick={() => setOpenScientific(!openScientific)}
                  />
                </Grid>
              </Grid>
              <Grid item xs={4} sm={3} md={2} lg={2} xl={2}>
                <Grid container className={classes.container} spacing={1}>
                  {openScientific ? (
                    <>
                      <ButtonComponent
                        text="x^y"
                        xs={6}
                        color="secondary"
                        handleClick={() => handleClickButton('x^y')}
                      />
                      {['√', 'ln', 'log', 'sin', 'cos', 'tan'].map((item) => (
                        <ButtonComponent
                          text={item}
                          xs={6}
                          color="secondary"
                          key={item}
                          handleClick={() => handleClickMoreFunc(item)}
                        />
                      ))}
                      <ButtonComponent
                        text="x!"
                        xs={6}
                        color="secondary"
                        handleClick={() => handleClickFactorial('x!')}
                      />
                      <ButtonComponent
                        text="e"
                        xs={6}
                        color="secondary"
                        handleClick={() => handleClickMathConst('e')}
                      />
                      <ButtonComponent
                        text="π"
                        xs={6}
                        color="secondary"
                        handleClick={() => handleClickMathConst('π')}
                      />
                    </>
                  ) : null}
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
export default Calculator;
