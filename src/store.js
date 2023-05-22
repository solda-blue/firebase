import { configureStore, createSlice } from "@reduxjs/toolkit";

const logged = createSlice({
    name : 'logged',
    initialState : false,
    reducers : {
        setLogin() {
            return true;
        },
        setLogout () {
            return false;
        },
        setLogged() {
            let token = sessionStorage.getItem("TOKEN");
            if(token !== null) {
                return true;
            } else {
                return false;
            }
        }
    }
})
export const { setLogin } = logged.actions;
export const { setLogout } = logged.actions;
export const { setLogged } = logged.actions;

export default configureStore({
    reducer : {
        logged : logged.reducer
    }
});