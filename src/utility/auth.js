export const authRequest = async (action, body = {}, method = "POST") => {
  const baseUrl = process.env.NEXT_APP_BASEURL || "http://localhost:8000";
  try {
    const response = await fetch(`${baseUrl}/api/${action}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(body),
    });

    return response;
  } catch (error) {
    console.error("Auth Request Error:", error);
    throw error;
  }
};
