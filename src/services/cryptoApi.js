import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const cryptoApiHeaders = {
    'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
    'x-rapidapi-key': 'e692c1b86amsh092043c793b8770p179e09jsn373f0e2a08a8'
}

const baseUrl = 'https://coinranking1.p.rapidapi.com'

const createRequests = url => ({ url, headers: cryptoApiHeaders })

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: builder => ({
        getCryptos: builder.query({
            query: (count) => createRequests(`/coins?limit=${count}`)
        }),
        getCryptoDetails: builder.query({
            query: (coinId) => createRequests(`/coin/${coinId}`)
        }),
        getCryptoHistory: builder.query({
            query: ({ coinId, timePeriod }) => createRequests(`/coin/${coinId}/history/${timePeriod}`)
        })
    })
})

export const { useGetCryptosQuery, useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } = cryptoApi