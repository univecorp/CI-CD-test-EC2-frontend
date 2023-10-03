import { apiSlice } from "./../api/apiSlice";

const RecruiterApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRecruiter: builder.query({
      query: () => "/Recruiter",
      keepUnusedDataFor: 600,
      providesTags: ["Recruiter"],
    }),
    addRecruiter: builder.mutation({
      query: (data) => ({
        url: "/Recruiter",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Recruiter"],
    }),
    editRecruiter: builder.mutation({
      query: ({ id, data }) => ({
        url: `/Recruiter/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Recruiter"],
    }),
  }),
});

export const {
  useGetRecruiterQuery,
  useAddRecruiterMutation,
  useEditRecruiterMutation,
} = RecruiterApi;
