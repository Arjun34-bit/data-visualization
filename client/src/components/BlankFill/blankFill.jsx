import React, { useEffect, useState } from "react";

const BlankFillComponent = ({ cloze }) => {
  const [arr, setArr] = useState([]);

  // Function to process the text
  const blankFill = (txts) => {
    if (!txts) return;
    setArr(() => {
      const newWords = txts.split(" ");
      return newWords;
    });
  };

  // Call blankFill when the component mounts or when cloze.question changes
  useEffect(() => {
    if (cloze?.question) {
      blankFill(cloze.question);
    }
  }, [cloze?.question]);

  return (
    <div className="flex items-center mt-3">
      <div>
        {arr.map((a, index) => (
          <span key={index} className="ml-1">
            {a === "_____" ? (
              <span className="w-24 h-8 bg-gray-100 text-gray-100 p-0.5 text-2xl">
                _______
              </span>
            ) : (
              a
            )}
          </span>
        ))}
      </div>
    </div>
  );
};

export default BlankFillComponent;
