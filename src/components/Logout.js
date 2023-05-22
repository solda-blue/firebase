import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogout } from "../store";
import { getAuth, signOut } from "firebase/auth";

const Logout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const auth = getAuth();
    useEffect(() => {
        signOut(auth)
        .then(() => {
            sessionStorage.removeItem("TOKEN");
            dispatch(setLogout());
            navigate('/');
        }) // logout successful
        .catch((error) => {console.log(error)}); // logout fail
    })
};

export default Logout;