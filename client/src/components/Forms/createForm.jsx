import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import { replaceWords } from "../../helpers/replace";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { url } from "../../constants/constants";

const CreateForm = () => {
  const [isFocus, setIsFocus] = useState(true);
  const [blanks, setBlanks] = useState();
  const [plain, setPlain] = useState("");
  const [plainText, setPlainText] = useState("");

  //Category Data Structure
  const [cat, setCat] = useState([
    {
      id: 1,
      description: "",
      categories: [{ id: 1, name: "" }],
      categoryAns: [{ cat: "", ans: "" }],
      points: 0,
    },
  ]);

  //Cloze Data Structure

  const [cloze, setCloze] = useState([
    {
      id: 1,
      filledQuestion: "",
      question: "",
      answers: [],
      points: 0,
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
          points: 0,
        },
      ],
      ponits: 0,
    },
  ]);

  //CATEGORY OPERATION STARTS

  const handleInputAnsChange = (catIndex, index, value) => {
    const updatedCategories = [...cat];
    updatedCategories[catIndex].categoryAns[index].ans = value;
    setCat(updatedCategories);
  };

  // Handle changes in the category name input fields
  const handleInputCatChange = (catIndex, value) => {
    const updatedCat = [...cat];
    updatedCat[catIndex].description = value;
    setCat(updatedCat);
  };

  // Handle key press to add a new category or answer
  const handleKeyPress = (catIndex, ansIndex, event, type) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const updatedCat = [...cat];
      if (type === "category") {
        // Add new category
        updatedCat[catIndex].categories.push({
          id: updatedCat[catIndex].categories.length + 1,
          name: "",
        });
      } else {
        // Add new answer
        updatedCat[catIndex].categoryAns.push({ cat: "", ans: "" });
      }
      setCat(updatedCat);
    }
  };

  const onDragEnd = (result) => {
    console.log("Source Index:", result.source.index);
    console.log("Destination Index:", result.destination?.index);
    if (!result.destination) return;

    // const items = Array.from(categories);
    // const [reorderedItem] = items.splice(result.source.index, 1);
    // items.splice(result.destination.index, 0, reorderedItem);

    // setCategories(items);
  };
  //CATEGORY OPERATION ENDS

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

  const [ques, setIsQues] = useState([{ id: 1, state: false }]);
  const [isOption1, setIsOption1] = useState(true);
  const [isOption2, setIsOption2] = useState(true);
  const [isOption3, setIsOption3] = useState(true);
  const [isOption4, setIsOption4] = useState(true);

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

  //1----CATEGORY OPERATION STARTS

  const handleAdd = () => {
    // Find the last category to determine the new ID
    const newId = cat.length ? cat[cat.length - 1].id + 1 : 1;

    // Add a new category with default values
    setCat([
      ...cat,
      {
        id: newId,
        description: "",
        categories: [{ id: 1, name: "" }],
        categoryAns: [{ cat: "", ans: "" }],
        points: 0,
      },
    ]);
  };

  const handleDelete = (id) => {
    setCat(cat.filter((c) => c.id !== id));
  };

  //1----CATEGORY OPERATIONS ENDS

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

  const [title, setTitle] = useState("");
  //API CALLS

  const handleCreate = async () => {
    try {
      if (!title) {
        alert("Please enter the form title");
      }

      const { data } = await axios.post(`${url}/api/quiz/createForm`, {
        title: title,
        cat: cat,
        cloze: cloze,
        comp: comp,
      });

      alert("Form Successfully created");
    } catch (e) {
      alert("Failure in creating form");
    }
  };

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
          <input
            type={title}
            placeholder="Untitled Quiz"
            className="w-64 border-1 border-black round round-sm"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <button className="px-1 py-0.5 border-1 border-blue-600 text-black">
            Save Draft
          </button>
          <button
            className="px-1 py-0.5 bg-blue-400 text-white text-black"
            onClick={handleCreate}
          >
            Save
          </button>
        </div>
      </div>

      <div>
        {cat.map((cats, catIndex) => (
          <div
            key={cats.id}
            className="w-full h-64 mt-[10rem] flex items-center justify-between gap-1"
          >
            {/* Category Question */}
            <div className="w-full h-[24rem] border-2 border-blue-400 flex items-start flex-col">
              <div className="ml-[1rem]">
                <p className="flex flex-start">Question 1</p>
                <input
                  type="text"
                  placeholder="Description (optional)"
                  value={cats.description}
                  className="w-[42rem] h-8 border-1 border-black p-1"
                  onChange={(e) =>
                    handleInputCatChange(catIndex, e.target.value)
                  }
                />
              </div>

              <div className="ml-[1rem] mt-1">
                <span className="flex flex-start">Categories</span>
                <div className="mt-2">
                  <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="categories">
                      {(provided) => (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                        >
                          {cats.categories.map((category, categoryIndex) => (
                            <Draggable
                              key={category.id}
                              draggableId={String(category.id)}
                              index={categoryIndex}
                            >
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  className="flex items-center mt-2"
                                >
                                  <button
                                    {...provided.dragHandleProps}
                                    className="w-8 h-8 bg-gray-300 rounded-md flex items-center justify-center mr-2 cursor-grab"
                                  >
                                    ☰
                                  </button>

                                  <input
                                    type="text"
                                    value={category.name}
                                    placeholder={`Category ${
                                      categoryIndex + 1
                                    }`}
                                    className="w-32 h-8 border border-black rounded-lg p-1"
                                    onChange={(e) => {
                                      const updatedCategories = [...cat];
                                      updatedCategories[catIndex].categories[
                                        categoryIndex
                                      ].name = e.target.value;
                                      setCat(updatedCategories);
                                    }}
                                    onKeyDown={(e) =>
                                      handleKeyPress(
                                        catIndex,
                                        categoryIndex,
                                        e,
                                        "category"
                                      )
                                    }
                                  />
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </DragDropContext>
                </div>
              </div>

              <div className="mt-5 flex items-center gap-[24rem] ml-4">
                <span className="flex flex-start">Items</span>
                <span>Belongs To</span>
              </div>

              {/* Answer Fields for Categories */}
              {cats.categoryAns.map((answer, ansIndex) => (
                <div
                  key={ansIndex}
                  className="flex items-center gap-[16rem] ml-4 mt-1"
                >
                  <div className="input-box block gap-2">
                    <input
                      type="text"
                      value={answer.ans}
                      placeholder="Enter Answer"
                      className="w-32 h-8 border border-black rounded-lg p-1"
                      onChange={(e) =>
                        handleInputAnsChange(catIndex, ansIndex, e.target.value)
                      }
                      onKeyDown={(e) =>
                        handleKeyPress(catIndex, ansIndex, e, "answer")
                      }
                    />
                  </div>

                  {/* Dropdown Box */}
                  <select
                    value={answer.selectedOption || ""}
                    className="w-32 h-8 border border-black rounded-lg p-1"
                    onChange={(e) => {
                      const updatedCat = [...cat];
                      updatedCat[catIndex].categoryAns[
                        ansIndex
                      ].selectedOption = e.target.value;
                      setCat(updatedCat);
                    }}
                  >
                    {cats.categories.map((c) => (
                      <>
                        <option value="" disabled>
                          {c.name}
                        </option>
                      </>
                    ))}
                  </select>
                </div>
              ))}
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
                onClick={() => handleDelete(cats.id)}
              >
                DEL
              </button>
            </div>
          </div>
        ))}

        {cloze.map((col) => (
          <div
            key={col?.id}
            className="w-full mt-[10rem] flex items-center justify-between gap-1"
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
