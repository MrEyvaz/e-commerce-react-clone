import { addDoc, collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { db } from "../FireStore/FireStore";

export const ProductContext = createContext()

export const ProductProvider = ({ children }) => {
    const [selectedProduct, setSelectedProduct] = useState({})
    const [products, setProducts] = useState([])

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "products"));
                console.log(querySnapshot);

                const productsList = querySnapshot.docs.map((doc) => {
                    const data = doc.data();                    
                    return {
                        id: doc.id,
                        ...data,
                        createdAt: new Date(data.createdAt),
                    };
                });

                console.log("productsList", productsList);
                setProducts(productsList);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts()
    }, [])

    const updateProduct = async (updatedProduct) => {
        if (!updatedProduct.id) {
            console.error("Error: Product ID is required to update the product.");
            return;
        }
        console.log("updatedProduct.id", updatedProduct.id);
        console.log("Updating product:", updatedProduct);
        const productRef = doc(db, "products", updatedProduct.id);
        try {
            await updateDoc(productRef, {
                id: updatedProduct.id || "",
                title: updatedProduct.title || "",
                brand: updatedProduct.brand || "",
                category: updatedProduct.category || "",
                price: updatedProduct.price || "",
                description: updatedProduct.description || "",
                image: updatedProduct.image || "",
            });
            console.log("updatedProduct", updatedProduct);
            console.log("updateDoc",updateDoc);
            
            setProducts((prevProducts) => prevProducts.map(product => product.id === updatedProduct.id ? { ...product, ...updatedProduct } : product));

        } catch (error) {
            console.error("Error updating product:", error);
        }
    };


    const createProduct = async (newProduct) => {
        try {
            const docRef = await addDoc(collection(db, "products"), newProduct);
            const createdProduct = {id: docRef.id, ...newProduct}
            setProducts((prevProducts) => [...prevProducts, createdProduct])
            return createdProduct
        } catch (error) {
            console.error("Error creating document:", error);
            throw error; 
        }
    };

    return (
        <ProductContext.Provider value={{ products, setProducts, selectedProduct, setSelectedProduct, updateProduct, createProduct }}>
            {children}
        </ProductContext.Provider>
    )
}