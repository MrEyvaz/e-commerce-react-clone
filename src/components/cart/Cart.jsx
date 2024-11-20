import React, { useContext } from 'react';
import TopBar from '../topbar/TopBar';
import Navbar from '../navbar/Navbar';
import styles from "./Cart.module.css";
import { CartContext } from '../../context/CartContext';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CancelIcon from '@mui/icons-material/Cancel';
import { Link } from 'react-router-dom';
import Footer from '../footer/Footer';

function Cart() {
    const { cartItems, incrementQuantity, decrementQuantity, deleteProduct } = useContext(CartContext);

    const subTotal = cartItems.reduce((acc, item) => {
        return acc + parseFloat(item.price.replace("$", "") * item.quantity)
    }, 0)

    return (
        <div>
            <TopBar />
            
            <Navbar />
            <hr />

            {cartItems.length > 0 ? (
                <>
                    <table className={styles.cartTable}>
                        <thead>
                            <tr className={styles.cartHeader}>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Subtotal</th>
                            </tr>
                        </thead>

                        <tbody>
                            {cartItems.map((cartItem) => (
                                <tr key={cartItem.itemId} className={styles.cartRow}>
                                    <td>
                                        <div className={styles.productContent}>
                                            <CancelIcon className={styles.cancelIcon} onClick={() => deleteProduct(cartItem)} />
                                            <img src={cartItem.image} alt={cartItem.title} />
                                            <span className={styles.productTitle}>{cartItem.title}</span>
                                        </div>
                                    </td>
                                    <td>{cartItem.price}</td>
                                    <td>
                                        <span className={styles.quantity}>
                                            {cartItem.quantity}
                                            <KeyboardArrowUpIcon className={styles.increaseIcon} onClick={() => incrementQuantity(cartItem)} />
                                            <KeyboardArrowDownIcon className={styles.decreaseIcon} onClick={() => decrementQuantity(cartItem)} />
                                        </span>
                                    </td>
                                    <td>${parseFloat(cartItem.price.replace('$', '')) * cartItem.quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className='d-flex justify-content-between'>
                        <div className={styles.returnToShop}>
                            <Link to="/"><button className='btn btn-outline-dark'>Return To Shop</button></Link>
                        </div>

                        <div className={styles.cartSummary}>
                            <h5 className='d-flex'>Cart Total</h5>

                            <div className='d-flex justify-content-between'>
                                <p>Subtotal:</p>
                                <p>${Math.round(subTotal)}</p>
                            </div>

                            <div className='d-flex justify-content-between'>
                                <p>Shipping:</p>
                                <p>Free</p>
                            </div>

                            <div className='d-flex justify-content-center'>
                                <Link to="/checkout"><button className='btn btn-danger'>Procees to checkout</button></Link>
                            </div>
                        </div>
                    </div>

                    <Footer />
                </>
            ) : (
                <p className={styles.noItemTitle}>Your cart is empty!</p>
            )}
        </div>
    );
}

export default Cart;