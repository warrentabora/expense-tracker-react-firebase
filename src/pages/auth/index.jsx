import { auth, provider } from "../../config/firebase-config";
import { signInWithPopup } from 'firebase/auth';
import { useNavigate, Navigate } from "react-router-dom";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";

import "./style.css"

export const Auth = () => {

    const navigate = useNavigate();
    const { isAuth } = useGetUserInfo();

    const signInGoogle = async () => {
        try {
            const results = await signInWithPopup(auth, provider);
            const authInfo = {
                userId: results.user.uid,
                name: results.user.displayName,
                profilePhoto: results.user.photoURL,
                isAuth: true,
            };
            localStorage.setItem("auth", JSON.stringify(authInfo));
            navigate("/expense-tracker");
        } catch (err) {
            console.error(err);
            navigate("/")
        };
    };

    if (isAuth) {
        return <Navigate to={'/expense-tracker'} />
    }

    return (
        <div className="login-page">
            <span>Login with Google</span>

            <button className="google-sign-in-btn" onClick={signInGoogle}>
                {" "}
                Sign in
            </button>
        </div>);
};