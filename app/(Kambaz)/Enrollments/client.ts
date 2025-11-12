import axios from "axios";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const USERS_API = `${HTTP_SERVER}/api/users`;
const ENROLLMENTS_API = `${HTTP_SERVER}/api/enrollments`;


export const findEnrollmentsForUser = async (userId: string) => {
  const { data } = await axios.get(`${USERS_API}/${userId}/enrollments`, {
    withCredentials: true,
  });
  return data as Array<{ _id: string; user: string; course: string }>;
};

export const enrollInCourse = async (userId: string, courseId: string) => {
  const { data } = await axios.post(
    ENROLLMENTS_API,
    { user: String(userId), course: String(courseId) },
    { withCredentials: true }
  );
  return data as { _id: string; user: string; course: string };
};


export const unenrollById = async (enrollmentId: string) => {
  await axios.delete(`${ENROLLMENTS_API}/${enrollmentId}`, {
    withCredentials: true,
  });
};


export const unenrollByPair = async (userId: string, courseId: string) => {
  await axios.delete(
    `${USERS_API}/${userId}/courses/${courseId}/enrollment`,
    { withCredentials: true }
  );
};
