"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import * as courseClient from "../Courses/client";             // fetchAllCourses, findMyCourses, CRUD
import * as enrollClient from "../Enrollments/client";         // enrollments API
import {
  FormControl,
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Button,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setCourses } from "../Courses/reducer";
import { setEnrollments, toggleEnrollment } from "../Enrollments/reducer";
import type { RootState } from "../store";

export default function Dashboard() {
  const { currentUser } = useSelector((s: any) => s.accountReducer);
  const { courses } = useSelector((s: any) => s.coursesReducer);
  const reduxEnrollments = useSelector(
    (s: RootState) => s.enrollments.enrollments
  );
  const dispatch = useDispatch();

  // local draft course state (unchanged)
  const [course, setCourse] = useState<any>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/reactjs.jpg",
    description: "New Description",
  });

  // Toggle: My Courses (default) vs All Courses
  const [showAll, setShowAll] = useState(false);

  // Load courses depending on toggle
  const fetchCourses = async (all: boolean) => {
    try {
      const rows = all
        ? await courseClient.fetchAllCourses()
        : await courseClient.findMyCourses();
      dispatch(setCourses(rows));
    } catch (err) {
      console.error(err);
    }
  };

  // Initial + when user/toggle changes: load courses and enrollments
  useEffect(() => {
    fetchCourses(showAll);
    (async () => {
      if (!currentUser?._id) return;
      try {
        const rows = await enrollClient.findEnrollmentsForUser(
          String(currentUser._id)
        );
        dispatch(setEnrollments(rows));
      } catch (e) {
        console.error(e);
      }
    })();
  }, [currentUser, showAll, dispatch]);

  // Helpers
  const getEnrollment = (uid: string, cid: string) =>
    reduxEnrollments.find(
      (e) => String(e.user) === String(uid) && String(e.course) === String(cid)
    );

  const isEnrolled = (cid: string) =>
    !!getEnrollment(String(currentUser?._id ?? ""), String(cid));

  // What to display
  const visibleCourses = useMemo(() => {
    if (!currentUser?._id) return [];
    if (showAll) return courses;
    return courses.filter((c: any) =>
      reduxEnrollments.some(
        (e) =>
          String(e.user) === String(currentUser._id) &&
          String(e.course) === String(c._id)
      )
    );
  }, [showAll, currentUser?._id, courses, reduxEnrollments]);

  // Course CRUD (unchanged) — auto-enroll creator on Add
  const onAddNewCourse = async () => {
    const newCourse = await courseClient.createCourse(course);
    dispatch(setCourses([...courses, newCourse]));
    if (currentUser?._id && newCourse?._id) {
      try {
        const created = await enrollClient.enrollInCourse(
          String(currentUser._id),
          String(newCourse._id)
        );
        dispatch(
          toggleEnrollment({
            user: created.user,
            course: created.course,
            _id: created._id,
          })
        );
      } catch (e) {
        console.error(e);
      }
    }
  };

  const onDeleteCourse = async (courseId: string) => {
    await courseClient.deleteCourse(courseId);
    dispatch(setCourses(courses.filter((c) => c._id !== courseId)));
  };

  const onUpdateCourse = async () => {
    await courseClient.updateCourse(course);
    dispatch(setCourses(courses.map((c) => (c._id === course._id ? course : c))));
  };

  return (
    <div id="wd-dashboard">
      <h1
        id="wd-dashboard-title"
        className="d-flex justify-content-between align-items-center"
      >
        <span>Dashboard</span>
        <button
          className="btn btn-primary"
          id="wd-enrollments-toggle"
          onClick={() => setShowAll((v) => !v)}
        >
          {showAll ? "My Courses" : "All Courses"}
        </button>
      </h1>

      <hr />
      <h5>
        New Course
        <button
          onClick={onAddNewCourse}
          className="btn btn-primary float-end"
          id="wd-add-new-course-click"
        >
          Add
        </button>
        <button
          onClick={onUpdateCourse}
          className="btn btn-secondary float-end"
          id="wd-update-course-click"
        >
          Update
        </button>
      </h5>
      <hr />
      <br />

      <FormControl
        value={course.name}
        className="mb-2"
        onChange={(e) => setCourse({ ...course, name: e.target.value })}
      />
      <FormControl
        as="textarea"
        value={course.description}
        rows={3}
        className="mb-2"
        onChange={(e) => setCourse({ ...course, description: e.target.value })}
      />

      <h2 id="wd-dashboard-published">
        Published Courses ({visibleCourses.length})
      </h2>
      <hr />

      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {visibleCourses.map((course: any) => (
            <Col
              key={course._id}
              className="wd-dashboard-course"
              style={{ width: "300px" }}
            >
              <Card className="position-relative">
                {currentUser?._id && (
                  <button
                    className={`btn btn-sm position-absolute top-0 end-0 m-2 ${
                      isEnrolled(course._id) ? "btn-danger" : "btn-success"
                    }`}
                    id={`wd-${
                      isEnrolled(course._id) ? "unenroll" : "enroll"
                    }-${course._id}`}
                    onClick={async (event) => {
                      event.preventDefault();
                      const uid = String(currentUser._id);
                      const cid = String(course._id);
                      try {
                        if (isEnrolled(cid)) {
                          const enr = getEnrollment(uid, cid);
                          if (enr?._id) {
                            await enrollClient.unenrollById(enr._id);
                          } else {
                            await enrollClient.unenrollByPair(uid, cid);
                          }
                          dispatch(toggleEnrollment({ user: uid, course: cid }));
                        } else {
                          const created = await enrollClient.enrollInCourse(
                            uid,
                            cid
                          );
                          dispatch(
                            toggleEnrollment({
                              user: created.user,
                              course: created.course,
                              _id: created._id,
                            })
                          );
                        }
                      } catch (e) {
                        console.error(e);
                      }
                    }}
                    title={isEnrolled(course._id) ? "Unenroll" : "Enroll"}
                  >
                    {isEnrolled(course._id) ? "Unenroll" : "Enroll"}
                  </button>
                )}

                <Link
                  href={`/Courses/${course._id}/Home`}
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                >
                  <CardImg
                    src="/images/reactjs.jpg"
                    variant="top"
                    width="100%"
                    height={160}
                  />
                  <CardBody className="card-body">
                    <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      {course.name}
                    </CardTitle>
                    <CardText
                      className="wd-dashboard-course-description overflow-hidden"
                      style={{ height: "100px" }}
                    >
                      {course.description}
                    </CardText>

                    <Button variant="primary">Go</Button>

                    <button
                      className="btn btn-danger"
                      onClick={(event) => {
                        event.preventDefault();
                        onDeleteCourse(course._id);
                      }}
                    >
                      Delete
                    </button>

                    <button
                      id="wd-edit-course-click"
                      onClick={(event) => {
                        event.preventDefault();
                        setCourse(course);
                      }}
                      className="btn btn-warning me-2 float-end"
                    >
                      Edit
                    </button>
                  </CardBody>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
