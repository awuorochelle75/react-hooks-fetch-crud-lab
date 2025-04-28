import React, { useState } from "react";

function QuestionItem({ question, onDeleteQuestion, onUpdateQuestion }) {
  const { id, prompt, answers } = question;
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(question.correctIndex);

  function handleDeleteClick() {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((r) => {
        if (r.ok) {
          onDeleteQuestion(id);
        }
      })
      .catch((err) => console.error("Failed to delete question:", err));
  }

  function handleChangeCorrectAnswer(event) {
    const newCorrectIndex = parseInt(event.target.value);
    setCorrectAnswerIndex(newCorrectIndex); 

    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex: newCorrectIndex }),
    })
      .then((r) => r.json())
      .then((updatedQuestion) => {
        onUpdateQuestion(updatedQuestion);
      })
      .catch((err) => console.error("Failed to update question:", err));
  }

  return (
    <li>
      <h4>{prompt}</h4>
      <label>
        Correct Answer:
        <select value={String(correctAnswerIndex)} onChange={handleChangeCorrectAnswer}>
          {answers.map((answer, index) => (
            <option key={index} value={index}>
              {answer}
            </option>
          ))}
        </select>
      </label>
      <button onClick={handleDeleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
