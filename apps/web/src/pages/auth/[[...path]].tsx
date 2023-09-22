import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { redirectToAuth } from 'supertokens-auth-react';
import { canHandleRoute, getRoutingComponent } from 'supertokens-auth-react/ui';
import { EmailPasswordPreBuiltUI } from 'supertokens-auth-react/recipe/emailpassword/prebuiltui';
import { NextPageWithLayout } from '@/pages/_app';
import { LoginLayout } from '@/layouts/LoginLayout';
import Head from 'next/head';

const SuperTokensComponentNoSSR = dynamic<{}>(
    new Promise((res) =>
        res(() => getRoutingComponent([EmailPasswordPreBuiltUI]))
    ),
    { ssr: false }
);

const Auth: NextPageWithLayout = () => {
    // if the user visits a page that is not handled by us (like /auth/random), then we redirect them back to the auth page.
    useEffect(() => {
        if (canHandleRoute([EmailPasswordPreBuiltUI]) === false) {
            redirectToAuth();
        }
    }, []);

    return (
        <>
            <Head>
                <title>VMS</title>
            </Head>
            <SuperTokensComponentNoSSR />
        </>
    );
};

Auth.getLayout = LoginLayout;

export default Auth;
