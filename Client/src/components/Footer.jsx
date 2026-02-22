import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: "#fefdfb",
        borderTop: "1px solid rgba(44,62,80,0.06)",
        paddingTop: "28px",
        paddingBottom: "28px",
        marginTop: "40px",
      }}
    >
      <Container>
        <Row className="align-items-start">
          <Col md={4} className="mb-3">
            <h5 style={{ color: "#2c3e50", fontWeight: 600 }}>SkillSphere</h5>
            <p style={{ color: "#6c757d", marginBottom: 0 }}>
              Learn, teach and grow together — bite-sized courses, friendly community.
            </p>
          </Col>

          <Col md={3} className="mb-3">
            <h6 style={{ color: "#2c3e50", fontWeight: 600 }}>Navigate</h6>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              <li>
                <Link to="/" style={{ color: "#6c757d", textDecoration: "none" }}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/courses" style={{ color: "#6c757d", textDecoration: "none" }}>
                  Courses
                </Link>
              </li>
              <li>
                <Link to="/aboutus" style={{ color: "#6c757d", textDecoration: "none" }}>
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" style={{ color: "#6c757d", textDecoration: "none" }}>
                  Contact
                </Link>
              </li>
            </ul>
          </Col>

          <Col md={5} className="mb-3">
            <h6 style={{ color: "#2c3e50", fontWeight: 600 }}>Contact & Follow</h6>
            <p style={{ color: "#6c757d", marginBottom: "8px" }}>
              Email: <a href="mailto:hello@skillsphere.example" style={{ color: "#2c3e50", textDecoration: "none" }}>hello@skillsphere.example</a>
            </p>
            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
              <a href="#" aria-label="twitter" style={{ textDecoration: "none", fontSize: "20px" }}>🐦</a>
              <a href="#" aria-label="linkedin" style={{ textDecoration: "none", fontSize: "20px" }}>🔗</a>
              <a href="#" aria-label="instagram" style={{ textDecoration: "none", fontSize: "20px" }}>📸</a>
              <span style={{ color: "#6c757d", marginLeft: "8px", fontSize: "0.9rem" }}>
                Follow us
              </span>
            </div>
          </Col>
        </Row>

        <hr style={{ borderColor: "rgba(44,62,80,0.06)" }} />

        <Row className="align-items-center">
          <Col md={6}>
            <small style={{ color: "#6c757d" }}>
              © {year} SkillSphere — All rights reserved.
            </small>
          </Col>
          <Col md={6} className="text-md-end">
            <small style={{ color: "#6c757d" }}>
              <Link style={{ color: "#6c757d", textDecoration: "none", marginRight: 12 }}>
                Terms
              </Link>
              <Link style={{ color: "#6c757d", textDecoration: "none" }}>
                Privacy
              </Link>
            </small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
