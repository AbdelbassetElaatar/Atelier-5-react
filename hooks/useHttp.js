const rawBackend = import.meta.env.VITE_BACKEND_URL;
// Default to relative /api; if provided, accept only absolute http(s) URLs
const API_BASE_URL =
  rawBackend && /^https?:\/\//i.test(rawBackend) ? rawBackend : "/api";

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
