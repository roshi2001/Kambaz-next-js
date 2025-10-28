"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as db from "../Database";

export type Enrollment = { user: string; course: string };
type State = { enrollments: Enrollment[] };

const initialState: State = {
  // Seed from DB. Changes live in memory only (lost on full page refresh).
  enrollments: [...db.enrollments],
};

const slice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    enroll: (state, { payload }: PayloadAction<Enrollment>) => {
      const exists = state.enrollments.some(
        (e) => e.user === payload.user && e.course === payload.course
      );
      if (!exists) state.enrollments.push(payload);
    },
    unenroll: (state, { payload }: PayloadAction<Enrollment>) => {
      state.enrollments = state.enrollments.filter(
        (e) => !(e.user === payload.user && e.course === payload.course)
      );
    },
    toggleEnrollment: (state, { payload }: PayloadAction<Enrollment>) => {
      const i = state.enrollments.findIndex(
        (e) => e.user === payload.user && e.course === payload.course
      );
      if (i >= 0) state.enrollments.splice(i, 1);
      else state.enrollments.push(payload);
    },
  },
});

export const { enroll, unenroll, toggleEnrollment } = slice.actions;
export default slice.reducer;

export const isEnrolledSelector = (s: any, userId: string, courseId: string) =>
  s.enrollments.enrollments.some(
    (e: Enrollment) => String(e.user) === String(userId) &&
                       String(e.course) === String(courseId)
  );
