import {configureStore} from "@reduxjs/toolkit";
import uiSlice from "./pagination-slice.js";
import superheroesSlice from "./superheroes-slice.js";

const store = configureStore({
    reducer:{
        superheroes: superheroesSlice.reducer,
        ui:uiSlice.reducer
    }
});

export default store;
