import { apiSlice } from "../apiEntry";

export const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTokenman: builder.query({
      query: () => ({
        url: "api/admin/token-men",
        method: "GET",
      }),
    }),
    getTokenmanpending: builder.query({
      query: () => ({
        url: "api/admin/token-men/pending",
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
  useGetTokenmanQuery,
  useGetTokenmanpendingQuery,
  useCreatecontactMutation,
  useDeletecontactMutation,
  useDeleteMatchitemMutation,
} = productApi;
