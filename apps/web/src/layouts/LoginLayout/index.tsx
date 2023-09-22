import classNames from 'classnames';
import React from 'react';
import styles from './styles.module.css';

function LoginLayout(page: React.ReactElement): React.ReactNode {
    return <div className={classNames(styles['login-layout'])}>{page}</div>;
}

export { LoginLayout };
