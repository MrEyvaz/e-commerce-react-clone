import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from "./AdminLogin.module.css"
import { toast } from 'react-toastify'

function AdminLogin() {
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()

        const validUserName = "admin"
        const validPassword = "admin123"

        if (userName === validUserName && password === validPassword) {
            localStorage.setItem("isAdminAuthenticated", "true")
            navigate("/admin")
            toast.success("Admin Login Successful")
        } else {
            toast.error("Invalid username or password")
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <h1>Admin Login</h1>
                <form onSubmit={handleLogin}>
                    <div>
                        <label htmlFor="username" className={styles.label}>Username</label>
                        <input type="text" id="username" value={userName} onChange={(e) => setUserName(e.target.value)} className={styles.inputField} />
                    </div>

                    <div>
                        <label htmlFor="password" className={styles.label}>Password</label>
                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className={styles.inputField} />
                    </div>

                    <button type='submit' className={styles.button}>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default AdminLogin