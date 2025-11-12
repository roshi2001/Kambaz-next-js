"use client";

import * as client from "./client";
import { useEffect, useState } from "react";
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";

export default function Session({ children }: { children: React.ReactNode }) {
  const [pending, setPending] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const load = async () => {
      try {
        const currentUser = await client.profile();
        if (currentUser) {
          dispatch(setCurrentUser(currentUser));
        }
      } catch (err) {
        console.error("Session profile load failed:", err);
      }
      setPending(false);
    };
    load();
  }, [dispatch]);

  if (pending) {
    return null; 
  }

  return <>{children}</>;
}
