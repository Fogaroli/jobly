import { useContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

// Component to render form to allow user o update personal information
const UserProfile = ()=>{
  const { userData, updateUser, clearError, err } = useContext(AuthContext);
  const [formData, setFormData] = useState(userData);
  const [isUpdated, setIsUpdated] = useState(false)

  // Function to clear errors and submit user data update to context function
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setIsUpdated(false)
    clearError();
    const success = await updateUser({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
    });
    if (success) setIsUpdated(true)
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setIsUpdated(false)
    setFormData((old) => ({ ...old, [name]: value }));
  };

  useEffect(() => {
    clearError();
  }, [formData]);

  if (userData === "") {
    return <Navigate to="/" />;
  }

  return (
    <>
      <p className="h3 m-4">User Profile</p>
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
            disabled
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
            value={formData.firstName}
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
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            E-mail
          </label>
          <input
            type="text"
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
        {isUpdated && (
          <p className="text-success">
            Data updated successfully!
          </p>
        )}

        <button type="submit" className="btn btn-secondary mb-3">
          Update
        </button>
      </form>
    </>
  );
}

export default UserProfile