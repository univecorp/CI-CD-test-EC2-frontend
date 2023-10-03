import { apiSlice } from "./../api/apiSlice";

const adminApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdmin: builder.query({
      query: () => "/admins",
      keepUnusedDataFor: 600,
      providesTags: ["admin"],
    }),
    getSingleAdmin: builder.query({
      query: (id) => `/admins/${id}`,
      providesTags: (result, error, arg) => [{ type: "admins", id: arg }],
    }),
    addAdmin: builder.mutation({
      query: (data) => ({
        url: "/admins",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["admin"],
    }),

    editAdmin: builder.mutation({
      query: ({ email, data }) => ({
        url: `/admins/${email}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["admin"],
    }),

    deleteAdmin: builder.mutation({
      query: (id) => ({
        url: `/admins/${id}`,
        method: "DELETE",
      }),
    }),

    // searchInstructors: builder.query({
    //   query: (searchQuery) => `/instructors/search?query=${searchQuery}`,
    // }),
  }),
});

export const {
  useAddAdminMutation,
  useGetAdminQuery,
  useGetSingleAdminQuery,
  useEditAdminMutation,
  useDeleteAdminMutation
} = adminApi;
