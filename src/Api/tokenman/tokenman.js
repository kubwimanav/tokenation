import { apiSlice } from "../apiEntry";

export const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getGameHistory: builder.query({
      query: () => ({
        url: "api/tokenman/history",
        method: "GET",
      }),
    }),

    getUserHistory: builder.query({
      query: () => ({
        url: "api/tokenman/user-history",
        method: "GET",
      }),
    }),
    getMytables: builder.query({
      query: () => ({
        url: "api/tokenman/my-tables",
        method: "GET",
      }),
    }),
    getCommissions: builder.query({
      query: () => ({
        url: "api/tokenman/commissions",
        method: "GET",
      }),
    }),
    getQrcode: builder.query({
      query: (tableId) => ({
        url: `api/tokenman/games/${tableId}/qr-code`,
        method: "GET",
      }),
    }),
    getEarnings: builder.query({
      query: () => ({
        url: "api/tokenman/earnings",
        method: "GET",
      }),
    }),

    createcontact: builder.mutation({
      query: (data) => ({
        url: "api/devices/contact",
        method: "POST",
        body: data,
      }),
    }),
    deletecontact: builder.mutation({
      query: (id) => ({
        url: `/api/devices/contact/${id}/`,
        method: "DELETE",
      }),
    }),

    deleteMatchitem: builder.mutation({
      query: (id) => ({
        url: `api/devices/matches/${id}/delete/`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetGameHistoryQuery,
  useGetUserHistoryQuery,
  useGetMytablesQuery,
  useGetCommissionsQuery,
  useGetQrcodeQuery,
  useGetEarningsQuery,
  useCreatecontactMutation,
  useDeletecontactMutation,
  useDeleteMatchitemMutation,
} = productApi;
