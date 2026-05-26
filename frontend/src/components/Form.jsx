import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
// Custom stylesheet
import "../styles/Form.css";

// Generic form component with dynamic props to specify what it should be used for
const Form = ({ route, action }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const formTitle = action === "login" ? "Login" : "Register";

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    // Attempt to send a request to whatever designated route is being passed via prop
    try {
      const resp = await api.post(route, { username, password });
      if (action === "login") {
        localStorage.setItem(ACCESS_TOKEN, resp.data.access);
        localStorage.setItem(REFRESH_TOKEN, resp.data.refresh);
        navigate("/");
      } else {
        // No token(s) to set when registering, so just navigate user to login UI
        navigate("/login");
      }
    } catch (error) {
      alert(error);
    } finally {
      // No matter what happens, we will want the loading indicator to be hidden
      setIsLoading(false);
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h1>{formTitle}</h1>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="form-input"
        placeholder="Username"
      />
      <input
        value={password}
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        className="form-input"
        placeholder="Password"
      />
      <button className="form-button" type="submit">
        {formTitle}
      </button>
    </form>
  );
};
export default Form;
