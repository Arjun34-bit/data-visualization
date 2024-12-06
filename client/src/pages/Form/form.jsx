import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { url } from "../../constants/constants";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import BlankFillComponent from "../../components/BlankFill/blankFill";

const Form = () => {
  const [cat, setCat] = useState({
    categoryAns: [
      { id: "1", ans: "Answer 1" },
      { id: "2", ans: "Answer 2" },
      { id: "3", ans: "Answer 3" },
    ],
    categories: [
      { id: "a", name: "Category A" },
      { id: "b", name: "Category B" },
      { id: "c", name: "Category C" },
    ],
  });

  const [form, setForm] = useState([]);

  const { tag } = useParams();

  const getForm = async () => {
    try {
      const { data } = await axios.get(`${url}/api/quiz/getQuiz/${tag}`);
      setForm(data);
    } catch (error) {
      alert("failure in fetching form");
    }
  };

  useEffect(() => {
    getForm();
  }, []);

  const handleDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return; // If dropped outside the droppable area

    if (source.droppableId === destination.droppableId) {
      // Reorder within the same list
      const items = Array.from(cat.categoryAns);
      const [reorderedItem] = items.splice(source.index, 1);
      items.splice(destination.index, 0, reorderedItem);

      setCat((prev) => ({
        ...prev,
        categoryAns: items,
      }));
    } else {
      // Move item to a different category (droppableId indicates the category)
      const sourceItems = Array.from(cat.categoryAns);
      const [movedItem] = sourceItems.splice(source.index, 1);

      setCat((prev) => ({
        ...prev,
        categoryAns: sourceItems,
      }));

      // In real applications, handle the target category update here
      console.log(`Moved to: ${destination.droppableId}`, movedItem);
    }
  };

  return (
    <div className="flex align-center justify-center h-full">
      <div className="w-[48rem] h-full bg-gray-300 mt-2">
        {/* Title */}
        <div className="font-bold mt-2 text-lg">{form?.title}</div>
        <p className="text-end mr-2">
          <b>Total Points</b> : <span> 20</span>
        </p>
        <p className="text-end mr-2">
          <b>Duration</b> : <span>60 min.</span>
        </p>

        {/* CAT  */}
        {form?.cats?.map((cat) => (
          <div className="w-full h-[24rem] border-1 border-black rounded-lg p-1">
            <div className="w-full flex items-center justify-between">
              <span className="font-bold">Question 1</span>
              <span className="font-bold">
                ?<span> mark</span>
              </span>
            </div>

            <DragDropContext>
              <div className="drag flex items-center justify-center mt-3 gap-2">
                {cat.categoryAns.map((ans) => (
                  <span className="w-24 h-8 border-1 border-black rounded-lg">
                    {ans?.ans}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-around mt-3 ">
                {cat.categories.map((c) => (
                  <div key={c?.id} className="w-36 h-8 bg-pink-400 rounded-lg">
                    {c?.name}
                  </div>
                ))}
              </div>

              <div className="drop flex items-center justify-around mt-3">
                {cat.categories.map((cBox) => (
                  <div
                    key={cBox?.id}
                    className="w-36 h-36 bg-pink-400 rounded-lg"
                  >
                    {cBox?.id}
                  </div>
                ))}
              </div>
            </DragDropContext>
          </div>
        ))}

        {/* CLOZE  */}
        {form?.clozes?.map((cloze) => (
          <div className="w-full border-1 border-black rounded-lg p-1 mt-3">
            <div className="w-full flex items-center justify-between">
              <span className="font-bold">Question 2</span>
              <span className="font-bold">
                ?<span> mark</span>
              </span>
            </div>

            <div className="flex items-center mt-3">
              {cloze.answers.map((ans) => (
                <div className="w-24 h-8 bg-purple-400 text-white rounded-lg p-1">
                  {ans}
                </div>
              ))}
            </div>

            <div className="flex items-center mt-3">
              <div className="">
                <BlankFillComponent cloze={cloze} />
              </div>
            </div>
          </div>
        ))}

        {/* COMP  */}
        {form?.comps?.map((comp) => (
          <div className="w-full border-1 border-black rounded-lg p-1 mt-3">
            <div className="w-full flex items-center justify-between">
              <span className="font-bold">Question 3</span>
              <span className="font-bold">
                ?<span> mark</span>
              </span>
            </div>

            <div className="w-full border-2 border-blue-200 flex items-start flex-col mt-4">
              <div className="ml-[1rem]">
                <span className="w-[56rem] p-2">{comp?.paragraph}</span>
              </div>
              <div className="gap-2">
                {comp?.mq?.map((m) => (
                  <div className="ml-[1rem] w-[40rem] mt-1 mb-2 border-2 border-black rounded-lg p-3">
                    <div className="ml-[1rem]">
                      <p className="flex flex-start">Question {m?.id}</p>
                    </div>
                    <div className="ml-[1rem] mt-1">
                      <p className="flex flex-start">
                        <div>
                          <div className="relative group">
                            <span className="">{m?.question}</span>
                          </div>
                        </div>
                      </p>
                      <div className="w-[30rem] p-1 border-1 border-black rounded-lg space-y-2">
                        {/* MCQ Options with Radio Buttons */}
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
                              <div className="relative group">
                                <span className="">{m?.options?.option1}</span>
                              </div>
                            </div>
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
                              <div className="relative group">
                                <span className="">{m?.options?.option2}</span>
                              </div>
                            </div>
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
                              <div className="relative group">
                                <span className="">{m?.options?.option3}</span>
                              </div>
                            </div>
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
                              <div className="relative group">
                                <span className="">{m?.options?.option3}</span>
                              </div>
                            </div>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Form;
