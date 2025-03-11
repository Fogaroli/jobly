import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

// Component to show user login form
// Show errors in case data is not accepted by API
const LoginForm = ()=>{
    const navigate = useNavigate()
    const emptyForm = {username:"", password:""};
    const [formData, setFormData] = useState(emptyForm);
    const {login, err, clearError} = useContext(AuthContext)

    // Function to clear errors and submit login data to context function
    const handleSubmit = async (evt)=>{
        evt.preventDefault();
        clearError()
        const success = await login(formData);
        if (success) navigate("/")
    }

    const handleChange = (evt)=>{
        const {name, value} = evt.target
        setFormData(old => ({...old, [name]:value}))
    }

    useEffect(()=>{
        clearError()
    },[formData])

    return (
      <>
        <p className="h3 m-4">Enter your credentials in the form below</p>
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
          {(err.length > 0) && err.map((item,idx) => <p key={idx} className="text-danger">{item}</p>)}
          <button type="submit" className="btn btn-secondary mb-3">
            Submit
          </button>
        </form>
      </>
    );
}

export default LoginForm