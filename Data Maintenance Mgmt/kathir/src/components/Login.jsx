import { useState } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!Email) {
      newErrors.Email = "Email is required!";
    } else if (!/\S+@\S+\.\S+/.test(Email)) {
      newErrors.Email = "Email is invalid!";
    }

    if (!Password) {
      newErrors.Password = "Password is required!";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await axios.post("http://localhost:3000/auth/login", { Email, Password });

      if (response.status === 200) {
        localStorage.setItem('isAuth', response.data.token);
        window.location.href = '/';
      }
    } catch (err) {
      if (err.response) {
        // Handle specific error messages from the backend
        setErrors({
          Email: err.response.data.message === "User not found" ? "User not found" : "",
          Password: err.response.data.message === "Password is incorrect" ? "Password is incorrect" : ""
        });
      } else {
        console.error(err);
      }
    }
  };

  return (
    <div>
      <div className="body">
        <div>
          <div className="Homebody">
            <form onSubmit={handleSubmit}>
              <h1 className="Login">Login</h1>
              <div className="login">
                <label>E-mail:</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  autoComplete="off"
                  name="email"
                  value={Email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.Email && <p className="error">{errors.Email}</p>}

                <label>Password:</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  autoComplete="off"
                  name="password"
                  value={Password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errors.Password && <p className="error">{errors.Password}</p>}
              </div>
              <button type="submit" className="LoginButton">Login</button>
            </form>
            <a href="">Forget password?</a>
          </div>
        </div>
      </div>
      <div>
      <div className="landing-page">
    {/* <header className="header">
      <h1>Bank Data Storage System</h1>
      <nav>
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
    </header> */}
    
    <section id="home" className="section">
      <h2>Welcome ADMIN!</h2>
      <p>Securely manage and store your banking data with ease.</p>
    </section>

    <section id="about" className="section">
      <h2>About Us</h2>
      <p>We provide top-notch data storage solutions for banks with a focus on security and reliability.</p>
    </section>

    <section id="services" className="section">
      <h2>Our Services</h2>
      <ul>
        <li>Secure Data Storage</li>
        <li>Data Backup and Recovery</li>
        <li>Data Analytics and Reporting</li>
      </ul>
    </section>

    <section id="contact" className="section">
      <h2>Contact Us</h2>
      <p>Email: support@bankofmerits.com</p>
      <p>Phone: 5574-3233</p>
    </section>

    {/* <footer className="footer">
      <p>&copy; 2024 Bank of Merits</p>
    </footer> */}
  </div>
  </div>
    </div>
  );
};

export default Login;
