import { createContext, useContext, useState, useEffect } from "react";

const OrderContext = createContext();
const ORDERS_KEY = "am_orders";

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem(ORDERS_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  }, [orders]);

  const createOrder = (userId, userName, items, total) => {
    const order = {
      id: Date.now(),
      userId,
      userName,
      items,
      total,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    setOrders((prev) => [order, ...prev]);
    return order;
  };

  const updateOrderStatus = (orderId, status) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
  };

  const getUserOrders = (userId) => orders.filter((o) => o.userId === userId);

  return (
    <OrderContext.Provider value={{ orders, createOrder, updateOrderStatus, getUserOrders }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => useContext(OrderContext);