import { createContext, useContext, useState } from "react";

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [shape, setShape] = useState(localStorage.getItem("SHAPE"));
  const [favoriteItems, setFavoriteItems] = useState(() =>
    JSON.parse(localStorage.getItem("favourites") || "[]")
  );

  const handleToggleFavourite = (id) => {
    const isFavourited = favoriteItems.includes(id);
    if (!isFavourited) {
      const newStorageItem = [...favoriteItems, id];
      setFavoriteItems(newStorageItem);
      localStorage.setItem("favourites", JSON.stringify(newStorageItem));
    } else {
      const newStorageItem = favoriteItems.filter((savedId) => savedId !== id);
      setFavoriteItems(newStorageItem);
      localStorage.setItem("favourites", JSON.stringify(newStorageItem));
    }
  };
  return (
    <StateContext.Provider
      value={{ shape, setShape, favoriteItems, handleToggleFavourite }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
