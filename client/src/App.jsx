import './App.css'
import {BrowserRouter} from "react-router-dom";
import SuperheroesRouter from "./components/SuperheroesRouter.jsx";
import Header from "./components/Layout/Header/Header.jsx";
import Container from "./components/Layout/Container/Container.jsx";

function App() {

    return (
        <BrowserRouter>
            <Header/>
            <Container>
                <SuperheroesRouter/>
            </Container>
        </BrowserRouter>
    )
}

export default App
