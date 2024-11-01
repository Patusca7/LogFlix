import React, { createContext, useState, useEffect, useRef } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);
    const inactivityTimeoutRef = useRef(null);
    const lastActivityTimeRef = useRef(Date.now());

    useEffect(() => {
        const savedIsLoggedIn = sessionStorage.getItem("isLoggedIn");
        const savedUserData = sessionStorage.getItem("userData");

        if (savedIsLoggedIn === "true" && savedUserData) {
            setIsLoggedIn(true);
            setUserData(JSON.parse(savedUserData));
        }

        // Set up activity listeners
        const activityEvents = ["mousemove", "keydown", "click"];
        const resetInactivityTimeout = () => {
            lastActivityTimeRef.current = Date.now();
            if (inactivityTimeoutRef.current) {
                clearTimeout(inactivityTimeoutRef.current);
            }
            inactivityTimeoutRef.current = setTimeout(() => {
                const timeSinceLastActivity = Date.now() - lastActivityTimeRef.current;
                if (timeSinceLastActivity >= 30 * 60 * 1000) { // 30 minutes
                    logout();
                }
            }, 30 * 60 * 1000); // 30 minutes
        };

        activityEvents.forEach(event =>
            window.addEventListener(event, resetInactivityTimeout)
        );

        resetInactivityTimeout(); 

        return () => {
            activityEvents.forEach(event =>
                window.removeEventListener(event, resetInactivityTimeout)
            );
            if (inactivityTimeoutRef.current) {
                clearTimeout(inactivityTimeoutRef.current);
            }
        };
    }, []);

    const login = (userData) => {
        setIsLoggedIn(true);
        setUserData(userData);
        sessionStorage.setItem("isLoggedIn", "true");
        sessionStorage.setItem("userData", JSON.stringify(userData));
    };

    const logout = () => {
        setIsLoggedIn(false);
        setUserData(null);
        sessionStorage.removeItem("isLoggedIn");
        sessionStorage.removeItem("userData");
    };

    return (
        <AuthContext.Provider value={{ login, logout, isLoggedIn, userData }}>
            {children}
        </AuthContext.Provider>
    );
};
