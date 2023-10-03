import { apiSlice } from "./../api/apiSlice";

const discussionFormApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getcoursediscussionForm: builder.query({
      query: () => "/course-discussion",
      keepUnusedDataFor: 600,
      providesTags: ["courseform"],
    }),

    addcoursediscussionForm: builder.mutation({
      query: (data) => ({
        url: "/course-discussion",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["courseform"],
    }),
  }),
});

export const {
  useAddcoursediscussionFormMutation,
  useGetcoursediscussionFormQuery,
} = discussionFormApi;
