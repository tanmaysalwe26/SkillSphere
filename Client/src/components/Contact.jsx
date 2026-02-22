import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useState } from "react";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you! Your enquiry has been submitted."+JSON.stringify(formData));
    //setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #e8e4dc 0%, #c5c9d8 100%)",
      }}
    >
      {/* <Navigationbar /> */}
      <Container style={{ paddingTop: "60px", paddingBottom: "60px" }}>
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card
              className="border-0 shadow-lg p-4"
              style={{ borderRadius: "20px", backgroundColor: "#fefdfb" }}
            >
              <h3
                className="text-center mb-4"
                style={{ color: "#2c3e50", fontWeight: "600" }}
              >
                Contact Us
              </h3>

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label style={{ color: "#2c3e50" }}>
                    Full Name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label style={{ color: "#2c3e50" }}>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formSubject">
                  <Form.Label style={{ color: "#2c3e50" }}>Subject</Form.Label>
                  <Form.Control
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Enter subject"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formMessage">
                  <Form.Label style={{ color: "#2c3e50" }}>Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Type your message here..."
                    required
                  />
                </Form.Group>

                <Button
                  type="submit"
                  className="w-100 border-0 shadow-sm"
                  style={{
                    backgroundColor: "#f5e6d3",
                    color: "#2c3e50",
                    borderRadius: "24px",
                    padding: "12px",
                    fontWeight: "500",
                  }}
                  onMouseOver={(e) =>
                    (e.target.style.backgroundColor = "#f0ddc0")
                  }
                  onMouseOut={(e) =>
                    (e.target.style.backgroundColor = "#f5e6d3")
                  }
                >
                  Send Enquiry
                </Button>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
