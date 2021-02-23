import PRODUCTS from "../../data/dummy-data";
import Product from "../../models/product";
import {
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
} from "../actions/products";

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((prod) => prod.ownedId === "u1"),
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_PRODUCT:
      const newProduct = new Product(
        action.productData.id,
        "u1",
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        action.productData.price
      );
      return {
        ...state,
        availableProducts: state.availableProducts.concat(newProduct),
        userProducts: state.userProducts.concat(newProduct),
      };
    case UPDATE_PRODUCT:
      const productIndex = state.userProducts.findIndex(
        (prod) => prod.id === action.pid
      );
      const updatedProduct = new Product(
        action.pid,
        state.userProducts[productIndex].ownedId,
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        state.userProducts[productIndex].price
      );
      const updateUserProducts = [...state.userProducts];
      updateUserProducts[productIndex] = updatedProduct;
      const availableProductIndex = state.availableProducts.findIndex(
        (prod) => prod.id === action.pid
      );
      const updatedAvailableProducts = [...state.availableProducts];
      updatedAvailableProducts[availableProductIndex] = updatedProduct;
      return {
        ...state,
        availableProducts: updatedAvailableProducts,
        userProducts: updateUserProducts,
      };

    case DELETE_PRODUCT:
      return {
        ...state,
        userProducts: state.userProducts.filter(
          (product) => product.id != action.pid
        ),
        availableProducts: state.availableProducts.filter(
          (product) => product.id != action.pid
        ),
      };
  }
  return state;
};
