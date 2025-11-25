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
  
  const [editing, setEditing] = useState(false);

  const fetchUser = async () => {
    if (!uid) return;
    const u = await client.findUserById(uid);
    setUser(u);
  };

  const saveUser = async () => {
  const updated = await client.updateUser(user); 
  setUser(updated);
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

      
      <button
        onClick={onClose}
        className="btn position-absolute end-0 top-0 mt-2 me-2 wd-close-details"
      >
        <IoCloseSharp className="fs-1" />
      </button>

      
      <div className="text-center mt-3">
        <FaUserCircle className="text-secondary fs-1" />
      </div>

      <hr />

      
      <div className="text-danger fs-4 fw-bold text-center mb-3">

        
        {!editing && (
          <FaPencil
            onClick={() => setEditing(true)}
            className="float-end fs-5 mt-2 wd-edit"
          />
        )}

        
        {editing && (
          <FaCheck
            onClick={saveUser}
            className="float-end fs-5 mt-2 me-2 wd-save"
          />
        )}

        
        {!editing && (
          <div className="wd-name" onClick={() => setEditing(true)}>
            {user.firstName} {user.lastName}
          </div>
        )}

        
        {editing && (
  <>
    <FormControl
      className="mb-2"
      value={user.firstName || ""}
      onChange={(e) =>
        setUser({ ...user, firstName: e.target.value })
      }
    />
    <FormControl
      className="mb-2"
      value={user.lastName || ""}
      onChange={(e) =>
        setUser({ ...user, lastName: e.target.value })
      }
    />
  </>
)}
      </div>

      
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
