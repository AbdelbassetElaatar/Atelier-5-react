const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || "/api";

export const sendCheckoutData = async (customerData, cartData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order: {
          customer: customerData,
          items: cartData,
        },
      }),
    });

    const data = await response.json();
    return {
      status: response.status,
      message: data.message || "Unknown error",
      ok: response.ok,
    };
  } catch (error) {
    return {
      status: 500,
      message: error.message || "Network error",
      ok: false,
    };
  }
};
