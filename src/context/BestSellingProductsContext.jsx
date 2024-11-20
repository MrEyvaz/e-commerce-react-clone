import { collection, getDocs } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { db } from "../FireStore/FireStore";

export const BestSellingProductsContext = createContext()

export const BestSellingProductsProvider = ({ children }) => {
    const [bestSellingProducts, setBestSellingProducts] = useState([])

    useEffect(() => {
        const fetchBestSellingProducts = async () => {
            const querySnapShot = await getDocs(collection(db, "bestSellingProducts"))
            const products = querySnapShot.docs.map((doc) => {
                return {
                    id: doc.id,
                    ...doc.data()
                }                
            })
            console.log("products fo best sell", products);

            setBestSellingProducts(products)
        }

        fetchBestSellingProducts()
    }, [])

    return (
        <BestSellingProductsContext.Provider value={{bestSellingProducts, setBestSellingProducts}}>
            {children}
        </BestSellingProductsContext.Provider>
    )
}