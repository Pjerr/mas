import { Toastify } from '@/components/Toastify';
import useTheme, { Theme } from '@/hooks/useTheme';
import { MainLayout } from '@/layouts/MainLayout';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import React, { ReactElement, ReactNode } from 'react';
import '@/styles/index.css';
import { store } from '@/store';
import { Provider } from 'react-redux';
import { Cloudinary } from '@cloudinary/url-gen';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
    const {} = useTheme();
    const getLayot = Component.getLayout ?? ((page) => page);

    const cld = new Cloudinary({
        cloud: {
            cloudName: 'ditj6iih5',
            apiKey: '286355945697816',
            apiSecret: 'VpWzN1Ah7JlvbG8qq3iY1km2c6w',
        },
    });

    return (
        <Provider store={store}>
            <link rel="shortcut icon" href="#"></link>
            <MainLayout>{getLayot(<Component {...pageProps} />)}</MainLayout>
            <Toastify />
        </Provider>
    );
}
