"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PeopleTable from "./Table/page";

const BASE_API =
  process.env.NEXT_PUBLIC_BASE_API || "http://localhost:4000/api";

export default function PeoplePage() {
  const { cid } = useParams<{ cid: string }>();
  const [users, setUsers] = useState<any[]>([]);

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${BASE_API}/courses/${cid}/users`, {
        credentials: "include",
      });
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Failed to fetch users", err);
    }
  };

  useEffect(() => {
    if (cid) fetchUsers();
  }, [cid]);

  return (
    <div>
      <h2>People</h2>
      <PeopleTable users={users} fetchUsers={fetchUsers} />
    </div>
  );
}
