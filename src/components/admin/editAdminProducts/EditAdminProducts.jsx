import React, { useContext, useEffect, useState } from 'react';
import NavbarAdmin from '../navbarAdmin/NavbarAdmin';
import styles from './EditAdminProducts.module.css';
import { ProductContext } from '../../../context/ProductContext';
import { useNavigate } from 'react-router-dom';

function EditAdminProducts() {
  const { selectedProduct, setProducts, setSelectedProduct, updateProduct, createProduct } = useContext(ProductContext);
  const [previewImage, setPreviewImage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const isAdminAuthenticated  = localStorage.getItem("isAdminAuthenticated")

    if (!isAdminAuthenticated) {
      navigate("/adminlogin")
    }
  })

  const [formData, setFormData] = useState({
    itemId: '',
    title: '',
    brand: '',
    category: '',
    price: '',
    description: '',
    image: '',
    createdAt: ''
  });

  useEffect(() => {
    if (selectedProduct && typeof selectedProduct === 'object' && Object.keys(selectedProduct).length > 0) {
      const initialImageUrl = `${selectedProduct.image}`;
      console.log("selectedProduct");

      setFormData({
        itemId: selectedProduct.id || "",
        title: selectedProduct.title || "",
        brand: selectedProduct.brand || "",
        category: selectedProduct.category || "",
        price: selectedProduct.price || "",
        description: selectedProduct.description|| "",
        image: initialImageUrl || "",
        createdAt: selectedProduct.createdAt instanceof Date ? selectedProduct.createdAt : new Date(selectedProduct.createdAt) || ""
      });
      setPreviewImage(initialImageUrl);
    } else {
      console.log("selectedProduct2");

      setFormData({
        itemId: '',
        title: '',
        brand: '',
        category: 'Computer',
        price: '',
        description: '',
        image: '',
        createdAt: new Date()
      });
      setPreviewImage("");
    }
  }, [selectedProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("from", formData.createdAt);
      const formattedCreatedAt = formData.createdAt instanceof Date
        ? formData.createdAt.toISOString().split('T')[0]
        : formData.createdAt;
      console.log("to", formattedCreatedAt);
      console.log("Form Data before update:", formData);

      if (selectedProduct && typeof selectedProduct === 'object' && Object.keys(selectedProduct).length > 0) {
        await updateProduct({
          id: selectedProduct.id || "",
          title: formData.title || "",
          brand: formData.brand || "",
          category: formData.category || "",
          price: formData.price || "",
          description: formData.description || "",
          image: formData.image || "",
          createdAt: formattedCreatedAt || ""
        });
        console.log("updateProduct", updateProduct);
        console.log("selectedProduct", selectedProduct.id);

      } else {
        const createdProduct = await createProduct({
          title: formData.title || "",
          brand: formData.brand || "",
          category: formData.category || "",
          price: formData.price || "",
          description: formData.description || "",
          image: formData.image || "",
          createdAt: formattedCreatedAt || ""
        });
        console.log("createProduct", createdProduct);

        setProducts((prevProducts) => [...prevProducts, createdProduct]);
      }

      navigate("/admin");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };


  const handleCancel = () => {
    setSelectedProduct({});
    navigate("/admin");
  };

  const handleChangeImageUrl = (e) => {
    const newImageUrl = e.target.value;
    setFormData((prevState) => ({ ...prevState, image: newImageUrl }));
    setPreviewImage(newImageUrl);
  };

  return (
    <div>
      <NavbarAdmin />
      <form className={styles.formSection} onSubmit={handleSubmit}>
        <h2>{selectedProduct && typeof selectedProduct === "object" && Object.keys(selectedProduct).length > 0 ? "Edit Product" : "Create Product"}</h2>
        <div className={styles.row} style={{ marginTop: "68px", marginBottom: "2rem" }}>
          {selectedProduct && typeof selectedProduct === "object" && Object.keys(selectedProduct).length > 0 && (
            <>
              <label className={styles.label}>ID</label>
              <p style={{ marginLeft: "192px" }}>{formData.itemId || "N/A"}</p>
            </>
          )}
        </div>

        <div className={styles.row}>
          <label className={styles.label} htmlFor="productName">Name</label>
          <input className={styles.input} id="productName" name='title' value={formData.title} onChange={handleChange} style={{ marginLeft: "166px" }} />
        </div>

        <div className={styles.row}>
          <label className={styles.label} htmlFor="productBrand">Brand</label>
          <input className={styles.input} id="productBrand" name='brand' value={formData.brand} onChange={handleChange} />
        </div>

        <div className={styles.row}>
          <label className={styles.label} htmlFor="productCategory">Category</label>
          <select id="productCategory" className={styles.productCategory} name='category' value={formData.category} onChange={handleChange}>
            <option value="Computer">Computer</option>
            <option value="Smart Phone">Smartphone</option>
            <option value="Tablet">Tablet</option>
            <option value="Television">Television</option>
            <option value="Watch">Watch</option>
            <option value="Game Disc">Game Disc</option>
          </select>
        </div>

        <div className={styles.row}>
          <label className={styles.label} htmlFor="productPrice">Price</label>
          <input type='text' className={styles.input} id="productPrice" name='price' value={formData.price} onChange={handleChange} style={{ marginLeft: "174px" }} />
        </div>

        <div className={styles.row}>
          <label className={styles.label} htmlFor="productDescription">Description</label>
          <textarea rows="4" cols="47" className={styles.textarea} id="productDescription" name='description' value={formData.description} onChange={handleChange}></textarea>
        </div>

        <div className={styles.row}>
          <label className={styles.label} htmlFor="productImageUrl">Image Url</label>
          <input className={styles.input} name='image' style={{ marginLeft: "139px" }} value={formData.image} onChange={handleChangeImageUrl} placeholder='Enter image URL' />
        </div>

        <div className={styles.row}>
          <label className={styles.label} htmlFor="productImage">Image</label>
          {formData.image ? <img src={previewImage} alt="Product Preview" id='productImage' className={styles.previewImage} style={{ marginLeft: "164px", width: "37%" }} /> : <p style={{ marginLeft: "164px" }}>No image URL provided.</p>}
        </div>

        <div className={styles.row}>
          <label className={styles.label}>Created At</label>
          <p style={{ marginLeft: "133px" }}>{formData.createdAt instanceof Date ? formData.createdAt.toLocaleDateString() : "N/A"}</p>
        </div>

        <div className={styles.buttonGroup}>
          <button className='btn btn-primary'>Submit</button>
          <button type="button" className='btn btn-secondary' onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default EditAdminProducts;