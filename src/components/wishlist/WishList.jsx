import React, { useContext } from 'react'
import { FavoritesContext } from '../../context/FavoritesContext'
import styles from "./WishList.module.css"
import TopBar from '../topbar/TopBar'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { ProductContext } from '../../context/ProductContext'
import { Link, useNavigate } from 'react-router-dom'
import { CartContext } from '../../context/CartContext'

function WishList() {
    const { favorites, toggleFavorite } = useContext(FavoritesContext)
    const { products } = useContext(ProductContext)
    const { addToCart } = useContext(CartContext)

    const navigate = useNavigate()

    const justForYouProductIds = ["RmyjkFh9Jcsz8S2UhyIR", "ZIC2X60QpA1CSaXjiPG5", "MMgYqXGkmSBjITlQkrjO", "hKR9VYr7oAZVZgBzAjGz"]
    const justForYouProducts = products.filter((product) => justForYouProductIds.includes(product.id))

    const handleProductClick = (productId) => {
        navigate(`/product/${productId}`)
    }

    return (
        <div>
            {/* Sale and language selector */}
            <TopBar />

            {/* Navbar */}
            <Navbar />
            <hr />

            <h3 className={styles.wishListCountTitle}>{`Wishlist (${favorites.length})`}</h3>
            <ul className={styles.wishListItems}>
                {favorites.length > 0 ? (
                    favorites.map((fav) => (
                        <li key={fav.id} className={styles.wishListItem}>
                            <img src={fav.item.image} alt="" />
                            <h5>{fav.item.title}</h5>
                            <span style={{ color: "rgb(219,68,68)", fontSize: "18px" }}>{fav.item.price}</span>
                            <span style={{ marginLeft: "24px", textDecoration: "line-through", fontSize: "18px" }}>{fav.item.discountPrice}</span>
                            <div className={styles.wishListActions}>
                                <button className='btn btn-dark' onClick={() => addToCart(fav.item)}>Add to Cart</button>
                                {favorites.some((favorite) => favorite.id === fav.id) ? (
                                    <FavoriteIcon style={{ color: "red" }} onClick={() => toggleFavorite(fav)} />
                                ) : (
                                    <FavoriteBorderIcon onClick={() => toggleFavorite(fav)} />
                                )}
                            </div>
                        </li>
                    ))
                ) : (
                    <div className={styles.noFountTitle}>
                        <p>No items in your wishlist</p>
                    </div>
                )}
            </ul>

            <div className={styles.wishListVertical}></div>

            <div className={styles.justForYouSection}>
                <h5>Just For You</h5>
                <ul className={styles.justForYouItems}>
                    {justForYouProducts.map((product) => (
                        <li key={product.id} className={styles.justForYouItem} onClick={() => handleProductClick(product.id)}>
                            <img src={product.image} alt="Product Image" />
                            <h6>{product.title}</h6>
                            <span>{product.price}</span>
                            <div className={styles.justForYouButton}>
                                <button className='btn btn-dark' onClick={() => addToCart(product)}>Add to Cart</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <Footer />
        </div>
    )
}

export default WishList