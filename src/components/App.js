import React, { useState, useEffect } from "react";
import QuestionList from "./QuestionList";
import QuestionForm from "./QuestionForm";

function App() {
  const [questions, setQuestions] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then((data) => setQuestions(data))
      .catch((err) => console.error("Failed to fetch questions:", err));
  }, []);

  function handleAddQuestion(newQuestion) {
   
    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newQuestion),
    })
      .then((r) => r.json())
      .then((savedQuestion) => {
        setQuestions([...questions, savedQuestion]);
      })
      .catch((err) => console.error("Failed to save question:", err));
  }
  
  function handleDeleteQuestion(deletedQuestionId) {
    const updatedQuestions = questions.filter(
      (question) => question.id !== deletedQuestionId
    );
    setQuestions(updatedQuestions);
  }

  function handleUpdateQuestion(updatedQuestion) {
    const updatedQuestions = questions.map((q) =>
      q.id === updatedQuestion.id ? updatedQuestion : q
    );
    setQuestions(updatedQuestions);
  }

  return (
    <main>
      <nav>
        <button onClick={() => setShowForm(true)}>New Question</button>
        <button onClick={() => setShowForm(false)}>View Questions</button>
      </nav>
      <section>
        <h1>Quiz Questions</h1>
        {showForm ? (
          <QuestionForm onAddQuestion={handleAddQuestion} />
        ) : (
          <QuestionList
            questions={questions}
            onDeleteQuestion={handleDeleteQuestion}
            onUpdateQuestion={handleUpdateQuestion}
          />
        )}
      </section>
    </main>
  );
}

export default App;
