import React, { useContext, useState } from 'react';
import "../home/Home.css";
import Navbar from '../../components/navbar/Navbar';
import AppleMacbook from "../../assets/images/homePageImages/Apple-Macbook.jpg";
import AppleWatch from "../../assets/images/homePageImages/apple-watch.jpg";
import AppleIphone from "../../assets/images/homePageImages/Apple-iPhone.jpg";
import TopBar from '../../components/topbar/TopBar';
import { ProductContext } from '../../context/ProductContext';
import { FlashSalesContext } from '../../context/FlashSalesContext';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { FavoritesContext } from '../../context/FavoritesContext';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import Footer from '../../components/footer/Footer';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import ComputerIcon from '@mui/icons-material/Computer';
import WatchIcon from '@mui/icons-material/Watch';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import TvIcon from '@mui/icons-material/Tv';
import TabletIcon from '@mui/icons-material/Tablet';
import { BestSellingProductsContext } from '../../context/BestSellingProductsContext';
import iPhone_16 from "../../assets/images/homePageImages/iphone-16.jpg"
import { ExploreOurProductsContext } from '../../context/ExploreOurProductsContext';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

function Home() {
    const { products } = useContext(ProductContext)
    const { flashSales } = useContext(FlashSalesContext)
    const { favorites, toggleFavorite } = useContext(FavoritesContext)
    const { addToCart } = useContext(CartContext)
    const { bestSellingProducts } = useContext(BestSellingProductsContext)
    const { exploreOurProducts } = useContext(ExploreOurProductsContext)

    console.log("flashSales", flashSales);

    const navigate = useNavigate()

    const handleProductClick = (productId) => {
        navigate(`/product/${productId}`)
    }

    return (
        <div className='home-container'>
            {/* Sale and language selector */}
            <TopBar />

            {/* Navbar */}
            <Navbar />
            <hr />

            {/* Carousel */}
            <div className="container my-5">
                <div className="row">
                    <div className="col-md-3">
                        <ul className='catalogs_navigations'>
                            <Link to="/category/Smartphone"><li>Smartphones</li></Link>
                            <Link to="/category/Tablet"><li>Tablets</li></Link>
                            <Link to="/category/Television"><li>Televisions</li></Link>
                            <Link to="/category/Watch"><li>Watches</li></Link>
                            <Link to="/category/Computer"><li>Computers</li></Link>
                            <Link to="/category/Game Disc"><li>Game Discs</li></Link>
                        </ul>
                    </div>

                    <div className="col-md-7">
                        <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                            <div className="carousel-indicators">
                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                            </div>

                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <img src={AppleMacbook} className="d-block w-100" alt="Apple MacBook" />
                                </div>
                                <div className="carousel-item">
                                    <img src={AppleWatch} className="d-block w-100" alt="Apple Watch" />
                                </div>
                                <div className="carousel-item">
                                    <img src={AppleIphone} className="d-block w-100" alt="Apple iPhone" />
                                </div>
                            </div>

                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className='vertical_line'></div>

            {/* Flash Sales Section */}
            <div className='flash-sales'>
                <div className='flash-sales-vertical'></div>
                <p className='flash-sales-text'>Today’s</p>
                <h2 className='flash-sales-title'>Flash Sales</h2>

                {/* Products */}
                <ul className='flash-sales-list'>
                    {flashSales.map((flashProduct) => (
                        <li key={flashProduct.id} onClick={() => handleProductClick(flashProduct.item.id)}>
                            <img src={flashProduct.item.image} alt={flashProduct.item.title} />
                            <h5>{flashProduct.item.title}</h5>
                            <span style={{ color: "rgb(219,68,68)", fontSize: "18px" }}>{flashProduct.item.price}</span>
                            <span style={{ marginLeft: "24px", textDecoration: "line-through", fontSize: "18px" }}>{flashProduct.item.discountPrice}</span>
                            <div className='flash-sales-actions'>
                                <button type='button' className='btn btn-dark' onClick={(e) => { e.stopPropagation(); addToCart(flashProduct.item); }}>Add to Cart</button>
                                {favorites.some((fav) => fav.id === flashProduct.id) ? (
                                    <FavoriteIcon style={{ color: "red" }} onClick={(e) => { e.stopPropagation(); toggleFavorite(flashProduct); }} />
                                ) : (
                                    <FavoriteBorderIcon onClick={(e) => { e.stopPropagation(); toggleFavorite(flashProduct); }} />
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <hr className='divider-line' />

            {/* Browse By Category */}
            <div className='category-container'>
                <div className='categories-vertical'></div>
                <p className='category-text'>Categories</p>
                <h2 className='category-title'>Browse By Category</h2>

                <div className='categories'>
                    <Link to="/category/Smartphone" className='category-item'>
                        <SmartphoneIcon />
                        <h5>Smartphones</h5>
                    </Link>

                    <Link to="/category/Computer" className='category-item'>
                        <ComputerIcon />
                        <h5>Computers</h5>
                    </Link>

                    <Link to="/category/Watch" className='category-item'>
                        <WatchIcon />
                        <h5>Watches</h5>
                    </Link>

                    <Link to="/category/Game Disc" className='category-item'>
                        <SportsEsportsIcon />
                        <h5>Game Discs</h5>
                    </Link>

                    <Link to="/category/Television" className='category-item'>
                        <TvIcon />
                        <h5>Televisions</h5>
                    </Link>

                    <Link to="/category/Tablet" className='category-item'>
                        <TabletIcon />
                        <h5>Tablets</h5>
                    </Link>
                </div>
            </div>

            <hr className='divider-line' />

            {/* Best Selling Products */}
            <div className='best-selling-products-container'>
                <div className='best-selling-products-vertical'></div>
                <p className='best-selling-products-text'>This Month</p>
                <h2 className='best-selling-products-title'>Best Selling Products</h2>

                {/* Best Selling Products */}
                <ul className='best-selling-products'>
                    {bestSellingProducts.map((product) => (
                        <li key={product.id} onClick={() => handleProductClick(product.item.id)}>
                            <img src={product.item.image} alt={product.item.title} />
                            <h5>{product.item.title}</h5>
                            <span style={{ color: "rgb(219,68,68)", fontSize: "18px" }}>{product.item.price}</span>
                            <span style={{ marginLeft: "24px", textDecoration: "line-through", fontSize: "18px" }}>{product.item.discountPrice}</span>
                            <div className='flash-sales-actions'>
                                <button type='button' className='btn btn-dark' onClick={(e) => { e.stopPropagation(); addToCart(product.item); }}>Add to Cart</button>
                                {favorites.some((fav) => fav.id === product.id) ? (
                                    <FavoriteIcon style={{ color: "red" }} onClick={(e) => { e.stopPropagation(); toggleFavorite(product); }} />
                                ) : (
                                    <FavoriteBorderIcon onClick={(e) => { e.stopPropagation(); toggleFavorite(product); }} />
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <div className='iphone-coming-container'>
                <div className='iphone-coming-vertical'></div>
                <p className='iphone-coming-text'>iPhone 16</p>
                <h2 className='iphone-coming-title'>Get ready for the iPhone 16!</h2>
                <img src={iPhone_16} alt="iPhone 16" />
            </div>

            <div className='explore-our-products-container'>
                <div className='explore-our-products-vertical'></div>
                <p className='explore-our-products-text'>Our Products</p>
                <h2 className='explore-our-products-title'>Explore Our Products</h2>

                {/* Explore Our Products */}
                <ul className='explore-our-products'>
                    {exploreOurProducts.map((product) => (
                        <li key={product.id} onClick={() => handleProductClick(product.item.id)}>
                            <img src={product.item.image} alt={product.item.title} />
                            <h5>{product.item.title}</h5>
                            <span style={{ color: "rgb(219,68,68)", fontSize: "18px" }}>{product.item.price}</span>
                            <span style={{ marginLeft: "24px", textDecoration: "line-through", fontSize: "18px" }}>{product.item.discountPrice}</span>
                            <div className='flash-sales-actions'>
                                <button type='button' className='btn btn-dark' onClick={(e) => { e.stopPropagation(); addToCart(product.item); }}>Add to Cart</button>
                                {favorites.some((fav) => fav.id === product.id) ? (
                                    <FavoriteIcon style={{ color: "red" }} onClick={(e) => { e.stopPropagation(); toggleFavorite(product); }} />
                                ) : (
                                    <FavoriteBorderIcon onClick={(e) => { e.stopPropagation(); toggleFavorite(product); }} />
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Advantages */}
            <div className='home-page-advantages-container'>
                <div className='home-page-advantages-item'>
                    <LocalShippingIcon className='benefit-icon' />
                    <h4 className='home-page-advantages-title'>FREE AND FAST DELIVERY</h4>
                    <p className='home-page-advantages-description'>Free delivery for all orders over $140</p>
                </div>

                <div className='home-page-advantages-item'>
                    <SupportAgentIcon className='benefit-icon' />
                    <h4 className='home-page-advantages-title'>24/7 CUSTOMER SERVICE</h4>
                    <p className='home-page-advantages-description'>Friendly 24/7 customer support</p>
                </div>

                <div className='home-page-advantages-item'>
                    <VerifiedUserIcon className='benefit-icon' />
                    <h4 className='home-page-advantages-title'>MONEY BACK GUARANTEE</h4>
                    <p className='home-page-advantages-description'>We return money within 30 days</p>
                </div>
            </div>

            <Footer />
        </div >
    );
}

export default Home;