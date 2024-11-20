import { collection, getDocs } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../FireStore/FireStore";

export const FlashSalesContext = createContext()

export const FlashSalesProvider = ({ children }) => {
    const [flashSales, setFlashSales] = useState([])

    useEffect(() => {
        const fetchFlashSales = async () => {
            const querySnapShot = await getDocs(collection(db, "flashSales"))
            console.log("querySnapShot of FlashSales", querySnapShot);
            const sales = querySnapShot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            console.log(sales);
            
            setFlashSales(sales)
        }

        fetchFlashSales()
    }, [])

    return (
        <FlashSalesContext.Provider value={{ flashSales, setFlashSales }}>
            {children}
        </FlashSalesContext.Provider>
    )
}