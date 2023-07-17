import {
    Group,
    useCreateGroupMutation,
    useFindGroupQuery,
    useRemoveGroupMutation,
    useUpdateGroupMutation,
} from '@/store/api/endpoints';
import { useEffect, useState } from 'react';
import { Optional } from '@/types/utils';
import GroupListboxButtons from '@/components/GroupListbox/GroupListboxButtons';
import Listbox from '@/components/Listbox';
import ListItem from '@/components/Listbox/ListItem';
import classNames from 'classnames';
import { FaPlusCircle } from 'react-icons/fa';
import styles from './styles.module.css';
import { useDispatch } from 'react-redux';
import { PartialGroup } from '@/store/editors/attribute/types';
import { refreshState } from '@/store/table';
import { instanceIds } from '@/types/entity';
import SearchInput from '../Inputs/SearchInput';
import InplaceInput from '../Inputs/InplaceInput';
import Button from '../Button';
import { EntityType } from '@/store/table/types';

interface GroupListProps {
    setActiveGroup: React.Dispatch<React.SetStateAction<PartialGroup | null>>;
}

export default function GroupListbox({ setActiveGroup }: GroupListProps) {
    const [listboxEditMode, setListboxEditMode] = useState<boolean>(false);

    const dispatch = useDispatch();
    const [createGroup] = useCreateGroupMutation();
    const [updateGroup] = useUpdateGroupMutation();
    const [removeGroup] = useRemoveGroupMutation();

    const { data: response } = useFindGroupQuery({
        query: {
            sort: { field: 'createdAt', order: 'ASC' },
        },
    });

    const [groups, setGroups] = useState<
        Optional<Group, keyof Omit<Group, 'name'>>[]
    >([]);
    const [activeIndex, setActiveIndex] = useState<number>(0);

    useEffect(() => {
        if (!response || !response.data.length) return;
        setGroups(response.data);
        resetActiveGroup(activeIndex);
    }, [response]);

    const handleSearch = (value: string) => {};

    const resetActiveGroup = (index: number) => {
        if (!response || !response.data.length) return;
        if (!response.data[index]) return;
        setActiveGroup(response.data[index] ?? null);
        setActiveIndex(index);
    };

    const handleGroupChange = (index: number) => {
        if (!groups[index]) return;
        setActiveGroup(groups[index] ?? null);
    };

    const handleSave = (
        id: string | undefined,
        changes: string,
        index: number
    ) => {
        setListboxEditMode(false);
        if (groups[index].id && groups[index].name === changes) {
            return;
        }
        if (id)
            updateGroup({
                id,
                updateGroup: {
                    name: changes,
                },
            });
        else {
            createGroup({
                createGroup: {
                    name: changes,
                },
            });
        }
        setActiveGroup(groups[index] ?? null);
    };

    const handleEditMode = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.stopPropagation();
        setListboxEditMode(true);
    };

    const handleDeleteGroup = (index: number) => {
        const group = groups[index];
        if (group.id) {
            removeGroup({ id: group.id });
            dispatch(
                refreshState({ instanceId: instanceIds[EntityType.Attribute] })
            );
        }
        if (groups.length === 1) {
            setGroups([]);
            return;
        }
    };

    const handleAddGroup = () => {
        setActiveIndex(groups.length);
        setActiveGroup(null);
        const newGroup: Optional<Group, keyof Omit<Group, 'name'>> = {
            name: `Untitled group ${groups.length + 1}`,
        };
        setGroups([...groups, newGroup]);
        setListboxEditMode(true);
    };

    const handleCancel = (index: number) => {
        setListboxEditMode(false);
        if (groups[index].id) return;
        setGroups(groups.filter((group) => group.name !== groups[index].name));
    };

    const handleBlur = (
        e: React.FocusEvent<HTMLDivElement, Element>,
        index: number
    ) => {
        if (!e.currentTarget.contains(e.relatedTarget)) handleCancel(index);
    };

    return (
        <div className={styles['group-listbox__container']}>
            <div className={styles['group-search__container']}>
                <SearchInput
                    onChange={handleSearch}
                    className={'group-search'}
                />
            </div>
            <Listbox
                onChange={handleGroupChange}
                activeListItemIndex={activeIndex}
                setActiveListItemIndex={setActiveIndex}
            >
                {groups.map((group, index) => (
                    <ListItem index={index} key={`${index}-${group.name}`}>
                        <div
                            className={classNames(styles['group-list-item'])}
                            onBlur={(e) => {
                                handleBlur(e, index);
                            }}
                        >
                            <InplaceInput
                                initialValue={group.name}
                                open={listboxEditMode && activeIndex === index}
                                onSave={(changes) => {
                                    handleSave(group.id, changes, index);
                                }}
                                onCancel={() => handleCancel(index)}
                            />
                            {activeIndex === index && !listboxEditMode && (
                                <GroupListboxButtons
                                    itemIndex={index}
                                    onToggleEditMode={handleEditMode}
                                    onDelete={handleDeleteGroup}
                                />
                            )}
                        </div>
                    </ListItem>
                ))}
            </Listbox>
            <div className={styles['add-group__container']}>
                <Button icon={<FaPlusCircle />} onClick={handleAddGroup} />
            </div>
        </div>
    );
}
