import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Enrollment = {
  _id?: string;
  user: string;
  course: string;
};

type State = {
  enrollments: Enrollment[];
};

const initialState: State = {
  enrollments: [],
};

const enrollmentsSlice = createSlice({
  name: "enrollmentsReducer",
  initialState,
  reducers: {
    // Replace everything (use after GET from server)
    setEnrollments: (state, { payload }: PayloadAction<Enrollment[]>) => {
      state.enrollments = payload;
    },

    // Add if not enrolled already
    enroll: (state, { payload }: PayloadAction<Enrollment>) => {
      const exists = state.enrollments.some(
        (e) =>
          String(e.user) === String(payload.user) &&
          String(e.course) === String(payload.course)
      );
      if (!exists) state.enrollments.push(payload);
    },

    // Remove match
    unenroll: (state, { payload }: PayloadAction<Enrollment>) => {
      state.enrollments = state.enrollments.filter(
        (e) =>
          !(
            String(e.user) === String(payload.user) &&
            String(e.course) === String(payload.course)
          )
      );
    },

    // Toggle enroll/un-enroll
    toggleEnrollment: (state, { payload }: PayloadAction<Enrollment>) => {
      const i = state.enrollments.findIndex(
        (e) =>
          String(e.user) === String(payload.user) &&
          String(e.course) === String(payload.course)
      );
      if (i >= 0) state.enrollments.splice(i, 1);
      else state.enrollments.push(payload);
    },
  },
});

export const {
  setEnrollments,
  enroll,
  unenroll,
  toggleEnrollment,
} = enrollmentsSlice.actions;

export default enrollmentsSlice.reducer;
