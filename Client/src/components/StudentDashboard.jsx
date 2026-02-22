import { useState, useEffect } from "react";
import { Container, Row, Col, Card, ProgressBar, Badge, Button, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { getMyEnrollments, unenrollCourse } from "../services/enrollService.js";
import { getRole } from "../services/RoleService.js";
import { getUser } from "../services/UserServices.js";
import { Bounce, toast } from "react-toastify";

export function StudentDashboard() {
  const navigate = useNavigate();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const getEnrollments = async () => {
    const response = await getMyEnrollments();
    setEnrolledCourses(response.data);
    setLoading(false);
  }
  console.log(getUser());
  
  useEffect(() => {
    if (getRole() !== 'learner') {
      navigate('/');
      return;
    }
    getEnrollments();

  }, [navigate]);



  const handleUnenroll = async (courseId) => {
    if (!window.confirm("Enroll in this course?")) return;
    await unenrollCourse(courseId);
    toast.success("Unenrolled successfully!", {
      position: "top-right",
      autoClose: 3000,
      theme: "colored",
      transition: Bounce,
    });
    await getEnrollments();
  }

  if (loading)
    return <Spinner animation="border" className="d-block mx-auto mt-5" />;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #e8e4dc 0%, #c5c9d8 100%)",
      }}
    >

      <Container style={{ paddingTop: "20px", paddingBottom: "60px" }}>
        <Card
          className="mb-4 border-0 shadow-lg"
          style={{
            backgroundColor: "#fefdfb",
            borderRadius: "16px",
            padding: "30px",
          }}
        >
          <h2 style={{ color: "#2c3e50", fontWeight: "600" }}>
            Welcome back { }! 😊
          </h2>
        </Card>

        <Row className="mb-4">
          <Col md={6}>
            <Card
              className="h-100 border-0 shadow text-center"
              style={{ borderRadius: "16px", padding: "25px" }}
            >
              <div style={{ fontSize: "36px", marginBottom: "10px" }}>📕</div>
              <h4 style={{ color: "#3d7a8a", fontWeight: "700" }}>
                {enrolledCourses.length}
              </h4>
              <p style={{ color: "#6c757d" }}>Courses Enrolled</p>
            </Card>
          </Col>
          <Col md={6}>
            <Card
              className="h-100 border-0 shadow text-center"
              style={{ borderRadius: "16px", padding: "25px" }}
            >
              <div style={{ fontSize: "36px", marginBottom: "10px" }}>✔️</div>
              <h4 style={{ color: "#3d7a8a", fontWeight: "700" }}>
                {0}
              </h4>
              <p style={{ color: "#6c757d" }}>Completed</p>
            </Card>
          </Col>
        </Row>

        <h3 style={{ color: "#2c3e50", fontWeight: "600", marginBottom: "20px" }}>
          My Courses
        </h3>

        <Row>
          {enrolledCourses.length === 0 ? (
            <p className="text-center text-muted">
              You haven’t enrolled in any courses yet.
            </p>
          ) :
            (
              enrolledCourses.map((enroll) => (
                <Col key={enroll.course._id} lg={4} md={6} className="mb-4">
                  <Card
                    className="h-100 border-0 shadow"
                    style={{ borderRadius: "16px" }}
                  >
                    <Card.Img
                      variant="top"
                      src={
                        enroll.course.imageUrl
                      }
                      style={{
                        height: "180px",
                        objectFit: "contain",
                        borderBottom: "1px solid #ddd",
                      }}
                    />
                    {/* <div
                      style={{
                        background: "linear-gradient(135deg, #3d7a8a 0%, #2c5f6f 100%)",
                        padding: "25px",
                        textAlign: "center",
                      }}
                    >
                      <div style={{ fontSize: "30px" }}>{course.icon}</div>
                      <Badge
                        bg={course.status === "Completed" ? "success" : "warning"}
                      >
                        {course.status}
                      </Badge>
                    </div> */}
                    <div style={{ padding: "20px" }}>
                      <h5 style={{ color: "#2c3e50", fontWeight: "600" }}>
                        {enroll.course.title}
                      </h5>
                      <p style={{ color: "#6c757d" }}>{enroll.course.instructor.name}</p>

                      {/* <ProgressBar
                        now={enroll.course.progress}
                        style={{ height: "8px", borderRadius: "10px" }}
                      /> */}
                      <Button
                        className="btn btn-sm w-100 mt-3 border-0 shadow-sm"
                        style={{
                          backgroundColor: "#f5e6d3",
                          color: "#2c3e50",
                          borderRadius: "20px",
                          fontWeight: "500",
                        }}
                        disabled
                      >
                        Continue Learning
                      </Button>
                      <Link
                        to={'/student-dashboard'}
                        className="btn btn-sm w-100 mt-3 border-0 shadow-sm"
                        style={{
                          backgroundColor: "#f5e6d3",
                          color: "#2c3e50",
                          borderRadius: "20px",
                          fontWeight: "500",
                        }}
                        onClick={() => handleUnenroll(enroll.course._id)}
                      >
                        Unenroll Course
                      </Link>
                    </div>
                  </Card>
                </Col>
              ))
            )
          }
        </Row>
      </Container>
    </div>
  );
}