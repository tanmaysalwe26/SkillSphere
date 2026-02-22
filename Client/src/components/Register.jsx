import { useState } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { register } from "../services/UserServices";
import { Bounce, toast } from "react-toastify";

export function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "learner",
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData.password === formData.confirmPassword) {
      try {
        const { ...userData } = formData;
        const response = await register(userData);
        if (response.status === 201) {
          toast.success("Successfull!! Please Log in", {
            position: "top-right",
            autoClose: 3000,
            theme: "colored",
            transition: Bounce,
          });
          navigate("/login");
        }
      } catch (error) {
        toast.error(
          error.response?.data?.msg ||
          "Something went wrong while creating course",
          {
            position: "top-right",
            theme: "colored",
            transition: Bounce,
          }
        );
      }
    } else {
      toast.error(
        "Passwords do not match",
        {
          position: "top-right",
          theme: "colored",
          transition: Bounce,
        }
      );
    }
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #e8e4dc 0%, #c5c9d8 100%)",
      }}
    >
      <Card
        className="p-5 shadow-lg border-0"
        style={{
          width: "450px",
          height: "650px",
          backgroundColor: "#fefdfb",
          borderRadius: "16px",
        }}
      >
        <div className="text-center mb-4">
          <div className="d-flex justify-content-center align-items-center mb-3">
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 5L5 12.5V27.5L20 35L35 27.5V12.5L20 5Z"
                fill="#2c5f6f"
                opacity="0.8"
              />
              <path
                d="M20 15L12 19V28L20 32L28 28V19L20 15Z"
                fill="#042b35ff"
              />
            </svg>
            <h4
              className="ms-2 mb-0"
              style={{ color: "#2c3e50", fontWeight: "600" }}
            >
              SkillSphere
            </h4>
          </div>
        </div>

        <h3
          className="text-center mb-4"
          style={{ color: "#2c3e50", fontWeight: "500" }}
        >
          Join SkillSphere
        </h3>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              size="lg"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="border-0 shadow-sm"
              style={{ backgroundColor: "#f8f9fa", borderRadius: "8px" }}
              pattern="[a-zA-Z\s]{6,}"
              title="Name should be at least 6 characters and contain only alphabets"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="email"
              size="lg"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="border-0 shadow-sm"
              style={{ backgroundColor: "#f8f9fa", borderRadius: "8px" }}
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              title="Enter a valid email address"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="password"
              size="lg"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={8}
              className="border-0 shadow-sm"
              style={{ backgroundColor: "#f8f9fa", borderRadius: "8px" }}
              pattern="(?=.*[A-Za-z])(?=.*\d).{8,}"
              title="Password must be at least 8 characters with 1 letter and 1 number"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="password"
              size="lg"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              minLength={8}
              className="border-0 shadow-sm"
              style={{ backgroundColor: "#f8f9fa", borderRadius: "8px" }}
              title="Passwords must match"
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Select
              size="lg"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="border-0 shadow-sm"
              style={{ backgroundColor: "#f8f9fa", borderRadius: "8px" }}
            >
              <option value="" disabled>Choose your role</option>
              <option value="instructor">Instructor</option>
              <option value="learner">Learner</option>
            </Form.Select>
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
            onMouseOver={(e) => (e.target.style.backgroundColor = "#f0ddc0")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#f5e6d3")}
          >
            Sign Up
          </Button>
        </Form>
      </Card>
    </Container>
  );
}
