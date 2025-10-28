"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import type { RootState } from "@reduxjs/toolkit/query";
import { useDispatch } from "react-redux";
import { deleteAssignment } from "./reducer";
import { FaTrash } from "react-icons/fa";

import AssignmentControlButtons from "./AssignmentControlButtons";
import LessonControlButtons from "../Modules/LessonControlButtons";

import { ListGroup, ListGroupItem, InputGroup, Form } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import { BsSearch, BsGripVertical } from "react-icons/bs";
import { FaRegFileAlt } from "react-icons/fa";

type Assignment = {
  _id: string;
  title: string;
  course: string | number;
  availableFrom?: string;
  dueDate?: string;
  points?: number;
};

function fmtDate(iso?: string) {
  if (!iso) return "";
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  const month = d.toLocaleString(undefined, { month: "short" });
  const day = d.getDate();
  let hours = d.getHours();
  const minutes = pad(d.getMinutes());
  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12 || 12;
  return `${month} ${day} at ${hours}:${minutes}${ampm}`;
}

export default function Assignments() {
  const { cid } = useParams<{ cid: string }>();
  const router = useRouter();
  const [query, setQuery] = useState("");

  
  const all = useSelector((s: RootState) => s.assignments.assignments) as Assignment[];

  const assignments = useMemo(() => {
    const forCourse = all.filter((a) => String(a.course) === String(cid));
    const q = query.trim().toLowerCase();
    return q ? forCourse.filter((a) => a.title.toLowerCase().includes(q)) : forCourse;
  }, [all, cid, query]);
  const dispatch = useDispatch();

const handleDelete = (id: string) => {
  if (confirm("Are you sure you want to delete this assignment?")) {
    dispatch(deleteAssignment(id));
  }
};


  return (
    <ListGroup id="wd-assignments" className="rounded-0">
     
      <ListGroupItem className="d-flex align-items-center border-0 px-0">
        <InputGroup style={{ maxWidth: 360 }}>
          <InputGroup.Text className="bg-white">
            <BsSearch />
          </InputGroup.Text>
          <Form.Control
            id="wd-search-assignment"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </InputGroup>

        <div className="ms-auto">
          <button className="fs-5 btn btn-light btn-sm me-2 border">+ Group</button>
          <button
  className="fs-5 btn btn-danger btn-sm"
  id="wd-new-assignment-btn"
  onClick={() => router.push(`/Courses/${cid}/Assignments/new`)}
>
  + Assignment
</button>
        </div>
      </ListGroupItem>

      
      <ListGroupItem className="p-0 border-0">
        <div
          className="d-flex align-items-center justify-content-between border rounded-1"
          style={{ background: "#f3f3f3", padding: "10px 12px" }}
        >
          <div className="d-flex align-items-center">
            <span className="me-2 fs-3 text-secondary">
              <BsGripVertical />
            </span>
            <Dropdown>
              <Dropdown.Toggle
                id="wd-publish-all-btn"
                variant="link"
                size="sm"
                className="p-2 fs-5 m-0 bg-transparent text-dark border-0 shadow-none text-secondary"
              />
            </Dropdown>
            <span className="fs-5 fw-semibold ms-1">ASSIGNMENTS</span>
          </div>

          <div className="d-flex align-items-center">
            <span className="badge rounded-pill bg-light text-dark border me-2 fw-semibold">
              40% of Total
            </span>
            <AssignmentControlButtons />
          </div>
        </div>
      </ListGroupItem>

     
      <ListGroupItem className="p-0 border-0">
        <ListGroup id="wd-assignment-list" className="rounded-0">
          {assignments.length === 0 ? (
            <ListGroupItem className="p-3 border-0 text-muted">
              No assignments found for course <code>{cid}</code>.
            </ListGroupItem>
          ) : (
            assignments.map((a) => (
              <ListGroupItem
                key={a._id}
                className="p-3 ps-3 rounded-0 border position-relative"
              >
                <span
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    left: 0,
                    top: "-1px",
                    bottom: "-1px",
                    width: "4px",
                    background: "#198754",
                    pointerEvents: "none",
                  }}
                />
                <div className="d-flex align-items-center">
                  <span className="me-2 fs-3 text-secondary">
                    <BsGripVertical />
                  </span>
                  <span className="me-3 fs-4 text-success">
                    <FaRegFileAlt />
                  </span>

                  <div className="flex-grow-1">
                    <div className="fs-5 fw-semibold text-dark">
                      <Link
                        href={`/Courses/${cid}/Assignments/${a._id}`}
                        id={`wd-assignment-${a._id}-link`}
                        className="text-decoration-none text-dark"
                      >
                        {a.title}
                      </Link>
                    </div>

                    <div className="fs-6 text-muted">
                      <span className="text-danger">Multiple Modules</span>
                      <span className="mx-2">|</span>
                      <b>Not available until</b> {fmtDate(a.availableFrom)}
                      <span className="mx-2">|</span>
                    </div>

                    <div className="text-muted small">
                      <b>Due</b> {fmtDate(a.dueDate)}
                      <span className="mx-2">|</span>
                      {a.points ?? 0} pts
                    </div>
                  </div>

                  <button
        className="btn btn-sm text-danger border-0 ms-2"
        onClick={() => handleDelete(a._id)}
      >
        <FaTrash />
      </button>

                  <div className="ms-3 d-flex align-items-center">
                    <LessonControlButtons />
                  </div>
                </div>
              </ListGroupItem>
            ))
          )}
        </ListGroup>
      </ListGroupItem>
    </ListGroup>
  );
}
