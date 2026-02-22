import { useEffect, useState } from "react";
import { Container, Card, Form, Button, Spinner } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast, Bounce } from "react-toastify";
import { getToken } from "../services/TokenService";
import { getCoursebyID, updateCourse } from "../services/courseService";
import { getRole } from "../services/RoleService";
import defaultImage from "../assets/def.png";

export function UpdateCourseForm() {

    const { id } = useParams();
    const [formData, setFormData] = useState({
        title: "",
        imageUrl: defaultImage,
        description: "",
        category: "",
        level: "",
    });

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const navigate = useNavigate();



    useEffect(() => {
        const token = getToken();
        const role = getRole();

        if (!token || role !== "instructor") {
            navigate("/");
            return;
        }

        let isMounted = true;

        const fetchCourseById = async () => {
            try {
                setLoading(true);
                const response = await getCoursebyID(id);
                if (isMounted && response.status === 200) {
                    const courseData = response.data;
                    setFormData({
                        title: courseData.title || "",
                        imageUrl: courseData.imageUrl || defaultImage,
                        description: courseData.description || "",
                        category: courseData.category || "",
                        level: courseData.level || "",
                    });
                }
            } catch (error) {
                console.error("Fetch error:", error);
                if (isMounted) {
                    toast.error("Failed to load course");
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchCourseById();

        return () => {
            isMounted = false;
        };
    }, [id, navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (submitting) return;

        setSubmitting(true);
        try {
            const response = await updateCourse(id, formData);

            if (response.status === 200) {
                toast.success("Course Updated successfully!", {
                    position: "top-right",
                    autoClose: 3000,
                    theme: "colored",
                    transition: Bounce,
                });
                navigate("/my-courses");
            }
        } catch (error) {
            console.error(error);
            toast.error(
                error.response?.data?.msg ||
                "Something went wrong while updating course",
                {
                    position: "top-right",
                    theme: "colored",
                    transition: Bounce,
                }
            );
        } finally {
            setSubmitting(false);
        }
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
            <Container
                fluid
                className="d-flex justify-content-center align-items-center"
                style={{
                    paddingTop: "60px",
                    paddingBottom: "60px",
                }}
            >
                <Card
                    className="p-5 shadow-lg border-0"
                    style={{
                        width: "600px",
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
                        Edit your Course
                    </h3>

                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label style={{ color: "#2c3e50", fontWeight: "500" }}>
                                Course Title
                            </Form.Label>
                            <Form.Control
                                type="text"
                                size="lg"
                                className="border-0 shadow-sm"
                                name="title"
                                placeholder="Enter course title"
                                value={formData.title}
                                onChange={handleChange}
                                style={{
                                    backgroundColor: "#f8f9fa",
                                    borderRadius: "8px",
                                    padding: "12px 16px",
                                }}
                                required
                                minLength={6}
                                pattern="[A-Za-z].{6,}"
                                title="Title must be at least 6 characters and start with a letter"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label style={{ color: "#2c3e50", fontWeight: "500" }}>
                                Description
                            </Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                className="border-0 shadow-sm"
                                name="description"
                                placeholder="Describe your course"
                                value={formData.description}
                                onChange={handleChange}
                                style={{
                                    backgroundColor: "#f8f9fa",
                                    borderRadius: "8px",
                                    padding: "12px 16px",
                                }}
                                required
                                minLength={10}
                                title="Description must be at least 10 characters"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label style={{ color: "#2c3e50", fontWeight: "500" }}>
                                Category
                            </Form.Label>
                            <Form.Select
                                type="text"
                                size="lg"
                                className="border-0 shadow-sm"
                                name="category"
                                placeholder="Course Category"
                                value={formData.category}
                                onChange={handleChange}
                                style={{
                                    backgroundColor: "#f8f9fa",
                                    borderRadius: "8px",
                                    padding: "12px 16px",
                                }}
                                required
                                title="Please select a category"
                            >
                                <option value="">Select a category</option>
                                <option value="Art & Design">Art & Design</option>
                                <option value="Science & Nature">Science & Nature</option>
                                <option value="Technology">Technology</option>
                                <option value="Fiction & Literature">
                                    Fiction & Literature
                                </option>
                                <option value="History & Culture">History & Culture</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label
                                style={{
                                    color: "#2c3e50",
                                    fontWeight: "500",
                                    marginBottom: "12px",
                                }}
                            >
                                Course Level
                            </Form.Label>
                            <div
                                className="p-3 shadow-sm"
                                style={{
                                    backgroundColor: "#f8f9fa",
                                    borderRadius: "8px",
                                }}
                            >
                                {["beginner", "intermediate", "advanced"].map((level) => (
                                    <Form.Check
                                        key={level}
                                        type="radio"
                                        id={level}
                                        name="level"
                                        value={level}
                                        label={level.charAt(0).toUpperCase() + level.slice(1)}
                                        checked={formData.level === level}
                                        onChange={handleChange}
                                        style={{ color: "#2c3e50", marginBottom: "8px" }}
                                    />
                                ))}
                            </div>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label style={{ color: "#2c3e50", fontWeight: "500" }}>
                                Course Image
                            </Form.Label>
                            <Form.Control
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (!file) return;

                                    if (file.size > 2 * 1024 * 1024) {
                                        toast.error("Image must be under 2MB", { theme: "colored" });
                                        return;
                                    }

                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                        setFormData({ ...formData, imageUrl: reader.result });
                                    };
                                    reader.readAsDataURL(file);
                                }}
                                style={{
                                    backgroundColor: "#f8f9fa",
                                    borderRadius: "8px",
                                    padding: "12px 16px",
                                }}
                            />

                            {formData.imageUrl && !formData.imageUrl.startsWith("http") && (
                                <div className="mt-2 text-center">
                                    <img
                                        src={formData.imageUrl}
                                        alt="Preview"
                                        style={{
                                            maxHeight: "180px",
                                            borderRadius: "8px",
                                            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                                        }}
                                    />
                                </div>
                            )}
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

                            disabled={submitting}
                        >
                            {submitting ? (
                                <>
                                    <Spinner size="sm" animation="border" /> Updating...
                                </>
                            ) : (
                                "Update Course"
                            )}
                        </Button>
                    </Form>

                    <div className="text-center mt-4">
                        <Link
                            to="/"
                            style={{
                                color: "#6c757d",
                                textDecoration: "none",
                                fontSize: "14px",
                            }}
                        >
                            ← Back to Dashboard
                        </Link>
                    </div>
                </Card>
            </Container>
        </div>
    );
}
