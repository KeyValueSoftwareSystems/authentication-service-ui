import { useMutation, useQuery } from "@apollo/client";
import { Chip } from "@mui/material";
import { useRecoilState } from "recoil";
import { permissionsListAtom } from "../../states/permissionsStates";
import { DELETE_PERMISSION } from "./services/mutations";
import { GET_PERMISSIONS } from "./services/queries";
import './styles.css'

const PermissionList: React.FC = () => {

    const [deletePermission, { data: data2 }] = useMutation(DELETE_PERMISSION, {
        refetchQueries: [{ query: GET_PERMISSIONS }]
    });
    const [permissionList, setPermissionList] = useRecoilState(permissionsListAtom);
    const { data } = useQuery(GET_PERMISSIONS, {
        onCompleted: (data) => {
            setPermissionList(data?.getPermissions);
        },
    });
    return (
        <div className="permission-list">
            {permissionList?.map((permission: any) => (
                <Chip className="permissions" label={permission?.name} />
            ))}
        </div>
    )
}
export default PermissionList
