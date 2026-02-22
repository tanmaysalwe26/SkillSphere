import { Navbar, Nav, Container, Dropdown, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { getRole, removeRole } from "../services/RoleService";
import { getToken, removeToken } from "../services/TokenService";
import { removeUser } from "../services/UserServices";

export function Navigationbar() {
  const navigate = useNavigate();

  function logout() {
    removeToken();
    removeRole();
    removeUser();
    navigate("/");
  }

  return (
    <Navbar
      expand="lg"
      className="bg-body-tertiary"
      style={{
        backgroundColor: "#fefdfb",
        padding: "15px 0",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <svg
            width="35"
            height="35"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 5L5 12.5V27.5L20 35L35 27.5V12.5L20 5Z"
              fill="#2c5f6f"
              opacity="0.8"
            />
            <path d="M20 15L12 19V28L20 32L28 28V19L20 15Z" fill="#042b35ff" />
          </svg>
          <span
            className="ms-2"
            style={{ color: "#2c3e50", fontWeight: "600", fontSize: "1.3rem" }}
          >
            SkillSphere
          </span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              as={Link}
              to="/"
              variant="outline"
              className="border-0"
              style={{
                color: "#2c3e50",
                fontWeight: "500",
                backgroundColor: "transparent",
                padding: "8px 20px",
                borderRadius: "20px",
              }}
              onMouseOver={(e) => (
                (e.target.style.color = "black"),
                (e.target.style.backgroundColor = "#f5f5f5")
              )}
              onMouseOut={(e) => (
                (e.target.style.color = "#6c757d"),
                (e.target.style.backgroundColor = "transparent")
              )}
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/Courses"
              variant="outline"
              className="border-0"
              style={{
                color: "#2c3e50",
                fontWeight: "500",
                backgroundColor: "transparent",
                padding: "8px 20px",
                borderRadius: "20px",
              }}
              onMouseOver={(e) => (
                (e.target.style.color = "black"),
                (e.target.style.backgroundColor = "#f5f5f5")
              )}
              onMouseOut={(e) => (
                (e.target.style.color = "#6c757d"),
                (e.target.style.backgroundColor = "transparent")
              )}
            >
              Courses
            </Nav.Link>
            {getRole() === "instructor" ? (
              <>
                <Nav.Link
                  as={Link}
                  to="/Create-Course"
                  variant="outline"
                  className="border-0"
                  style={{
                    color: "#2c3e50",
                    fontWeight: "500",
                    backgroundColor: "transparent",
                    padding: "8px 20px",
                    borderRadius: "20px",
                  }}
                  onMouseOver={(e) => (
                    (e.target.style.color = "black"),
                    (e.target.style.backgroundColor = "#f5f5f5")
                  )}
                  onMouseOut={(e) => (
                    (e.target.style.color = "#6c757d"),
                    (e.target.style.backgroundColor = "transparent")
                  )}
                >
                  Create Course
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/my-courses"
                  variant="outline"
                  className="border-0"
                  style={{
                    color: "#2c3e50",
                    fontWeight: "500",
                    backgroundColor: "transparent",
                    padding: "8px 20px",
                    borderRadius: "20px",
                  }}
                  onMouseOver={(e) => (
                    (e.target.style.color = "black"),
                    (e.target.style.backgroundColor = "#f5f5f5")
                  )}
                  onMouseOut={(e) => (
                    (e.target.style.color = "#6c757d"),
                    (e.target.style.backgroundColor = "transparent")
                  )}
                >
                  My Courses
                </Nav.Link>
              </>
            ) : null}
            {getRole() === "admin" ? (
              <Nav.Link
                as={Link}
                to="/admin"
                variant="outline"
                className="border-0"
                style={{
                  color: "#2c3e50",
                  fontWeight: "500",
                  backgroundColor: "transparent",
                  padding: "8px 20px",
                  borderRadius: "20px",
                }}
                onMouseOver={(e) => (
                  (e.target.style.color = "black"),
                  (e.target.style.backgroundColor = "#f5f5f5")
                )}
                onMouseOut={(e) => (
                  (e.target.style.color = "#6c757d"),
                  (e.target.style.backgroundColor = "transparent")
                )}
              >
                Admin Dashboard
              </Nav.Link>
            ) : null}
            {getRole() === "learner" ? (
              <Nav.Link
                as={Link}
                to="/student-dashboard"
                variant="outline"
                className="border-0"
                style={{
                  color: "#2c3e50",
                  fontWeight: "500",
                  backgroundColor: "transparent",
                  padding: "8px 20px",
                  borderRadius: "20px",
                }}
                onMouseOver={(e) => (
                  (e.target.style.color = "black"),
                  (e.target.style.backgroundColor = "#f5f5f5")
                )}
                onMouseOut={(e) => (
                  (e.target.style.color = "#6c757d"),
                  (e.target.style.backgroundColor = "transparent")
                )}
              >
                My Enrollments
              </Nav.Link>
            ) : null}
            <Nav.Link
              as={Link}
              to="/AboutUs"
              variant="outline"
              className="border-0"
              style={{
                color: "#2c3e50",
                fontWeight: "500",
                backgroundColor: "transparent",
                padding: "8px 20px",
                borderRadius: "20px",
              }}
              onMouseOver={(e) => (
                (e.target.style.color = "black"),
                (e.target.style.backgroundColor = "#f5f5f5")
              )}
              onMouseOut={(e) => (
                (e.target.style.color = "#6c757d"),
                (e.target.style.backgroundColor = "transparent")
              )}
            >
              About
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/contact"
              variant="outline"
              className="border-0"
              style={{
                color: "#2c3e50",
                fontWeight: "500",
                backgroundColor: "transparent",
                padding: "8px 20px",
                borderRadius: "20px",
              }}
              onMouseOver={(e) => (
                (e.target.style.color = "black"),
                (e.target.style.backgroundColor = "#f5f5f5")
              )}
              onMouseOut={(e) => (
                (e.target.style.color = "#6c757d"),
                (e.target.style.backgroundColor = "transparent")
              )}
            >
              Contact
            </Nav.Link>
          </Nav>
          {getToken() ? (
            <Button
              as={Link}
              to="/login"
              variant="outline"
              className="border-0"
              onClick={logout}
              style={{
                color: "#2c3e50",
                fontWeight: "500",
                backgroundColor: "transparent",
                padding: "8px 20px",
                borderRadius: "20px",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#f5f5f5")}
              onMouseOut={(e) =>
                (e.target.style.backgroundColor = "transparent")
              }
            >
              Log Out
            </Button>
          ) : (
            <div className="d-flex gap-2">
              <Button
                as={Link}
                to="/login"
                variant="outline"
                className="border-0"
                style={{
                  color: "#2c3e50",
                  fontWeight: "500",
                  backgroundColor: "transparent",
                  padding: "8px 20px",
                  borderRadius: "20px",
                }}
                onMouseOver={(e) =>
                  (e.target.style.backgroundColor = "#f5f5f5")
                }
                onMouseOut={(e) =>
                  (e.target.style.backgroundColor = "transparent")
                }
              >
                Log In
              </Button>
              <Button
                as={Link}
                to="/Register"
                className="border-0"
                style={{
                  backgroundColor: "#f5e6d3",
                  color: "#2c3e50",
                  fontWeight: "500",
                  padding: "8px 20px",
                  borderRadius: "20px",
                }}
                onMouseOver={(e) =>
                  (e.target.style.backgroundColor = "#f0ddc0")
                }
                onMouseOut={(e) => (e.target.style.backgroundColor = "#f5e6d3")}
              >
                Sign Up
              </Button>
            </div>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
