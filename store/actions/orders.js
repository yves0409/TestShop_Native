export const ADD_ORDERS = "ADD_ORDERS";

export const addOrder = (cartItems, totalAmount) => {
  return {
    type: ADD_ORDERS,
    orderData: { items: cartItems, amount: totalAmount },
  };
};
s;
