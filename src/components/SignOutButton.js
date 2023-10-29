import React from "react";
import { useNavigate } from "react-router-dom";

const SignOutButton = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    // Add your sign-out logic here (e.g., clearing user session).
    // After signing out, you can redirect to the login page or perform other actions.
    // For example, clearing a token in localStorage:
    localStorage.removeItem("authToken");

    // Redirect to the login page (replace '/login' with your actual login route).
    navigate("/");
  };

  return <button onClick={handleSignOut}>Sign Out</button>;
};

export default SignOutButton;
