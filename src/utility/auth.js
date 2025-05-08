export const authRequest = async (action, body = {}) => {
  try {
    const response = await fetch(`http://localhost:8000/api/${action}`, {
      method: "POST",
      body: JSON.stringify({ ...body }),
      headers: {
        "content-Type": "application/json",
      },
    });

    return response.json();
  } catch (error) {
    console.error(error);
  }
};
