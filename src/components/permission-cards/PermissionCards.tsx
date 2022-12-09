import React, { useState } from "react";

import "./styles.css";
import styled from "@emotion/styled";

import { Permission } from "../../types/user";
import PermissionsCard from "../permission-card/PermissionCard";
import { Role } from "../../types/role";
import { GET_ENTITIES } from "../../containers/entities/services/queries";
import { Entity } from "../../types/generic";
import { Group } from "../../types/group";
import { useCustomQuery } from "../../hooks/useQuery";

interface PermissionCardsProps {
  userSelectedPermissions: Permission[];
  roles?: Role[];
  groups?: Group[];
  setUserSelectedPermissions?: React.Dispatch<
    React.SetStateAction<Permission[]>
  >;
}

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 22px;
  margin-top: 20px;
`;

const PermissionCards: React.FC<PermissionCardsProps> = (
  props: PermissionCardsProps
) => {
  const { userSelectedPermissions, roles, groups, setUserSelectedPermissions } =
    props;
  const [entities, setEntities] = useState<Entity[]>([]);
  const onCompleted = (data: any) => {
    setEntities(data?.getEntities);
  };
  useCustomQuery(GET_ENTITIES, onCompleted);

  return (
    <Container>
      {entities.map((entity) => (
        <PermissionsCard
          entity={entity}
          roles={roles}
          groups={groups}
          userSelectedPermissions={userSelectedPermissions}
          setUserSelectedPermissions={setUserSelectedPermissions}
        />
      ))}
    </Container>
  );
};

export default PermissionCards;
