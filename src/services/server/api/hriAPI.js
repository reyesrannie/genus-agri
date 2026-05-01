import { serverAPI } from "../request/serverAPI";

export const hriAPI = serverAPI.injectEndpoints({
  endpoints: (builder) => ({
    hri: builder.query({
      transformResponse: (response) => response,
      query: (payload) => ({
        url: `/hri`,
        method: "GET",
        params: payload,
      }),
      providesTags: ["Hri"],
    }),
    createHri: builder.mutation({
      query: (payload) => ({
        url: `/hri`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Hri"],
    }),
    updateHri: builder.mutation({
      query: (payload) => ({
        url: `/hri/${payload?.id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Hri"],
    }),
    archiveHri: builder.mutation({
      query: (payload) => ({
        url: `/hri/${payload?.id}`,
        method: "DELETE",
        body: payload,
      }),
      invalidatesTags: ["Hri"],
    }),
    importHri: builder.mutation({
      query: (payload) => ({
        url: `/import/hri`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Hri"],
    }),
  }),
});

export const {
  useHriQuery,
  useLazyHriQuery,
  useArchiveHriMutation,
  useCreateHriMutation,
  useImportHriMutation,
  useUpdateHriMutation,
} = hriAPI;
