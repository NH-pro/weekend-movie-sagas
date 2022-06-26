import {HashRouter as Router, Link } from "react-router-dom";

function Header() {
    return (
        <>
            <Router>
                <header>
                    <h1>The Movies Saga!</h1>
                    <Link className="home_btn" to="/">Home</Link>
                </header>
            </Router>
        </>
    )
}
export default Header;