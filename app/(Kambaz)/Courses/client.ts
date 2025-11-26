import axios from "axios";
const HTTP_SERVER =
  process.env.NEXT_PUBLIC_HTTP_SERVER || "http://localhost:4000";


const axiosWithCredentials = axios.create({
  baseURL: HTTP_SERVER,
  withCredentials: true
});

const COURSES_API = `${HTTP_SERVER}/api/courses`;
const USERS_API = `${HTTP_SERVER}/api/users`;
const ASSIGNMENTS_API = `${HTTP_SERVER}/api/assignments`;

export const createModuleForCourse = async (cid: string, module: any) => {
  const response = await axiosWithCredentials.post(`${COURSES_API}/${cid}/modules`, module);
  return response.data;
};

export const findModulesForCourse = async (cid: string) => {
  const response = await axiosWithCredentials.get(`${COURSES_API}/${cid}/modules`);
  return response.data;
};

export const fetchAllCourses = async () => {
  const { data } = await axiosWithCredentials.get(COURSES_API);
  return data;
};

export const findMyCourses = async () => {
  const { data } = await axiosWithCredentials.get(`${USERS_API}/current/courses`);
  return data;
};

export const createCourse = async (course: any) => {
  const { data } = await axiosWithCredentials.post(`${USERS_API}/current/courses`, course);
  return data;
};

export const deleteCourse = async (cid: string) => {
  const { data } = await axiosWithCredentials.delete(`${COURSES_API}/${cid}`);
  return data;
};

export const updateCourse = async (course: any) => {
  const { data } = await axiosWithCredentials.put(`${COURSES_API}/${course._id}`, course);
  return data;
};

export const deleteModule = async (cid: string, moduleId: string) => {
  const response = await axiosWithCredentials.delete(`${COURSES_API}/${cid}/modules/${moduleId}`);
  return response.data;
};

export const updateModule = async (cid: string, module: any) => {
  const { data } = await axiosWithCredentials.put(`${COURSES_API}/${cid}/modules/${module._id}`, module);
  return data;
};

export const findAssignmentsForCourse = async (cid: string) => {
  const { data } = await axiosWithCredentials.get(`${COURSES_API}/${cid}/assignments`);
  return data;
};

export const createAssignmentForCourse = async (cid: string, assignment: any) => {
  const { data } = await axiosWithCredentials.post(`${COURSES_API}/${cid}/assignments`, assignment);
  return data;
};

export const findAssignmentById = async (aid: string) => {
  const { data } = await axiosWithCredentials.get(`${ASSIGNMENTS_API}/${aid}`);
  return data;
};

export const updateAssignment = async (assignment: any) => {
  const { data } = await axiosWithCredentials.put(`${ASSIGNMENTS_API}/${assignment._id}`, assignment);
  return data;
};

export const deleteAssignment = async (aid: string) => {
  const { data } = await axiosWithCredentials.delete(`${ASSIGNMENTS_API}/${aid}`);
  return data;
};

export const findUsersForCourse = async (courseId: string) => {
  const response = await axiosWithCredentials.get(`${COURSES_API}/${courseId}/users`);
  return response.data;
};

export const enrollIntoCourse = async (userId: string, courseId: string) => {
  const response = await axiosWithCredentials.post(`${USERS_API}/${userId}/courses/${courseId}`);
  return response.data;
};

export const unenrollFromCourse = async (userId: string, courseId: string) => {
  const response = await axiosWithCredentials.delete(`${USERS_API}/${userId}/courses/${courseId}`);
  return response.data;
};