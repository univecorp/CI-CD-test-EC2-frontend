import { apiSlice } from "./../api/apiSlice";

const instructorApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getInstructor: builder.query({
      query: () => "/instructors",
      keepUnusedDataFor: 600,
      providesTags: ["instructors"],
    }),
    getSingleInstructor: builder.query({
      query: (id) => `/instructors/${id}`,
      providesTags: (result, error, arg) => [{ type: "instructors", id: arg }],
    }),
    addInstructor: builder.mutation({
      query: (data) => ({
        url: "/instructors",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["instructors"],
    }),

    editInstructor: builder.mutation({
      query: ({ id, data }) => ({
        url: `/instructors/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["instructors"],
    }),

    deleteInstructor: builder.mutation({
      query: (id) => ({
        url: `/instructors/${id}`,
        method: "DELETE",
      }),
    }),

    searchInstructors: builder.query({
      query: (searchQuery) => `/instructors/search?query=${searchQuery}`,
    }),
  }),
});

export const {
  useGetInstructorQuery,
  useGetSingleInstructorQuery,
  useAddInstructorMutation,
  useEditInstructorMutation,
  useDeleteInstructorMutation,
  useSearchInstructorsQuery
} = instructorApi;
