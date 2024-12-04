import React, { useEffect, useRef, useState } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import { replaceWords } from "../../helpers/replace";

const CreateForm = () => {
  const [isFocus, setIsFocus] = useState(true);
  const [blanks, setBlanks] = useState();
  const [plain, setPlain] = useState("");
  const [plainText, setPlainText] = useState("");

  const { quill, quillRef } = useQuill({
    modules: {
      toolbar: [["bold", "underline"]],
    },
    formats: ["bold", "underline"],
  });

  useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
        const editorHTML = quill.root.innerHTML;

        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = editorHTML;

        const plainT = tempDiv.textContent || tempDiv.innerText;

        setPlainText((prevplainText) => [...plainT]);

        const underlinedTexts = Array.from(tempDiv.querySelectorAll("u")).map(
          (node) => node.innerText
        );

        setBlanks((prevBlanks) => [...underlinedTexts]);
        setPlain((prevPlain) => replaceWords(plainT, underlinedTexts));
      });
    }
  }, [quill]);

  const [category, setCategory] = useState([{ id: 1 }]);
  // const [cloze, setCloze] = useState([{ id: 1 }]);

  // const [mcqs, setMcqs] = useState([{ id: 1 }]);
  const [ques, setIsQues] = useState([{ id: 1, state: false }]);
  const [isOption1, setIsOption1] = useState(true);
  const [isOption2, setIsOption2] = useState(true);
  const [isOption3, setIsOption3] = useState(true);
  const [isOption4, setIsOption4] = useState(true);

  //Cloze Data Structure

  const [cloze, setCloze] = useState([
    {
      id: 1,
      filledQuestion: "",
      question: "",
      answers: [],
    },
  ]);

  // Comp Question Data Structure
  const [comp, setComp] = useState([
    {
      id: 1,
      paragraph: "",
      mq: [
        {
          id: 1,
          question: "",
          options: { option1: "", option2: "", option3: "", option4: "" },
          answer: "",
          state: true,
        },
      ],
    },
  ]);

  const handleInputParaChange = (compId, event) => {
    const textarea = event.target;
    textarea.style.height = "auto"; // Reset height to calculate scrollHeight
    textarea.style.height = `${textarea.scrollHeight}px`; // Set height based on scrollHeight

    const value = event.target.value;

    setComp((prevComps) =>
      prevComps.map((comp) =>
        comp.id === compId
          ? {
              ...comp,
              paragraph: value, // Update the paragraph of the specific component
            }
          : comp
      )
    );
  };

  const getStateOfParticularId = (id) => {
    const question = ques.find((q) => q.id === id);
    return question ? question.state : null;
  };

  const navigate = useNavigate();

  const handleBackNavigation = () => {
    navigate("?view=list");
  };

  const handleFocus = () => {
    setIsFocus(!isFocus);
  };

  const handleOptionFocus = (val, id) => {
    //Mcqs
    if (val === "option1") {
      setIsOption1(!isOption1);
      setIsOption2(true);
      setIsOption3(true);
      setIsOption4(true);
    } else if (val === "option2") {
      setIsOption1(true);
      setIsOption2(!isOption2);
      setIsOption3(true);
      setIsOption4(true);
    } else if (val === "option3") {
      setIsOption1(true);
      setIsOption2(true);
      setIsOption3(!isOption3);
      setIsOption4(true);
    } else if (val === "option4") {
      setIsOption1(true);
      setIsOption2(true);
      setIsOption3(true);
      setIsOption4(!isOption4);
    } else if (val === "ques") {
      setIsQues((prevState) =>
        prevState.map((item) =>
          item.id === id ? { ...item, state: !item.state } : item
        )
      );
    }
  };

  const handleAdd = () => {
    const newCat = category ? category[category.length - 1] + 1 : 1;
    setCategory([...category, { id: newCat }]);
  };

  const handleDelete = (id) => {
    setCategory(category.filter((cat) => cat?.id !== id));
  };

  //2----CLOZE OPERATION STARTS

  const handleAddCloze = () => {
    const newClozeId =
      cloze && cloze.length > 0 ? cloze[cloze.length - 1].id + 1 : 1;

    setCloze([
      ...cloze,
      {
        id: newClozeId,
        question: "",
        answers: [],
        someOtherField: "",
      },
    ]);
  };

  const handleDeleteCloze = (id) => {
    setCloze(cloze.filter((clozeItem) => clozeItem.id !== id));
  };

  const handleClozeInputs = (id) => {
    setCloze((prevCloze) =>
      prevCloze.map((clozeItem) =>
        clozeItem.id === id
          ? {
              ...clozeItem,
              filledQuestion: plainText,
              question: plain,
              answers: blanks,
            }
          : clozeItem
      )
    );
  };

  //2----CLOZE OPERATIONS ENDS

  //3----COMP OPERATIONS STARTS

  const handleAddComp = () => {
    const newComp = comp ? comp[comp.length - 1] + 1 : 1;
    setComp([...comp, { id: newComp }]);
  };

  const handleDeleteComp = (id) => {
    setComp(comp.filter((cat) => cat?.id !== id));
  };

  //3----COMP OPERATIONS ENDS

  //MCQ OPERATIONS STARTS

  const handleAddMcq = (compId) => {
    // Generate a new ID for the new MCQ inside the corresponding comp
    const compIndex = comp.findIndex((item) => item.id === compId);

    if (compIndex !== -1) {
      const newId =
        comp[compIndex].mq.length > 0
          ? comp[compIndex].mq[comp[compIndex].mq.length - 1].id + 1
          : 1;

      const newMcq = {
        id: newId,
        question: "",
        options: { option1: "", option2: "", option3: "", option4: "" },
        answer: "",
        state: false, // Default value for state
      };

      // Update the `comp` state by adding the new MCQ to the respective `mq` array
      setComp((prevComp) =>
        prevComp.map((item) =>
          item.id === compId ? { ...item, mq: [...item.mq, newMcq] } : item
        )
      );
    }
  };

  const handleDeleteMcq = (compId, mcqId) => {
    setComp((prevComp) =>
      prevComp.map((item) =>
        item.id === compId
          ? { ...item, mq: item.mq.filter((mq) => mq.id !== mcqId) }
          : item
      )
    );
  };

  const handleInputChange = (compId, mqId, field, value) => {
    setComp((prevComps) =>
      prevComps.map((comp) =>
        comp.id === compId
          ? {
              ...comp,
              mq: comp.mq.map((mq) =>
                mq.id === mqId ? { ...mq, [field]: value } : mq
              ),
            }
          : comp
      )
    );
  };

  const handleInputOptionsChange = (compId, mqId, optionField, value) => {
    setComp((prevComps) =>
      prevComps.map((comp) =>
        comp.id === compId
          ? {
              ...comp,
              mq: comp.mq.map((mq) =>
                mq.id === mqId
                  ? {
                      ...mq,
                      options: {
                        ...mq.options,
                        [optionField]: value, // Update the specific option field
                      },
                    }
                  : mq
              ),
            }
          : comp
      )
    );
  };

  //MCQ OPERATIONS ENDS

  return (
    <>
      <div className="p-4 shadow-lg text-lg flex items-center">
        <span className="ml-2 text-black">
          <span className="cursor-pointer" onClick={handleBackNavigation}>
            Home
          </span>{" "}
          &#8594; <b>Forms</b>
        </span>
      </div>

      <div className="p-4 shadow-lg text-lg flex items-center justify-between">
        <div onClick={handleFocus}>
          {isFocus ? (
            <div className="relative group">
              <span className="">Untitled Quiz</span>
              <div class="absolute left-1/2 -translate-x-1/2 mt-2 w-max p-2 bg-gray-700 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity">
                Tooltip text
              </div>
            </div>
          ) : (
            <input
              type="text"
              placeholder="Untitled Quiz"
              className="w-64 border-1 border-black round round-sm"
            />
          )}
        </div>
        <div className="flex gap-2">
          <button className="px-1 py-0.5 border-1 border-blue-600 text-black">
            Save Draft
          </button>
          <button className="px-1 py-0.5 bg-blue-400 text-white text-black">
            Save
          </button>
        </div>
      </div>

      <div>
        {/*   Question Main Box */}

        {category.map((cat) => (
          <div
            key={cat?.id}
            className="w-full h-64 mt-[10rem] flex items-center justify-between gap-1"
          >
            {/* Category Question*/}
            <div className="w-full h-[24rem] border-2 border-blue-400 flex items-start flex-col">
              <div className="ml-[1rem]">
                <p className="flex flex-start">Question 1</p>
                <input
                  type="text"
                  placeholder="Description (optional)"
                  className="w-[24rem] h-8 border-1 border-black"
                />
              </div>

              <div className="ml-[1rem] mt-1">
                <span>Categories</span>
                <div>{/* Drag & Drop */}</div>
              </div>
            </div>
            <div className="w-24 h-[24rem] flex flex-col items-center justify-center gap-2">
              <button
                className="bg-blue-400 p-1 w-12 border rounded-lg"
                onClick={handleAdd}
              >
                +
              </button>
              <button
                className="bg-red-400 p-1 w-12 border rounded-lg"
                onClick={() => handleDelete(cat?.id)}
              >
                DEL
              </button>
            </div>
          </div>
        ))}

        {cloze.map((col) => (
          <div
            key={col?.id}
            className="w-full h-64 mt-[10rem] flex items-center justify-between gap-1"
          >
            {/* Cloze Question*/}
            <div className="w-full h-[24rem] border-2 border-blue-400 flex items-start flex-col">
              <div className="ml-[1rem]">
                <p className="flex flex-start">Question 1</p>
              </div>
              <div className="ml-[1rem] mt-1">
                <p className="flex flex-start">Preview</p>
                <div className="w-[24rem] h-8 p-1 border-1 border-black rounded-lg">
                  <span className="font-bold">
                    {plain ? plain : "A quick ____ fox jumped over a ____"}
                  </span>
                </div>
                <div className="mt-3">
                  <span className="flex flex-start">Fill the Sentence</span>
                  <div ref={quillRef} />
                  <div>
                    {blanks?.map((b) => (
                      <div className="mt-2 flex flex-col gap-2 w-24 h-8 border-1 border-black rounded-lg p-0.5">
                        <p>{b}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="ml-4">
                <button
                  className="border-1 border-green-400 py-0.5 px-1 rounded-lg bg-green-100"
                  onClick={() => handleClozeInputs(col?.id)}
                >
                  Done
                </button>
              </div>
            </div>
            <div className="w-24 h-[24rem] flex flex-col items-center justify-center gap-2">
              <button
                className="bg-blue-400 p-1 w-12 border rounded-lg"
                onClick={handleAddCloze}
              >
                +
              </button>
              <button
                className="bg-red-400 p-1 w-12 border rounded-lg"
                onClick={() => handleDeleteCloze(col?.id)}
              >
                DEL
              </button>
            </div>
          </div>
        ))}

        {comp.map((com) => (
          <div
            key={com?.id}
            className="w-full mt-[10rem] flex items-center justify-between gap-1"
          >
            {/* Comp Question */}
            <div className="w-full border-2 border-blue-400 flex items-start flex-col">
              <div className="ml-[1rem]">
                <p className="flex flex-start">Question 1</p>
                <textarea
                  value={com?.paragraph}
                  onChange={(e) => handleInputParaChange(com?.id, e)}
                  placeholder="Type or paste text here..."
                  className="w-[56rem]"
                  style={{
                    boxSizing: "border-box",
                    resize: "none", // Disable manual resizing
                    overflow: "hidden", // Prevent scrollbars
                    minHeight: "50px",
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                  }}
                />
              </div>

              {com.mq?.map((mcq) => (
                <div key={mcq?.id} className="flex items-center gap-2">
                  <div className="ml-[1rem] w-[58rem] h-64 mt-1 mb-2 border-2 border-blue-400">
                    <div className="ml-[1rem]">
                      <p className="flex flex-start">Question 1.{mcq?.id}</p>
                    </div>
                    <div className="ml-[1rem] mt-1">
                      <p className="flex flex-start">
                        <div>
                          {getStateOfParticularId(mcq?.id) ? (
                            <div className="relative group">
                              <span className="">
                                {mcq.question
                                  ? mcq?.question
                                  : "Question Here ?"}
                              </span>
                            </div>
                          ) : (
                            <input
                              type="text"
                              value={mcq?.question}
                              onChange={(e) =>
                                handleInputChange(
                                  com.id,
                                  mcq.id,
                                  "question",
                                  e.target.value
                                )
                              }
                              placeholder="According to the Passage, the key feature is"
                              className="w-[36rem] p-1 border-1 border-black round round-sm"
                            />
                          )}
                        </div>{" "}
                        <button
                          className="bg-gray-200 font-bold ml-2 border-1 border-black rounded-lg px-1 py-0.5"
                          onClick={() => handleOptionFocus("ques", mcq?.id)}
                        >
                          {getStateOfParticularId(mcq?.id) ? "Edit" : "Save"}
                        </button>
                      </p>
                      <div className="w-[30rem] p-1 border-1 border-black rounded-lg space-y-2">
                        {/* MCQ Options with Radio Buttons */}
                        <div className="flex items-center gap-2">
                          <input
                            type="radio"
                            id="option1"
                            name="keyFeature"
                            value="option1"
                            className="form-radio"
                          />
                          <label htmlFor="option1" className="text-sm flex">
                            <div>
                              {isOption1 ? (
                                <div className="relative group">
                                  <span className="">
                                    {mcq?.options?.option1
                                      ? mcq?.options?.option1
                                      : "Option 1"}
                                  </span>
                                </div>
                              ) : (
                                <input
                                  type="text"
                                  value={mcq?.options?.option1}
                                  onChange={(e) =>
                                    handleInputOptionsChange(
                                      com.id,
                                      mcq.id,
                                      "option1",
                                      e.target.value
                                    )
                                  }
                                  placeholder="Enter Option 1"
                                  className="w-64 border-1 border-black round round-sm"
                                />
                              )}
                            </div>
                            <button
                              className="bg-gray-200 font-bold ml-3 border-1 border-black rounded-lg text-sm px-0.5 py-0.5"
                              onClick={() => handleOptionFocus("option1")}
                            >
                              {isOption1 ? "Edit" : "Save"}
                            </button>
                          </label>
                        </div>
                        <div className="flex items-center gap-2">
                          <input
                            type="radio"
                            id="option2"
                            name="keyFeature"
                            value="option2"
                            className="form-radio"
                          />
                          <label htmlFor="option2" className="text-sm flex">
                            <div>
                              {isOption2 ? (
                                <div className="relative group">
                                  <span className="">
                                    {mcq?.options?.option2
                                      ? mcq?.options?.option2
                                      : "Option 2"}
                                  </span>
                                </div>
                              ) : (
                                <input
                                  type="text"
                                  value={mcq?.options?.option2}
                                  onChange={(e) =>
                                    handleInputOptionsChange(
                                      com.id,
                                      mcq.id,
                                      "option2",
                                      e.target.value
                                    )
                                  }
                                  placeholder="Option 2"
                                  className="w-64 border-1 border-black round round-sm"
                                />
                              )}
                            </div>
                            <button
                              className="bg-gray-200 font-bold ml-3 border-1 border-black rounded-lg text-sm px-0.5 py-0.5"
                              onClick={() => handleOptionFocus("option2")}
                            >
                              {isOption2 ? "Edit" : "Save"}
                            </button>
                          </label>
                        </div>
                        <div className="flex items-center gap-2">
                          <input
                            type="radio"
                            id="option3"
                            name="keyFeature"
                            value="option3"
                            className="form-radio"
                          />
                          <label htmlFor="option3" className="text-sm flex">
                            <div>
                              {isOption3 ? (
                                <div className="relative group">
                                  <span className="">
                                    {mcq?.options?.option3
                                      ? mcq?.options?.option3
                                      : "Option 3"}
                                  </span>
                                </div>
                              ) : (
                                <input
                                  type="text"
                                  value={mcq?.options?.option3}
                                  onChange={(e) =>
                                    handleInputOptionsChange(
                                      com.id,
                                      mcq.id,
                                      "option3",
                                      e.target.value
                                    )
                                  }
                                  placeholder="Option 3"
                                  className="w-64 border-1 border-black round round-sm"
                                />
                              )}
                            </div>
                            <button
                              className="bg-gray-200 font-bold ml-3 border-1 border-black rounded-lg text-sm px-0.5 py-0.5"
                              onClick={() => handleOptionFocus("option3")}
                            >
                              {isOption3 ? "Edit" : "Save"}
                            </button>
                          </label>
                        </div>
                        <div className="flex items-center gap-2">
                          <input
                            type="radio"
                            id="option4"
                            name="keyFeature"
                            value="option4"
                            className="form-radio"
                          />
                          <label htmlFor="option4" className="text-sm flex">
                            <div>
                              {isOption4 ? (
                                <div className="relative group">
                                  <span className="">
                                    {mcq?.options?.option4
                                      ? mcq?.options?.option4
                                      : "Option 4"}
                                  </span>
                                </div>
                              ) : (
                                <input
                                  type="text"
                                  value={mcq?.options?.option4}
                                  onChange={(e) =>
                                    handleInputOptionsChange(
                                      com.id,
                                      mcq.id,
                                      "option4",
                                      e.target.value
                                    )
                                  }
                                  placeholder="Option 4"
                                  className="w-64 border-1 border-black round round-sm"
                                />
                              )}
                            </div>
                            <button
                              className="bg-gray-200 font-bold ml-3 border-1 border-black rounded-lg text-sm px-0.5 py-0.5"
                              onClick={() => handleOptionFocus("option4")}
                            >
                              {isOption4 ? "Edit" : "Save"}
                            </button>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-12 h-auto flex flex-col items-center justify-center gap-2">
                    <button
                      className="bg-blue-400 p-0.5 w-10 border rounded-lg"
                      onClick={() => handleAddMcq(mcq?.id)}
                    >
                      +
                    </button>
                    <button
                      className="bg-red-400 p-0.5 w-10 border rounded-lg"
                      onClick={() => handleDeleteMcq(mcq?.id)}
                    >
                      DEL
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="w-24 h-auto flex flex-col items-center justify-center gap-2">
              <button
                className="bg-blue-400 p-1 w-12 border rounded-lg"
                onClick={handleAddComp}
              >
                +
              </button>
              <button
                className="bg-red-400 p-1 w-12 border rounded-lg"
                onClick={() => handleDeleteComp(com?.id)}
              >
                DEL
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CreateForm;
