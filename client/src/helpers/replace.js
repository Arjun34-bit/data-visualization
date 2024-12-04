export const replaceWords = (text, words) => {
  // Create a regular expression dynamically from the words array
  const regex = new RegExp(words.join("|"), "gi");
  // Replace matched words with "_____"
  return text.replace(regex, "_____");
};

export const getStateOfParticularId = (id, ques) => {
  const question = ques.find((q) => q.id === id);
  return question ? question.state : null;
};
