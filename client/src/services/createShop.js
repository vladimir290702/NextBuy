export const createShop = async (userData) => {
  try {
    const response = await fetch("http://localhost:5001/create-shop", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const data = await response.json();

    return data;
  } catch (error) {
    console.log("This is the error: ");
    console.log(error);
  }
};

export const getShopData = async (id, page) => {
  try {
    const response = await fetch(
      `http://localhost:5001/dashboard?name=${id}&page=${page}`
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.log("This is the error: ");
    console.log(error);
  }
};

export const createListing = async (listingData, user) => {
  try {
    const response = await fetch(
      `http://localhost:5001/create-listing?name=${user}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(listingData),
      }
    );
    const data = await response.json();

    return data;
  } catch (error) {
    console.log("This is the error: ");
    console.log(error);
  }
};

export const getAllShopData = async () => {
  try {
    const response = await fetch(`http://localhost:5001/other-shops`);

    const data = await response.json();

    return data;
  } catch (error) {
    console.log("This is the error: ");
    console.log(error);
  }
};

export const getListingsData = async (search = "", query) => {
  try {
    const url = search
      ? `http://localhost:5001/apparel?${query}&search=${encodeURIComponent(
          search
        )}`
      : `http://localhost:5001/apparel?${query}`;

    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("This is the error: ");
    console.log(error);
  }
};

export const getListing = async (id) => {
  try {
    const response = await fetch(
      `http://localhost:5001/product-details?id=${id}`
    );
    const data = await response.json();

    return data;
  } catch (error) {
    console.log("This is the error: ");
    console.log(error);
  }
};
