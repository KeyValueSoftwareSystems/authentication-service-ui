import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { GridRowId } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { useMediaQuery } from 'react-responsive';

import './styles.css';
import { DELETE_GROUP } from '@/services/mutations/groupMutations';
import { GET_GROUPS } from '@/services/queries/groupQueries';
import TableList from '@/components/table';
import { groupListAtom } from '@/states/groupStates';
import { IsViewGroupsVerifiedAtom, UserPermissionsAtom } from '@/states/permissionsStates';
import { CREATE_GROUP_PERMISSION, DELETE_GROUP_PERMISSION, UPDATE_GROUP_PERMISSION } from '@/constants/permissions';
import DisplayMessage from '@/components/display-message';
import { AddEntity, SearchEntity } from '@/types/generic';
import { ACCESS_DENIED_DESCRIPTION, ACCESS_DENIED_MESSAGE } from '@/constants/messages';
import { columns } from '@/utils/groups';
import { PAGE_SIZE } from '@/constants/table';
import { useCustomLazyQuery } from '@/hooks/useLazyQuery';
import { Permission } from '@/types/permission';
import { GetGroups } from '@/types/group';

const GroupList: React.FC = () => {
  const navigate = useNavigate();

  const [isAddVerified, setAddVerified] = useState(false);
  const [groupCount, setGroupCount] = useState(0);
  const [isViewGroupsVerified] = useRecoilState(IsViewGroupsVerifiedAtom);
  const [userPermissions] = useRecoilState(UserPermissionsAtom);
  const [groupList, setGroupList] = useRecoilState(groupListAtom);

  const isPortrait = useMediaQuery({ orientation: 'portrait' });

  const onGetGroupsComplete = (data: GetGroups) => {
    setGroupList(data?.getGroups?.results);
    setGroupCount(data?.getGroups?.totalCount);
  };

  const { lazyQuery: getGroups, loading } = useCustomLazyQuery(GET_GROUPS, onGetGroupsComplete);

  useEffect(() => {
    if (isViewGroupsVerified) getGroups({ variables: { pagination: { limit: PAGE_SIZE, offset: 0 } } });
  }, [isViewGroupsVerified, getGroups]);

  const onAddGroup = () => {
    navigate('add');
  };

  const onEditGroup = (id: GridRowId) => {
    navigate(`edit/${id}`);
  };

  useEffect(() => {
    userPermissions.forEach((item: Permission) => {
      if (item?.name.includes(CREATE_GROUP_PERMISSION)) setAddVerified(true);
    });
  }, [userPermissions]);

  useEffect(() => {
    columns[0].flex = isPortrait ? 0.3 : 0.5;
    columns[2].flex = isPortrait ? 0.35 : 0.5;
  }, [isPortrait]);

  const setItemList = (data: GetGroups) => {
    setGroupList(data?.getGroups?.results);
    setGroupCount(data?.getGroups?.totalCount);
  };

  if (!isViewGroupsVerified && !loading)
    return (
      <div className='denied-table-component'>
        <DisplayMessage
          altMessage={ACCESS_DENIED_MESSAGE}
          image='./assets/access-denied.png'
          heading={ACCESS_DENIED_MESSAGE}
          description={ACCESS_DENIED_DESCRIPTION}
        />
      </div>
    );

  return (
    <>
      {!loading ? (
        <TableList
          rows={groupList}
          columns={columns}
          count={groupCount}
          buttonLabel={AddEntity.ADD_GROUP}
          searchLabel={SearchEntity.SEARCH_GROUP}
          setItemList={setItemList}
          deleteMutation={DELETE_GROUP}
          refetchQuery={GET_GROUPS}
          onAdd={onAddGroup}
          onEdit={onEditGroup}
          editPermission={UPDATE_GROUP_PERMISSION}
          deletePermission={DELETE_GROUP_PERMISSION}
          isViewVerified={isViewGroupsVerified}
          isAddVerified={!isAddVerified}
          field='name'
        />
      ) : (
        <CircularProgress />
      )}
    </>
  );
};

export default GroupList;
