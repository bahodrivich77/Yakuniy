import { createContext, useContext, useState } from "react";
import { cars as initialCars } from "../data/cars";

const CarsContext = createContext();

export const CarsProvider = ({ children }) => {
  const [cars, setCars] = useState(() => {
    const saved = localStorage.getItem("am_cars");
    return saved ? JSON.parse(saved) : initialCars;
  });

  const save = (data) => {
    setCars(data);
    localStorage.setItem("am_cars", JSON.stringify(data));
  };

  const addCar = (car) => {
    const newCar = { ...car, id: Date.now() };
    save([...cars, newCar]);
  };

  const updateCar = (id, data) => {
    save(cars.map((c) => (c.id === id ? { ...c, ...data } : c)));
  };

  const deleteCar = (id) => {
    save(cars.filter((c) => c.id !== id));
  };

  return (
    <CarsContext.Provider value={{ cars, addCar, updateCar, deleteCar }}>
      {children}
    </CarsContext.Provider>
  );
};

export const useCars = () => useContext(CarsContext);