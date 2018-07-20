const isolateAHexaColorString = (inputColor) => {
  let result = inputColor;
  if (result[0] !== '#') {
    result = `#${result}`;
  }
  if (result.length > 7) {
    result = result.substring(0, 7);
  }
  return result;
};

export { isolateAHexaColorString };
