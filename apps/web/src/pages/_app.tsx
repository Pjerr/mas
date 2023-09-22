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
import SuperTokensReact, { SuperTokensWrapper } from 'supertokens-auth-react';
import { config } from '@/configs/supertokens/config';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

if (typeof window !== 'undefined') {
    SuperTokensReact.init(config());
}

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
        <SuperTokensWrapper>
            <Provider store={store}>
                <link rel="shortcut icon" href="#"></link>
                <MainLayout>
                    {getLayot(<Component {...pageProps} />)}
                </MainLayout>
                <Toastify />
            </Provider>
        </SuperTokensWrapper>
    );
}
