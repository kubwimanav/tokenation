import { apiSlice } from "../apiEntry";

export const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getGame: builder.query({
      query: () => ({
        url: "api/games/live",
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
  useGetGameQuery,
  useCreatecontactMutation,
  useDeletecontactMutation,
  useDeleteMatchitemMutation,
} = productApi;
