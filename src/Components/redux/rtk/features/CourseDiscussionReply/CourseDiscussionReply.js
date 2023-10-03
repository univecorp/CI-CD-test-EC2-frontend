import { apiSlice } from "./../api/apiSlice";

const discussionFormApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getcoursediscussionreplyForm: builder.query({
      query: () => "/course-discussion-reply",
      keepUnusedDataFor: 600,
      providesTags: ["coursereplyform"],
    }),

    addCourseDiscussionReplyForm: builder.mutation({
      query: (data) => ({
        url: "/course-discussion-reply",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["coursereplyform"],
    }),
  }),
});

export const {
  useAddCourseDiscussionReplyFormMutation,
  useGetcoursediscussionreplyFormQuery,
} = discussionFormApi;
