import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Table, Button, Spinner } from "react-bootstrap";
import { Bar } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
import { toast, Bounce } from "react-toastify";
import { getAdminStats, getAllUsers, getAllCoursesAdmin, deleteCourse, getAllUserEnrollments} from "../services/adminService";
import { getToken } from "../services/TokenService";
import { getRole } from "../services/RoleService";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    const role = getRole();

    if (!token) {
      navigate("/");
      return;
    }

    if (role !== "admin") {
      navigate("/");
      return;
    }

    const fetchData = async () => {
      try {
        const [statsRes, usersRes, coursesRes,enrollRes] = await Promise.all([
          getAdminStats(),
          getAllUsers(),
          getAllCoursesAdmin(),
          getAllUserEnrollments()
        ]);

        setStats(statsRes.data || {});
        setUsers(Array.isArray(usersRes.data) ? usersRes.data : []);
        setCourses(Array.isArray(coursesRes.data) ? coursesRes.data : []);
        setEnrollments(enrollRes.data);
      } catch (error) {
        toast.error(error.response?.data?.msg || "Error fetching admin data or unauthorized access.", {
          position: "top-right",
          theme: "colored",
          transition: Bounce,
        });
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

//   // Delete user
//   const handleDeleteUser = async (id) => {
//     if (window.confirm("Delete this user?")) {
//       try {
//         await deleteUser(id);
//         setUsers((prev) => prev.filter((u) => u._id !== id));
//         toast.success("User deleted successfully!", {
//           position: "top-right",
//           theme: "colored",
//           transition: Bounce,
//         });
//       } catch (error) {
//         toast.error("Error deleting user", {
//           position: "top-right",
//           theme: "colored",
//           transition: Bounce,
//         });
//       }
//     }
//   };

  // Delete course
  const handleDeleteCourse = async (id) => {
    if (window.confirm("Delete this course?")) {
      try {
        await deleteCourse(id);
        setCourses((prev) => prev.filter((c) => c._id !== id));
        setEnrollments((prev) => prev.filter((e) => e.course?._id !== id));
        toast.success("Course deleted successfully!", {
          position: "top-right",
          theme: "colored",
          transition: Bounce,
        });
      } catch (error) {
        toast.error(error.response?.data?.msg || "Failed to delete course", {
          position: "top-right",
          theme: "colored",
          transition: Bounce,
        });
      }
    }
  };

  if (loading)
    return <Spinner animation="border" className="d-block mx-auto mt-5" />;

  const chartData = {
    labels: ["Users", "Courses", "Enrollments", "Instructors"],
    datasets: [
      {
        label: "Count",
        data: [
          stats.totalUsers,
          stats.totalCourses,
          stats.totalEnrollments,
          stats.instructors,
        ],
        backgroundColor: ["#007bff", "#28a745", "#ffc107", "#dc3545"],
      },
    ],
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #e8e4dc 0%, #c5c9d8 100%)",
      }}
    >
    <Container style={{ paddingTop: "60px", paddingBottom: "60px" }}>
      <h2 className="mb-4 text-center fw-bold text-secondary">Admin Dashboard</h2>

      <Row className="mb-4 text-center">
        {[
          { label: "Total Users", value: stats.totalUsers },
          { label: "Total Courses", value: stats.totalCourses },
          { label: "Enrollments", value: stats.totalEnrollments },
          { label: "Instructors", value: stats.instructors },
        ].map((item, index) => (
          <Col md={3} key={index}>
            <Card className="shadow-sm border-0">
              <Card.Body>
                <Card.Title className="fw-bold fs-4 text-primary">
                  {item.value ?? 0}
                </Card.Title>
                <Card.Text className="text-muted">{item.label}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Card className="mb-4 border-0 shadow-sm">
        <Card.Body>
          <h5 className="fw-bold text-secondary mb-3">System Overview</h5>
          <Bar
            data={chartData}
            options={{
              responsive: true,
              plugins: { legend: { position: "top" } },
            }}
          />
        </Card.Body>
      </Card>

      <Card className="mb-4 border-0 shadow-sm">
        <Card.Body>
          <Card.Title className="fw-bold mb-3 text-secondary">Manage Users</Card.Title>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Sr. No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(users) && users.length > 0 ? (
                users.map((u,index) => (
                  <tr key={u._id}>
                    <td>{index+1}</td>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>{u.role}</td>
                    {/* <td>
                      {u.role !== "admin" && (
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDeleteUser(u._id)}
                        >
                          Delete
                        </Button>
                      )}
                    </td> */}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center text-muted">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Card className="border-0 shadow-sm">
        <Card.Body>
          <Card.Title className="fw-bold mb-3 text-secondary">Manage Courses</Card.Title>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Title</th>
                <th>Instructor</th>
                <th>Category</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(courses) && courses.length > 0 ? (
                courses.map((c) => (
                  <tr key={c._id}>
                    <td>{c.title}</td>
                    <td>{c.instructor?.name || "N/A"}</td>
                    <td>{c.category}</td>
                    <td>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDeleteCourse(c._id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center text-muted">
                    No courses found
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <Card.Title>All Enrollments</Card.Title>
          <Table striped bordered hover responsive size="sm">
            <thead>
              <tr>
                <th>Learner</th>
                <th>Email</th>
                <th>Course</th>
                <th>Category</th>
                <th>Enrolled On</th>
              </tr>
            </thead>
            <tbody>
              {enrollments.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center text-muted">
                    No enrollments yet
                  </td>
                </tr>
              ) : (
                enrollments.map((e) => (
                  <tr key={e._id}>
                    <td>{e.user?.name || "Deleted User"}</td>
                    <td>{e.user?.email || "—"}</td>
                    <td>{e.course?.title || "Deleted Course"}</td>
                    <td>{e.course?.category || "—"}</td>
                    <td>{new Date(e.enrolledAt).toLocaleDateString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
    </div>
  );
}
