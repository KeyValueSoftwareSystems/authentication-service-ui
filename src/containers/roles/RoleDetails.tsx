import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { RoleDetailsAtom } from '../../states/RoleStates';
import { RolePermissionsAtom } from '../../states/PermissionsStates';
import '../groups/styles.css'
import { GET_ROLE_DETAILS, GET_ROLE_PERMISSIONS } from './services/queries';

const RoleDetails: React.FC = () => {

    const {id} = useParams();
    const [role,setRole]= useRecoilState(RoleDetailsAtom);
    const [permissions,setPermissions]= useRecoilState(RolePermissionsAtom);

    useQuery(GET_ROLE_DETAILS, {
        variables: { id },
        onCompleted: (data) => {
            setRole(data?.getRole);
        }
    }
    );

    useQuery(GET_ROLE_PERMISSIONS, {
        variables: { id },
        onCompleted: (data) => {
            setPermissions(data?.getRolePermissions);
        }
    }
    );
    

    return(

        <div id="group-details">
        <legend id="group-title"> {role.name} </legend>
        <div id="rolesandpermissions">
            <div id="roles">
            <legend id="bold"> Role Permissions </legend>
                <div id="item-list">
            {permissions.map((item)=> <div id="item">
                <div>
                    {item.name}
                </div>
                </div>  )
            }
                </div>
            </div>
        </div>
    </div>
    )
}

export default RoleDetails;