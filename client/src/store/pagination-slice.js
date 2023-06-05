import {createSlice} from "@reduxjs/toolkit";

const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        page:1,
        count: 0,
        limit: 5,
    },
    reducers: {
        nextPage: (state) => {
            state.page++;
        },
        prevPage: (state) => {
            state.page--;
        },
        setCount: (state, action) => {
            state.count = action.payload;
        }


    }
})
export const uiActions = uiSlice.actions;
export default uiSlice;