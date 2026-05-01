import { serverAPI } from "../request/serverAPI";

export const typeAPI = serverAPI.injectEndpoints({
  endpoints: (builder) => ({
    keyword: builder.query({
      transformResponse: (response) => response,
      query: (payload) => ({
        url: `/keyword`,
        method: "GET",
        params: payload,
      }),
      providesTags: ["Keyword"],
    }),
    createKeyword: builder.mutation({
      query: (payload) => ({
        url: `/keyword`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Keyword"],
    }),
    updateKeyword: builder.mutation({
      query: (payload) => ({
        url: `/keyword/${payload?.id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Keyword"],
    }),
    archiveKeyword: builder.mutation({
      query: (payload) => ({
        url: `/keyword/${payload?.id}`,
        method: "DELETE",
        body: payload,
      }),
      invalidatesTags: ["Keyword"],
    }),
    importKeyword: builder.mutation({
      query: (payload) => ({
        url: `/import/keyword`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Keyword"],
    }),
  }),
});

export const {
  useKeywordQuery,
  useLazyKeywordQuery,
  useUpdateKeywordMutation,
  useArchiveKeywordMutation,
  useCreateKeywordMutation,
  useImportKeywordMutation,
} = typeAPI;
