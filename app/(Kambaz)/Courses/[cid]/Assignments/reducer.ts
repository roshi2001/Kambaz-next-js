"use client";
import { createSlice } from "@reduxjs/toolkit";
import { assignments as seed } from "../../../Database"; // adjust if needed
import { v4 as uuidv4 } from "uuid";

export type Assignment = {
  _id: string;
  course: string;
  title: string;
  description?: string;
  points?: number;
  dueDate?: string;
  availableFrom?: string;
  availableUntil?: string;
};

type State = { assignments: Assignment[] };
const initialState: State = { assignments: seed as Assignment[] };

const assignmentsSlice = createSlice({
  name: "assignmentReducer",
  initialState,
  reducers: {
    addAssignment: (state, { payload }) => {
      const id = payload._id ?? uuidv4();
      state.assignments.push({ ...payload, _id: id });
    },
    updateAssignment: (state, { payload }) => {
      state.assignments = state.assignments.map((a) =>
        a._id === payload._id ? { ...a, ...payload } : a
      );
    },
    deleteAssignment: (state, { payload: id }) => {
      state.assignments = state.assignments.filter((a) => a._id !== id);
    },
  },
});

export const { addAssignment, updateAssignment, deleteAssignment } =
  assignmentsSlice.actions;
export default assignmentsSlice.reducer;
