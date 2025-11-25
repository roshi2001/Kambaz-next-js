"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { BsSearch } from "react-icons/bs";
import {
  FaRocket,
  FaCircleCheck,
  FaEllipsisVertical,
  FaCircleXmark,
} from "react-icons/fa6";
import { ListGroup, ListGroupItem, InputGroup, Form } from "react-bootstrap";
import quizzesData from "../../../../../Database/quizzes.json";
import QuizActions from "./QuizActions";

export default function Quizzes() {
  const { cid } = useParams<{ cid: string }>();
  const router = useRouter();
  const [query, setQuery] = useState("");

  const data = Array.isArray(quizzesData)
    ? quizzesData
    : (quizzesData as any).quizzes || [];

  const quizzes = data.filter((quiz: any) => quiz.course === cid);

  const filteredQuizzes = quizzes.filter((quiz: any) =>
    quiz.title.toLowerCase().includes(query.toLowerCase())
  );

  // ✅ Availability status logic
  const getAvailabilityStatus = (quiz: any) => {
    const now = new Date();
    const start = new Date(quiz.availableFrom);
    const end = new Date(quiz.availableUntil);

    if (now < start) return `Not available until ${start.toLocaleDateString()}`;
    if (now > end) return "Closed";
    return "Available";
  };

  // ✅ ADD QUIZ (default + redirect)
  const handleAddQuiz = () => {
    const newQuiz = {
      _id: `q${Date.now()}`,
      course: cid,
      title: "New Quiz",
      availableFrom: new Date().toISOString(),
      availableUntil: new Date(Date.now() + 7 * 86400000).toISOString(),
      dueDate: new Date(Date.now() + 5 * 86400000).toISOString(),
      points: 0,
      questions: 0,
      published: false,
    };

    data.push(newQuiz);
    router.push(`/Courses/${cid}/Quizzes/${newQuiz._id}`);
  };

  // ✅ Delete quiz
  const handleDelete = (id: string) => {
    const index = data.findIndex((q: any) => q._id === id);
    if (index !== -1) data.splice(index, 1);
  };

  // ✅ Publish toggle
  const togglePublish = (quiz: any) => {
    quiz.published = !quiz.published;
  };

  return (
    <ListGroup id="wd-quizzes" className="rounded-0">

      {/* TOP BAR */}
      <ListGroupItem className="d-flex align-items-center border-0 px-0">
        <InputGroup style={{ maxWidth: 360 }}>
          <InputGroup.Text className="bg-white">
            <BsSearch />
          </InputGroup.Text>
          <Form.Control
            placeholder="Search for Quiz"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </InputGroup>

        <div className="ms-auto d-flex align-items-center">
          <button
            className="fs-5 btn btn-danger btn-sm"
            onClick={handleAddQuiz}
          >
            + Quiz
          </button>

          <span
            className="fs-4 ms-3 text-secondary"
            style={{ cursor: "pointer" }}
            title="Quiz Options"
          >
            <FaEllipsisVertical />
          </span>
        </div>
      </ListGroupItem>

      {/* HEADER */}
      <ListGroupItem className="p-0 border-0">
        <div
          className="d-flex align-items-center border rounded-1"
          style={{ background: "#f3f3f3", padding: "10px 12px" }}
        >
          <span className="me-2 fs-4 text-secondary">▾</span>
          <span className="fs-5 fw-semibold">Assignment Quizzes</span>
        </div>
      </ListGroupItem>

      {/* QUIZ CONTAINER */}
      <ListGroupItem className="p-0 border-0 position-relative">

        <span
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: "4px",
            background: "#198754",
          }}
        />

        <ListGroup className="rounded-0" style={{ marginLeft: "4px" }}>

          {filteredQuizzes.length === 0 ? (
            <ListGroupItem className="p-3 text-muted">
              No quizzes found. Click <b>+ Quiz</b> to create one.
            </ListGroupItem>
          ) : (
            filteredQuizzes.map((quiz: any) => (
              <ListGroupItem key={quiz._id} className="p-3 rounded-0 border">

                <div className="d-flex align-items-center">

                  {/* Rocket Icon */}
                  <span className="me-3 fs-4 text-success">
                    <FaRocket />
                  </span>

                  {/* Quiz Text */}
                  <div className="flex-grow-1">
                    <Link
                      href={`/Courses/${cid}/Quizzes/${quiz._id}`}
                      className="fw-semibold fs-5 text-decoration-none text-dark"
                    >
                      {quiz.title}
                    </Link>

                    <div className="text-muted">
                      {getAvailabilityStatus(quiz)} | Due{" "}
                      {new Date(quiz.dueDate).toLocaleString()} |{" "}
                      {quiz.points} pts | {quiz.questions} Questions
                      {quiz.score !== null && ` | Score: ${quiz.score}`}
                    </div>
                  </div>

                  {/* ✅ CLICKABLE Publish Icon */}
                  <span
                    className="me-3"
                    style={{ cursor: "pointer" }}
                    onClick={() => togglePublish(quiz)}
                    title={quiz.published ? "Unpublish Quiz" : "Publish Quiz"}
                  >
                    {quiz.published ? (
                      <FaCircleCheck className="text-success fs-4" />
                    ) : (
                      <FaCircleXmark className="text-secondary fs-4" />
                    )}
                  </span>

                  {/* 3 DOT ACTION MENU */}
                  <QuizActions
                    quiz={quiz}
                    onEdit={() => router.push(`/Courses/${cid}/Quizzes/${quiz._id}`)}
                    onDelete={() => handleDelete(quiz._id)}
                    onTogglePublish={() => togglePublish(quiz)}
                  />

                </div>
              </ListGroupItem>
            ))
          )}
        </ListGroup>
      </ListGroupItem>
    </ListGroup>
  );
}
