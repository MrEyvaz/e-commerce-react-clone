import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from "./AdminPanel.module.css"
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from '../../../FireStore/FireStore';
import NavbarAdmin from '../navbarAdmin/NavbarAdmin';
import { ProductContext } from '../../../context/ProductContext';

function AdminPanel() {
  const { products, setProducts, selectedProduct, setSelectedProduct } = useContext(ProductContext)
  const [selectedCategory, setSelectedCategory] = useState("Computers")
  const navigate = useNavigate()

  const [searchQuery, setSearchQuery] = useState("")
  const [displayFilteredProducts, setDisplayFilteredProducts] = useState([])

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase()

    setSearchQuery(searchTerm)

    if (searchTerm === "") {
      setDisplayFilteredProducts([])
      return
    }

    const results = products.filter((product) => product.title.toLowerCase().includes(searchTerm) ||
      product.price.toLowerCase().includes(searchTerm) || product.image.includes(searchTerm) ||
      product?.brand?.toLowerCase().includes(searchTerm))
    setDisplayFilteredProducts(results)
  }

  const handleProductClick = (product) => {
    setSelectedProduct(product)
    navigate("/editAdminProducts")
  }

  useEffect(() => {
    const isAdminAuthenticated = localStorage.getItem("isAdminAuthenticated")
    if (!isAdminAuthenticated) {
      navigate("/adminlogin")
    }
  })

  const handleEdit = (product) => {
    console.log("product", product);

    setSelectedProduct(product)
  }

  const handleDelete = async (productId) => {
    try {
      await deleteDoc(doc(db, "products", productId));
      setProducts((prevProducts) => prevProducts.filter(product => product.id !== productId));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const filteredProducts = products.filter((product) => product.category === selectedCategory)

  return (
    <div>
      <NavbarAdmin />

      <div className='container my-5'>
        <h2>Products</h2>

        <div className='d-flex align-items-center justify-content-between'>
          <Link to="/editAdminProducts" className='btn btn-primary mb-5 mt-5'>Create Product</Link>
          <div className={styles.searchDetails}>
            <input type="text" value={searchQuery} onChange={handleSearch} placeholder='Search products' />
            {searchQuery && (
              <div className={styles.searchResults}>
                {displayFilteredProducts.length > 0 ? (
                  displayFilteredProducts.map((displayFilteredProduct) => (
                    <div key={displayFilteredProduct.id} className={styles.searchResultsItems} onClick={() => handleProductClick(displayFilteredProduct)}>
                      <div>
                        <img src={displayFilteredProduct.image} alt={displayFilteredProduct.title} />
                      </div>
                      <div className={styles.searchResultsItem}>
                        {displayFilteredProduct.title}
                        <div style={{ marginTop: "6px" }}>
                          {displayFilteredProduct.price}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className={styles.noProduct}>
                    <p>No products found</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <ul class="nav nav-pills mt-5 mb-5" id="pills-tab" role="tablist">
          {["Computer", "Tablet", "Watch", "Game Disc", "Smartphone", "Television"].map((category) => (
            <li className='nav-item' key={category}>
              <button className={`nav-link ${selectedCategory === category ? "active" : ""}`}
                onClick={() => setSelectedCategory(category)}
              >{category}</button>
            </li>
          ))}
        </ul>

        <table className={styles.table}>
          <thead className='fs-5'>
            <tr>
              <th className={styles.th}>ID</th>
              <th className={styles.th}>Name</th>
              <th className={styles.th}>Brand</th>
              <th className={styles.th}>Category</th>
              <th className={styles.th}>Price</th>
              <th className={styles.th}>Image</th>
              <th className={styles.th}>Created At</th>
              <th className={styles.th}>Action </th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts && filteredProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.title}</td>
                <td>{product.brand}</td>
                <td>{product.category}</td>
                <td>{product.price}</td>
                <td><img src={product.image} alt={product.title} style={{ width: "100px", height: "100px" }} /></td>
                <td>{new Date(product.createdAt).toLocaleDateString()}</td>
                <td style={{ width: "9rem" }}>
                  <Link to="/editAdminProducts" className='btn btn-success me-3' onClick={() => handleEdit(product)}>Edit</Link>
                  <button className='btn btn-danger' onClick={() => handleDelete(product.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminPanel