"use client";

import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import * as client from "../../../Account/client";
import { FaPencil, FaCheck } from "react-icons/fa6";
import { FormControl } from "react-bootstrap";

export default function PeopleDetails({
  uid,
  onClose,
}: {
  uid: string | null;
  onClose: () => void;
}) {
  const [user, setUser] = useState<any>({});
  const [name, setName] = useState("");
  const [editing, setEditing] = useState(false);

  const fetchUser = async () => {
    if (!uid) return;
    const u = await client.findUserById(uid);
    setUser(u);
  };

  const saveUser = async () => {
    const [firstName, lastName] = name.split(" ");
    const updatedUser = { ...user, firstName, lastName };
    await client.updateUser(updatedUser);
    setUser(updatedUser);
    setEditing(false);
    onClose();
  };

  const deleteUser = async (uid: string) => {
    await client.deleteUser(uid);
    onClose();
  };

  useEffect(() => {
    if (uid) fetchUser();
  }, [uid]);

  if (!uid) return null;

  return (
    <div className="wd-people-details position-fixed top-0 end-0 bottom-0 bg-white p-4 shadow w-25">

      {/* CLOSE BUTTON */}
      <button
        onClick={onClose}
        className="btn position-absolute end-0 top-0 mt-2 me-2 wd-close-details"
      >
        <IoCloseSharp className="fs-1" />
      </button>

      {/* USER ICON */}
      <div className="text-center mt-3">
        <FaUserCircle className="text-secondary fs-1" />
      </div>

      <hr />

      {/* NAME + EDITING */}
      <div className="text-danger fs-4 fw-bold text-center mb-3">

        {/* Pencil button */}
        {!editing && (
          <FaPencil
            onClick={() => setEditing(true)}
            className="float-end fs-5 mt-2 wd-edit"
          />
        )}

        {/* Save button */}
        {editing && (
          <FaCheck
            onClick={saveUser}
            className="float-end fs-5 mt-2 me-2 wd-save"
          />
        )}

        {/* Name display */}
        {!editing && (
          <div className="wd-name" onClick={() => setEditing(true)}>
            {user.firstName} {user.lastName}
          </div>
        )}

        {/* Name editing */}
        {editing && (
          <FormControl
            className="w-50 wd-edit-name"
            defaultValue={`${user.firstName} ${user.lastName}`}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") saveUser();
            }}
          />
        )}
      </div>

      {/* DETAILS */}
      <div className="ms-2">
        <p className="mb-1">
          <b>Role:</b> <span className="wd-role">{user.role}</span>
        </p>
        <p className="mb-1">
          <b>Login ID:</b> <span className="wd-login-id">{user.loginId}</span>
        </p>
        <p className="mb-1">
          <b>Section:</b> <span className="wd-section">{user.section}</span>
        </p>
        <p className="mb-1">
          <b>Total Activity:</b>{" "}
          <span className="wd-total-activity">{user.totalActivity}</span>
        </p>

        <hr />

        {/* Buttons */}
        <button
          onClick={() => deleteUser(uid)}
          className="btn btn-danger float-end wd-delete"
        >
          Delete
        </button>

        <button
          onClick={onClose}
          className="btn btn-secondary float-end me-2 wd-cancel"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
