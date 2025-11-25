"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Form, Row, Col, Button } from "react-bootstrap";
import quizzesData from "../../../../../../../Database/quizzes.json";
import QuizQuestions from "./Questionseditor";

export default function QuizEditor() {
  const { cid, qid } = useParams<{ cid: string; qid: string }>();
  const router = useRouter();

  const data = Array.isArray(quizzesData)
    ? quizzesData
    : (quizzesData as any).quizzes || [];

  const quiz = data.find((q: any) => String(q._id) === String(qid));

  if (!quiz) {
    return <div className="p-4 text-danger fw-bold">Quiz not found</div>;
  }

  const [activeTab, setActiveTab] = useState<"details" | "questions">("details");

  const [form, setForm] = useState({
    ...quiz,
    timeLimit: quiz.timeLimit ?? 20,
    showCorrectAnswers: quiz.showCorrectAnswers ?? "Immediately",
    accessCode: quiz.accessCode ?? "",
    oneQuestionAtATime: quiz.oneQuestionAtATime ?? true,
    webcamRequired: quiz.webcamRequired ?? false,
    lockQuestionsAfterAnswering: quiz.lockQuestionsAfterAnswering ?? false,
  });

  
  const [questions, setQuestions] = useState<any[]>(
  Array.isArray(quiz.questions) ? quiz.questions : []
);

  const update = (field: string, value: any) =>
    setForm({ ...form, [field]: value });

  
  const saveQuiz = () => {
    Object.assign(quiz, {
      ...form,
      questions: questions
    });
    router.push(`/Courses/${cid}/Quizzes/${qid}`);
  };

  const totalQuestionPoints = questions.reduce(
    (t, q) => t + Number(q.points || 0),
    0
  );

  return (
    <div className="container py-4" style={{ maxWidth: 950 }}>

      <div className="d-flex justify-content-end align-items-center gap-3 mb-2">
        {activeTab === "details" ? (
          <>
            <div className="fw-semibold">Points {form.points ?? 0}</div>
            <div className="text-muted">Not Published</div>
            <button className="btn btn-outline-secondary btn-sm">⋮</button>
          </>
        ) : (
          <>
            <div className="fw-semibold">
  Points {Array.isArray(questions)
    ? questions.reduce((t, q) => t + Number(q.points || 0), 0)
    : 0}
</div>
          </>
        )}
      </div>

      <hr />

      <div className="border-bottom mb-3 d-flex">
        <div
          onClick={() => setActiveTab("details")}
          style={{
            padding: "8px 16px",
            border: activeTab === "details" ? "1px solid #ccc" : "none",
            borderBottom: activeTab === "details" ? "none" : "1px solid transparent",
            background: activeTab === "details" ? "#fff" : "transparent",
            cursor: "pointer",
          }}
        >
          Details
        </div>

        <div
          onClick={() => setActiveTab("questions")}
          style={{
            padding: "8px 16px",
            color: "red",
            cursor: "pointer",
          }}
        >
          Questions
        </div>
      </div>


      {activeTab === "details" && (
        <Form>

         
          <Form.Group className="mb-3">
            <Form.Control
              value={form.title}
              onChange={(e) => update("title", e.target.value)}
            />
          </Form.Group>

          
          <div className="mb-4">
            <div className="fw-semibold mb-2">Quiz Instructions:</div>

            
            <div className="border p-2 d-flex gap-3">
              <span>Edit</span>
              <span>View</span>
              <span>Insert</span>
              <span>Format</span>
              <span>Tools</span>
              <span>Table</span>
            </div>

            
            <div className="border p-2 d-flex align-items-center gap-3">
              <span>12pt</span>
              <span>Paragraph</span>
              <b>B</b>
              <i>I</i>
              <u>U</u>
              <span>A</span>
            </div>

          
            <Form.Control
              as="textarea"
              rows={5}
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              className="border-top-0"
            />

            <div className="text-danger small mt-1">0 words</div>
          </div>

         
          <Row className="mb-3 align-items-center">
            <Col sm={3} className="text-sm-end">Quiz Type</Col>
            <Col sm={9}>
              <Form.Select
                value={form.quizType}
                size="sm"
                style={{ maxWidth: 280 }}
                onChange={(e) => update("quizType", e.target.value)}
              >
                <option>Graded Quiz</option>
                <option>Practice Quiz</option>
                <option>Graded Survey</option>
                <option>Ungraded Survey</option>
              </Form.Select>
            </Col>
          </Row>

         
          <Row className="mb-3 align-items-center">
            <Col sm={3} className="text-sm-end">Assignment Group</Col>
            <Col sm={9}>
              <Form.Select
                value={form.assignmentGroup}
                size="sm"
                style={{ maxWidth: 280 }}
                onChange={(e) => update("assignmentGroup", e.target.value)}
              >
                <option>QUIZZES</option>
                <option>EXAMS</option>
                <option>ASSIGNMENTS</option>
                <option>PROJECT</option>
              </Form.Select>
            </Col>
          </Row>

          
          <Row className="mb-3 align-items-center">
            <Col sm={3} className="text-sm-end">Points</Col>
            <Col sm={9}>
              <Form.Control
                type="number"
                value={form.points}
                size="sm"
                style={{ maxWidth: 140 }}
                onChange={(e) => update("points", e.target.value)}
              />
            </Col>
          </Row>

          
          <Row className="mb-4 align-items-start">
            <Col sm={3} className="text-sm-end fw-bold">Options</Col>
            <Col sm={9}>
              <div className="border p-3" style={{ maxWidth: 520 }}>

                <Form.Check
                  type="checkbox"
                  label="Shuffle Answers"
                  checked={form.shuffleAnswers}
                  onChange={(e) => update("shuffleAnswers", e.target.checked)}
                />

                <div className="d-flex align-items-center gap-2 mt-2">
                  <Form.Check
                    type="checkbox"
                    label="Time Limit"
                    checked={!!form.timeLimit}
                    onChange={(e) => update("timeLimit", e.target.checked ? 20 : 0)}
                  />
                  <Form.Control
                    type="number"
                    size="sm"
                    style={{ maxWidth: 80 }}
                    value={form.timeLimit}
                    onChange={(e) => update("timeLimit", e.target.value)}
                  />
                  <span>Minutes</span>
                </div>

                <div className="border p-2 mt-3">
                  <Form.Check
                    type="checkbox"
                    label="Allow Multiple Attempts"
                    checked={form.multipleAttempts}
                    onChange={(e) => update("multipleAttempts", e.target.checked)}
                  />
                </div>

                <Form.Group className="mt-3">
                  <Form.Label>Show Correct Answers</Form.Label>
                  <Form.Select
                    size="sm"
                    value={form.showCorrectAnswers}
                    onChange={(e) => update("showCorrectAnswers", e.target.value)}
                  >
                    <option>Immediately</option>
                    <option>After Submission</option>
                    <option>After Due Date</option>
                    <option>Never</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mt-2">
                  <Form.Label>Access Code</Form.Label>
                  <Form.Control
                    size="sm"
                    value={form.accessCode}
                    onChange={(e) => update("accessCode", e.target.value)}
                  />
                </Form.Group>

                <Form.Check
                  className="mt-2"
                  type="checkbox"
                  label="One Question at a Time"
                  checked={form.oneQuestionAtATime}
                  onChange={(e) => update("oneQuestionAtATime", e.target.checked)}
                />

                <Form.Check
                  className="mt-2"
                  type="checkbox"
                  label="Webcam Required"
                  checked={form.webcamRequired}
                  onChange={(e) => update("webcamRequired", e.target.checked)}
                />

                <Form.Check
                  className="mt-2"
                  type="checkbox"
                  label="Lock Questions After Answering"
                  checked={form.lockQuestionsAfterAnswering}
                  onChange={(e) => update("lockQuestionsAfterAnswering", e.target.checked)}
                />
              </div>
            </Col>
          </Row>

         
          <Row className="mb-4">
            <Col sm={3} className="text-sm-end fw-bold">Assign</Col>
            <Col sm={9}>
              <div className="border p-3" style={{ maxWidth: 520, borderStyle: "dashed" }}>
                <div className="fw-semibold mb-2">Assign to</div>
                <Form.Control defaultValue="Everyone" size="sm" className="mb-3" />

                <div className="fw-semibold mb-2">Due</div>
                <Form.Control
                  type="datetime-local"
                  size="sm"
                  className="mb-3"
                  value={form.dueDate}
                  onChange={(e) => update("dueDate", e.target.value)}
                />

                <div className="fw-semibold mb-2">Available from</div>
                <div className="d-flex gap-2 align-items-center">
                  <Form.Control
                    type="datetime-local"
                    size="sm"
                    value={form.availableFrom}
                    onChange={(e) => update("availableFrom", e.target.value)}
                  />
                  <span>Until</span>
                  <Form.Control
                    type="datetime-local"
                    size="sm"
                    value={form.availableUntil}
                    onChange={(e) => update("availableUntil", e.target.value)}
                  />
                </div>

                <div className="text-center mt-2 text-muted">+ Add</div>
              </div>
            </Col>
          </Row>

          <hr />

          <Row>
            <Col sm={{ span: 9, offset: 3 }} className="text-end">
              <Button
                variant="light"
                className="border me-2"
                onClick={() => router.push(`/Courses/${cid}/Quizzes`)}
              >
                Cancel
              </Button>
              <Button variant="danger" onClick={saveQuiz}>
                Save
              </Button>
            </Col>
          </Row>

        </Form>
      )}

      {activeTab === "questions" && (
  <div className="text-center p-4 text-muted">
    <QuizQuestions
    questions={questions}
    setQuestions={setQuestions}/>
  </div>
)}
</div> ); }



      