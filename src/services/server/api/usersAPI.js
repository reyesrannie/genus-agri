import { serverAPI } from "../request/serverAPI";

export const usersAPI = serverAPI.injectEndpoints({
  endpoints: (builder) => ({
    users: builder.query({
      transformResponse: (response) => response,
      query: (payload) => ({
        url: `/user`,
        method: "GET",
        params: payload,
      }),
      providesTags: ["Users"],
    }),
    pendingUsers: builder.query({
      transformErrorResponse: (response) => response,
      query: (payload) => ({
        url: `/charging/one_rdf_user`,
        method: "GET",
        params: payload,
      }),
      providesTags: ["PendingUsers"],
    }),
    createUser: builder.mutation({
      query: (payload) => ({
        url: `/user`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Users", "PendingUsers"],
    }),
    userReset: builder.mutation({
      query: (payload) => ({
        url: `user/reset/${payload?.id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["Users"],
    }),

    updateUser: builder.mutation({
      query: (payload) => ({
        url: `/user/${payload?.id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Users"],
    }),
    archiveUser: builder.mutation({
      query: (payload) => ({
        url: `/user/${payload?.id}`,
        method: "DELETE",
        body: payload,
      }),
      invalidatesTags: ["Users"],
    }),
    importUser: builder.mutation({
      query: (payload) => ({
        url: `/import/users`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useUsersQuery,
  usePendingUsersQuery,
  useLazyUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useArchiveUserMutation,
  useUserResetMutation,
  useImportUserMutation,
} = usersAPI;
