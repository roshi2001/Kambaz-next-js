
"use client";
import { Dropdown } from "react-bootstrap";
import { FaEllipsisVertical } from "react-icons/fa6";

interface Props {
  quiz: any;
  onEdit: () => void;
  onDelete: () => void;
  onTogglePublish: () => void;
}

export default function QuizActions({ quiz, onEdit, onDelete, onTogglePublish }: Props) {
  return (
    <Dropdown align="end">
      <Dropdown.Toggle
        as="span"
        style={{ cursor: "pointer" }}
        className="fs-4 text-secondary"
      >
        <FaEllipsisVertical />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={onEdit}>Edit</Dropdown.Item>
        <Dropdown.Item onClick={onDelete}>Delete</Dropdown.Item>
        <Dropdown.Item onClick={onTogglePublish}>
          {quiz.published ? "Unpublish" : "Publish"}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

