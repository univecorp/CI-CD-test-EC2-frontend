import { apiSlice } from "./../api/apiSlice";

const blogsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    postBlog: builder.mutation({
      query: (data) => ({
        url: "/blogs",
        method: "POST",
        body: data,
        formData: true,
      }),
      invalidatesTags: ["blogs"],
      providesTags: ["blogs"],
    }),
    getBlogs: builder.query({
      query: () => ({
        url: "/blogs",
      }),
      providesTags: ["blogs"],
    }),
    getBlogsById: builder.query({
      query: (id) => ({
        url: `/blogs/${id}`,
      }),
      providesTags: ["blogs"],
    }),
    updateBlog: builder.mutation({
      query: ({ id, data }) => ({
        url: `/blogs/${id}`,
        method: "PATCH",
        body: data,
        formData: true,
      }),
      invalidatesTags: ["blogs"],
    }),
    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `/blogs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["blogs"],
    }),
  }),
});

export const {
  useGetBlogsQuery,
  usePostBlogMutation,
  useGetBlogsByIdQuery,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = blogsApi;
