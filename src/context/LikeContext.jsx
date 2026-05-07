import { createContext, useContext, useState, useEffect } from "react";

const LikeContext = createContext();

export const LikeProvider = ({ children }) => {
  const [likedItems, setLikedItems] = useState(() => {
    const saved = localStorage.getItem("likes");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("likes", JSON.stringify(likedItems));
  }, [likedItems]);

  const toggleLike = (car) => {
    setLikedItems((prev) => {
      const exists = prev.find((item) => item.id === car.id);
      if (exists) return prev.filter((item) => item.id !== car.id);
      return [...prev, car];
    });
  };

  const isLiked = (id) => likedItems.some((item) => item.id === id);

  return (
    <LikeContext.Provider value={{ likedItems, toggleLike, isLiked }}>
      {children}
    </LikeContext.Provider>
  );
};

export const useLike = () => useContext(LikeContext);