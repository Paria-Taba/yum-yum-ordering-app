const baseUrl = "https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com";
const key = "yum-vKkkQHqQboi7c6JF";
const tenantId = "pjem";
const tenantName = "Paria Taba2";

async function getKey() {
  const options = {
    method: "POST",
  };
  const response = await fetch(baseUrl + "/keys", options);
  const data = await response.json();
  return data;
}

async function getTenant() {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-zocom": key,
    },
    body: JSON.stringify({ name: "Paria Taba2" }),
  };
  const response = await fetch(baseUrl + "/tenants", options);
  const data = await response.json();
  return data;
}

export async function getMenu() {
  const options = {
    method: "GET",
    headers: {
      "x-zocom": key,
    },
  };
  const response = await fetch(baseUrl + "/menu", options);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const data = await response.json();
  console.log(data);
  return data;
}

export async function createOrder(cartProductList) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
      "x-zocom": key,
    },
    body: JSON.stringify({
      items: cartProductList,
    }),
  };

  try {
    const response = await fetch(baseUrl + `/${tenantId}/orders`, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating order:", error);
  }
}
