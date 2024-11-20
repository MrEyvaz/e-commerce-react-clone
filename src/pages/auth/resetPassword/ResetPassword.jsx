import React, { useState } from 'react';
import './ResetPassword.css'; 
import { toast } from 'react-toastify';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import TopBar from '../../../components/topbar/TopBar';
import Navbar from '../../../components/navbar/Navbar';
import { useNavigate } from 'react-router-dom';

function ResetPassword() {
    const [email, setEmail] = useState("");
    const navigate = useNavigate()

    const handleResetPassword = async (e) => {
        e.preventDefault(); 
        try {
            const auth = getAuth();
            await sendPasswordResetEmail(auth, email);
            toast.success("Reset email sent successfully. Please check your mail.");
            setEmail("");
            navigate("/login")
        } catch (error) {
            switch (error.code) {
                case "auth/invalid-email":
                    toast.error("Invalid email format. Please check your email and try again.");
                    break;
                default:
                    toast.error("Failed to send reset email: " + error.message);
            }
        }
    };

    return (
        <div className="reset-password-container">
            <TopBar />
            <Navbar />
            <hr />
            <h2 className="reset-password-container-title">Reset Password</h2>
            <p className="reset-password-container-subtitle">Enter your email to receive a password reset link</p>

            <form className="reset-password-container-formSection" onSubmit={handleResetPassword}>
                <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} className="reset-password-container-inputField" />
                <button type="submit" className="resetButton">Send Reset Password</button>
            </form>
        </div>
    );
}

export default ResetPassword;
