import { createContext, useEffect, useState } from "react";

export const FavoritesContext = createContext()

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState(() => {
        const storedFavorites = localStorage.getItem("favorites")
        try {
            const parsedFavorites = storedFavorites ? JSON.parse(storedFavorites) : []
            return Array.isArray(parsedFavorites) ? parsedFavorites : []
        } catch (error) {
            console.error("Failed to parse favorites from localStorage", error);
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites))
    }, [favorites])

    const toggleFavorite = (product) => {
        setFavorites((prevFavorites) => {
            if (prevFavorites.some((fav) => fav.id === product.id)) {
                return prevFavorites.filter((fav) => fav.id !== product.id)
            } else {
                return [...prevFavorites, product]
            }
        })
    }

    return (
        <FavoritesContext.Provider value={{favorites, setFavorites, toggleFavorite}}>
            {children}
        </FavoritesContext.Provider>
    )
}