import React, { useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import playStoreIcon from "../../assets/images/footerImages/playStoreIcon.ico";
import AppleIcon from '@mui/icons-material/Apple';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Link } from 'react-router-dom';
import styles from "../footer/Footer.module.css";
import { db } from '../../FireStore/FireStore';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { toast } from 'react-toastify';

function Footer() {
    const [email, setEmail] = useState("");

    const handleSubscribe = async (e) => {
        e.preventDefault();

        if (email.trim() === "") {
            toast.info("Please enter a valid email");
            return;
        }

        try {
            const subscriptionRef = collection(db, "subscriptions");
            const q = query(subscriptionRef, where("email", "==", email));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                toast.info("You have already subscribed with this email");
            } else {
                await addDoc(subscriptionRef, {
                    email: email,
                    subscribedAt: new Date(),
                });
                toast.success("Subscribed successfully");
                setEmail("");
            }
        } catch (error) {
            toast.error("Failed to subscribe. Please try again " + error.message);
        }
    };

    return (
        <div className={styles.footerContainer}>
            <div className={styles.footerSection}>
                <h4 style={{marginBottom: "37px"}}>Exclusive</h4>
                <h5 className={styles.footerLink}>Subscribe</h5>
                <p>Get 10% off your first order</p>
                <form className={styles.subscriptionForm} onSubmit={handleSubscribe}>
                    <input type="email" placeholder="Enter your email" className={styles.emailInput} value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <button type="submit">
                        <SendIcon className={styles.sendIcon} />
                    </button>
                </form>
            </div>

            <div className={styles.footerSection}>
                <h4>Support</h4>
                <address>111 Bijoy Sarani, Dhaka, <br />DH 1515, Bangladesh.</address>
                <a href="mailto:exclusive@gmail.com" className={styles.footerLink}>exclusive@gmail.com</a>
                <a href="tel:+88015888889999" className={styles.footerLink}>+88015-88888-9999</a>
            </div>

            <div className={styles.footerSection}>
                <h4>Account</h4>
                <Link to="/myaccount" className={styles.footerLink}>My Account</Link>
                <Link to="/login" className={styles.footerLink}>Login / Register</Link>
                <Link to="/cart" className={styles.footerLink}>Cart</Link>
                <Link to="/wishlist" className={styles.footerLink}>Wishlist</Link>
                <Link to="/shop" className={styles.footerLink}>Shop</Link>
            </div>

            <div className={styles.footerSection}>
                <h4>Quick Link</h4>
                <Link to="/privacy-policy" className={styles.footerLink}>Privacy Policy</Link>
                <Link to="/terms-of-use" className={styles.footerLink}>Terms of Use</Link>
                <Link to="/faq" className={styles.footerLink}>FAQ</Link>
                <Link to="/contact" className={styles.footerLink}>Contact</Link>
            </div>

            <div className={styles.footerSection}>
                <h4>Download App</h4>
                <p>Save $3 with App New User Only</p>
                <div className={styles.downloadApp}>
                    <QrCode2Icon style={{ width: "48%", height: "132px", marginTop: "-6px" }} />
                    <div className={styles.downloadLinks}>
                        <div className={styles.storeLink}>
                            <img src={playStoreIcon} alt="Google Play Store" />
                            <div className={styles.storeText}>
                                <p>GET IT ON</p>
                                <p>Google Play</p>
                            </div>
                        </div>
                        <div className={styles.storeLink}>
                            <AppleIcon />
                            <div className={styles.storeText}>
                                <p>Download on the</p>
                                <p>App Store</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.socialLinks}>
                    <FacebookIcon />
                    <TwitterIcon />
                    <InstagramIcon />
                    <LinkedInIcon />
                </div>
            </div>
        </div>
    );
}

export default Footer;
