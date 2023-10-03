import { apiSlice } from "./../api/apiSlice";

const jobApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    postJob: builder.mutation({
      query: (data) => ({
        url: "/jobs",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Jobs"],
    }),
    JobsApply: builder.mutation({
      query: (data) => ({
        url: "/jobsapply",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["jobsApply"],
    }),
    getJob: builder.query({
      query: () => ({
        url: "/jobs",
      }),
      providesTags: ["Jobs"],
    }),
    getRecruiterJobs: builder.query({
      query: (email) => ({
        url: `jobs/email/${email}`,
      }),
      providesTags: ["Job"],
    }),

    updatejobs: builder.mutation({
      query: ({ id, data }) => ({
        url: `/jobs/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Job"],
    }),

    queries: builder.mutation({
      query: (data) => ({
        url: `/jobs/query`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Job"],
    }),
    reply: builder.mutation({
      query: (data) => ({
        url: "/jobs/reply",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Job"],
    }),
    getAppliedJobs: builder.query({
      query: (email) => ({
        url: `/jobsapply/${email}`,
      }),
      providesTags: ["jobsApply"],
    }),
    JobById: builder.query({
      query: (id) => ({
        url: `/jobs/${id}`,
      }),
      providesTags: ["Job"],
    }),
  }),
});

export const {
  usePostJobMutation,
  useGetJobQuery,
  useJobByIdQuery,
  useJobsApplyMutation,
  useGetAppliedJobsQuery,
  useGetRecruiterJobsQuery,
  useUpdatejobsMutation,
  useQueriesMutation,
  useReplyMutation,
} = jobApi;
