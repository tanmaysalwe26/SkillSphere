import { useEffect, useState } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { storeToken, getToken } from "../services/TokenService";
import { Bounce, toast } from "react-toastify";
import { storeRole } from "../services/RoleService";
import { login, storeUser } from "../services/UserServices";

export function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    if (token) {
      navigate("/");
    }
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      const response = await login(formData);
      console.log(response);
      if (response.status === 200) {
        storeToken(response.data.token);
        storeRole(response.data.user.role);
        storeUser(response.data.user);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        if (error.response.status === 401 || error.response.status === 404 || error.response.status === 500) {
          toast.error(error.response.data.msg, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
          });
        }
      }
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
          Welcome Back
        </h3>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Control
              type="email"
              size="lg"
              className="border-0 shadow-sm"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              style={{
                backgroundColor: "#f8f9fa",
                borderRadius: "8px",
                padding: "12px 16px",
              }}
              required
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              title="Enter a valid email"
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Control
              type="password"
              size="lg"
              className="border-0 shadow-sm"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              style={{
                backgroundColor: "#f8f9fa",
                borderRadius: "8px",
                padding: "12px 16px",
              }}
              required
              minLength={8}
              title="Password must be at least 8 characters"
            />
          </Form.Group>

          <Button
            type="submit"
            size="lg"
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
            Log In
          </Button>
        </Form>

        <div className="text-center mt-4">
          <Link

            style={{
              color: "#6c757d",
              textDecoration: "underline",
              fontSize: "14px",
            }}
          >
            Forgot Password?
          </Link>
          <span style={{ color: "#6c757d", margin: "0 8px" }}>•</span>
          <span style={{ color: "#6c757d", fontSize: "14px" }}>
            Don't account?{" "}
          </span>
          <Link
            to="/register"
            style={{
              color: "#3d7a8a",
              textDecoration: "none",
              fontWeight: "500",
              fontSize: "14px",
            }}
          >
            Sign up now
          </Link>
        </div>
      </Card>
    </Container>
  );
}
