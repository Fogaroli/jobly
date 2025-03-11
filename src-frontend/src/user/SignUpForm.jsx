import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

// Component to show user Sign up form
// Show errors in case data is not accepted by API
const SignUpForm = () => {
  const navigate = useNavigate();
  const cleanForm = {
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
  };
  const [formData, setFormData] = useState(cleanForm);
  const { signup, err, clearError } = useContext(AuthContext);

  // Function to clear errors and submit user registration to context function
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    clearError();
    const success = await signup(formData);
    if (success) navigate("/");
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((old) => ({ ...old, [name]: value }));
  };

  useEffect(() => {
    clearError();
  }, [formData]);

  return (
    <>
      <p className="h3 m-4">Create your free account now</p>
      <form
        onSubmit={handleSubmit}
        className="container card text-start"
        style={{ maxWidth: "600px" }}
      >
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            name="username"
            className="form-control"
            id="username"
            aria-describedby="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="form-control"
            id="password"
            aria-describedby="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="firstname" className="form-label">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            className="form-control"
            id="firstname"
            aria-describedby="First Name"
            value={formData.firstname}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="lastname" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            className="form-control"
            id="lastname"
            aria-describedby="Last Name"
            value={formData.lastname}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            E-mail
          </label>
          <input
            type="email"
            name="email"
            className="form-control"
            id="email"
            aria-describedby="E-mail"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        {err.length > 0 &&
          err.map((item, idx) => (
            <p key={idx} className="text-danger">
              {item}
            </p>
          ))}

        <button type="submit" className="btn btn-secondary mb-3">
          Register
        </button>
      </form>
    </>
  );
};

export default SignUpForm;
