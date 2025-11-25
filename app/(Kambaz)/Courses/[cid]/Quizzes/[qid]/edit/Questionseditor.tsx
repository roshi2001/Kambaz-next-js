"use client";

import { Button, Form } from "react-bootstrap";
import { FaTrash, FaPencilAlt } from "react-icons/fa";
import { useRouter, useParams } from "next/navigation";

type Answer = {
  id: string;
  text: string;
};

type Question = {
  id: string;
  title: string;
  type: "Multiple Choice" | "True/False" | "Fill In the Blank";
  points: number;
  answers: Answer[];
  correctAnswerId: string;
  trueFalseAnswer?: boolean;
  fillInBlankAnswers?: string[]; // for Fill in the Blank
};

export default function QuizQuestions({
  questions,
  setQuestions,
}: {
  questions?: Question[];
  setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
}) {

  const safeQuestions = Array.isArray(questions) ? questions : [];
  const router = useRouter();
const { cid, qid } = useParams<{ cid: string; qid: string }>();
  const addQuestion = () => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      title: "Easy Question",
      type: "Multiple Choice",
      points: 4,
      correctAnswerId: "",
      answers: [
        { id: "1", text: "" },
        { id: "2", text: "" },
        { id: "3", text: "" },
        { id: "4", text: "" },
      ],
    };
    setQuestions([...safeQuestions, newQuestion]);
  };

  const updateQuestion = (id: string, field: string, value: any) => {
    setQuestions(prev =>
      prev.map(q => {
        if (q.id === id) {
          // If changing type to True/False
          if (field === "type" && value === "True/False") {
            return { 
              ...q, 
              [field]: value,
              trueFalseAnswer: true,
              answers: [],
              correctAnswerId: "",
              fillInBlankAnswers: undefined
            };
          }
          // If changing type to Multiple Choice
          if (field === "type" && value === "Multiple Choice") {
            return { 
              ...q, 
              [field]: value,
              trueFalseAnswer: undefined,
              fillInBlankAnswers: undefined,
              answers: [
                { id: "1", text: "" },
                { id: "2", text: "" },
                { id: "3", text: "" },
                { id: "4", text: "" },
              ],
              correctAnswerId: ""
            };
          }
        
          if (field === "type" && value === "Fill In the Blank") {
            return { 
              ...q, 
              [field]: value,
              trueFalseAnswer: undefined,
              answers: [],
              correctAnswerId: "",
              fillInBlankAnswers: [""]
            };
          }
          return { ...q, [field]: value };
        }
        return q;
      })
    );
  };

  const addAnswer = (qid: string) => {
    setQuestions(prev =>
      prev.map(q =>
        q.id === qid
          ? { ...q, answers: [...q.answers, { id: Date.now().toString(), text: "" }] }
          : q
      )
    );
  };

  const removeAnswer = (qid: string, aid: string) => {
    setQuestions(prev =>
      prev.map(q =>
        q.id === qid
          ? { ...q, answers: q.answers.filter(a => a.id !== aid) }
          : q
      )
    );
  };

  const addFillInBlankAnswer = (qid: string) => {
    setQuestions(prev =>
      prev.map(q =>
        q.id === qid
          ? { ...q, fillInBlankAnswers: [...(q.fillInBlankAnswers || []), ""] }
          : q
      )
    );
  };

  const updateFillInBlankAnswer = (qid: string, index: number, value: string) => {
    setQuestions(prev =>
      prev.map(q =>
        q.id === qid
          ? {
              ...q,
              fillInBlankAnswers: q.fillInBlankAnswers?.map((ans, i) => 
                i === index ? value : ans
              )
            }
          : q
      )
    );
  };

  const removeFillInBlankAnswer = (qid: string, index: number) => {
    setQuestions(prev =>
      prev.map(q =>
        q.id === qid
          ? {
              ...q,
              fillInBlankAnswers: q.fillInBlankAnswers?.filter((_, i) => i !== index)
            }
          : q
      )
    );
  };

  const deleteQuestion = (qid: string) => {
    setQuestions(prev => prev.filter(q => q.id !== qid));
  };
  

  return (
    <div style={{ minHeight: "400px" }}>

      {safeQuestions.map(q => (
        <div key={q.id} className="border p-4 mb-4 rounded bg-light">

          
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="d-flex gap-3 align-items-center">
              <Form.Control
                style={{ width: 180 }}
                value={q.title}
                onChange={e => updateQuestion(q.id, "title", e.target.value)}
              />
              <Form.Select 
                style={{ width: 200 }}
                value={q.type}
                onChange={e => updateQuestion(q.id, "type", e.target.value)}
              >
                <option>Multiple Choice</option>
                <option>True/False</option>
                <option>Fill In the Blank</option>
              </Form.Select>
            </div>

            <div className="d-flex align-items-center gap-2">
              <span>pts:</span>
              <Form.Control
                type="number"
                style={{ width: 70 }}
                value={q.points}
                onChange={e => updateQuestion(q.id, "points", e.target.value)}
              />
            </div>
          </div>

          
          <p className="text-muted small mb-2">
            {q.type === "Multiple Choice" 
              ? "Enter your question and multiple answers, then select the one correct answer."
              : q.type === "True/False"
              ? "Enter your question text, then select if True or False is the correct answer."
              : "Enter your question text, then define all possible correct answers for the blank. Students will see the question followed by a small text box to type their answer."}
          </p>

          
          <div className="mb-2">
            <strong>Question:</strong>
          </div>

          
          <div className="bg-white border p-2 mb-2" style={{ borderRadius: "4px 4px 0 0" }}>
            <div className="d-flex gap-3 align-items-center small">
              <span>Edit</span>
              <span>View</span>
              <span>Insert</span>
              <span>Format</span>
              <span>Tools</span>
              <span>Table</span>
            </div>
            <div className="d-flex gap-2 mt-2 align-items-center">
              <Form.Select size="sm" style={{ width: "80px" }}>
                <option>12pt</option>
              </Form.Select>
              <Form.Select size="sm" style={{ width: "120px" }}>
                <option>Paragraph</option>
              </Form.Select>
              <Button variant="light" size="sm"><strong>B</strong></Button>
              <Button variant="light" size="sm"><em>I</em></Button>
              <Button variant="light" size="sm"><u>U</u></Button>
              <span>...</span>
            </div>
          </div>

         
          <Form.Control 
            as="textarea" 
            rows={3} 
            className="mb-3"
            placeholder="Enter your question"
            style={{ borderRadius: "0 0 4px 4px" }}
          />

         
          <div className="mb-3">
            <strong>Answers:</strong>
          </div>

         
          {q.type === "Multiple Choice" ? (
            <>
              
              {q.answers.map((a, index) => (
                <div key={a.id} className="d-flex align-items-center gap-2 mb-3">
                  {q.correctAnswerId === a.id ? (
                    <span style={{ color: "green", fontSize: "20px" }}>✓</span>
                  ) : (
                    <span style={{ color: "#999", fontSize: "20px" }}>➜</span>
                  )}
                  
                  <span style={{ minWidth: "120px" }}>
                    {q.correctAnswerId === a.id ? (
                      <span style={{ color: "green", fontWeight: 500 }}>Correct Answer</span>
                    ) : (
                      <span style={{ color: "#666" }}>Possible Answer</span>
                    )}
                  </span>

                  <Form.Control
                    value={a.text}
                    style={{ maxWidth: "300px" }}
                    onChange={e =>
                      setQuestions(prev =>
                        prev.map(qq =>
                          qq.id === q.id
                            ? {
                                ...qq,
                                answers: qq.answers.map(ans =>
                                  ans.id === a.id ? { ...ans, text: e.target.value } : ans
                                ),
                              }
                            : qq
                        )
                      )
                    }
                    onClick={() => updateQuestion(q.id, "correctAnswerId", a.id)}
                  />

                  <FaPencilAlt style={{ color: "#999", cursor: "pointer" }} />
                  <FaTrash
                    onClick={() => removeAnswer(q.id, a.id)}
                    style={{ cursor: "pointer", color: "#999" }}
                  />
                </div>
              ))}

              <div
                className="text-danger mt-2"
                style={{ cursor: "pointer", fontSize: "14px" }}
                onClick={() => addAnswer(q.id)}
              >
                + Add Another Answer
              </div>
            </>
          ) : q.type === "True/False" ? (
            <>
             
              <div className="d-flex align-items-center gap-3 mb-3">
                <span style={{ 
                  color: q.trueFalseAnswer === true ? "green" : "#999", 
                  fontSize: "20px" 
                }}>
                  {q.trueFalseAnswer === true ? "✓" : "➜"}
                </span>
                <span 
                  style={{ 
                    color: q.trueFalseAnswer === true ? "green" : "#666",
                    fontWeight: q.trueFalseAnswer === true ? 600 : 400,
                    cursor: "pointer",
                    fontSize: "16px"
                  }}
                  onClick={() => updateQuestion(q.id, "trueFalseAnswer", true)}
                >
                  True
                </span>
              </div>

              <div className="d-flex align-items-center gap-3 mb-3">
                <span style={{ 
                  color: q.trueFalseAnswer === false ? "green" : "#999", 
                  fontSize: "20px" 
                }}>
                  {q.trueFalseAnswer === false ? "✓" : "➜"}
                </span>
                <span 
                  style={{ 
                    color: q.trueFalseAnswer === false ? "green" : "#666",
                    fontWeight: q.trueFalseAnswer === false ? 600 : 400,
                    cursor: "pointer",
                    fontSize: "16px"
                  }}
                  onClick={() => updateQuestion(q.id, "trueFalseAnswer", false)}
                >
                  False
                </span>
              </div>
            </>
          ) : (
            <>
              
              {q.fillInBlankAnswers?.map((answer, index) => (
                <div key={index} className="d-flex align-items-center gap-2 mb-3">
                  <span style={{ minWidth: "140px", color: "#666" }}>
                    Possible Answer:
                  </span>

                  <Form.Control
                    value={answer}
                    style={{ maxWidth: "300px" }}
                    onChange={e => updateFillInBlankAnswer(q.id, index, e.target.value)}
                    placeholder="Enter possible answer"
                  />

                  <FaTrash
                    onClick={() => removeFillInBlankAnswer(q.id, index)}
                    style={{ cursor: "pointer", color: "#999" }}
                  />
                </div>
              ))}

              <div
                className="text-danger mt-2"
                style={{ cursor: "pointer", fontSize: "14px" }}
                onClick={() => addFillInBlankAnswer(q.id)}
              >
                + Add Another Answer
              </div>
            </>
          )}

         
          <div className="mt-4 d-flex gap-2">
            <Button variant="light" className="border" onClick={() => deleteQuestion(q.id)}>
              Cancel
            </Button>
            <Button variant="danger">
              Update Question
            </Button>
          </div>
        </div>
      ))}

      <div className="text-center my-4">
        <Button variant="light" className="border px-4 py-3" onClick={addQuestion}>
          + New Question
        </Button>
      </div>

      <hr />

      <div className="d-flex gap-2">
        <Button
  variant="light"
  className="border"
  onClick={() => {
    router.push(`/Courses/${cid}/Quizzes/${qid}`);
  }}
>
  Cancel
</Button>
        <Button
  variant="danger"
  onClick={() => {
    router.push(`/Courses/${cid}/Quizzes/${qid}`);
  }}
>
  Save
</Button>
      </div>
    </div>
  );
}