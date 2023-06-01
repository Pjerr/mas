import { AccordionContext } from '@/components/Accordion/Provider';
import { LazyMotion, m, AnimatePresence, domAnimation } from 'framer-motion';
import { useContext } from 'react';
import { FaCaretDown } from 'react-icons/fa';
import styles from './styles.module.css';

export interface AccordionItemProps {
    title: string;
    index?: number;
    children?: React.ReactNode;
}

function AccordionItem({ children, index = 0, title }: AccordionItemProps) {
    const { activeItem } = useContext(AccordionContext);
    const isActive = activeItem === index;

    const animation = {
        variants: {
            open: { opacity: 1, height: 'auto' },
            collapsed: { opacity: 0, height: 0 },
        },
        transition: { duration: 0.2 },
    };

    return (
        <div
            className={styles.accordion__item}
            key={index + title}
            data-cy="accordion__item"
        >
            <AccordionHeader title={title} index={index} />
            <LazyMotion features={domAnimation} strict>
                <AnimatePresence initial={false} mode={'wait'}>
                    {isActive && (
                        <m.div
                            key={`${index}_content`}
                            initial="collapsed"
                            animate="open"
                            exit="collapsed"
                            variants={animation.variants}
                            transition={animation.transition}
                        >
                            <m.div
                                className={styles.accordion__content}
                                data-cy="accordion__content"
                            >
                                {children}
                            </m.div>
                        </m.div>
                    )}
                </AnimatePresence>
            </LazyMotion>
        </div>
    );
}

const AccordionHeader = ({
    title,
    index,
}: {
    title: string;
    index: number;
}) => {
    const { activeItem, setActiveItem } = useContext(AccordionContext);
    const isActive = activeItem === index;

    const onClose = () => {
        if (!isActive) setActiveItem(index);
        else setActiveItem(null);
    };

    return (
        <div
            className={styles['accordion__item-header']}
            onClick={onClose}
            data-cy="accordion__item-header"
        >
            <LazyMotion features={domAnimation} strict>
                <m.button
                    animate={isActive ? { rotate: 180 } : { rotate: 0 }}
                    type="button"
                    aria-label="Close accordion"
                    onClick={onClose}
                    data-cy="accordion__expand"
                >
                    <FaCaretDown data-cy="accordion__icon" />
                </m.button>
            </LazyMotion>

            <span
                className={styles['item-header__title']}
                data-cy="item-header__title"
            >
                {title}
            </span>
        </div>
    );
};

export { AccordionItem };
