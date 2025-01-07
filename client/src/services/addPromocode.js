export const addPromoCode = async (userData) => {
  try {
    const response = await fetch("http://localhost:3000/promo", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userData }),
    });
    const data = await response.json();

    console.log(data);

    return data;
  } catch (error) {
    console.log("This is the error: ");
    console.log(error);
  }
};
