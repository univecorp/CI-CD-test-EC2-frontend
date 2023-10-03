import { apiSlice } from "./../api/apiSlice";

const bookmarksApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    postBookmarks: builder.mutation({
      query: ({ jobId, userId }) => ({
        url: "/bookmarks",
        method: "POST",
        body: { jobId, userId },
      }),
      providesTags: ["bookmark"],
      invalidatesTags: ["bookmark"],
    }),
    deleteBookmarks: builder.mutation({
      query: ({ jobId, userId }) => ({
        url: "/bookmarks",
        method: "DELETE",
        body: { jobId, userId },
      }),
      invalidatesTags: ["bookmark"],
    }),
    getBookmarksById: builder.query({
      query: (id) => ({
        url: `/bookmarks/${id}`,
      }),
      providesTags: ["bookmark"],
    }),
  }),
});

export const {
  usePostBookmarksMutation,
  useDeleteBookmarksMutation,
  useGetBookmarksByIdQuery,
} = bookmarksApi;
