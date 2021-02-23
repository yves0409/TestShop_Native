export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";
import Product from "../../models/product";

//FETCHPRODUCTS Action
export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        "https://native-shop-8ca66-default-rtdb.firebaseio.com/products.json"
      );
      //error
      if (!response.ok) {
        throw new Error("Oops! something went wrong...");
      }
      //response
      const resData = await response.json();
      const loadedProducts = [];
      //loop through the loadedProducts array
      for (const key in resData) {
        loadedProducts.push(
          new Product(
            key,
            "u1",
            resData[key].title,
            resData[key].imageUrl,
            resData[key].description,
            resData[key].price
          )
        );
      }
      dispatch({ type: SET_PRODUCTS, products: loadedProducts });
    } catch (error) {
      throw error;
    }
  };
};

//DELETE
export const deleteProduct = (productId) => {
  return async (dispatch) => {
    await fetch(
      `https://native-shop-8ca66-default-rtdb.firebaseio.com/products/${productId}.json`,
      {
        method: "DELETE",
      }
    );
    dispatch({
      type: DELETE_PRODUCT,
      pid: productId,
    });
  };
};

//CREATE
export const createProduct = (title, description, imageUrl, price) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://native-shop-8ca66-default-rtdb.firebaseio.com/products.json",
      {
        method: "POST",
        header: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
          price,
        }),
      }
    );

    const resData = await response.json();

    console.log(resData);

    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: resData.name,
        title,
        description,
        imageUrl,
        price,
      },
    });
  };
};

//UPDATE
export const updateProduct = (id, title, description, imageUrl) => {
  return async (dispatch) => {
    await fetch(
      `https://native-shop-8ca66-default-rtdb.firebaseio.com/products/${id}.json`,
      {
        method: "PATCH",
        header: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
        }),
      }
    );
    dispatch({
      type: UPDATE_PRODUCT,
      pid: id,
      productData: {
        title,
        description,
        imageUrl,
      },
    });
  };
};
