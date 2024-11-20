import { collection, getDocs } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { db } from "../FireStore/FireStore";

export const ExploreOurProductsContext = createContext()

export const ExploreOurProductsProvider = ({children}) => {
    const [exploreOurProducts, setExploreOurProducts] = useState([])

    useEffect(() => {
        const fetchExploreOurProducts = async () => {
            const querySnapShot = await getDocs(collection(db, "exploreOurProducts"))
            const products = querySnapShot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }))
            setExploreOurProducts(products)
        }
        fetchExploreOurProducts()
    }, [])

    return (
        <ExploreOurProductsContext.Provider value={{exploreOurProducts, setExploreOurProducts}}>
            {children}
        </ExploreOurProductsContext.Provider>
    )
}