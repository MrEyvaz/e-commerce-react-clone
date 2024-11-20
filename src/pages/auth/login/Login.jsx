import React, { useState } from 'react';
import './Login.css';
import TopBar from '../../../components/topbar/TopBar';
import Navbar from '../../../components/navbar/Navbar';
import SignUpSideImage from "../../../assets/images/signUpImages/sign-up-image.png";
import { Link, useNavigate } from 'react-router-dom';
import Footer from "../../../components/footer/Footer";
import { toast } from 'react-toastify';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useAuth } from '../../../context/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../FireStore/FireStore';

function Login() {
    const [accountDatas, setAccountDatas] = useState({
        email: '',
        password: ''
    });

    const { userData, updateUser } = useAuth()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAccountDatas({
            ...accountDatas,
            [name]: value
        });
    };

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = accountDatas;

        if (!email.trim() || !password.trim()) {
            toast.info("Please fill in all the fields");
            return;
        }

        try {
            const auth = getAuth()
            const credential = await signInWithEmailAndPassword(auth, email, password)
            const user = credential.user //email, password, photoUrl, uid

            if (userData) {
                console.log(userData);
                
                updateUser({
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    photoUrl: user.photoURL,
                    email: userData.email,
                    uid: user.uid
                })
            }

            toast.success("Logged in successfully");
            setAccountDatas({ email: '', password: '' });
            navigate("/");
        } catch (error) {
            switch (error.code) {
                case "auth/wrong-password":
                    toast.error("Incorrect password. Please try again");
                    break;
                case "auth/user-not-found":
                    toast.error("No account found with this email.");
                    break;
                default:
                    toast.error("Login Failed: " + error.message);
            }
        }
    };

    return (
        <div className="loginContainer">
            <TopBar />
            <Navbar />
            <hr />
            <div className="loginContent">
                <div className="imageSection">
                    <img src={SignUpSideImage} alt="signUpImages" className="loginSideImage" />
                </div>

                <form className="formSection" onSubmit={handleSubmit}>
                    <h2 className="title">Log in to Exclusive</h2>
                    <p className="subtitle">Enter your details below</p>
                    <div className="login-inputGroup">
                        <input type="text" name='email' placeholder='Email' value={accountDatas.email} className="login-inputField" onChange={handleChange} />
                        <input type="password" name='password' placeholder='Password' value={accountDatas.password} className="login-inputField" onChange={handleChange} />
                    </div>

                    <div className="loginActions">
                        <div className="buttonContainer">
                            <button type='submit' className="loginButton">Login</button>
                        </div>
                        <Link to='/resetPassword' className="forgetPasswordLink">Forget Password?</Link>
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    );
}

export default Login;