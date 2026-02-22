import { Container, Row, Col, Card } from "react-bootstrap";
import sagar from "../assets/sagar.png";
import madhuri from "../assets/madhuri.png";
import tanmay from "../assets/tanmay.jpg";


export function AboutUs() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #e8e4dc 0%, #c5c9d8 100%)",
        paddingTop: "60px",
        paddingBottom: "60px",
      }}
    >
      <Container>
        <div className="text-center mb-5">
          <h1 style={{ color: "#2c3e50", fontWeight: "600", fontSize: "2.5rem" }}>
            About Us
          </h1>
        </div>

        <Card
          className="mb-4 border-0 shadow-lg"
          style={{
            backgroundColor: "#fefdfb",
            borderRadius: "16px",
            padding: "40px",
          }}
        >
          <h3 style={{ color: "#2c3e50", fontWeight: "600", marginBottom: "20px" }}>
            Our Mission
          </h3>

          <p style={{ color: "#495057", fontSize: "1.05rem", lineHeight: "1.8" }}>
            At SkillSphere, we believe that everyone has something valuable to
            teach and learn. Our platform connects passionate instructors with
            eager learners, creating a vibrant community where knowledge flows
            freely and skills are developed collaboratively. We're committed to
            making quality education accessible, engaging, and transformative
            for people around the world.
          </p>
        </Card>

        <h3 className="text-center mb-4" style={{ color: "#2c3e50", fontWeight: "600" }}>
          Team Members
        </h3>

        {/* Row wrapping the team member columns */}
        <Row className="justify-content-center">
          <Col md={4} className="mb-4">
            <Card
              className="h-100 border-0 shadow"
              style={{
                backgroundColor: "#fefdfb",
                borderRadius: "16px",
                padding: "30px",
              }}
            >
              <div className="text-center mb-3">
                <img
                  src={sagar}
                  alt="Sagar Udgiri"
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "12px",
                    objectFit: "cover",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                  }}
                />
              </div>

              <h5 className="text-center mb-3" style={{ color: "#2c3e50", fontWeight: "600" }}>
                Sagar Udgiri (TL)
              </h5>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card
              className="h-100 border-0 shadow"
              style={{
                backgroundColor: "#fefdfb",
                borderRadius: "16px",
                padding: "30px",
              }}
            >
              <div className="text-center mb-3">
                <img
                  src={madhuri}
                  alt="Madhuri Chavan"
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "12px",
                    objectFit: "cover",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                  }}
                />
              </div>

              <h5 className="text-center mb-3" style={{ color: "#2c3e50", fontWeight: "600" }}>
                Madhuri Chavan (CL)
              </h5>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card
              className="h-100 border-0 shadow"
              style={{
                backgroundColor: "#fefdfb",
                borderRadius: "16px",
                padding: "30px",
              }}
            >
              <div className="text-center mb-3">
                <img
                  src={tanmay}
                  alt="Tanmay Salwe"
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "12px",
                    objectFit: "cover",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                  }}
                />
              </div>

              <h5 className="text-center mb-3" style={{ color: "#2c3e50", fontWeight: "600" }}>
                Tanmay Salwe (CCR)
              </h5>
            </Card>
          </Col>

          
        </Row>

        <div className="text-center mt-5">
          <h3 style={{ color: "#2c3e50", fontWeight: "600", marginBottom: "20px" }}>
            Ready to Start Your Learning Journey?
          </h3>

          <a
            href="Register"
            className="btn btn-lg border-0 shadow-sm"
            style={{
              backgroundColor: "#f5e6d3",
              color: "#2c3e50",
              borderRadius: "24px",
              padding: "12px 40px",
              fontWeight: "500",
              textDecoration: "none",
              display: "inline-block",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#f0ddc0")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#f5e6d3")}
          >
            Join SkillSphere Today
          </a>
        </div>
      </Container>
    </div>
  );
}


