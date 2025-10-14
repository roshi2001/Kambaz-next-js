"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useId } from "react";
import { Form, Row, Col, Card, InputGroup } from "react-bootstrap";

// ✅ regular module (NOT a page) that re-exports JSON
// path is from /app/(Kambaz)/Courses/[cid]/Assignments/[aid]/page.tsx
import * as db from "../../../../Database";

type Assignment = {
  _id: string;
  course: string;
  title: string;
  description?: string;
  points?: number;
  dueDate?: string;        // ISO string
  availableFrom?: string;  // ISO string
};

function isoToLocalInput(iso?: string) {
  if (!iso) return "";
  const d = new Date(iso);
  // format: "YYYY-MM-DDTHH:MM" for <input type="datetime-local" />
  const pad = (n: number) => String(n).padStart(2, "0");
  const yyyy = d.getFullYear();
  const mm = pad(d.getMonth() + 1);
  const dd = pad(d.getDate());
  const hh = pad(d.getHours());
  const mi = pad(d.getMinutes());
  return `${yyyy}-${mm}-${dd}T${hh}:${mi}`;
}

export default function AssignmentEditor() {
  const { cid, aid } = useParams<{ cid: string; aid: string }>();

  const a = (db.assignments as Assignment[]).find(
    (x) => x._id === aid && x.course === cid
  );

  // Graceful not-found state
  if (!a) {
    return (
      <div className="p-3">
        <h2 className="h5 mb-2">Assignment not found</h2>
        <p className="text-muted">
          No assignment with ID <code>{aid}</code> for course <code>{cid}</code>.
        </p>
        <Link href={`/Courses/${cid}/Assignments`} className="btn btn-secondary">
          Back to Assignments
        </Link>
      </div>
    );
  }

  // input IDs
  const nameId = useId();
  const pointsId = useId();
  const groupId = useId();
  const gradeId = useId();
  const typeId = useId();
  const assignId = useId();
  const dueId = useId();
  const fromId = useId();
  const untilId = useId();

  return (
    <div id="wd-assignments-editor" className="p-3">
      {/* Title */}
      <Form.Label htmlFor={nameId}>Assignment Name</Form.Label>
      <Form.Control
        id={nameId}
        defaultValue={a.title}
        className="mb-3"
        style={{ maxWidth: 420 }}
        size="sm"
      />

      {/* Description (now data-driven, with fallback) */}
      <Form.Group className="mb-4" style={{ maxWidth: 920 }}>
        <Form.Label>Description</Form.Label>
        <div className="border rounded p-3 bg-white">
          {a.description ? (
            <div style={{ whiteSpace: "pre-wrap" }}>{a.description}</div>
          ) : (
            <>
              <p className="mb-2">
                The assignment is <span style={{ color: "red" }}>available online</span>
              </p>
              <p className="mb-2">
                Submit a link to the landing page of your Web application running on Netlify
              </p>
              <p className="mb-2">The landing page should include the following:</p>
              <ul className="mb-2">
                <li>Your full name and section</li>
                <li>Links to each of the lab assignments</li>
                <li>Link to the Kanbas application</li>
                <li>Links to all relevant source code repositories</li>
              </ul>
              <p className="mb-0">
                The Kanbas application should include a link to navigate back to the landing page.
              </p>
            </>
          )}
        </div>
      </Form.Group>

      {/* Form body (same fields as earlier chapters, now prefilled) */}
      <Form style={{ maxWidth: 920 }}>
        <Row className="mb-3 align-items-start">
          <Col sm={3} className="text-sm-end">
            <Form.Label htmlFor={pointsId}>Points</Form.Label>
          </Col>
          <Col sm={9}>
            <Form.Control
              id={pointsId}
              type="number"
              min={0}
              defaultValue={a.points ?? 100}
              size="sm"
              style={{ maxWidth: 140 }}
            />
          </Col>
        </Row>

        <Row className="mb-3 align-items-start">
          <Col sm={3} className="text-sm-end">
            <Form.Label htmlFor={groupId}>Assignment Group</Form.Label>
          </Col>
          <Col sm={9}>
            <Form.Select id={groupId} defaultValue="ASSIGNMENTS" size="sm" style={{ maxWidth: 280 }}>
              <option value="ASSIGNMENTS">ASSIGNMENTS</option>
              <option value="QUIZZES">QUIZZES</option>
              <option value="EXAMS">EXAMS</option>
              <option value="PROJECT">PROJECT</option>
            </Form.Select>
          </Col>
        </Row>

        <Row className="mb-3 align-items-start">
          <Col sm={3} className="text-sm-end">
            <Form.Label htmlFor={gradeId}>Display Grade as</Form.Label>
          </Col>
          <Col sm={9}>
            <Form.Select id={gradeId} defaultValue="PERCENTAGE" size="sm" style={{ maxWidth: 280 }}>
              <option value="PERCENTAGE">Percentage</option>
              <option value="POINTS">Points</option>
              <option value="LETTER">Letter Grade</option>
            </Form.Select>
          </Col>
        </Row>

        <Row className="mb-3 align-items-start">
          <Col sm={3} className="text-sm-end">
            <Form.Label htmlFor={typeId}>Submission Type</Form.Label>
          </Col>
          <Col sm={9}>
            <Card className="border mb-0" style={{ maxWidth: 520 }}>
              <Card.Body className="pb-2">
                <Form.Select id={typeId} defaultValue="ONLINE" size="sm" className="mb-3">
                  <option value="ONLINE">Online</option>
                  <option value="ON_PAPER">On Paper</option>
                  <option value="NO_SUBMISSION">No Submission</option>
                </Form.Select>

                <div className="mb-2 fw-semibold">Online Entry Options</div>
                <Form.Check type="checkbox" id="wd-text-entry" label="Text Entry" className="mb-1" />
                <Form.Check
                  type="checkbox"
                  id="wd-website-url"
                  label="Website URL"
                  defaultChecked
                  className="mb-1"
                />
                <Form.Check type="checkbox" id="wd-media-recordings" label="Media Recordings" className="mb-1" />
                <Form.Check type="checkbox" id="wd-student-annotation" label="Student Annotation" className="mb-1" />
                <Form.Check type="checkbox" id="wd-file-upload" label="File Uploads" />
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mb-4 align-items-start">
          <Col sm={3} className="text-sm-end">
            <Form.Label htmlFor={assignId}>Assign</Form.Label>
          </Col>
          <Col sm={9}>
            <Card className="border" style={{ maxWidth: 520 }}>
              <Card.Body>
                <div className="mb-2 fw-semibold">Assign to</div>
                <Form.Control id={assignId} defaultValue="Everyone" size="sm" className="mb-3" />

                <div className="mb-2 fw-semibold">Due</div>
                <Form.Control
                  id={dueId}
                  type="datetime-local"
                  size="sm"
                  className="mb-3"
                  defaultValue={isoToLocalInput(a.dueDate)}
                />

                <div className="mb-2 fw-semibold">Available from</div>
                <InputGroup className="flex-wrap mb-2">
                  <Form.Control
                    id={fromId}
                    type="datetime-local"
                    size="sm"
                    style={{ maxWidth: 240 }}
                    defaultValue={isoToLocalInput(a.availableFrom)}
                  />
                  <span className="ms-2 me-2 mb-2 mb-sm-0 d-inline-flex align-items-center fw-semibold">
                    Until
                  </span>
                  <Form.Control id={untilId} type="datetime-local" size="sm" style={{ maxWidth: 240 }} />
                </InputGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <hr className="mb-3" />

        {/* Actions: both navigate back to the Assignments list for this course */}
        <Row>
          <Col sm={{ span: 9, offset: 3 }} className="text-end">
            <Link href={`/Courses/${cid}/Assignments`} className="btn btn-light border me-2">
              Cancel
            </Link>
            <Link href={`/Courses/${cid}/Assignments`} className="btn btn-danger">
              Save
            </Link>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
