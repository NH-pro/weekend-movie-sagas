import {HashRouter as Router, Link } from "react-router-dom";

function Header() {
    return (
        <>
            <Router>
                <header>
                    <h3 className="intro">Welcome to</h3>
                    <h1 className="big_name">The Massive Movie Mega Theatre</h1>
                    <Link className="home_btn" to="/">Home</Link>
                    <Link className="addMovie" to="/addMovie">Add a Movie</Link>
                </header>
            </Router>
        </>
    )
}
export default Header;