import React, { useState } from 'react';
import { Tooltip } from '@mui/material';
import { Chip } from '@mui/material';

import { REFRESH_INVITE_TOKEN } from '@/services/mutations/authMutations';
import { GET_USERS } from '@/services/queries/userQueries';
import { ReactComponent as RefreshIcon } from '@/assets/invite-chip-icons/refresh.svg';
import { ReactComponent as ContentCopyIcon } from '@/assets/invite-chip-icons/copy.svg';
import { useCustomMutation } from '@/hooks/useMutation';
import './styles.css';

interface StatusChipType {
  row: {
    id: string;
    status: string;
    inviteToken: string;
  };
}

export const StatusChip: React.FC<StatusChipType> = ({ row }) => {
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const [isLinkRefreshed, setIsLinkRefreshed] = useState(false);

  const [refreshInviteToken] = useCustomMutation(REFRESH_INVITE_TOKEN, undefined, [{ query: GET_USERS }]);

  const onCopyInviteLink = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    const inviteLink = `${process.env.REACT_APP_BASE_URL}/#/confirmpassword?token=${row.inviteToken}`;

    navigator.clipboard.writeText(inviteLink);
    setIsLinkCopied(true);
    setTimeout(() => {
      setIsLinkCopied(false);
    }, 2000);
  };

  const onRefreshInviteLink = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    refreshInviteToken({
      variables: { id: row.id }
    });
    setIsLinkRefreshed(true);
    setTimeout(() => {
      setIsLinkRefreshed(false);
    }, 2000);
  };

  const getClassName = () => {
    if (row.status === 'ACTIVE') return 'active-user';
    else if (row.status === 'INACTIVE') return 'inactive-user';
    else return 'pending';
  };

  return (
    <div className='invited-switch'>
      <Chip
        label={row.status.charAt(0) + row.status.toLowerCase().slice(1)}
        className={getClassName()}
        data-testid='chip'
        sx={{
          height: '31px',
          width: '76px',
          borderRadius: '5px',
          fontWeight: '600'
        }}
      />
      {row.status === 'INVITED' && (
        <>
          <Tooltip
            title={isLinkRefreshed ? 'Invite Link Refreshed!' : 'Refresh Invite Link'}
            onClick={onRefreshInviteLink}
            sx={{ cursor: 'pointer' }}
          >
            <RefreshIcon data-testid='refresh' className='refresh-token-icon' />
          </Tooltip>
          <Tooltip
            title={isLinkCopied ? 'Copied' : 'Copy Invite Link'}
            onClick={onCopyInviteLink}
            sx={{ cursor: 'pointer' }}
          >
            <ContentCopyIcon data-testid='copy' fontSize='small' className='refresh-token-icon' />
          </Tooltip>
        </>
      )}
    </div>
  );
};
