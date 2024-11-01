import NavBar from "../components/NavBar";
import "../App.css"
import Destaques from "../components/Destaques";
import Footer from "../components/Footer";
import { Card, Container } from "react-bootstrap";
import TextCard from "../components/TextCard";


function HomePage() {
    return (
        <>
            <NavBar />
            <div className="page-background">
                <TextCard />
                <Destaques />
                <Footer />
            </div>
        </>
    );
}

export default HomePage;