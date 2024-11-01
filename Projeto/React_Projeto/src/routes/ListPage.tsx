import { useParams } from "react-router-dom";
import List from "../components/List";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import Footer from "../components/Footer";

function ListPage() {
    const { listId } = useParams();

    return (
        <>
        <NavBar />
        <div className="page-background full-heigth-container">
            
            <List listId={listId} />
            <Footer/>
        </div>
        </>
    );
}

export default ListPage;