import './Navbar.css';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <nav className="navbar nav navbar-expand-lg navbar-light container-fluid">

            <a className="navbar-brand" href="/app">To-Do List</a>

            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">

                <ul className="navbar-nav ms-auto">
                    <li className="nav-item">
                        <div className="nav-link" to="/home">Home</div>
                    </li>
                    <li className="nav-item">
                        <div className="nav-link" to="/app">App</div>
                    </li>
                    <li className="nav-item">
                        <div className="nav-link" to="/contact">Contact</div>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default NavBar;