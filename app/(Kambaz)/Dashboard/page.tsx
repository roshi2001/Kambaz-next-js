"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { FormControl } from "react-bootstrap";
import { Row, Col, Card, CardImg, CardBody, CardTitle, CardText, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addNewCourse, deleteCourse, updateCourse } from "../Courses/reducer";
import { toggleEnrollment } from "../Enrollments/reducer";
import { RootState } from "../store";

export default function Dashboard() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { courses } = useSelector((state: any) => state.coursesReducer);
  const reduxEnrollments = useSelector((s: RootState) => s.enrollments.enrollments);
  const dispatch = useDispatch();

  const [course, setCourse] = useState<any>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/reactjs.jpg",
    description: "New Description",
  });

  const [showAll, setShowAll] = useState(false);

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

  const isEnrolled = (cid: string) =>
    reduxEnrollments.some(
      (e) =>
        String(e.user) === String(currentUser?._id) &&
        String(e.course) === String(cid)
    );

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
          className="btn btn-primary float-end"
          id="wd-add-new-course-click"
          onClick={() => dispatch(addNewCourse(course))}
        >
          Add
        </button>
        <button
          className="btn btn-warning float-end me-2"
          onClick={() => dispatch(updateCourse(course))}
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
            <Col key={course._id} className="wd-dashboard-course" style={{ width: "300px" }}>
              <Card className="position-relative">
                {/* ⬇️ move Enroll/Unenroll to top-right */}
                {currentUser?._id && (
                  <button
                    className={`btn btn-sm position-absolute top-0 end-0 m-2 ${
                      isEnrolled(course._id) ? "btn-danger" : "btn-success"
                    }`}
                    id={`wd-${
                      isEnrolled(course._id) ? "unenroll" : "enroll"
                    }-${course._id}`}
                    onClick={(event) => {
                      event.preventDefault();
                      dispatch(
                        toggleEnrollment({
                          user: String(currentUser._id),
                          course: String(course._id),
                        })
                      );
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
                      onClick={(event) => {
                        event.preventDefault();
                        dispatch(deleteCourse(course._id));
                      }}
                      className="btn btn-danger float-end"
                      id="wd-delete-course-click"
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
