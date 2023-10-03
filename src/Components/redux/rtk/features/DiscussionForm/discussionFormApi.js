import { apiSlice } from "./../api/apiSlice";

const discussionFormApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getdiscussionForm: builder.query({
      query: () => "/form",
      keepUnusedDataFor: 600,
      providesTags: ["form"],
    }),

    adddiscussionForm: builder.mutation({
      query: (data) => ({
        url: "/form",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["form"],
    }),
  }),
});

export const { useAdddiscussionFormMutation, useGetdiscussionFormQuery } =
  discussionFormApi;
