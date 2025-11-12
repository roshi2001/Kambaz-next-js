"use client";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import ModuleEditor from "./ModuleEditor";
import GreenCheckmark from "./GreenCheckmark";
import { useState } from "react";
import { GoCircleSlash } from "react-icons/go";


export default function ModulesControls(
  { moduleName, setModuleName, addModule }:
{ moduleName: string; setModuleName: (title: string) => void; addModule: () => void; }) {
 const [show, setShow] = useState(false);
 const handleClose = () => setShow(false);
 const handleShow = () => setShow(true); 

  return (
    <div id="wd-modules-controls" className="text-nowrap">
      <Button variant="danger"  onClick={handleShow} size="lg" className="me-1 float-end" id="wd-add-module-btn">
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Module
      </Button>

      <Dropdown className="float-end me-2">
        <DropdownToggle variant="secondary" size="lg" id="wd-publish-all-btn">
          <GreenCheckmark /> Publish All
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem id="wd-publish-all-modules-and-items">
            <GreenCheckmark /> Publish all modules and items
          </DropdownItem>
          <DropdownItem id="wd-publish-modules-only">
            <GreenCheckmark /> Publish modules only
          </DropdownItem>

          {/* Unpublish options with slashed-circle icon */}
          <DropdownItem id="wd-unpublish-all-modules-and-items" className="d-flex align-items-center">
            <GoCircleSlash  /> Unpublish all modules and items
          </DropdownItem>
          <DropdownItem id="wd-unpublish-modules-only" className="d-flex align-items-center">
            <GoCircleSlash  /> Unpublish modules only
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      <Button variant="secondary" size="lg" className="float-end me-2" id="wd-view-progress">
        View Progress
      </Button>
      <Button variant="secondary" size="lg" className="float-end me-2" id="wd-collapse-all">
        Collapse All
      </Button>
      <ModuleEditor show={show} handleClose={handleClose} dialogTitle="Add Module"
       moduleName={moduleName} setModuleName={setModuleName} addModule={addModule} />
    </div>
  );
}


