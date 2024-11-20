import React, { useContext } from 'react'
import TopBar from '../topbar/TopBar'
import Navbar from '../navbar/Navbar'
import styles from "./Checkout.module.css"
import Footer from '../footer/Footer'
import { CartContext } from '../../context/CartContext'
import bKash from "../../assets/images/cardsTypes/Bkash.png"
import MasterCard from "../../assets/images/cardsTypes/Mastercard.png"
import Nagad from "../../assets/images/cardsTypes/Nagad.png"
import Visa from "../../assets/images/cardsTypes/Visa.png"

function Checkout() {
    const { cartItems } = useContext(CartContext)

    const subTotal = cartItems.reduce((acc, item) => {
        return acc + parseFloat(item.price.replace("$", "") * item.quantity)
    }, 0)

    return (
        <div>
            <TopBar />

            <Navbar />
            <hr />

            <div className='d-flex justify-content-between'>
                <div className={styles.inputFields}>
                    <h3 style={{ textAlign: "left", marginLeft: "7rem", marginBottom: "3rem", marginTop: "5rem" }}>Billing Details</h3>
                    <div className='d-flex flex-column'>
                        <label htmlFor="name">First Name<span>*</span></label>
                        <input type="text" name="name" id="name" />
                    </div>

                    <div className='d-flex flex-column'>
                        <label htmlFor="company-name">Company Name</label>
                        <input type="text" name="company-name" id="company-name" />
                    </div>

                    <div className='d-flex flex-column'>
                        <label htmlFor="address">Street Address<span>*</span></label>
                        <input type="text" name="address" id="address" />
                    </div>

                    <div className='d-flex flex-column'>
                        <label htmlFor="place">Apartment, floor, etc. (optional)</label>
                        <input type="text" name="place" id="place" />
                    </div>

                    <div className='d-flex flex-column'>
                        <label htmlFor="city-town">Town/City<span>*</span></label>
                        <input type="text" name="city-town" id="city-town" />
                    </div>

                    <div className='d-flex flex-column'>
                        <label htmlFor="phone">Phone Number<span>*</span></label>
                        <input type="text" name="phone" id="phone" />
                    </div>

                    <div className='d-flex flex-column'>
                        <label htmlFor="email">Email Address<span>*</span></label>
                        <input type="email" name="email" id="email" />
                    </div>

                    <div className=''>
                        <input type="checkbox" name="checkbox" id="checkbox" className={styles.checkbox} />
                        <label className={styles.checkboxLabel} htmlFor='checkbox'>Save this information for faster check-out next time</label>
                    </div>
                </div>

                {cartItems.length > 0 ? (
                    <>
                        <div className={styles.cartContainer}>
                            {cartItems.map((item) => (
                                <div className={styles.products}>
                                    <img src={item.image} alt={item.title} className={styles.productImage} />
                                    <p>{item.title}</p>
                                    <p>${parseFloat(item.price.replace('$', '')) * item.quantity}</p>
                                </div>
                            ))}

                            <div className={styles.cartSummary}>
                                <div className='d-flex justify-content-between'>
                                    <p>Subtotal:</p>
                                    <p>${Math.round(subTotal)}</p>
                                </div>

                                <div className='d-flex justify-content-between'>
                                    <p>Shipping:</p>
                                    <p>Free</p>
                                </div>
                            </div>

                            <div className={styles.order}>
                                <div className='d-flex justify-content-around mb-4'>
                                    <div className='d-flex align-items-center'>
                                        <input type="radio" name="paymentMethod" id="bank" />
                                        <label htmlFor="bank">Bank</label>
                                    </div>

                                    <div>
                                        <img src={bKash} alt="bKash" />
                                        <img src={MasterCard} alt="MasterCard" />
                                        <img src={Nagad} alt="Nagad" />
                                        <img src={Visa} alt="Visa" />
                                    </div>
                                </div>

                                <div className={styles.cashOrBank}>
                                    <input type="radio" name="paymentMethod" id="cash" />
                                    <label htmlFor="cash">Cash on delivery</label>
                                </div>

                                <div className='d-flex mt-5'>
                                    <button className='btn btn-danger'>Place Order</button>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <p></p>
                )}
            </div>

            <Footer />
        </div>
    )
}

export default Checkout