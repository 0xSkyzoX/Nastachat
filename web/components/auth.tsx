import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Constants } from "../Client/contants";

const Auth = (type: string, WrappedComponent: React.ComponentType) => {
  const AuthenticatedComponent: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
      const verifyToken = async () => {
        // Check if the token exists in localStorage
        const token = localStorage.getItem("token");

        try {
          // Verify the token on the server side
          const response = await fetch(`${Constants.API_BASE}/verifyToken`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              token,
            }),
          });
          if (type == "login") {
            if (!response.ok) {
              // Token verification failed, redirect to the login page
              navigate("/login")
            }
          }
          if (type == "dashboard") {
            if (response.ok) {

              navigate("/dashboard");
            }
          }

        } catch (error) {
          console.log(error);

          navigate("/login");
        }
      };

      verifyToken();
    }, []);

    return <WrappedComponent />;
  };

  return AuthenticatedComponent;
};

export default Auth;