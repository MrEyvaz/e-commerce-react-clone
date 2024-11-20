import React, { useState } from 'react'
import TopBar from '../topbar/TopBar'
import Navbar from '../navbar/Navbar'
import CallRoundedIcon from '@mui/icons-material/CallRounded';
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';
import styles from './Contact.module.css';
import Footer from "../footer/Footer"
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../FireStore/FireStore';
import { toast } from 'react-toastify';

function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const { name, email, phone, message } = formData
        if (!name.trim() || !email.trim() || !phone.trim() || !message.trim()) {
            toast.info("Please fill in all the fields")
            return
        }

        try {
            const q = query(collection(db, "formDatas"), where("email", "==", email))
            const querySnapshot = await getDocs(q)

            if (!querySnapshot.empty) {
                toast.info("A submission with this email already exists. Please use a different email.")
                return
            }

            await addDoc(collection(db, "formDatas"), formData)
            toast.success("Message sent successfully")
            setFormData({ name: '', email: '', phone: '', message: '' })
        } catch (error) {
            toast.error("Error sending messages " + error)
        }
    }

    return (
        <div className={styles.contactContainer}>
            {/* Sale and language selector */}
            <TopBar />

            {/* Navbar */}
            <Navbar />
            <hr />

            {/* Contact Information and Form */}
            <div className={styles.contactInfoContainer}>
                <div className={styles.contactInfo}>
                    <div className={styles.callSection}>
                        <CallRoundedIcon className={styles.callIcon} style={{ width: "11%", height: "38px", display: "block" }} />
                        <h4 className={styles.callSectionTitle}>Call To Us</h4>
                        <p className={styles.aviabilityText}>We are available 24/7, 7 days a week.</p>
                        <address className={styles.contactPhone}>Phone: +8801611112222</address>
                    </div>
                    <hr />

                    <div className={styles.emailSection}>
                        <MailOutlineRoundedIcon className={styles.emailIcon} style={{ width: "11%", height: "38px", display: "block" }} />
                        <h4 className={styles.emailSectionTitle}>Write To US</h4>
                        <p className={styles.responseText}>Fill out our form and we will contact you within 24 hours.</p>
                        <div className={styles.emailDetails}>
                            <address>
                                Emails: customer@exclusive.com
                            </address>
                            <address>
                                Emails: support@exclusive.com
                            </address>
                        </div>
                    </div>
                </div>

                <div className={styles.formWrapper}>
                    <form className={styles.contactForm} onSubmit={handleSubmit}>
                        <div className={styles.inputGroup}>
                            <input type="text" name='name' value={formData.name} className={styles.inputField} placeholder='Your Name' onChange={handleChange} />
                            <input type="email" name='email' value={formData.email} className={styles.inputField} placeholder='Your Email' onChange={handleChange} />
                            <input type="text" name='phone' value={formData.phone} className={styles.inputField} placeholder='Your Phone' onChange={handleChange} />
                        </div>

                        <div className={styles.contactMessage}>
                            <textarea name='message' value={formData.message} className={styles.messageTextarea} placeholder='Your Message' onChange={handleChange}></textarea>
                        </div>

                        <div className={styles.contactButton}>
                            <button className={styles.sendButton}>Send Message</button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    )
}

export default Contact