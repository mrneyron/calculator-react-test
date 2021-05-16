export const getFactorial = (n) => !(n > 1) ? 1 : n * getFactorial(n - 1);

export const getTextMathConst = (value) => {
  let text = value;
  if (Math.abs(parseFloat(text, 10)) === Math.E) {
    text = parseFloat(text, 10) > 0 ? 'e' : '-e';
  } else if (Math.abs(parseFloat(text, 10)) === Math.PI) {
    text = parseFloat(text, 10) > 0 ? 'π' : '-π';
  }
  return text;
};

export const getNumFromLongText = (text, operation) => {
  let shift = 2;
  if (operation === 'ln') {
    shift = 3;
  } else if (operation === 'log'
              || operation === 'sin'
              || operation === 'cos'
              || operation === 'tan') {
    shift = 4;
  }
  if (text.substring(shift).length > 0) {
    return parseFloat(text.substring(shift), 10);
  }
  return '';
};
