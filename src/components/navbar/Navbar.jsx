import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import styles from "./Navbar.module.css"
import { Link, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout'
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import { useAuth } from '../../context/AuthContext';
import { getAuth, signOut } from 'firebase/auth';
import { toast } from 'react-toastify';
import { FavoritesContext } from '../../context/FavoritesContext';
import { CartContext } from '../../context/CartContext';
import { ProductContext } from '../../context/ProductContext';

function Navbar() {
  const { userData, updateUser } = useAuth()
  const { favorites, toggleFavorite } = useContext(FavoritesContext)
  const { cartItems } = useContext(CartContext);
  const { products } = useContext(ProductContext);

  const [searchQuery, setSearchQuery] = useState("")
  const [filteredProducts, setFilteredProducts] = useState([])
console.log("userdataphoto", userData?.photo_url);
console.log(userData);

  const navigate = useNavigate()

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase()
    setSearchQuery(searchTerm)

    if (searchTerm === "") {
      setFilteredProducts([])
      return
    }

    const results = products.filter((product) => product.title.toLowerCase().includes(searchTerm) ||
      product.price.toLowerCase().includes(searchTerm) || product.image.includes(searchTerm))
    setFilteredProducts(results)
  }

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`)
    setSearchQuery("")
    setFilteredProducts([])
  }

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    const auth = getAuth()

    if (!userData) {
      toast.error("No user is logged in.");
      return;
    } else {
      try {
        await signOut(auth)
        toast.error("You signed out successfully")
      } catch (error) {
        toast.error("Error signing out: " + error.code)
      }
    }
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.brand}>
        <h1>Exclusive</h1>
      </div>

      <div className={styles.nav_links}>
        <ul className={styles.navigations}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/signup">Sign Up</Link></li>
        </ul>
      </div>

      <div className={styles.nav_actions}>
        <div className={styles.nav_actions}>
          <input type="text" placeholder="What are you looking for?" maxLength="19" value={searchQuery} onChange={handleSearch} />
          <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.magnifyingGlass} />

          {/* Display search results */}
          {searchQuery && (
            <div className={styles.searchResults}>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <div key={product.id} className={styles.searchResultItem} onClick={() => handleProductClick(product.id)}>
                    <div>
                      <img src={product.image} alt={product.title} />
                    </div>
                    <div>
                      {product.title}
                      <div style={{marginTop: "6px"}}>
                        {product.price}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className={styles.noResults}>No products found</div>
              )}
            </div>
          )}
        </div>
        <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.magnifyingGlass} />
        <Link to="/wishlist"><FavoriteBorderIcon style={{ fontSize: "28px" }} /></Link>
        <span className={favorites.length > 0 ? styles.favoritesCount : styles.noFavorites}>
          {favorites.length > 0 ? favorites.length : ""}
        </span>
        <Link to="/cart"><ShoppingCartOutlinedIcon style={{ fontSize: "28px" }} /></Link>
        <span className={cartItems.length > 0 ? styles.cartCount : ""}>
          {cartItems.length > 0 ? cartItems.length : ""}
        </span>



        {/* Account icon and functionality */}
        <React.Fragment>
          <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
            <Tooltip title="Account settings">
              <IconButton
                style={{ padding: "0px", width: "39px", height: "40px", marginLeft: "8px" }}
                onClick={handleClick}
                size="small"
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
              >
                <Avatar src={userData?.photo_url || ''} className={styles.accountIcon} />
              </IconButton>
            </Tooltip>
          </Box>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            disableScrollLock={true}
            slotProps={{
              paper: {
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  '&::before': {
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem onClick={handleClose} className={styles.menuItem}>
              <Avatar src={userData?.photo_url || ''} />
              <Link to="/myaccount">Manage My Account</Link>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleClose} className={styles.menuItem}>
              <Logout />
              <span>
                <button onClick={handleLogout}>Logout</button>
              </span>
            </MenuItem>
          </Menu>
        </React.Fragment>
      </div>
    </nav >
  );
}

export default Navbar;