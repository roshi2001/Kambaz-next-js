"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import quizzesData from "../../../../../../Database/quizzes.json";

type Answer = {
  id: string;
  text: string;
};

type Question = {
  id: string;
  title: string;
  type: "Multiple Choice" | "True/False" | "Fill In the Blank";
  points: number;
  question: string;
  answers?: Answer[];
  correctAnswerId?: string;
  trueFalseAnswer?: boolean;
  fillInBlankAnswers?: string[];
};

export default function QuizPreview() {
  const { qid } = useParams<{ qid: string }>();
  const router = useRouter();
  
  const [quizStarted, setQuizStarted] = useState(false);
  const [userAnswers, setUserAnswers] = useState<{[key: string]: any}>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const quiz = (Array.isArray(quizzesData) ? quizzesData : quizzesData.quizzes).find(
    (q: any) => q._id === qid
  );

  if (!quiz) return <div className="p-4">Quiz not found</div>;

  const questions: Question[] = Array.isArray(quiz.questions) ? quiz.questions : [];

  console.log("Quiz:", quiz);
  console.log("Questions:", questions);
  console.log("Questions length:", questions.length);

  const formatCanvasDate = (dateStr: string) => {
    const d = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    };

    return d
      .toLocaleString("en-US", options)
      .replace(",", "")
      .replace(" AM", "am")
      .replace(" PM", "pm")
      .replace(" ", " at ");
  };

  const handleAnswerChange = (questionId: string, answer: any) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const calculateScore = () => {
    let totalScore = 0;
    let earnedScore = 0;

    if (!Array.isArray(questions)) {
      return { earnedScore: 0, totalScore: 0 };
    }

    questions.forEach(q => {
      totalScore += q.points || 0;
      const userAnswer = userAnswers[q.id];

      if (q.type === "Multiple Choice") {
        if (userAnswer === q.correctAnswerId) {
          earnedScore += q.points || 0;
        }
      } else if (q.type === "True/False") {
        if (userAnswer === q.trueFalseAnswer) {
          earnedScore += q.points || 0;
        }
      } else if (q.type === "Fill In the Blank") {
        if (q.fillInBlankAnswers?.some(ans => 
          ans.toLowerCase() === userAnswer?.toLowerCase()
        )) {
          earnedScore += q.points || 0;
        }
      }
    });

    return { earnedScore, totalScore };
  };

  const handleSubmit = () => {
    const { earnedScore } = calculateScore();
    setScore(earnedScore);
    setSubmitted(true);
  };

  const isCorrect = (questionId: string) => {
    const q = questions.find(question => question.id === questionId);
    if (!q) return false;

    const userAnswer = userAnswers[questionId];

    if (q.type === "Multiple Choice") {
      return userAnswer === q.correctAnswerId;
    } else if (q.type === "True/False") {
      return userAnswer === q.trueFalseAnswer;
    } else if (q.type === "Fill In the Blank") {
      return q.fillInBlankAnswers?.some(ans => 
        ans.toLowerCase() === userAnswer?.toLowerCase()
      );
    }
    return false;
  };

  const { totalScore } = calculateScore();

  // ========== QUIZ RESULTS VIEW (after submission) ==========
  if (submitted) {
    return (
      <div className="container mt-4" style={{ maxWidth: "900px" }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>{quiz.title}</h2>
          <Button 
            variant="outline-secondary"
            onClick={() => router.push(`/Courses/${quiz.course}/Quizzes/${qid}/edit`)}
          >
            ✏️ Edit
          </Button>
        </div>

        <div className="alert alert-info mb-4">
          <h4>Quiz Results</h4>
          <p className="mb-1">
            <strong>Your Score: {score} out of {totalScore} points</strong>
          </p>
          <p className="mb-0">
            Percentage: {totalScore > 0 ? ((score / totalScore) * 100).toFixed(2) : 0}%
          </p>
        </div>

        {questions.map((q, index) => {
          const correct = isCorrect(q.id);
          return (
            <div 
              key={q.id} 
              className={`border p-4 mb-3 rounded ${correct ? 'border-success bg-success-subtle' : 'border-danger bg-danger-subtle'}`}
            >
              <div className="d-flex justify-content-between align-items-start mb-3">
                <h5>Question {index + 1}</h5>
                <span className={`badge ${correct ? 'bg-success' : 'bg-danger'}`}>
                  {correct ? `✓ Correct (${q.points}/${q.points} pts)` : `✗ Incorrect (0/${q.points} pts)`}
                </span>
              </div>

              <p className="mb-3"><strong>{q.question}</strong></p>

              {q.type === "Multiple Choice" && (
                <div>
                  {q.answers?.map(ans => (
                    <div 
                      key={ans.id}
                      className={`p-2 mb-2 rounded ${
                        ans.id === q.correctAnswerId ? 'bg-success text-white' : 
                        ans.id === userAnswers[q.id] && ans.id !== q.correctAnswerId ? 'bg-danger text-white' : 
                        'bg-light'
                      }`}
                    >
                      <Form.Check
                        type="radio"
                        label={ans.text}
                        checked={userAnswers[q.id] === ans.id}
                        disabled
                        readOnly
                      />
                      {ans.id === q.correctAnswerId && (
                        <small className="d-block ms-4 mt-1">✓ Correct Answer</small>
                      )}
                      {ans.id === userAnswers[q.id] && ans.id !== q.correctAnswerId && (
                        <small className="d-block ms-4 mt-1">✗ Your Answer</small>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {q.type === "True/False" && (
                <div>
                  <div className={`p-2 mb-2 rounded ${
                    q.trueFalseAnswer === true ? 'bg-success text-white' : 
                    userAnswers[q.id] === true && q.trueFalseAnswer !== true ? 'bg-danger text-white' : 
                    'bg-light'
                  }`}>
                    <Form.Check
                      type="radio"
                      label="True"
                      checked={userAnswers[q.id] === true}
                      disabled
                      readOnly
                    />
                    {q.trueFalseAnswer === true && (
                      <small className="d-block ms-4 mt-1">✓ Correct Answer</small>
                    )}
                  </div>
                  <div className={`p-2 mb-2 rounded ${
                    q.trueFalseAnswer === false ? 'bg-success text-white' : 
                    userAnswers[q.id] === false && q.trueFalseAnswer !== false ? 'bg-danger text-white' : 
                    'bg-light'
                  }`}>
                    <Form.Check
                      type="radio"
                      label="False"
                      checked={userAnswers[q.id] === false}
                      disabled
                      readOnly
                    />
                    {q.trueFalseAnswer === false && (
                      <small className="d-block ms-4 mt-1">✓ Correct Answer</small>
                    )}
                  </div>
                </div>
              )}

              {q.type === "Fill In the Blank" && (
                <div>
                  <p><strong>Your Answer:</strong> <span className={correct ? 'text-success' : 'text-danger'}>{userAnswers[q.id] || "(No answer)"}</span></p>
                  <p><strong>Correct Answers:</strong> <span className="text-success">{q.fillInBlankAnswers?.join(", ")}</span></p>
                </div>
              )}
            </div>
          );
        })}

        <div className="d-flex gap-2 mt-4">
          <Button variant="secondary" onClick={() => {
            setSubmitted(false);
            setQuizStarted(false);
            setUserAnswers({});
            setScore(0);
          }}>
            Take Quiz Again
          </Button>
          <Button 
            variant="primary"
            onClick={() => router.push(`/Courses/${quiz.course}/Quizzes`)}
          >
            Back to Quizzes
          </Button>
        </div>
      </div>
    );
  }

  // ========== TAKING QUIZ VIEW ==========
  if (quizStarted) {
    return (
      <div className="container mt-4" style={{ maxWidth: "900px" }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>{quiz.title}</h2>
          <Button 
            variant="outline-secondary"
            onClick={() => router.push(`/Courses/${quiz.course}/Quizzes/${qid}/edit`)}
          >
            ✏️ Edit
          </Button>
        </div>

        <div className="alert alert-warning mb-4">
          <strong>Quiz Instructions:</strong> Answer all questions and click Submit when done.
        </div>

        <div className="border p-3 mb-4 bg-light">
          <div className="row">
            <div className="col-md-4">
              <strong>Total Points:</strong> {totalScore}
            </div>
            <div className="col-md-4">
              <strong>Questions:</strong> {questions.length}
            </div>
            <div className="col-md-4">
              <strong>Time Limit:</strong> {quiz.timeLimit || 30} Minutes
            </div>
          </div>
        </div>

        {questions.length === 0 ? (
          <div className="alert alert-warning">
            <strong>No questions available.</strong> Please add questions in the edit mode.
          </div>
        ) : (
          questions.map((q, index) => (
            <div key={q.id} className="border p-4 mb-4 rounded bg-white">
              <div className="d-flex justify-content-between mb-3">
                <h5>Question {index + 1}</h5>
                <span className="badge bg-secondary">{q.points} pts</span>
              </div>

              <div className="mb-3">
                <p className="fw-bold fs-5">{q.question}</p>
              </div>

              {q.type === "Multiple Choice" && (
                <div>
                  {q.answers?.map(ans => (
                    <Form.Check
                      key={ans.id}
                      type="radio"
                      name={`question-${q.id}`}
                      label={ans.text}
                      checked={userAnswers[q.id] === ans.id}
                      onChange={() => handleAnswerChange(q.id, ans.id)}
                      className="mb-2"
                    />
                  ))}
                </div>
              )}

              {q.type === "True/False" && (
                <div>
                  <Form.Check
                    type="radio"
                    name={`question-${q.id}`}
                    label="True"
                    checked={userAnswers[q.id] === true}
                    onChange={() => handleAnswerChange(q.id, true)}
                    className="mb-2"
                  />
                  <Form.Check
                    type="radio"
                    name={`question-${q.id}`}
                    label="False"
                    checked={userAnswers[q.id] === false}
                    onChange={() => handleAnswerChange(q.id, false)}
                    className="mb-2"
                  />
                </div>
              )}

              {q.type === "Fill In the Blank" && (
                <Form.Control
                  type="text"
                  placeholder="Type your answer here"
                  value={userAnswers[q.id] || ""}
                  onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                  style={{ maxWidth: "400px" }}
                />
              )}
            </div>
          ))
        )}

        <div className="d-flex gap-2 mb-5">
          <Button 
            variant="secondary" 
            onClick={() => {
              setQuizStarted(false);
              setUserAnswers({});
            }}
          >
            Cancel
          </Button>
          <Button variant="danger" onClick={handleSubmit}>
            Submit Quiz
          </Button>
        </div>
      </div>
    );
  }

  // ========== QUIZ DETAILS VIEW - ALWAYS SHOW BUTTONS ==========
  return (
    <div className="w-100 d-flex justify-content-center mt-4">
      <div style={{ width: "900px" }}>

        {/* ✅ ALWAYS SHOW PREVIEW AND EDIT BUTTONS */}
        <div className="text-center mb-4">
          <button 
            className="btn btn-outline-secondary me-3"
            onClick={() => {
              console.log("Preview clicked");
              setQuizStarted(true);
            }}
            style={{ minWidth: "100px" }}
          >
            Preview
          </button>
          <button
            className="btn btn-outline-secondary"
            onClick={() => router.push(`/Courses/${quiz.course}/Quizzes/${qid}/edit`)}
            style={{ minWidth: "100px" }}
          >
            ✏️ Edit
          </button>
        </div>

        <div
          className="p-4"
          style={{
            border: "2px dotted #bcbcbc",
            borderRadius: "2px"
          }}
        >

          <h4 className="mb-4 fw-bold">{quiz.title}</h4>

          <div className="quiz-details-grid">
            <div className="qd-row"><span>Quiz Type</span><span>Graded Quiz</span></div>
            <div className="qd-row"><span>Points</span><span>{quiz.points}</span></div>
            <div className="qd-row"><span>Assignment Group</span><span>QUIZZES</span></div>
            <div className="qd-row"><span>Shuffle Answers</span><span>No</span></div>
            <div className="qd-row"><span>Time Limit</span><span>{quiz.timeLimit || 30} Minutes</span></div>
            <div className="qd-row"><span>Multiple Attempts</span><span>No</span></div>
            <div className="qd-row"><span>View Responses</span><span>Always</span></div>
            <div className="qd-row"><span>Show Correct Answers</span><span>Immediately</span></div>
            <div className="qd-row"><span>One Question at a Time</span><span>Yes</span></div>
            <div className="qd-row"><span>Webcam Required</span><span>No</span></div>
            <div className="qd-row"><span>Lock Questions After Answering</span><span>No</span></div>
          </div>

          <hr className="my-4" />

          <div className="d-flex justify-content-between text-center">
            <div>
              <strong>Due</strong><br />
              {formatCanvasDate(quiz.dueDate)}
            </div>
            <div>
              <strong>For</strong><br />
              Everyone
            </div>
            <div>
              <strong>Available from</strong><br />
              {formatCanvasDate(quiz.availableFrom)}
            </div>
            <div>
              <strong>Until</strong><br />
              {formatCanvasDate(quiz.availableUntil)}
            </div>
          </div>
        </div>

        {/* ✅ ALWAYS SHOW START QUIZ BUTTON */}
        <div className="text-center mt-4">
          <Button 
            variant="danger" 
            size="lg"
            onClick={() => {
              console.log("Start Quiz clicked");
              setQuizStarted(true);
            }}
          >
            Start Quiz
          </Button>
        </div>

        {/* Debug info */}
        {questions.length === 0 && (
          <div className="alert alert-warning mt-3">
            <strong>Note:</strong> This quiz has no questions yet. Click Edit to add questions.
          </div>
        )}
      </div>

      <style jsx>{`
        .quiz-details-grid {
          display: grid;
          row-gap: 10px;
        }

        .qd-row {
          display: grid;
          grid-template-columns: 300px auto;
        }

        .qd-row span:first-child {
          text-align: right;
          font-weight: 600;
          padding-right: 12px;
        }

        .qd-row span:last-child {
          text-align: left;
        }
      `}</style>
    </div>
  );
}