import { apiSlice } from "./../api/apiSlice";

const courseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCourse: builder.query({
      query: () => "/courses",
      keepUnusedDataFor: 600,
      providesTags: ["courses"],
    }),
    getSingleCourse: builder.query({
      query: (id) => `/courses/${id}`,
      providesTags: ["courses"],
    }),
    // addCourse: builder.mutation({
    //   query: (data) => ({
    //     url: "/courses",
    //     method: "POST",
    //     body: data,
    //   }),
    //   invalidatesTags: ["courses"],
    // }),

    // editCourse: builder.mutation({
    //   query: ({ id, data }) => ({
    //     url: `/courses/${id}`,
    //     method: "PATCH",
    //     body: data,
    //   }),
    //   invalidatesTags: ["courses"],
    // }),

    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `/courses/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["courses"],
    }),

    updateCourseAction: builder.mutation({
      query: ({ id, courseAction }) => ({
        url: `/courses/courseAction/${id}`,
        method: "PATCH",
        body: { id, courseAction },
      }),
    }),
  }),
});

export const {
  useGetCourseQuery,
  useAddCourseMutation,
  useEditCourseMutation,
  useDeleteCourseMutation,
  useUpdateCourseActionMutation,
  useGetSingleCourseQuery,
} = courseApi;
