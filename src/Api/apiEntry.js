import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://token-backend-omega.vercel.app/",
  prepareHeaders: (headers) => {
    // Get the access token from localStorage (matching the updated AuthContext)
    const accessToken = localStorage.getItem("token");

    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery,
  endpoints: () => ({}),
});
