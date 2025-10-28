"use client";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import { Form, Row, Col, Card, InputGroup, Button } from "react-bootstrap";
import type { RootState } from "@/lib/store";
import { updateAssignment } from "../../Assignments/reducer";

const isoToLocalInput = (iso?: string) => {
  if (!iso) return "";
  const d = new Date(iso);
  return new Date(d.getTime() - new Date().getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 16);
};

const localInputToISO = (local?: string) =>
  local ? new Date(local).toISOString() : undefined;

export default function AssignmentEditor() {
  const { cid, aid } = useParams<{ cid: string; aid: string }>();
  const router = useRouter();
  const dispatch = useDispatch();

  // redirect to /new if aid === "new"
  useEffect(() => {
    if (aid === "new") router.replace(`/Courses/${cid}/Assignments/new`);
  }, [aid, cid, router]);
  if (aid === "new") return null;

  // ✅ pull from Redux
  const a = useSelector((s: RootState) =>
    s.assignments.assignments.find(
      (x) => x._id === aid && String(x.course) === String(cid)
    )
  );

  if (!a) {
    return (
      <div className="p-3">
        <h5>Assignment not found</h5>
        <Button
          variant="secondary"
          onClick={() => router.push(`/Courses/${cid}/Assignments`)}
        >
          Back
        </Button>
      </div>
    );
  }

  const nameRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLTextAreaElement>(null);
  const pointsRef = useRef<HTMLInputElement>(null);
  const dueRef = useRef<HTMLInputElement>(null);
  const fromRef = useRef<HTMLInputElement>(null);
  const untilRef = useRef<HTMLInputElement>(null);

  const onSave = () => {
    const ptsRaw = Number(pointsRef.current?.value ?? 0);
    const points = Number.isFinite(ptsRaw) ? ptsRaw : 0;

    dispatch(
      updateAssignment({
        _id: a._id,
        course: String(cid),
        title: nameRef.current?.value ?? "",
        description: descRef.current?.value ?? "",
        points,
        dueDate: localInputToISO(dueRef.current?.value || ""),
        availableFrom: localInputToISO(fromRef.current?.value || ""),
        availableUntil: localInputToISO(untilRef.current?.value || ""),
      }) as any
    );

    router.push(`/Courses/${cid}/Assignments`);
  };

  return (
    <div className="container py-4" id="wd-assignment-editor">
      <Form style={{ maxWidth: 920 }}>
        {/* ---------------------------
              BASIC FIELDS
        ----------------------------*/}

        {/* Name */}
        <Form.Group className="mb-3">
          <Form.Label>Assignment Name</Form.Label>
          <Form.Control
            ref={nameRef}
            defaultValue={a.title}
            size="sm"
            id="wd-assignment-title"
            style={{ maxWidth: 420 }}
          />
        </Form.Group>

        {/* Description */}
        <Form.Group className="mb-4" style={{ maxWidth: 920 }}>
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            ref={descRef}
            defaultValue={a.description ?? ""}
            rows={4}
            size="sm"
            id="wd-assignment-description"
          />
        </Form.Group>

        {/* Points */}
        <Row className="mb-3 align-items-start">
          <Col sm={3} className="text-sm-end">
            <Form.Label>Points</Form.Label>
          </Col>
          <Col sm={9}>
            <Form.Control
              ref={pointsRef}
              type="number"
              defaultValue={a.points ?? 100}
              size="sm"
              style={{ maxWidth: 140 }}
              id="wd-assignment-points"
            />
          </Col>
        </Row>

        {/* ---------------------------
              EXTRA UI ONLY
        ----------------------------*/}

        {/* Assignment Group */}
        <Row className="mb-3 align-items-start">
          <Col sm={3} className="text-sm-end">
            <Form.Label>Assignment Group</Form.Label>
          </Col>
          <Col sm={9}>
            <Form.Select size="sm" style={{ maxWidth: 280 }} defaultValue="ASSIGNMENTS">
              <option value="ASSIGNMENTS">ASSIGNMENTS</option>
              <option value="QUIZZES">QUIZZES</option>
              <option value="EXAMS">EXAMS</option>
              <option value="PROJECT">PROJECT</option>
            </Form.Select>
          </Col>
        </Row>

        {/* Display Grade as */}
        <Row className="mb-3 align-items-start">
          <Col sm={3} className="text-sm-end">
            <Form.Label>Display Grade as</Form.Label>
          </Col>
          <Col sm={9}>
            <Form.Select size="sm" style={{ maxWidth: 280 }} defaultValue="PERCENTAGE">
              <option value="PERCENTAGE">Percentage</option>
              <option value="POINTS">Points</option>
              <option value="LETTER">Letter Grade</option>
            </Form.Select>
          </Col>
        </Row>

        {/* Submission Type Section */}
        <Row className="mb-3 align-items-start">
          <Col sm={3} className="text-sm-end">
            <Form.Label>Submission Type</Form.Label>
          </Col>
          <Col sm={9}>
            <Card className="border mb-0" style={{ maxWidth: 520 }}>
              <Card.Body className="pb-2">
                <Form.Select size="sm" className="mb-3" defaultValue="ONLINE">
                  <option value="ONLINE">Online</option>
                  <option value="ON_PAPER">On Paper</option>
                  <option value="NO_SUBMISSION">No Submission</option>
                </Form.Select>

                <div className="mb-2 fw-semibold">Online Entry Options</div>
                <Form.Check type="checkbox" label="Text Entry" className="mb-1" />
                <Form.Check type="checkbox" label="Website URL" defaultChecked className="mb-1" />
                <Form.Check type="checkbox" label="Media Recordings" className="mb-1" />
                <Form.Check type="checkbox" label="Student Annotation" className="mb-1" />
                <Form.Check type="checkbox" label="File Uploads" />
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* ---------------------------
              DATE FIELDS
        ----------------------------*/}

        <Row className="mb-4 align-items-start">
          <Col sm={3} className="text-sm-end">
            <Form.Label>Assign</Form.Label>
          </Col>
          <Col sm={9}>
            <Card className="border" style={{ maxWidth: 520 }}>
              <Card.Body>
                <div className="mb-2 fw-semibold">Assign to</div>
                <Form.Control defaultValue="Everyone" size="sm" className="mb-3" />

                <div className="mb-2 fw-semibold">Due</div>
                <Form.Control
                  ref={dueRef}
                  type="datetime-local"
                  size="sm"
                  className="mb-3"
                  defaultValue={isoToLocalInput(a.dueDate)}
                  id="wd-assignment-due"
                />

                <div className="mb-2 fw-semibold">Available from</div>
                <InputGroup className="flex-wrap mb-2">
                  <Form.Control
                    ref={fromRef}
                    type="datetime-local"
                    size="sm"
                    style={{ maxWidth: 240 }}
                    defaultValue={isoToLocalInput(a.availableFrom)}
                    id="wd-assignment-available-from"
                  />
                  <span className="mx-2">Until</span>
                  <Form.Control
                    ref={untilRef}
                    type="datetime-local"
                    size="sm"
                    style={{ maxWidth: 240 }}
                    defaultValue={isoToLocalInput(a.availableUntil)}
                    id="wd-assignment-available-until"
                  />
                </InputGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <hr className="mb-3" />

        {/* Actions */}
        <Row>
          <Col sm={{ span: 9, offset: 3 }} className="text-end">
            <Button
              variant="light"
              className="border me-2"
              onClick={() => router.push(`/Courses/${cid}/Assignments`)}
            >
              Cancel
            </Button>
            <Button variant="danger" onClick={onSave}>
              Save
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
