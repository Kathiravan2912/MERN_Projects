import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import "./AdminManagement.css";

const AdminManagement = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState({ name: '', email: '', password: '', confirmPassword: '' });
    const [admins, setAdmins] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAdmins = async () => {
            try {
                const response = await axios.get('http://localhost:3000/auth/admins');
                setAdmins(response.data);
            } catch (err) {
                console.error('Error fetching admins:', err);
            }
        };
        fetchAdmins();
    }, []);

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validatePassword = (password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
    const validatePasswordMatch = (password, confirmPassword) => password === confirmPassword;

    const handleSubmit = async (e) => {
        e.preventDefault();

        let formValid = true;
        const newError = { name: '', email: '', password: '', confirmPassword: '' };

        if (!name.trim()) {
            formValid = false;
            newError.name = 'Name is required';
        }

        if (!validateEmail(email)) {
            formValid = false;
            newError.email = 'Invalid email format';
        }

        if (!validatePassword(password)) {
            formValid = false;
            newError.password = 'Password must be at least 8 characters long, include uppercase, lowercase, numbers, and special symbols';
        }

        if (!validatePasswordMatch(password, confirmPassword)) {
            formValid = false;
            newError.confirmPassword = 'Passwords do not match';
        }

        if (formValid) {
            try {
                await axios.post('http://localhost:3000/auth/signup', { Name: name, Email: email, Password: password });
                navigate('/');
            } catch (err) {
                console.error('Error during signup:', err);
            }
        } else {
            setError(newError);
        }
    };

    return (
        <div>
            <div className="signupMain">
                <h1>Admin Management</h1>
                <div className="signup">
                    <form onSubmit={handleSubmit}>
                        <label>Name:</label>
                        <br />
                        <input
                            type="text"
                            placeholder="Enter your name"
                            autoComplete="off"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <br />
                        {error.name && <p className="error">{error.name}</p>}

                        <label>E-mail:</label>
                        <br />
                        <input
                            type="email"
                            placeholder="Enter your email"
                            autoComplete="off"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <br />
                        {error.email && <p className="error">{error.email}</p>}

                        <label>Password:</label>
                        <br />
                        <input
                            type="password"
                            placeholder="Enter your password"
                            autoComplete="off"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <br />
                        {error.password && <p className="error">{error.password}</p>}

                        <label>Confirm Password:</label>
                        <br />
                        <input
                            type="password"
                            placeholder="Confirm your password"
                            autoComplete="off"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <br />
                        {error.confirmPassword && <p className="error">{error.confirmPassword}</p>}

                        <br />
                        <button type="submit" className="addAdmin-btn">Add Admin</button>
                    </form>
                </div>
                <br />
            </div>
            {/* <div className="data-count">
            <p>Total Events: {filteredItems.length}</p>
          </div> */}
            <h1 className="tableTopic">List of Admins</h1>
            <table className="table">
                <thead>
                    <tr className="TableRow">
                        <th className="TableColumn">Name</th>
                        <th className="TableColumn">Email</th>
                    </tr>
                </thead>
                <tbody>
                    {admins.map((admin) => (
                        <tr key={admin._id}>
                            <td className="TableColumn">{admin.Name}</td>
                            <td className="TableColumn">{admin.Email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminManagement;
