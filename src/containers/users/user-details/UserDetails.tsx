import { useNavigate } from 'react-router-dom';
import { Box, Button, Divider, Tab, Tabs, Chip } from '@mui/material';
import { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { useRecoilState } from 'recoil';
import { useParams } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

import GroupCard from '@/components/group-card';
import CustomAvatar from '@/components/custom-avatar';
import TabPanel from '@/components/tab-panel';
import PermissionCards from '@/components/permission-cards';
import DisplayMessage from '@/components/display-message';
import If from '@/components/if';
import { IsViewEntitiesVerifiedAtom, IsViewGroupsVerifiedAtom, UserPermissionsAtom } from '@/states/permissionsStates';
import { GET_USER } from '@/services/queries/userQueries';
import { GetUser, Permission, User } from '@/types/user';
import { UPDATE_USER_PERMISSION } from '@/constants/permissions';
import { useCustomQuery } from '@/hooks/useQuery';
import {
  NO_GROUPS_DESCRIPTION,
  NO_GROUPS_MESSAGE,
  NO_PERMISSIONS_DESCRIPTION,
  NO_PERMISSIONS_MESSAGE
} from '@/constants/messages';
import { RoutePaths } from '@/constants/routes';
import { renderAccessDenied } from '@/utils/generic';
import './styles.css';
import { Group } from '@/types/group';

const UserDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isEditVerified, setEditVerified] = useState(false);
  const [isViewGroupsVerified] = useRecoilState(IsViewGroupsVerifiedAtom);
  const [isViewEntitiesVerified] = useRecoilState(IsViewEntitiesVerifiedAtom);
  const [userPermissions] = useRecoilState(UserPermissionsAtom);
  const isPortrait = useMediaQuery({ orientation: 'portrait' });
  const isTabletScreen = useMediaQuery({ query: '(max-height: 820px)' });

  const [user, setUser] = useState<User>();
  const [value, setValue] = useState(0);

  const onBackNavigation = () => {
    navigate(-1);
  };
  const onRedirectToEdit = () => {
    navigate(`${RoutePaths.usersUrl}/add/${id}`);
  };

  useEffect(() => {
    if (userPermissions)
      userPermissions.forEach((item: Permission) => {
        if (item?.name.includes(UPDATE_USER_PERMISSION)) setEditVerified(true);
      });
  }, [userPermissions]);

  const onCompleted = (data: GetUser) => {
    setUser(data?.getUser);
  };

  const { loading } = useCustomQuery(GET_USER, onCompleted, { id: id });

  const getClassName = () => {
    if (user?.status === 'ACTIVE') return 'active-user-style';
    else if (user?.status === 'INACTIVE') return 'inactive-user-style';
    else return 'pending-style';
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className='userdetails-cntr'>
      <div className='personal-details'>
        {user && (
          <div className='personal-details-inner'>
            <div className='details'>
              <div style={{ display: 'flex' }}>
                {!loading && user && (
                  <CustomAvatar
                    firstName={user.firstName || ''}
                    lastName={user.lastName || ''}
                    email={user.email || ''}
                  />
                )}
                <Chip
                  label={user?.status?.charAt(0) + user?.status?.toLowerCase().slice(1)}
                  className={getClassName()}
                />
              </div>
            </div>
            <Divider flexItem orientation='vertical' />
            <div className='contact'>
              <div className='contact-number'>Contact Number</div>
              <div>{user?.phone || '-'}</div>
            </div>
          </div>
        )}
        <div style={{ display: 'flex', marginLeft: 'auto' }}>
          <Button
            variant='outlined'
            className='cancel-button'
            onClick={onBackNavigation}
            sx={{ textTransform: 'none' }}
          >
            Back
          </Button>
          <If condition={isEditVerified}>
            <div className='submit-button-style'>
              <Button
                variant='contained'
                className='submit-button'
                onClick={onRedirectToEdit}
                sx={{ textTransform: 'none' }}
              >
                Edit user
              </Button>
            </div>
          </If>
        </div>
      </div>
      <div className='group-details'>
        <Box sx={{ height: '100%' }}>
          <Box sx={{ display: 'flex' }}>
            <Tabs value={value} onChange={handleTabChange} className='custom-tabs'>
              <Tab label='Groups' />
              <Tab label='Permissions' />
            </Tabs>
          </Box>
          <TabPanel
            value={value}
            index={0}
            style={{
              height: isPortrait
                ? 'calc(100vh - 378px)'
                : isTabletScreen
                ? 'calc(100vh - 303px)'
                : 'calc(100vh - 312px)',
              overflowY: 'auto',
              overflowX: 'hidden'
            }}
          >
            {!loading ? (
              isViewGroupsVerified ? (
                user?.groups && user?.groups?.length > 0 ? (
                  <div className='groups-permissions'>
                    <div className='user-groups'>
                      {user?.groups?.map((item: Group) => {
                        return (
                          <div style={{ marginTop: 15 }} key={item?.id}>
                            <GroupCard group={item} showCheckBox={false} isViewPage />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <DisplayMessage
                    customStyle={{ fontSize: 16 }}
                    altMessage={NO_GROUPS_MESSAGE}
                    image='./assets/nothing-to-show.png'
                    heading={NO_GROUPS_MESSAGE}
                    description={NO_GROUPS_DESCRIPTION}
                    imageStyles={{ width: '27%' }}
                    containerStyles={{ marginTop: '83px' }}
                  />
                )
              ) : (
                <>{renderAccessDenied()}</>
              )
            ) : (
              <CircularProgress sx={{ top: '35%', marginTop: '225px' }} />
            )}
          </TabPanel>
          <TabPanel value={value} index={1}>
            {isViewEntitiesVerified ? (
              user?.permissions && user?.permissions?.length > 0 ? (
                <PermissionCards userPermissions={user?.permissions} isViewPage />
              ) : (
                <DisplayMessage
                  customStyle={{ fontSize: 16 }}
                  altMessage={NO_PERMISSIONS_MESSAGE}
                  image='./assets/no-permissions.png'
                  heading={NO_PERMISSIONS_MESSAGE}
                  description={NO_PERMISSIONS_DESCRIPTION}
                  imageStyles={{ width: '17%' }}
                  containerStyles={{ marginTop: '83px' }}
                />
              )
            ) : (
              <>{renderAccessDenied()}</>
            )}
          </TabPanel>
        </Box>
      </div>
    </div>
  );
};

export default UserDetails;
