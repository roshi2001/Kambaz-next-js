'use client';

import Link from "next/link";
import { Row, Col, Card, Button } from "react-bootstrap";

export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2>
      <hr />

      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {/* Course 1 */}
          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link
                href="/Courses/1234/Home"
                className="wd-dashboard-course-link text-decoration-none text-dark"
              >
                <Card.Img
                  variant="top"
                  src="/images/reactjs.jpg"
                  style={{ width: "100%", height: 160, objectFit: "cover" }}
                  alt="CS1234 React JS"
                />
                <Card.Body>
                  <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                    CS1234 React JS
                  </Card.Title>
                  <Card.Text
                    className="wd-dashboard-course-description overflow-hidden"
                    style={{ height: "100px" }}
                  >
                    Full Stack software developer
                  </Card.Text>
                  <Button variant="primary">Go</Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>

          {/* Course 2 */}
          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link
                href="/Courses/5610/Home"
                className="wd-dashboard-course-link text-decoration-none text-dark"
              >
                <Card.Img
                  variant="top"
                  src="/images/web dev.jpg"
                  style={{ width: "100%", height: 160, objectFit: "cover" }}
                  alt="CS5610 Web Development"
                />
                <Card.Body>
                  <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                    CS5610 Web Development
                  </Card.Title>
                  <Card.Text
                    className="wd-dashboard-course-description overflow-hidden"
                    style={{ height: "100px" }}
                  >
                    Web Designer
                  </Card.Text>
                  <Button variant="primary">Go</Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>

          {/* Course 3 */}
          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link
                href="/Courses/CS5650/Home"
                className="wd-dashboard-course-link text-decoration-none text-dark"
              >
                <Card.Img
                  variant="top"
                  src="/images/security.jpg"
                  style={{ width: "100%", height: 160, objectFit: "cover" }}
                  alt="CS5650 Web Security"
                />
                <Card.Body>
                  <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                    CS5650 Web Security
                  </Card.Title>
                  <Card.Text
                    className="wd-dashboard-course-description overflow-hidden"
                    style={{ height: "100px" }}
                  >
                    Secure coding for web apps
                  </Card.Text>
                  <Button variant="primary">Go</Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}
