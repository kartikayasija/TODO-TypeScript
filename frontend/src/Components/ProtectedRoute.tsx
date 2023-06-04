import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { verifyToken } from "../utils/fetchAPI";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      try {
        const isValid = await verifyToken();
        if(!isValid) navigate("/auth/login")
      } catch (error) {
        console.error("Token verification error:", error);
      }
    };
    verify();
  },[]);

  return <>{children}</>;
};

export default ProtectedRoute;
