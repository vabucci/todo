import React from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

function SignOut() {
    const handleSignOut = async () => {
        try {
            await signOut(auth);
            console.log("User signed out successfully!");
        } catch (error) {
            console.error("Sign out error:", error);
        }
    };

    return (
        <div className="signout-container">
        <button onClick={handleSignOut} className="signout-button">
            Sign Out
        </button>
        </div>
    );
}

export default SignOut;
