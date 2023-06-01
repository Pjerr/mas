import React from 'react';

const useIsOverflow = ({
    ref,
    isVerticalOverflow,
}: {
    ref: React.RefObject<HTMLDivElement>;
    isVerticalOverflow: boolean;
}) => {
    const [isOverflow, setIsOverflow] = React.useState<boolean>(false);

    React.useLayoutEffect(() => {
        const { current } = ref;

        if (!current) return;

        const { clientWidth, scrollWidth, clientHeight, scrollHeight } =
            current;

        const trigger = () => {
            const hasOverflow = isVerticalOverflow
                ? scrollHeight > clientHeight
                : scrollWidth > clientWidth;

            setIsOverflow(hasOverflow);
        };

        if (current) {
            trigger();
        }
    }, [ref, isVerticalOverflow]);

    return isOverflow;
};

export default useIsOverflow;
