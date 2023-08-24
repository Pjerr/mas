import { Group, useFindGroupQuery } from '@/store/api/endpoints';
import { useEffect, useState } from 'react';
import { Optional } from '@/types/utils';
import GroupListboxButtons from '@/components/GroupListbox/GroupListboxButtons';
import Listbox from '@/components/Listbox';
import ListItem from '@/components/Listbox/ListItem';
import { FaPlusCircle } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import styles from './styles.module.css';
import { PartialGroup } from '@/store/editors/attribute/types';
import { useGroupApi } from '@/hooks/useGroupApi';
import { refreshState } from '@/store/table';
import { instanceIds } from '@/types/entity';
import { EntityType } from '@/store/table/types';
import SearchInput from '../Inputs/SearchInput';
import InplaceInput from '../Inputs/InplaceInput';
import Button from '../Button';

interface GroupListProps {
    setActiveGroup: React.Dispatch<React.SetStateAction<PartialGroup | null>>;
}

export default function GroupListbox({ setActiveGroup }: GroupListProps) {
    const [listboxEditMode, setListboxEditMode] = useState<boolean>(false);
    const [activeIndex, setActiveIndex] = useState<number>(0);

    const dispatch = useDispatch();
    const { onSaveGroup, onRemoveGroup } = useGroupApi();

    const { data: response } = useFindGroupQuery({
        query: {
            sort: { field: 'createdAt', order: 'ASC' },
        },
    });

    const [groups, setGroups] = useState<
        Optional<Group, keyof Omit<Group, 'name'>>[]
    >([]);

    useEffect(() => {
        if (!response || !response.data.length) return;
        setGroups(response.data);
        resetActiveGroup(activeIndex);
    }, [response]);

    const handleSearch = (value: string) => {
        // console.log(value);
    };

    const resetActiveGroup = (index: number) => {
        if (!response || !response.data.length) return;
        if (!response.data[index]) return;
        setActiveGroup(response.data[index] ?? null);
        setActiveIndex(index);
    };

    const handleGroupChange = (index: number) => {
        if (!groups[index] || !groups[index].id) return;
        setActiveGroup(groups[index]);
        setActiveIndex(index);
    };

    const hasChanges = (changes: string, index: number) => {
        if (groups[index].id && groups[index].name === changes) return false;
        return true;
    };

    const handleSave = async (
        id: string | undefined,
        changes: string,
        index: number
    ) => {
        setListboxEditMode(false);
        if (!hasChanges(changes, index)) return;
        const changedGroup = await onSaveGroup(id, changes);
        if (!changedGroup) return;
        const newGroups = [...groups];
        newGroups.splice(index, 1, changedGroup);
        setActiveIndex(index);
        setActiveGroup(newGroups[index] ?? null);
        setGroups(newGroups);
    };

    const handleEditMode = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.stopPropagation();
        setListboxEditMode(true);
    };

    const handleDeleteGroup = (index: number) => {
        const group = groups[index];
        if (!group.id) return;

        onRemoveGroup(group.id);
        dispatch(
            refreshState({ instanceId: instanceIds[EntityType.Attribute] })
        );
        if (groups.length === 1) {
            setGroups([]);
            return;
        }
        const newGroups = [...groups];
        newGroups.splice(index, 1);
        setGroups(newGroups);
        setActiveGroup(newGroups[index - 1]);
        setActiveIndex(index - 1);
    };

    const handleAddDraftGroup = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.stopPropagation();
        dispatch(
            refreshState({ instanceId: instanceIds[EntityType.Attribute] })
        );
        setActiveIndex(groups.length);
        setActiveGroup(null);
        setListboxEditMode(true);
        setGroups([...groups, { name: `Untitled group ${groups.length + 1}` }]);
    };

    const handleCancel = (index: number) => {
        setListboxEditMode(false);
        if (groups[index].id) return;
        const newGroups = groups.filter(
            (group) => group.name !== groups[index].name
        );
        setActiveIndex(newGroups.length - 1);
        setGroups(newGroups);
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
                <Button icon={<FaPlusCircle />} onClick={handleAddDraftGroup} />
            </div>
        </div>
    );
}
