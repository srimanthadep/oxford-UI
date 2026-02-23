import React, { createContext, useContext, useState, useEffect } from 'react';
import API from '../utils/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({
        name: 'Mock Admin',
        email: 'srimanthadep@gmail.com',
        role: 'owner'
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Skip backend check for testing
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        const res = await API.post('/auth/login', { email, password });
        const { token, user } = res.data;
        localStorage.setItem('sfm_token', token);
        localStorage.setItem('sfm_user', JSON.stringify(user));
        setUser(user);
        return user;
    };

    const logout = () => {
        localStorage.removeItem('sfm_token');
        localStorage.removeItem('sfm_user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, isAdmin: user?.role === 'admin', isOwner: user?.role === 'owner', isStudent: user?.role === 'student', isStaff: user?.role === 'staff' }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
