export const getAllClientConversations = async (client) => {
  try {
    const response = await fetch(`http://localhost:5001/user-chat/${client}`);

    const data = await response.json();

    return data;
  } catch (error) {
    console.log("This is the error: ");
    console.log(error);
  }
};

export async function getAllShopConversations(shopId) {
  const res = await fetch(`http://localhost:5001/shop-chat/${shopId}`);
  if (!res.ok) throw new Error("Failed to fetch shop conversations");
  return await res.json();
}
