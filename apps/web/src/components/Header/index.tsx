import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './styles.module.css';

interface NavLink {
    label: string;
    href: string;
}

const links: NavLink[] = [
    {
        href: '/attributes',
        label: 'Attributes',
    },
];

export function Header() {
    const router = useRouter();
    const activeRoute = router.pathname;

    return (
        <header className={classNames(styles['header-container'])}>
            <nav className={styles['header-container__nav']}>
                <div className={styles['nav__brand-container']}>
                    <div className={styles['brand-container__brand']}>
                        <Link href={'/'}>AMS</Link>
                    </div>
                </div>
                <ul className={styles.nav__links}>
                    {links.map((link) => {
                        return (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className={classNames(styles.links__link, {
                                        [styles['links__link--active']]:
                                            activeRoute === link.href,
                                    })}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </header>
    );
}
