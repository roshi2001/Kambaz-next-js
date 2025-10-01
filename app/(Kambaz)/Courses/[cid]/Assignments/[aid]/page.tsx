"use client";

import { useId } from "react";
import { Form, Row, Col, Card, Button, InputGroup } from "react-bootstrap";

export default function AssignmentEditor() {
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
      <Form.Label htmlFor={nameId}>Assignment Name</Form.Label>
      <Form.Control id={nameId} defaultValue="A1" className="mb-3" style={{ maxWidth: 420 }} size="sm" />

      {/* Description (static instructions like the screenshot) */}
<Form.Group className="mb-4" style={{ maxWidth: 920 }}>
  <Form.Label>Description</Form.Label>
  <div className="border rounded p-3 bg-white">
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
      <li>
        Link to the Kanbas application
      </li>
      <li>Links to all relevant source code repositories</li>
    </ul>

    <p className="mb-0">
      The Kanbas application should include a link to navigate
      back to the landing page.
    </p>
  </div>
</Form.Group>



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
      defaultValue={100}
      size="sm"
      style={{ maxWidth: 140 }}
    />
  </Col>
</Row>

        
        <Row className="mb-3 align-items-start">
          <Col sm={3} className="text-sm-end"><Form.Label htmlFor={groupId}>Assignment Group</Form.Label></Col>
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
          <Col sm={3} className="text-sm-end"><Form.Label htmlFor={gradeId}>Display Grade as</Form.Label></Col>
          <Col sm={9}>
            <Form.Select id={gradeId} defaultValue="PERCENTAGE" size="sm" style={{ maxWidth: 280 }}>
              <option value="PERCENTAGE">Percentage</option>
              <option value="POINTS">Points</option>
              <option value="LETTER">Letter Grade</option>
            </Form.Select>
          </Col>
        </Row>

        <Row className="mb-3 align-items-start">
          <Col sm={3} className="text-sm-end"><Form.Label htmlFor={typeId}>Submission Type</Form.Label></Col>
          <Col sm={9}>
            <Card className="border mb-0" style={{ maxWidth: 520 }}>
              <Card.Body className="pb-2">
                <Form.Select id={typeId} defaultValue="ONLINE" size="sm" className="mb-3">
                  <option value="ONLINE">Online</option>
                  <option value="ON_PAPER">On Paper</option>
                  <option value="NO_SUBMISSION">No Submission</option>
                </Form.Select>

                <div className="mb-2 fw-semibold">Online Entry Options</div>
                <Form.Check type="checkbox" id="wd-text-entry" label="Text Entry" className="mb-1"  />
                <Form.Check type="checkbox" id="wd-website-url" label="Website URL" defaultChecked className="mb-1"  />
                <Form.Check type="checkbox" id="wd-media-recordings" label="Media Recordings" className="mb-1"  />
                <Form.Check type="checkbox" id="wd-student-annotation" label="Student Annotation" className="mb-1" />
                <Form.Check type="checkbox" id="wd-file-upload" label="File Uploads"  />
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mb-4 align-items-start">
          <Col sm={3} className="text-sm-end"><Form.Label htmlFor={assignId}>Assign</Form.Label></Col>
          <Col sm={9}>
            <Card className="border" style={{ maxWidth: 520 }}>
              <Card.Body>
                <div className="mb-2 fw-semibold">Assign to</div>
                <Form.Control id={assignId} defaultValue="Everyone" size="sm" className="mb-3" />

                <div className="mb-2 fw-semibold">Due</div>
                <Form.Control id={dueId} type="datetime-local" size="sm" className="mb-3" />

                <div className="mb-2 fw-semibold">Available from</div>
                <InputGroup className="flex-wrap mb-2">
                  <Form.Control id={fromId} type="datetime-local"  size="sm" style={{ maxWidth: 240 }} />
                  <span className="ms-2 me-2 mb-2 mb-sm-0 d-inline-flex align-items-center fw-semibold">Until</span>
                  <Form.Control id={untilId} type="datetime-local" size="sm" style={{ maxWidth: 240 }} />
                </InputGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <hr className="mb-3" />

        <Row>
  <Col sm={{ span: 9, offset: 3 }} className="text-end">
    <Button variant="light" className="border me-2">Cancel</Button>
    <Button variant="danger">Save</Button>
  </Col>
</Row>
      </Form>
    </div>
  );
}
