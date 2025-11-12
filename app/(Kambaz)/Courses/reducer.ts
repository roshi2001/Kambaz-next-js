import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export type Course = {
  _id: string;
  title: string;
  number?: string;
  semester?: string;
  [key: string]: unknown;
};

type State = { courses: Course[] };

const initialState: State = {
  courses: [],
};

const coursesSlice = createSlice({
  name: "coursesReducer",
  initialState,
  reducers: {
    
    setCourses: (state, { payload }: PayloadAction<Course[]>) => {
      state.courses = payload;
    },

    addNewCourse: (
      state,
      { payload }: PayloadAction<Partial<Course> & { _id?: string }>
    ) => {
      const id = payload._id ?? uuidv4();
      state.courses.push({
        _id: id,
        title: payload.title ?? "",
        ...payload,
      });
    },

    deleteCourse: (state, { payload: courseId }: PayloadAction<string>) => {
      state.courses = state.courses.filter((c) => c._id !== courseId);
    },

    updateCourse: (
      state,
      { payload }: PayloadAction<Partial<Course> & { _id: string }>
    ) => {
      state.courses = state.courses.map((c) =>
        c._id === payload._id ? { ...c, ...payload } : c
      );
    },
  },
});

export const { setCourses, addNewCourse, deleteCourse, updateCourse } =
  coursesSlice.actions;
export default coursesSlice.reducer;
