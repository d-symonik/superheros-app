import {CREATE_ROUTE, SUPERHERO_INFO_ROUTE, SUPERHEROES_ROUTE} from "../util/constants/router-paths.js";
import Superheroes from "../pages/Superheroes.jsx";
import SuperheroInfo from "../pages/SuperheroInfo.jsx";
import CreateSuperhero from "../pages/CreateSuperhero.jsx";

export const publicRoutes = [
    {
        path:SUPERHEROES_ROUTE,
        Component:Superheroes,

    },
    {
        path:`${SUPERHERO_INFO_ROUTE}/:id`,
        Component:SuperheroInfo,
    },
    {
        path: CREATE_ROUTE,
        Component: CreateSuperhero,

    }
]