export const registerUser = async (userData) => {
  try {
    const response = await fetch("http://localhost:3000/register", {
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

export const loginUser = async () => {
  try {
    const response = await fetch("http://localhost:3000/login");
    const data = await response.json();

    console.log(data);

    return data;
  } catch (error) {
    console.log("This is the login error: ");
    console.log(error);
  }
};