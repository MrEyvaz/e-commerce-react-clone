import React, { useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ProductContext } from '../../context/ProductContext'
import styles from "./CategoryPage.module.css"
import { FavoritesContext } from '../../context/FavoritesContext'
import { CartContext } from '../../context/CartContext'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import TopBar from '../topbar/TopBar'
import Navbar from '../navbar/Navbar'

function CategoryPage() {
    const { categoryName } = useParams()
    const { products } = useContext(ProductContext)
    const { favorites, toggleFavorite } = useContext(FavoritesContext)
    const { addToCart } = useContext(CartContext)

    const navigate = useNavigate()

    const handleProductClick = (productId) => {
        navigate(`/product/${productId}`)
    }

    const filteredProduct = products.filter((product) => product.category === categoryName)

    return (
        <div className={styles.categoryPageContainer}>
            {/* Sale and language selector */}
            <TopBar />

            {/* Navbar */}
            <Navbar />
            <hr />

            <ul className={styles.productLists}>
                {filteredProduct && filteredProduct.length > 0 ? (
                    filteredProduct.map((product) => (
                        <li key={product.id} className={styles.productList} onClick={() => handleProductClick(product.id)}>
                            <img src={product.image} alt={product.title} />
                            <h5>{product.title}</h5>
                            <p>{product.price}</p>
                            <div className={styles.productListAction}>
                                <button type='button' className='btn btn-dark' onClick={(e) => { e.stopPropagation(); addToCart(product); }}>Add to Cart</button>
                                {favorites.some((fav) => fav.id === product.id) ? (
                                    <FavoriteIcon style={{ color: "red" }} onClick={(e) => { e.stopPropagation(); toggleFavorite(product); }} />
                                ) : (
                                    <FavoriteBorderIcon onClick={(e) => { e.stopPropagation(); toggleFavorite(product); }} />
                                )}
                            </div>
                        </li>
                    ))
                ) : (
                    <p>No products found in this category.</p>
                )}
            </ul>
        </div>
    )
}

export default CategoryPage