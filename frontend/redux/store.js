import { configureStore } from "@reduxjs/toolkit";
import selectedProject from './slices/selectedProjectSlice';

const store = configureStore({
    reducer: {
        selectedProject: selectedProject
    }
})

export default store;