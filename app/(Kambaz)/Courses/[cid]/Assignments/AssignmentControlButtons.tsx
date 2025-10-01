"use client";

import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { BsPlus, BsThreeDotsVertical } from "react-icons/bs";

export default function AssignmentControlButtons() {
  return (
    <ButtonGroup size="sm" className="align-items-center">
      
      <Button
        variant="link"
        className="p-0 text-dark"
        style={{ boxShadow: "none" }}
        aria-label="Add"
      >
        <BsPlus className="fs-1" />
      </Button>

      
      <Button
        variant="link"
        className="p-0 text-dark"
        style={{ boxShadow: "none" }}
        aria-label="More options"
      >
        <BsThreeDotsVertical className="fs-5" />
      </Button>
    </ButtonGroup>
  );
}

