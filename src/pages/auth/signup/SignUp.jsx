import React, { useState } from 'react';
import './SignUp.css';
import TopBar from '../../../components/topbar/TopBar';
import Navbar from '../../../components/navbar/Navbar';
import SignUpSideImage from "../../../assets/images/signUpImages/sign-up-image.png";
import GoogleIcon from "../../../assets/images/signUpImages/google.png";
import { Link, useNavigate } from 'react-router-dom';
import Footer from "../../../components/footer/Footer";
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../../FireStore/FireStore';
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useAuth } from "../../../context/AuthContext"

function SignUp() {
    const [accountDatas, setAccountDatas] = useState({
        name: '',
        email: '',
        password: ''
    });

    const { updateUser } = useAuth()

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
        const { name, email, password } = accountDatas;

        if (!name.trim() || !email.trim() || !password.trim()) {
            toast.info("Please fill in all the fields");
            return;
        }

        // name = "Mister Gogha"

        const nameParts = name.trim().split(" ") //["Mister", "Gogha"]
        const firstName = nameParts[0] // "Mister"
        const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "" //"Gogha"

        try {
            const auth = getAuth();
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            if (user) {
                await addDoc(collection(db, "accountDatas"), {
                    name: name,
                    email: email,
                    photo_url: user.photoURL,
                    uid: user.uid
                });

                updateUser({
                    firstName: firstName,
                    lastName: lastName,
                    photo_url: user.photoURL,
                    email: user.email,
                    uid: user.uid
                })

                toast.success("Account created successfully");
                setAccountDatas({ name: '', email: '', password: '' });
                navigate("/");
            }
        } catch (error) {
            switch (error.code) {
                case "auth/email-already-in-use":
                    toast.error("The email is already in use. Please try logging in or use a different email.");
                    break;
                case "auth/invalid-email":
                    toast.error("Invalid email format. Please check your email and try again.");
                    break;
                default:
                    toast.error("Error creating account: " + error.message);
            }
        }
    };

    const handleGoogleSignUp = async (e) => {
        e.preventDefault();

        const auth = getAuth();
        const provider = new GoogleAuthProvider();

        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            console.log("GoogleUser", user);

            if (user) {

                // name = "Mister Gogha"

                const nameParts = user.displayName.trim().split(" ") //["Mister", "Gogha"]
                const firstName = nameParts[0] // "Mister"
                const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "" //"Gogha"

                await addDoc(collection(db, "accountDatas"), {
                    name: user.displayName,
                    email: user.email,
                    photo_url: user.photoURL,
                    uid: user.uid,
                });
                console.log("user.photoURL", user.photoURL);

                updateUser({
                    firstName: firstName,
                    lastName: lastName,
                    photo_url: user.photoURL,
                    email: user.email,
                    uid: user.uid
                })
                toast.success("Google Account created successfully");
                navigate("/");
            }
        } catch (error) {
            switch (error.code) {
                case "auth/account-exists-with-different-credentials":
                    toast.error("An account with the same email already exists. Please try logging in.");
                    break;
                default:
                    toast.error("Google Sign-up failed: " + error.message);
            }
        }
    };

    return (
        <div className="signUpContainer">
            <TopBar />
            <Navbar />
            <hr />
            <div className="signUpContent">
                <div className="imageSection">
                    <img src={SignUpSideImage} alt="signUpImages" className="SignUpSideImage" />
                </div>

                <form className="signUpFormSection" onSubmit={handleSubmit}>
                    <h2 className="signUpTitle">Create an account</h2>
                    <p className="signUpSubtitle">Enter your details below</p>
                    <div className="inputGroup">
                        <input type="text" name='name' placeholder='Name' value={accountDatas.name} className="signUpInputField" onChange={handleChange} />
                        <input type="text" name='email' placeholder='Email' value={accountDatas.email} className="signUpInputField" onChange={handleChange} />
                        <input type="password" name='password' placeholder='Password' value={accountDatas.password} className="signUpInputField" onChange={handleChange} />
                    </div>

                    <div className="buttonContainer">
                        <button type='submit' className="signUpCreateAccountButton">Create Account</button>
                    </div>

                    <div className="signUpGoogleSignUpContainer">
                        <button className="signUpGoogleSignUpButton" onClick={handleGoogleSignUp}>
                            <img src={GoogleIcon} alt="GoogleIcon" className="signUpGoogleIcon" /> Sign up with Google
                        </button>
                    </div>

                    <div className="signUpLoginPrompt">
                        <span className="alreadyAccountText">Already have an account?</span>
                        <span className="signUpLoginLink"><Link to="/login">Log in</Link></span>
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    );
}

export default SignUp;
