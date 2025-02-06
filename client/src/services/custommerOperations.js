export const addListingToBag = async (productData, user) => {
  try {
    const response = await fetch(
      `http://localhost:3000/product-details?name=${user}`,
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
    const response = await fetch(`http://localhost:3000/cart?id=${user}`);

    const data = await response.json();

    return data;
  } catch (error) {
    console.log("This is the error: ");
    console.log(error);
  }
};
