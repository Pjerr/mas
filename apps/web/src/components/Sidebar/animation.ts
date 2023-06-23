export const animation = {
    variants: {
        open: { opacity: 1, height: '100%', translateX: '0%' },
        collapsed: {
            opacity: 1,
            height: '100%',
            translateX: '-100%',
        },
    },
    transition: { duration: 0.15 },
};
