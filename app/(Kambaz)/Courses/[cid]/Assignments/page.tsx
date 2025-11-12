"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/lib/store";
import { setAssignments } from "./reducer";
import * as client from "../../client";
import { FaTrash, FaRegFileAlt } from "react-icons/fa";
import AssignmentControlButtons from "./AssignmentControlButtons";
import LessonControlButtons from "../Modules/LessonControlButtons";
import { ListGroup, ListGroupItem, InputGroup, Form } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import { BsSearch, BsGripVertical } from "react-icons/bs";

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

export default function AssignmentsPage() {
  const { cid } = useParams<{ cid: string }>();
  const router = useRouter();
  const dispatch = useDispatch();

  const all = useSelector(
    (s: RootState) => s.assignments.assignments
  ) as Assignment[];

  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!cid) return;
    (async () => {
      const rows = await client.findAssignmentsForCourse(cid as string);
      dispatch(setAssignments(rows));
    })();
  }, [cid, dispatch]);

  const assignments = useMemo(() => {
    const forCourse = (all ?? []).filter((a) => String(a.course) === String(cid));
    const q = query.trim().toLowerCase();
    return q ? forCourse.filter((a) => a.title.toLowerCase().includes(q)) : forCourse;
  }, [all, cid, query]);

  const handleDelete = async (id: string) => {
    if (!id) return;
    if (!confirm("Are you sure you want to delete this assignment?")) return;
    await client.deleteAssignment(id);
    dispatch(setAssignments((all ?? []).filter((a) => a._id !== id)));
  };

  return (
    <ListGroup id="wd-assignments" className="rounded-0">
      {/* Top bar */}
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

      {/* List */}
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
                    aria-label="Delete assignment"
                    title="Delete assignment"
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
