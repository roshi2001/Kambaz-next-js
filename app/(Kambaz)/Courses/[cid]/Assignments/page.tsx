"use client";

import Link from "next/link";
import AssignmentControlButtons from "./AssignmentControlButtons";
import LessonControlButtons from "../Modules/LessonControlButtons";

import { ListGroup, ListGroupItem, InputGroup, Form } from "react-bootstrap";
import { BsSearch, BsGripVertical } from "react-icons/bs";
import Dropdown from "react-bootstrap/Dropdown";

import { FaRegFileAlt } from "react-icons/fa";

type Props = { params: { cid: string } };

export default function Assignments({ params }: Props) {
  const { cid } = params;

  return (
    <ListGroup id="wd-assignments" className="rounded-0">
      
      <ListGroupItem className="d-flex align-items-center border-0 px-0">
        <InputGroup style={{ maxWidth: 360 }}>
          <InputGroup.Text className="bg-white">
            <BsSearch />
          </InputGroup.Text>
          <Form.Control id="wd-search-assignment" placeholder="Search..." />
        </InputGroup>

        <div className="ms-auto">
          <button
            id="wd-add-assignment-group"
            type="button"
            className=" fs-5 btn btn-light btn-sm me-2 border"
          >
            + Group
          </button>
          <button
            id="wd-add-assignment"
            type="button"
            className="fs-5 btn btn-danger btn-sm"
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
            <Dropdown.Toggle id="wd-publish-all-btn" variant="link" size="sm" className="p-2 fs-5 m-0 bg-transparent text-dark border-0 shadow-none text-secondary" aria-label="Open menu" />

            

            
            <span className="fs-5 fw-semibold">ASSIGNMENTS</span>
          </div>

          <div className="d-flex align-items-center">
            <span className="badge rounded-pill bg-light text-dark border me-2 fw-semibold">
              40% of Total
            </span>
            <AssignmentControlButtons />
          </div>
        </div>
      </ListGroupItem>

      {/* Assignment list */}
      <ListGroupItem className="p-0 border-0">
        <ListGroup id="wd-assignment-list" className="rounded-0">
          {[
            { id: 123, title: "A1", available: "May 6 at 12:00am", due: "May 13 at 11:59pm", pts: 100 },
            { id: 124, title: "A2", available: "May 13 at 12:00am", due: "May 20 at 11:59pm", pts: 100 },
            { id: 125, title: "A3", available: "May 20 at 12:00am", due: "May 27 at 11:59pm", pts: 100 },
          ].map((a) => (
            <ListGroupItem
              key={a.id}
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
                  zIndex: 2,
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
                      href={`/Courses/${cid}/Assignments/${a.id}`}
                      id={`wd-assignment-${a.id}-link`}
                      className="text-decoration-none text-dark"
                    >
                      {a.title}
                    </Link>
                  </div>

                  {/* subtext line 1 */}
                  <div className="fs-6 text-muted">
                    <span className="text-danger">Multiple Modules</span>
                    <span className="mx-2">|</span>
                    <b>Not available until</b> {a.available}
                    <span className="mx-2">|</span>
                  </div>
                  {/* subtext line 2 */}
                  <div className="text-muted small">
                    <b>Due</b> {a.due}
                    <span className="mx-2">|</span>
                    {a.pts} pts
                  </div>
                </div>

                
                <div className="ms-3 d-flex align-items-center">
                  <LessonControlButtons />
                </div>
              </div>
            </ListGroupItem>
          ))}
        </ListGroup>
      </ListGroupItem>
    </ListGroup>
  );
}
