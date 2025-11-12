"use client";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import { addAssignment } from "../reducer";
import { Form, Row, Col, Card, InputGroup, Button } from "react-bootstrap";
import * as client from "../../../client";                

const localToISO = (v?: string) => (v ? new Date(v).toISOString() : undefined);

export default function NewAssignmentEditor() {
  const { cid } = useParams<{ cid: string }>();
  const router = useRouter();
  const dispatch = useDispatch();

  const nameRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLTextAreaElement>(null);
  const pointsRef = useRef<HTMLInputElement>(null);
  const dueRef = useRef<HTMLInputElement>(null);
  const fromRef = useRef<HTMLInputElement>(null);
  const untilRef = useRef<HTMLInputElement>(null);

  const onSave = async () => {                            
    const title = (nameRef.current?.value || "").trim();
    if (!title) return;

    const ptsRaw = Number(pointsRef.current?.value ?? 0);
    const points = Number.isFinite(ptsRaw) ? ptsRaw : 0;

    const payload = {
      course: String(cid),
      title,
      description: (descRef.current?.value || "").trim(),
      points,
      dueDate: localToISO(dueRef.current?.value || ""),
      availableFrom: localToISO(fromRef.current?.value || ""),
      availableUntil: localToISO(untilRef.current?.value || ""),
    };

    
    const created = await client.createAssignmentForCourse(String(cid), payload);

    
    dispatch(addAssignment(created) as any);

    router.push(`/Courses/${cid}/Assignments`);
  };

  return (
    <div className="container py-4" id="wd-assignment-editor">
      <Form style={{ maxWidth: 900 }}>
        <Form.Group className="mb-3">
          <Form.Label>Assignment Name</Form.Label>
          <Form.Control ref={nameRef} defaultValue="New Assignment" size="sm" id="wd-assignment-title" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" ref={descRef} rows={4} size="sm" id="wd-assignment-description" />
        </Form.Group>

        <Row className="mb-3">
          <Col sm={3} className="text-sm-end"><Form.Label>Points</Form.Label></Col>
          <Col sm={9}>
            <Form.Control
              ref={pointsRef}
              type="number"
              min={0}
              defaultValue={100}
              size="sm"
              style={{ maxWidth: 140 }}
              id="wd-assignment-points"
            />
          </Col>
        </Row>

        <Row className="mb-4 align-items-start">
          <Col sm={3} className="text-sm-end"><Form.Label>Assign</Form.Label></Col>
          <Col sm={9}>
            <Card className="border" style={{ maxWidth: 520 }}>
              <Card.Body>
                <div className="mb-2 fw-semibold">Assign to</div>
                <Form.Control defaultValue="Everyone" size="sm" className="mb-3" />
                <div className="mb-2 fw-semibold">Due</div>
                <Form.Control ref={dueRef} type="datetime-local" size="sm" className="mb-3" id="wd-assignment-due" />
                <div className="mb-2 fw-semibold">Available from</div>
                <InputGroup className="flex-wrap mb-2">
                  <Form.Control ref={fromRef} type="datetime-local" size="sm" style={{ maxWidth: 240 }} id="wd-assignment-available-from" />
                  <span className="mx-2">Until</span>
                  <Form.Control ref={untilRef} type="datetime-local" size="sm" style={{ maxWidth: 240 }} id="wd-assignment-available-until" />
                </InputGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <div className="text-end">
          <Button
            variant="light"
            className="border me-2"
            onClick={() => router.push(`/Courses/${cid}/Assignments`)}
            id="wd-cancel"
          >
            Cancel
          </Button>
          <Button variant="danger" onClick={onSave} id="wd-save">
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
}
