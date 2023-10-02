import SessionReact from 'supertokens-auth-react/recipe/session';
import EmailPasswordReact from 'supertokens-auth-react/recipe/emailpassword';
import { appInfo } from './appInfo';
import Router from 'next/router';

export const config = () => {
    return {
        appInfo,
        recipeList: [
            EmailPasswordReact.init({
                style: `[data-supertokens~=container] {
                    background-color: var(--background-color);
                    color: var(--text-primary);
                }
                [data-supertokens~=headerTitle]{
                    color: var(--text-primary);
                }
                [data-supertokens~=secondaryText] {
                    color: var(--text-primary);
                }
                [data-supertokens~=link] {
                    color: var(--text-secondary);
                }
                [data-supertokens~=button] {
                    background-color: var(--color-primary);
                    border: none;
                    color: var(--text-primary);
                }
                [data-supertokens~=divider] {
                    border: 0.1px solid var(--border-color);
                    padding: 0px;
                }
                [data-supertokens~=inputWrapper] {
                    background-color: transparent;
                    border: 1px solid transparent;
                    border-radius: 0;
                    border-bottom: 1px solid var(--text-secondary);
                    color: var(--text-primary);
                }
                [data-supertokens~=input] {
                    color: var(--text-primary);
                }
                [data-supertokens~=inputWrapper]:focus-within {
                    color: var(--text-primary);
                    background-color: transparent;
                    border: 1px solid transparent;
                    border-bottom: 1px solid var(--color-primary);
                    box-shadow: none;
                }
                [data-supertokens~=inputError]{
                    border: 1px solid var(--color-danger);
                }
                [data-supertokens~=superTokensBranding] {
                    display: none;
                }
                [data-supertokens~=label] {
                    display: none;
                }
                [data-supertokens~=checkedIcon] {
                    fill: var(--color-primary);
                    --palette-primary: none;
                }
                [data-supertokens~=enterEmailSuccessMessage] {
                    color: var(--text-primary);
                }
                [data-supertokens~=resendEmailLink] {
                    color: var(--text-secondary);
                }
                `,
            }),
            SessionReact.init(),
        ],
        windowHandler: (oI: any) => {
            return {
                ...oI,
                location: {
                    ...oI.location,
                    setHref: (href: string) => {
                        Router.push(href);
                    },
                },
            };
        },
    };
};
