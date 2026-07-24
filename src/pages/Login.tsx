import { useState } from "react";
import '../styles/login.scss'
import { Navigate, useNavigate } from "react-router-dom";

export function Login() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Call your API here
        // login(userName, password);

        navigate("home");
    };

    const userIsAuthenticated:boolean = false;
    
    if (userIsAuthenticated) {
      return (
        <Navigate to="home/profile" replace/>
      )
    }
    
    return (
      <div className="login-container">
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>

          <div>
            <label>Username</label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter username"
            />
          </div>

          <div>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </div>

          <button type="submit">Login</button>
        </form>
      </div>
    )
}