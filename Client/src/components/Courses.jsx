import { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Card, Button, ListGroup, Spinner } from "react-bootstrap";
import { getCourses } from "../services/courseService";
import { enrollCourse } from "../services/enrollService";
import { getToken } from "../services/TokenService";
import { Bounce, toast } from "react-toastify";
import { getRole } from "../services/RoleService";

export function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCourses = async () => {
    try {
      const response = await getCourses();
      setCourses(response.data);
      
    } catch (error) {
      console.error("Eror fetching courses:", error);
    }finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const hasShownToast = useRef(false);

  const handleEnroll = async (courseId) => {
    const token = getToken();
    if (!token && !hasShownToast.current) {
      hasShownToast.current = true;
      toast.error("Please login to enroll in a course", {
        position: "top-right",
        theme: "colored",
        transition: Bounce,
      });
    }else{
    if (!window.confirm("Enroll in this course?")) return;

    try {
      await enrollCourse(courseId);
      toast.success("Enrolled successfully!", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
          transition: Bounce,
        });
    } catch (err) {
      toast.error(err.response?.data?.msg || "Enrollment failed", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
          transition: Bounce,
        });
    }}
  };

  if (loading)
    return <Spinner animation="border" className="d-block mx-auto mt-5" />;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #e8e4dc 0%, #c5c9d8 100%)",
      }}
    >
      <Container style={{ paddingTop: "60px", paddingBottom: "60px" }}>
        <h2
          className="text-center mb-5"
          style={{ color: "#2c3e50", fontWeight: "600" }}
        >
          Explore Our Courses
        </h2>

        <Row>
          {courses.map((course) => {
            return (
              <Col key={course._id} md={6} lg={4} className="d-flex justify-content-center mb-4">
                {/* Kitchen sink template use from bootstrap */}
                <Card
                  className="border-0 shadow h-100"
                  style={{
                    width: "18rem",
                    backgroundColor: "#fefdfb",
                    borderRadius: "16px",
                    overflow: "hidden",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = "translateY(-5px)";
                    e.currentTarget.style.boxShadow =
                      "0 6px 20px rgba(0,0,0,0.15)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 2px 8px rgba(0,0,0,0.1)";
                  }}
                >
                  <Card.Img
                    variant="top"
                    src={
                      course.imageUrl ||
                      "../src/assets/def.png"
                    }
                    style={{
                      height: "180px",
                      objectFit: "contain",
                      borderBottom: "1px solid #ddd",
                    }}
                  />

                  <div
                    style={{
                      background:
                        "linear-gradient(135deg, #3d7a8a 0%, #2c5f6f 100%)",
                      padding: "18px",
                      textAlign: "center",
                      color: "#fff",
                      fontWeight: "600",
                      fontSize: "1.2rem",
                      borderBottom: "1px solid rgba(255,255,255,0.2)",
                    }}
                  >
                    {course.title || "Untitled Course"}
                  </div>

                  <Card.Body
                    style={{
                      padding: "16px 20px",
                      borderBottom: "1px solid #eee",
                    }}
                  >
                    <Card.Text
                      style={{ color: "#6c757d", fontSize: "0.95rem" }}
                    >
                      <strong>Description: </strong>
                      {course.description || "No description available."}
                    </Card.Text>
                  </Card.Body>

                  <ListGroup
                    className="list-group-flush"
                    style={{ border: "none" }}
                  >
                    <ListGroup.Item
                      style={{
                        backgroundColor: "#fefdfb",
                        color: "#444",
                        fontSize: "0.9rem",
                        borderColor: "#eee",
                      }}
                    >
                      <strong>Instructor:</strong>{" "}
                      {course.instructor?.name || "N/A"}
                    </ListGroup.Item>
                    <ListGroup.Item
                      style={{
                        backgroundColor: "#fefdfb",
                        color: "#444",
                        fontSize: "0.9rem",
                        borderColor: "#eee",
                      }}
                    >
                      <strong>Category:</strong> {course.category || "—"}
                    </ListGroup.Item>
                    <ListGroup.Item
                      style={{
                        backgroundColor: "#fefdfb",
                        color: "#444",
                        fontSize: "0.9rem",
                        borderColor: "#eee",
                      }}
                    >
                      <strong>Level:</strong> {course.level || "Beginner"}
                    </ListGroup.Item>
                  </ListGroup>

                  <Card.Body style={{ textAlign: "center" }}>
                    {getRole()==='instructor' || getRole()==='admin'  ? null : <Button
                      variant="light"
                      className="w-100 border-0 shadow-sm"
                      style={{
                        backgroundColor: "#f5e6d3",
                        color: "#2c3e50",
                        borderRadius: "24px",
                        fontWeight: "500",
                        padding: "10px",
                        transition: "background-color 0.3s ease",
                      }}
                      onMouseOver={(e) =>
                        (e.target.style.backgroundColor = "#f0ddc0")
                      }
                      onMouseOut={(e) =>
                        (e.target.style.backgroundColor = "#f5e6d3")
                      }
                      onClick={() => handleEnroll(course._id)}
                    >
                      Enroll Now
                    </Button>}
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
}
