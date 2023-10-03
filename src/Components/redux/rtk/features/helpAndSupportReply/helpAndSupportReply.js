import { apiSlice } from "./../api/apiSlice";

const helpandSupportApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getHelpAndSupportReplyForm: builder.query({
      query: () => "/help-and-support-reply",
      keepUnusedDataFor: 600,
      providesTags: ["helpreplyform"],
    }),

    addHelpAndSupportReplyForm: builder.mutation({
      query: (data) => ({
        url: "/help-and-support-reply",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["helpreplyform"],
    }),
    getHelpAndSupportReplyId: builder.query({
      query: (id) => ({
        url: `/help-and-support-reply/${id}`,
      }),
      providesTags: ["helpreplyform"],
    }),
  }),
});

export const {
  useAddHelpAndSupportReplyFormMutation,
  useGetHelpAndSupportReplyFormQuery,
  useGetHelpAndSupportReplyIdQuery,
} = helpandSupportApi;
