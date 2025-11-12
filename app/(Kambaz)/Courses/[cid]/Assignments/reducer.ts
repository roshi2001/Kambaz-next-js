import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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

const initialState: State = {
  assignments: [],
};

const assignmentsSlice = createSlice({
  name: "assignmentsReducer",
  initialState,
  reducers: {
   
    setAssignments: (state, { payload }: PayloadAction<Assignment[]>) => {
      state.assignments = payload;
    },

    // Local add (if ever needed without server; server usually returns the created item)
    addAssignment: (
      state,
      { payload }: PayloadAction<Partial<Assignment> & { _id?: string }>
    ) => {
      const id = payload._id ?? uuidv4();
      state.assignments.push({
        _id: id,
        course: String(payload.course ?? ""),
        title: payload.title ?? "",
        description: payload.description,
        points: payload.points,
        dueDate: payload.dueDate,
        availableFrom: payload.availableFrom,
        availableUntil: payload.availableUntil,
      });
    },

    // Upsert-style update by _id
    updateAssignment: (state, { payload }: PayloadAction<Assignment>) => {
      state.assignments = state.assignments.map((a) =>
        a._id === payload._id ? { ...a, ...payload } : a
      );
    },

    // Remove by _id
    deleteAssignment: (state, { payload: id }: PayloadAction<string>) => {
      state.assignments = state.assignments.filter((a) => a._id !== id);
    },
  },
});

export const {
  setAssignments,
  addAssignment,
  updateAssignment,
  deleteAssignment,
} = assignmentsSlice.actions;

export default assignmentsSlice.reducer;
