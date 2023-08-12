import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import qs from 'qs';

export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_URL,
        paramsSerializer(params) {
            return qs.stringify(params);
        },
    }),
    tagTypes: [
        'Manufacturer',
        'Parts',
        'Attributes',
        'Group',
        'Options',
        'Categories',
        'Variants',
    ],
    endpoints: () => ({}),
});
