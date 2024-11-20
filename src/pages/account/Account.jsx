import React, { useEffect, useState } from 'react'
import TopBar from '../../components/topbar/TopBar'
import Navbar from '../../components/navbar/Navbar'
import "./Account.css"
import Footer from "../../components/footer/Footer";
import { useAuth } from '../../context/AuthContext';
import { EmailAuthProvider, getAuth, reauthenticateWithCredential, updateEmail, updatePassword, updateProfile } from 'firebase/auth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Account() {
  const { userData, updateUser } = useAuth()
  const [email, setEmail] = useState(userData?.email || "")
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [firstName, setFirstName] = useState(userData?.firstName || "")
  const [lastName, setLastName] = useState(userData?.lastName || "")

  const navigate = useNavigate()

  const auth = getAuth()
  const user = auth.currentUser 

  useEffect(() => {
    if (userData) {
      setEmail(userData.email || '')
      setFirstName(userData.firstName || '')
      setLastName(userData.lastName || '')
    } else {  
      navigate("/signup")
    }
  }, [userData, navigate])

  const handleUpdateProfile = async (e) => {
    e.preventDefault()

    try {

      const credential = EmailAuthProvider.credential(user.email, currentPassword) 
      await reauthenticateWithCredential(user, credential) 

      if (email != user.email) {
        await updateEmail(user, email)
      }

      if (newPassword) {
        await updatePassword(user, newPassword)
      }

      await user.reload()
      const refreshedUser = auth.currentUser

      updateUser({
        firstName,
        lastName,
        email,
        photoUrl: refreshedUser.photoURL
      })

      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
      toast.success("Profile updated successfully")
      navigate("/")
    }  catch (error) {
      console.error("Error updating profile:", error);
    
      if (error.code === "auth/weak-password") {
        toast.error("Password should be at least 6 characters.");
      } else {
        toast.error("Incorrect current password.");
      }
    }
    
  }

  const handleCancel = () => {
    setFirstName(userData?.firstName || "");
    setLastName(userData?.lastName || "");
    setEmail(userData?.email || "");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    navigate("/");
  }

  return (
    <div className='account-wrapper'>
      <TopBar />
      <Navbar />

      <div className='account-container'>
        <h3>Edit Your Profile</h3>
        <form className='account-form' onSubmit={handleUpdateProfile}>
          <div className='full-name'>
            <div>
              <label htmlFor="first-name">First Name</label>
              <input type="text" id='first-name' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </div>

            <div>
              <label htmlFor="last-name">Last Name</label>
              <input type="text" id='last-name' value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </div>
          </div>

          <div className='email-address'>
            <div>
              <label htmlFor="email">Email</label>
              <input type="text" id='email' value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div>
              <label htmlFor="address">Address</label>
              <input type="text" id='address' />
            </div>
          </div>

          <div className='password-section'>
            <span>Password Changes</span>
            <input type="text" placeholder='Current Password' value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
            <input type="text" placeholder='New Password' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            <input type="text" placeholder='Confirm New Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </div>

          <div className='action-buttons'>
            <button type='button' onClick={handleCancel}>Cancel</button>
            <button type='submit'>Save Changes</button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  )
}

export default Account