import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import config from "../../../../../config/apiConfig";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    // baseUrl: `${config.apiUrl}`,
    baseUrl: "http://localhost:7000/api/V1",

    prepareHeaders: (headers, { getState }) => {
      //! Add the token to the headers if available
      //!  Replace with how you access the token in your Redux state
      const token = getState()?.auth?.token;

      if (token) {
        headers.set("authorization", `${token}`);
      }
      return headers;
    },
  }),

  tagTypes: [
    "courses",
    "job",
    "jobsApply",
    "user",
    "users",
    "form",
    "instructors",
    "admins",
    "Recruiter",
    "blogs",
    "bookmark",
    "course-discussions",
    "course-discussion-reply",
    "help-and-support-reply",
  ],
  // eslint-disable-next-line no-unused-vars
  endpoints: (builder) => ({}),
});
