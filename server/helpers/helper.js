const generateFourDigitNumber = () => {
  const num = Math.floor(1000 + Math.random() * 9000);
  return num;
};

module.exports = { generateFourDigitNumber };
