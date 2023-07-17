import PartVariants from '@/components/PartVariants';
import { NextPageWithLayout } from './_app';
import { SidebarLayout } from '@/layouts/SidebarLayout';
import { PartVariant } from '@/components/PartVariants/types';

const mockPart: PartVariant = {
    partId: 'mock-part-id',
    attributes: [
        {
            displayName: 'Color',
            optionIds: ['color-option-id1', 'color-option-id2'],
        },
        {
            displayName: 'Material',
            optionIds: ['material-option-id1', 'material-option-id2'],
        },
        {
            displayName: 'Upholstery',
            optionIds: ['upholstery-option-id1'],
        },
    ],
    variants: [
        {
            id: 'part-variant-id1',
            options: [
                {
                    id: 'color-option-id1',
                    displayName: 'Red',
                    value: 'red',
                },
                {
                    id: 'material-option-id1',
                    displayName: 'Wood',
                    value: 'wood',
                },
                {
                    id: 'upholstery-option-id1',
                    displayName: 'none',
                    value: 'none',
                },
            ],
        },
        {
            id: 'part-variant-id2',
            options: [
                {
                    id: 'color-option-id2',
                    displayName: 'White',
                    value: 'white',
                },
                {
                    id: 'material-option-id2',
                    displayName: 'Plastic',
                    value: 'plastic',
                },
                {
                    id: 'upholstery-option-id1',
                    displayName: 'None',
                    value: 'none',
                },
            ],
        },
        {
            id: 'part-variant-id3',
            options: [
                {
                    id: 'color-option-id2',
                    displayName: 'Black',
                    value: 'black',
                },
                {
                    id: 'upholstery-option-id1',
                    displayName: 'None',
                    value: 'none',
                },
                {
                    id: 'material-option-id2',
                    displayName: 'Plastic',
                    value: 'plastic',
                },
            ],
        },
        {
            id: 'part-variant-id4',
            options: [
                {
                    id: 'material-option-id2',
                    displayName: 'Wood',
                    value: 'wood',
                },
                {
                    id: 'color-option-id2',
                    displayName: 'White',
                    value: 'white',
                },
                {
                    id: 'upholstery-option-id1',
                    displayName: 'None',
                    value: 'none',
                },
            ],
        },
    ],
};

const Test: NextPageWithLayout = () => {
    return <PartVariants part={mockPart} />;
};

Test.getLayout = SidebarLayout;
export default Test;
