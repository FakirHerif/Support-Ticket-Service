import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Header = () => {

    const { user, handleLogout } = useAuth();

    return (
      <div className="navbar">

        <div className="navbar-title">
            <Link to="/">Home</Link>
        </div>
        <div>Look Forms</div>
        <div>
            <Link to="/basvuru-olustur">Send Form</Link>
        </div>
        <div>
            <Link to="/login">Login</Link>
        </div>
        <div>
            <Link to="/register">Register</Link>
        </div>
        <div>Search</div>
        <div>{user ? `Welcome, ${user}` : null}</div>
        <div>
            <Link to="/" onClick={handleLogout}>Logout</Link>
        </div>

      </div>
      );
    };

export default Header