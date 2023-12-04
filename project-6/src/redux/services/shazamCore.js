import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const shazamCoreApi = createApi({
  reducerPath: 'shazamCoreApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://shazam.p.rapidapi.com',
    prepareHeaders: (headers) => {
      headers.set('X-RapidAPI-Key', '0beaed8761msh9d72730f4bd0db1p1c1f8ejsn464d0ac81893');

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({ query: () => '/charts/track?' }),
    getSongDetails: builder.query({query:({songid})=>`/songs/get-details?key=${songid}`}),
    getSongRelated: builder.query({query:({songid})=>`/songs/list-recommendations?key=${songid}`}),
    getArtistDetails: builder.query({query:({artistId})=>`/artists/get-summary?id=${artistId}`}),
    getSongsBySearch: builder.query({query:({searchTerm})=>`/search?term=${searchTerm}`}),
  })
})

export const {
  useGetTopChartsQuery,
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
  useGetArtistDetailsQuery,
  useGetSongsBySearchQuery,
} = shazamCoreApi;