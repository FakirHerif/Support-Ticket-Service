import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
<script src="https://cdn.jsdelivr.net/npm/bootstrap/dist/js/bootstrap.bundle.min.js"></script>


const Header = () => {
    const { user, handleLogout } = useAuth();
    const isAdmin = user === 'admin';

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{fontSize: '18px', fontWeight:'bold'}}>
            <div className="container" >
                <img
                    src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExOWJnaWx1ZmJkejZ0bGgwMHc3eDFrcWs5cDUxZGh4bnhqMjk1ajNoZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/EILhSIPzBUqru/giphy.gif"
                    alt="GIF"
                    className="img-fluid rounded-circle"
                    style={{ maxWidth: '50px', maxHeight: '50px', marginRight: '30px'}}
                />
                <Link className="navbar-brand" to="/">SendformS</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul className="navbar-nav">
                        {isAdmin && (
                            <li className="nav-item">
                                <Link className="nav-link" to="/admin/basvuru-listesi">Form Management</Link>
                            </li>
                        )}
                        {!isAdmin && (
                        <li className="nav-item">
                            <Link className="nav-link" to="/user/basvuru-listesi">Form List</Link>
                        </li>
                        )}
                        <li className="nav-item">
                            <Link className="nav-link" to="/basvuru-olustur">Send Form</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/basvuru-sorgula">Search</Link>
                        </li>
                        {user ? null : (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/register">Register</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">Login</Link>
                                </li>
                            </>
                        )}
                        {user ? (
                            <>
                                <li className="nav-item">
                                    <span className="nav-link" style={{cursor: 'default'}}>Welcome, <span style={{fontWeight: 'bold', color:'red'}}>{user}</span> !</span>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/" onClick={handleLogout}>Logout</Link>
                                </li>
                            </>
                        ) : null}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Header
