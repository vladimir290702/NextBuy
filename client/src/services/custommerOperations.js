export const addListingToBag = async (productData, user) => {
  try {
    const response = await fetch(
      `http://localhost:5000/product-details?name=${user}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      }
    );
    const data = await response.json();

    return data;
  } catch (error) {
    console.log("This is the error: ");
    console.log(error);
  }
};

export const getUserCart = async (user) => {
  try {
    const response = await fetch(`http://localhost:5000/cart?id=${user}`);

    const data = await response.json();

    return data;
  } catch (error) {
    console.log("This is the error: ");
    console.log(error);
  }
};

export const orderCheckout = async (checkoutData) => {
  try {
    const response = await fetch(`http://localhost:5000/checkout`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(checkoutData),
    });
    const data = await response.json();

    return data;
  } catch (error) {
    console.log("This is the error: ");
    console.log(error);
  }
};

export const removeProductFromCart = async (id, user) => {
  try {
    const response = await fetch(`http://localhost:5000/cart`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId: id, user }),
    });
    const data = await response.json();

    return data;
  } catch (error) {
    console.log("This is the error: ");
    console.log(error);
  }
};

export const editProductQuantity = async (productId, quantity, user) => {
  try {
    const response = await fetch(`http://localhost:5000/cart`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId, quantity, user }),
    });
    const data = await response.json();

    return data;
  } catch (error) {
    console.log("This is the error: ");
    console.log(error);
  }
};

export const addListingToFavourites = async (product, name) => {
  try {
    const response = await fetch(`http://localhost:5000/product-details`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ product, name }),
    });
    const data = await response.json();

    return data;
  } catch (error) {
    console.log("This is the error: ");
    console.log(error);
  }
};

export const removeListingFromFavourites = async (product, name) => {
  try {
    const response = await fetch(`http://localhost:5000/product-details`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ product, name }),
    });
    const data = await response.json();

    return data;
  } catch (error) {
    console.log("This is the error: ");
    console.log(error);
  }
};
