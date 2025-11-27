import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";

const RootLayout = () => {
    // si tu veux passer des articles aux enfants :
    // const [articles, setArticles] = useState([...]);

    return (
        <>
            <Header />
            <main>
                <Outlet /* context={[articles, setArticles]} */ />
            </main>
        </>
    );
};

export default RootLayout;
