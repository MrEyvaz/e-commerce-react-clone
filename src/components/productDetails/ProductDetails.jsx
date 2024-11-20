import React, { useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ProductContext } from '../../context/ProductContext'
import styles from "./ProductDetails.module.css"
import { FavoritesContext } from '../../context/FavoritesContext'
import { CartContext } from '../../context/CartContext'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import TopBar from '../topbar/TopBar'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'

function ProductDetails() {
    const { productId } = useParams()
    const { products } = useContext(ProductContext)
    const { favorites, toggleFavorite } = useContext(FavoritesContext)
    const { addToCart } = useContext(CartContext)

    const product = products.find((prod) => prod.id === productId)
    console.log("product", product);
    console.log("products", products);

    return (
        <div>
            {/* Sale and language selector */}
            <TopBar />

            {/* Navbar */}
            <Navbar />
            <hr />

            <div className={styles.productDetailsWrapper}>
                <div className={styles.imagesContainer}>
                    {product?.images && product?.images.length > 0 ? (
                        <div key={product.id} className={styles.productDetailsImages}>
                            <div>
                                <img src={product.images[0]} alt={product.title} />
                                <img src={product.images[1]} alt={product.title} />
                                <img src={product.images[2]} alt={product.title} />
                                <img src={product.images[3]} alt={product.title} />
                            </div>
                        </div>
                    ) : product?.image ? (
                        <div className={styles.productDetailsWithOneImage}>
                            <img src={product.image} alt={product.title} />
                        </div>
                    ) : (
                        <p>No images available</p>
                    )}
                </div>

                <div className={styles.productDetailsContainer}>
                    <h3>{product?.title || product?.item.title}</h3>
                    <p>{product?.price}</p>
                    <p>{product?.description ? product?.description : "Lorem ipsum dolor sit amet consectetur adipisicing."}</p>

                    <div className={styles.productDetailsAction}>
                        <button type='button' className='btn btn-dark' onClick={(e) => { e.stopPropagation(); addToCart(product); }}>Add to Cart</button>
                        {favorites.some((fav) => fav.id === product.id) ? (
                            <FavoriteIcon style={{ color: "red" }} onClick={(e) => { e.stopPropagation(); toggleFavorite(product); }} />
                        ) : (
                            <FavoriteBorderIcon onClick={(e) => { e.stopPropagation(); toggleFavorite(product); }} />
                        )}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default ProductDetails