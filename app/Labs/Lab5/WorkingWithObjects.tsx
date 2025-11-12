"use client";
import { FormControl } from "react-bootstrap";
import React, { useState } from "react";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

export default function WorkingWithObjects() {
  
  const [assignment, setAssignment] = useState({
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10",
    completed: false,
    score: 0,
  });

  const [moduleObj, setModuleObj] = useState({
    id: "m101",
    name: "Intro to Node & Express",
    description: "Basics of building APIs with Express",
    course: "CS5610",
  });

  const ASSIGNMENT_API_URL = `${HTTP_SERVER}/lab5/assignment`;
  const MODULE_API_URL = `${HTTP_SERVER}/lab5/module`;

  return (
    <div id="wd-working-with-objects">
      <h3>Working With Objects</h3>

      <h4>Retrieving Objects</h4>
      <a
        id="wd-retrieve-assignments"
        className="btn btn-primary"
        href={`${ASSIGNMENT_API_URL}`}
      >
        Get Assignment
      </a>
      <hr />

    
      <h4>Retrieving Properties</h4>
      <a
        id="wd-retrieve-assignment-title"
        className="btn btn-primary"
        href={`${ASSIGNMENT_API_URL}/title`}
      >
        Get Title
      </a>
      <hr />

      <h4>Modifying Properties</h4>
      <a
        id="wd-update-assignment-title"
        className="btn btn-primary float-end"
        href={`${ASSIGNMENT_API_URL}/title/${encodeURIComponent(
          assignment.title
        )}`}
      >
        Update Title
      </a>
      <FormControl
        className="w-75"
        id="wd-assignment-title"
        defaultValue={assignment.title}
        onChange={(e) =>
          setAssignment({ ...assignment, title: e.target.value })
        }
      />
      <hr />


      <h3>Module</h3>

      <div className="mb-2">
        <a
          id="wd-get-module"
          className="btn btn-outline-primary me-2"
          href={`${MODULE_API_URL}`}
        >
          Get Module
        </a>
        <a
          id="wd-get-module-name"
          className="btn btn-outline-secondary"
          href={`${MODULE_API_URL}/name`}
        >
          Get Module Name
        </a>
      </div>

      <div className="mb-3">
        <label className="form-label">New Module Name</label>
        <FormControl
          className="w-75"
          id="wd-module-name"
          defaultValue={moduleObj.name}
          onChange={(e) =>
            setModuleObj({ ...moduleObj, name: e.target.value })
          }
          placeholder="e.g., Advanced Node"
        />
        <a
          id="wd-update-module-name"
          className="btn btn-primary mt-2"
          href={`${MODULE_API_URL}/name/${encodeURIComponent(
            moduleObj.name
          )}`}
        >
          Update Module Name
        </a>
      </div>

      <div className="mb-3">
        <label className="form-label">New Module Description</label>
        <FormControl
          as="textarea"
          rows={2}
          className="w-75"
          id="wd-module-description"
          defaultValue={moduleObj.description}
          onChange={(e) =>
            setModuleObj({ ...moduleObj, description: e.target.value })
          }
          placeholder="e.g., REST APIs with Express"
        />
        <a
          id="wd-update-module-description"
          className="btn btn-secondary mt-2"
          href={`${MODULE_API_URL}/description/${encodeURIComponent(
            moduleObj.description
          )}`}
        >
          Update Module Description
        </a>
      </div>

      <hr />

      <h3>Assignment Status</h3>

      <div className="mb-3">
        <label className="form-label">New Score</label>
        <FormControl
          type="number"
          className="w-25"
          id="wd-assignment-score"
          defaultValue={assignment.score}
          onChange={(e) =>
            setAssignment({
              ...assignment,
              score: Number(e.target.value || 0),
            })
          }
          placeholder="e.g., 95"
        />
        <a
          id="wd-update-assignment-score"
          className="btn btn-primary mt-2"
          href={`${ASSIGNMENT_API_URL}/score/${assignment.score}`}
        >
          Update Score
        </a>
      </div>

      <div className="mb-3">
        <label className="me-2">Completed?</label>
        <input
          id="wd-assignment-completed"
          type="checkbox"
          checked={assignment.completed}
          onChange={(e) =>
            setAssignment({ ...assignment, completed: e.target.checked })
          }
        />
        <a
          id="wd-update-assignment-completed"
          className="btn btn-warning ms-3"
          href={`${ASSIGNMENT_API_URL}/completed/${assignment.completed}`}
        >
          Update Completed
        </a>
      </div>
    </div>
  );
}
