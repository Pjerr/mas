import { Attribute } from '@/store/api/endpoints';
import styles from '../styles.module.css';
import OptionsTable from './OptionTable';
import { Accordion } from '@/components/Accordion';
import { AccordionItem } from '@/components/Accordion/Item';

interface OptionsProps {
    attributes: Attribute[];
}

export default function Options({ attributes }: OptionsProps) {
    if (!attributes.length) return <></>;

    return (
        <>
            <div className={styles['product-options']} id={`group-options`}>
                <h1 className={styles['group__title']}>Options</h1>
                <div className={styles['options']}>
                    <Accordion onExpand={() => {}}>
                        {attributes.map((attribute) => {
                            return (
                                <AccordionItem
                                    title={attribute.displayName}
                                    key={`accordion-item__${attribute.id}`}
                                >
                                    <OptionsTable attributeId={attribute.id} />
                                </AccordionItem>
                            );
                        })}
                    </Accordion>
                </div>
            </div>
        </>
    );
}
