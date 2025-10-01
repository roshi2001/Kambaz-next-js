import { Button, ButtonGroup, Dropdown } from "react-bootstrap";
import { BsPlus, BsThreeDotsVertical } from "react-icons/bs";

export default function ModuleControlButtons() {
  return (
    <div className="float-end d-flex align-items-center gap-2">
      <ButtonGroup size="sm">
        
        <Button variant="secondary" size="sm" id="wd-add-item-btn">
          <BsPlus className="me-1 fs-3" /> 
        </Button>

        
        <Dropdown align="end">
          <Dropdown.Toggle
            variant="secondary"
            id="wd-module-actions"
            className="d-flex align-items-center"
          >
            <BsThreeDotsVertical />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>Rename</Dropdown.Item>
            <Dropdown.Item>Duplicate</Dropdown.Item>
            <Dropdown.Item className="text-danger">Delete</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </ButtonGroup>
    </div>
  );
}