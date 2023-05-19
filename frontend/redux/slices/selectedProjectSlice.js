import { createSlice } from "@reduxjs/toolkit";
// import { useSelector } from "react-redux";

const initialState = [];

const selectedProjectSlice = createSlice({
    name: 'selectedProject',
    initialState,
    reducers: {
        setSelectedProject: (state, action) => {
            state.push(action.payload);
        }
    }
})

export default selectedProjectSlice.reducer;
export const { setSelectedProject } = selectedProjectSlice.actions;
// export const getSelectedProjectState = state => state.selectedProject;