import {createSlice} from "@reduxjs/toolkit";

const superheroesSlice = createSlice({
    name: 'superheroes',
    initialState: {
        superheroesList: [],
        images: [],
        superpowers: [],
    },
    reducers: {
        setSuperheroes: (state, action) => {
            state.superheroesList = action.payload;
        },
        setOneSuperhero: (state, action) => {
            state.superhero = action.payload;
        },
        removeSuperhero:(state,action)=>{
            const {id} = action.payload
            state.superheroes = state.superheroes.filter(item => item.id !== id);
        },

        setImages: (state, action) => {
            state.images = action.payload;
        },
        setSuperpowers: (state, action) => {
            state.superpowers = action.payload;
        },
        addOneSuperpower: (state, action) => {
            state.superpowers = [action.payload, ...state.superpowers];
        },
        editOneSuperpower: (state, action) => {
            const {id, superpower} = action.payload;
            const existingPowerIndex = state.superpowers.findIndex((item) => item.id === id);
            let updatedPowers = [...state.superpowers];
            updatedPowers[existingPowerIndex] = superpower;
            state.superpowers = updatedPowers;

        },
        removeOneSuperpower: (state, action) => {
            const {id} = action.payload
            state.superpowers = state.superpowers.filter(item => item.id !== id);
        }

    }
})
export const superheroesActions = superheroesSlice.actions;

export default superheroesSlice;