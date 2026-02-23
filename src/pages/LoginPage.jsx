import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { MdEmail, MdLock, MdVisibility, MdVisibilityOff, MdSchool } from 'react-icons/md';
import { motion } from 'framer-motion';

export default function LoginPage() {
    const [form, setForm] = useState({ email: 'admin@school.edu', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.email || !form.password) {
            toast.error('Please enter email and password');
            return;
        }
        setLoading(true);
        try {
            const user = await login(form.email, form.password);
            toast.success(`Welcome back, ${user.name}!`);
            const isAdminDomain = window.location.hostname === 'admin.oxfordschool.cc';
            if (isAdminDomain) {
                navigate('/admin');
            } else if (user.role === 'staff') {
                navigate('/portal/staff');
            } else if (user.role === 'student') {
                navigate('/portal/student');
            } else {
                navigate('/dashboard');
            }
        } catch (err) {
            toast.error(err.response?.data?.message || 'Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            background: '#0f172a',
            position: 'relative',
            overflow: 'hidden',
        }}>
            {/* Animated gradient blobs */}
            <motion.div
                animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
                transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                    position: 'absolute', top: '-15%', left: '-10%',
                    width: '55vw', height: '55vw',
                    background: 'radial-gradient(circle, rgba(79,70,229,0.18) 0%, transparent 70%)',
                    borderRadius: '50%', pointerEvents: 'none',
                }}
            />
            <motion.div
                animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
                transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                    position: 'absolute', bottom: '-20%', right: '-10%',
                    width: '60vw', height: '60vw',
                    background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)',
                    borderRadius: '50%', pointerEvents: 'none',
                }}
            />
            <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                    position: 'absolute', top: '30%', right: '20%',
                    width: '20vw', height: '20vw',
                    background: 'radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 70%)',
                    borderRadius: '50%', pointerEvents: 'none',
                }}
            />

            {/* Left branding panel (hidden on mobile) */}
            <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '48px',
                position: 'relative',
                zIndex: 1,
            }} className="login-brand-panel">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    style={{ textAlign: 'center', maxWidth: 420 }}
                >
                    <div style={{
                        width: 80, height: 80,
                        background: 'linear-gradient(135deg, #4f46e5, #818cf8)',
                        borderRadius: 24,
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 40,
                        marginBottom: 28,
                        boxShadow: '0 20px 40px rgba(79,70,229,0.4)',
                    }}>
                        🎓
                    </div>
                    <h1 style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: 38,
                        fontWeight: 900,
                        color: '#ffffff',
                        letterSpacing: '-1px',
                        lineHeight: 1.1,
                        marginBottom: 16,
                    }}>
                        Oxford School<br />
                        <span style={{ color: '#818cf8' }}>Management</span>
                    </h1>
                    <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 16, lineHeight: 1.7, marginBottom: 40 }}>
                        Streamline fee collection, salary management, and school operations — all in one place.
                    </p>

                    {/* Feature pills */}
                    {[
                        { icon: '📊', text: 'Real-time Analytics' },
                        { icon: '💳', text: 'Fee Management' },
                        { icon: '👥', text: 'Staff & Student Portals' },
                    ].map((f, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + i * 0.15 }}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 12,
                                background: 'rgba(255,255,255,0.06)',
                                borderRadius: 12,
                                padding: '12px 18px',
                                marginBottom: 10,
                                border: '1px solid rgba(255,255,255,0.08)',
                                textAlign: 'left',
                            }}
                        >
                            <span style={{ fontSize: 22 }}>{f.icon}</span>
                            <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14, fontWeight: 500 }}>{f.text}</span>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Right: Login form */}
            <div style={{
                width: '100%',
                maxWidth: 460,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '24px 20px',
                position: 'relative',
                zIndex: 1,
                flexShrink: 0,
            }}>
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    style={{
                        width: '100%',
                        maxWidth: 420,
                        background: '#ffffff',
                        borderRadius: 24,
                        padding: '44px 40px',
                        boxShadow: '0 32px 80px rgba(0,0,0,0.4)',
                    }}
                >
                    {/* Logo + header */}
                    <div style={{ textAlign: 'center', marginBottom: 36 }}>
                        <motion.img
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.2 }}
                            src="/logo.png"
                            alt="Oxford School"
                            style={{
                                width: 72, height: 72,
                                borderRadius: '50%',
                                objectFit: 'cover',
                                marginBottom: 18,
                                boxShadow: '0 8px 30px rgba(79,70,229,0.2)',
                                border: '3px solid #eef2ff',
                            }}
                        />
                        <h2 style={{
                            fontFamily: "'Outfit', sans-serif",
                            fontSize: 26,
                            fontWeight: 800,
                            color: '#0f172a',
                            letterSpacing: '-0.5px',
                            marginBottom: 6,
                        }}>
                            Welcome back
                        </h2>
                        <p style={{ color: '#64748b', fontSize: 14 }}>
                            Sign in to Oxford School Console
                        </p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        {/* Email */}
                        <div style={{ marginBottom: 18 }}>
                            <label style={{
                                display: 'block',
                                fontSize: 13,
                                fontWeight: 600,
                                color: '#334155',
                                marginBottom: 7,
                            }}>
                                Email Address
                            </label>
                            <div style={{ position: 'relative' }}>
                                <MdEmail style={{
                                    position: 'absolute', left: 14,
                                    top: '50%', transform: 'translateY(-50%)',
                                    color: '#94a3b8', fontSize: 20,
                                    pointerEvents: 'none',
                                }} />
                                <input
                                    type="email"
                                    placeholder="name@school.edu"
                                    value={form.email}
                                    onChange={e => setForm({ ...form, email: e.target.value })}
                                    style={{
                                        width: '100%',
                                        padding: '13px 14px 13px 44px',
                                        borderRadius: 12,
                                        border: '1.5px solid #e2e8f0',
                                        fontSize: 14,
                                        outline: 'none',
                                        transition: 'all 0.2s',
                                        background: '#f8fafc',
                                        color: '#0f172a',
                                        fontFamily: "'Inter', sans-serif",
                                    }}
                                    onFocus={e => {
                                        e.target.style.borderColor = '#4f46e5';
                                        e.target.style.boxShadow = '0 0 0 3px rgba(79,70,229,0.08)';
                                        e.target.style.background = '#fff';
                                    }}
                                    onBlur={e => {
                                        e.target.style.borderColor = '#e2e8f0';
                                        e.target.style.boxShadow = 'none';
                                        e.target.style.background = '#f8fafc';
                                    }}
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div style={{ marginBottom: 28 }}>
                            <label style={{
                                display: 'block',
                                fontSize: 13,
                                fontWeight: 600,
                                color: '#334155',
                                marginBottom: 7,
                            }}>
                                Password
                            </label>
                            <div style={{ position: 'relative' }}>
                                <MdLock style={{
                                    position: 'absolute', left: 14,
                                    top: '50%', transform: 'translateY(-50%)',
                                    color: '#94a3b8', fontSize: 20,
                                    pointerEvents: 'none',
                                }} />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Enter your password"
                                    value={form.password}
                                    onChange={e => setForm({ ...form, password: e.target.value })}
                                    style={{
                                        width: '100%',
                                        padding: '13px 48px 13px 44px',
                                        borderRadius: 12,
                                        border: '1.5px solid #e2e8f0',
                                        fontSize: 14,
                                        outline: 'none',
                                        transition: 'all 0.2s',
                                        background: '#f8fafc',
                                        color: '#0f172a',
                                        fontFamily: "'Inter', sans-serif",
                                    }}
                                    onFocus={e => {
                                        e.target.style.borderColor = '#4f46e5';
                                        e.target.style.boxShadow = '0 0 0 3px rgba(79,70,229,0.08)';
                                        e.target.style.background = '#fff';
                                    }}
                                    onBlur={e => {
                                        e.target.style.borderColor = '#e2e8f0';
                                        e.target.style.boxShadow = 'none';
                                        e.target.style.background = '#f8fafc';
                                    }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{
                                        position: 'absolute', right: 14,
                                        top: '50%', transform: 'translateY(-50%)',
                                        background: 'none', border: 'none',
                                        cursor: 'pointer', color: '#94a3b8',
                                        display: 'flex', padding: 4, fontSize: 20,
                                    }}
                                >
                                    {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                                </button>
                            </div>
                        </div>

                        {/* Submit button */}
                        <motion.button
                            whileHover={{ scale: loading ? 1 : 1.02 }}
                            whileTap={{ scale: loading ? 1 : 0.98 }}
                            type="submit"
                            disabled={loading}
                            style={{
                                width: '100%',
                                padding: '14px',
                                background: loading
                                    ? '#6b7280'
                                    : 'linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)',
                                color: 'white',
                                border: 'none',
                                borderRadius: 12,
                                fontSize: 15,
                                fontWeight: 700,
                                cursor: loading ? 'not-allowed' : 'pointer',
                                boxShadow: loading ? 'none' : '0 10px 30px rgba(79,70,229,0.35)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 10,
                                fontFamily: "'Inter', sans-serif",
                                letterSpacing: '-0.2px',
                                transition: 'background 0.2s',
                            }}
                        >
                            {loading ? (
                                <>
                                    <div style={{
                                        width: 18, height: 18,
                                        border: '2px solid rgba(255,255,255,0.4)',
                                        borderTopColor: 'white',
                                        borderRadius: '50%',
                                        animation: 'spin 0.75s linear infinite',
                                    }} />
                                    Signing in...
                                </>
                            ) : (
                                'Sign In to Console'
                            )}
                        </motion.button>
                    </form>

                    <div style={{
                        marginTop: 28,
                        padding: '16px',
                        background: '#f8fafc',
                        borderRadius: 12,
                        border: '1px solid #e2e8f0',
                        textAlign: 'center',
                    }}>
                        <p style={{ fontSize: 12, color: '#64748b', marginBottom: 2 }}>
                            🔒 Protected by Oxford Security Core
                        </p>
                        <p style={{ fontSize: 11, color: '#94a3b8' }}>
                            © {new Date().getFullYear()} Oxford School, Chityala
                        </p>
                    </div>
                </motion.div>
            </div>

            <style>{`
                @media (max-width: 768px) {
                    .login-brand-panel { display: none !important; }
                }
                @keyframes spin { to { transform: rotate(360deg); } }
            `}</style>
        </div>
    );
}
