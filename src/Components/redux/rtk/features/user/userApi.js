import { apiSlice } from "./../api/apiSlice";

const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: "/users",
      }),
      providesTags: ["users"],
    }),
    userByEmail: builder.query({
      query: (email) => ({
        url: `/users/${email}`,
      }),
      providesTags: ["user"],
    }),

    userByPhone: builder.query({
      query: (phone) => ({
        url: `/users/${phone}`,
      }),
      providesTags: ["user"],
    }),
    updateUserInfo: builder.mutation({
      query: ({ email, data }) => ({
        url: `/users/${email}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),

    uploadImage: builder.mutation({
      query: (image) => ({
        url: "/upload-image",
        method: "POST",
        body: image,
      }),
    }),
    chatgpt: builder.mutation({
      query: (data) => ({
        url: "/chatgpt",
        method: "POST",
        body: data,
      }),
    }),

    updateUserRole: builder.mutation({
      query: ({ email, role }) => ({
        url: `/users/${email}/role`,
        method: "PATCH",
        body: { email, role },
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useUserByPhoneQuery,
  useUserByEmailQuery,
  useUpdateUserInfoMutation,
  useUploadImageMutation,
  useChatgptMutation,
  useUpdateUserRoleMutation,
  useUpdateEnrollUserInCourseMutation,
} = userApi;
