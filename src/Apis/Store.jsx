import { configureStore } from "@reduxjs/toolkit";
import DataReducer from "./Slice/Data";

const Store = configureStore({
    reducer: {
        weather: DataReducer,
    }
});

export default Store;