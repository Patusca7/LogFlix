import SearchBar from "./SearchBar";
import "../App.css"
import Login from "./Login";
import SideCanvas from "../components/SideCanvas"

function NavBar() {
    return (
            <nav className="navbar bg-dark sticky-top">
                <div className="container-fluid">
                    <div className="d-flex align-items-center">
                        <SideCanvas />
                        <a className="navbar-brand text-light" href="/">Logflix</a>
                    </div>
                    <div className="col-4">
                        <SearchBar />
                    </div>
                    <Login />
                </div>
            </nav>
    );
}

export default NavBar;