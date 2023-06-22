import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import filterReducer from './reducers/filtersSlice'
import  messagesSlice  from "./messages/messagesSlice";

const rootReducer = combineReducers({
    messagesSlice,
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']