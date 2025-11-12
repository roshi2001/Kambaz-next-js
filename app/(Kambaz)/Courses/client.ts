import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

const COURSES_API = `${HTTP_SERVER}/api/courses`;
const USERS_API = `${HTTP_SERVER}/api/users`;
const ASSIGNMENTS_API = `${HTTP_SERVER}/api/assignments`;

export const createModuleForCourse = async (cid: string, module: any) => {
  const response = await axios.post(`${COURSES_API}/${cid}/modules`, module);
  return response.data;
};

export const findModulesForCourse = async (cid: string) => {
  const response = await axios.get(`${COURSES_API}/${cid}/modules`);
  return response.data;
};

export const fetchAllCourses = async () => {
  const { data } = await axios.get(COURSES_API);
  return data;
};

export const findMyCourses = async () => {
  const { data } = await axiosWithCredentials.get(
    `${USERS_API}/current/courses`
  );
  return data;
};

export const createCourse = async (course: any) => {
  const { data } = await axiosWithCredentials.post(
    `${USERS_API}/current/courses`,
    course
  );
  return data;
};

export const deleteCourse = async (cid: string) => {
  const { data } = await axios.delete(`${COURSES_API}/${cid}`);
  return data;
};

export const updateCourse = async (course: any) => {
  const { data } = await axios.put(`${COURSES_API}/${course._id}`, course);
  return data;
};

const MODULES_API = `${HTTP_SERVER}/api/modules`;

export const deleteModule = async (moduleId: string) => {
  const response = await axios.delete(`${MODULES_API}/${moduleId}`);
  return response.data;
};

export const updateModule = async (module: any) => {
  const { data } = await axios.put(`${MODULES_API}/${module._id}`, module);
  return data;
};

export const findAssignmentsForCourse = async (cid: string) => {
  const { data } = await axios.get(`${COURSES_API}/${cid}/assignments`);
  return data;
};

export const createAssignmentForCourse = async (cid: string, assignment: any) => {
  const { data } = await axios.post(`${COURSES_API}/${cid}/assignments`, assignment);
  return data;
};

export const findAssignmentById = async (aid: string) => {
  const { data } = await axios.get(`${ASSIGNMENTS_API}/${aid}`);
  return data;
};

export const updateAssignment = async (assignment: any) => {
  const { data } = await axios.put(`${ASSIGNMENTS_API}/${assignment._id}`, assignment);
  return data;
};

export const deleteAssignment = async (aid: string) => {
  const { data } = await axios.delete(`${ASSIGNMENTS_API}/${aid}`);
  return data;
};