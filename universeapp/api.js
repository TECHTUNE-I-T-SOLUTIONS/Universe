// src/api.js
export const signupUser = async (email, password) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Signup failed");
    }
    return await response.json();
  };
  
  export const loginUser = async (email, password) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Login failed");
    }
    return await response.json();
  };
  
  // Example: fetching protected data (requires token)
  export const fetchProtectedData = async (token) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/protected`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch protected data");
    }
    return await response.json();
  };
  