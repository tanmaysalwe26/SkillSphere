
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export function Dashboard() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #e8e4dc 0%, #c5c9d8 100%)",
      }}
    >
      <Container style={{ paddingTop: "40px", paddingBottom: "60px" }}>
        <Card
          className="mb-4 border-0 shadow-lg overflow-hidden"
          style={{
            backgroundColor: "#fefdfb",
            borderRadius: "16px",
            height: "400px",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                "linear-gradient(to right, rgba(44, 62, 80, 0.7), rgba(44, 62, 80, 0.3)), url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=400&fit=crop')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div
            style={{
              position: "relative",
              zIndex: 1,
              padding: "60px",
              color: "white",
            }}
          >
            <h1
              style={{
                fontWeight: "700",
                fontSize: "3rem",
                marginBottom: "15px",
              }}
            >
              Unlock Your Potential
            </h1>
            <p
              style={{
                fontSize: "1.3rem",
                marginBottom: "25px",
                opacity: 0.95,
              }}
            >
              Learn & Grow with SkillSphere
            </p>
            <Link
              to="/courses"
              className="btn btn-lg border-0 shadow"
              style={{
                backgroundColor: "#f5e6d3",
                color: "#2c3e50",
                borderRadius: "24px",
                padding: "12px 35px",
                fontWeight: "500",
                textDecoration: "none",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#f0ddc0")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#f5e6d3")}
            >
              Explore Courses
            </Link>
          </div>
        </Card>
      </Container>
    </div>
  );
}
