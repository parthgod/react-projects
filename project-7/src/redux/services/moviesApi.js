import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const moviesApi = createApi({
  reducerPath: 'moviesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://moviesminidatabase.p.rapidapi.com',
    prepareHeaders: (headers) => {
      headers.set('X-RapidAPI-Key', import.meta.env.VITE_APP_RAPID_API_KEY);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getGenres: builder.query({ query: () => `/genres/` }),
    getMovies: builder.query({ query: ({ genre, year }) => `/movie/byYear/${year}/byGen/${genre}/` }),
    getSeries: builder.query({ query: ({ genre, year }) => `/series/byYear/${year}/byGen/${genre}/` }),
    getMovieDetails: builder.query({ query: (id) => `/movie/id/${id}/` }),
    getSeriesDetails: builder.query({ query: (id) => `/series/id/${id}/` }),
    getMovieCast: builder.query({ query: (id) => `/movie/id/${id}/cast/` }),
    getSeriesCast: builder.query({ query: (id) => `/series/id/${id}/cast/` }),
    getSeasons: builder.query({ query: (id) => `/series/id/${id}/num_seasons/` }),
    getEpisodes: builder.query({ query: ({ id, season }) => `/series/id/${id}/season/${season}/episodes/` }),
    getMoviesBySearch: builder.query({ query: (search) => `/movie/imdb_id/byTitle/${search}/` }),
    getSeriesBySearch: builder.query({ query: (search) => `/series/idbyTitle/${search}/` }),
    getActorDetails: builder.query({ query: (id) => `/actor/id/${id}/` }),
    getActorBio: builder.query({ query: (id) => `/actor/id/${id}/bio/` }),
    getActorMovies: builder.query({ query: (id) => `/actor/id/${id}/movies_knownFor/` }),
    getActorSeries: builder.query({ query: (id) => `/actor/id/${id}/series_knownFor/` }),
  })
})

export const {
  useGetGenresQuery,
  useGetMoviesQuery,
  useGetSeriesQuery,
  useGetMovieDetailsQuery,
  useGetMovieCastQuery,
  useGetSeriesDetailsQuery,
  useGetSeriesCastQuery,
  useGetSeasonsQuery,
  useGetEpisodesQuery,
  useGetMoviesBySearchQuery,
  useGetSeriesBySearchQuery,
  useGetActorDetailsQuery,
  useGetActorBioQuery,
  useGetActorMoviesQuery,
  useGetActorSeriesQuery,
} = moviesApi;