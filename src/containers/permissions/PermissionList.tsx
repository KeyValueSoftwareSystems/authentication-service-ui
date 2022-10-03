import { useMutation, useQuery } from "@apollo/client";
import { Chip } from "@mui/material";
import { useRecoilState } from "recoil";
import TableToolBar from "../../components/table-toolbar";
import { permissionsListAtom } from "../../states/permissionsStates";
import { DELETE_PERMISSION } from "./services/mutations";
import { GET_PERMISSIONS } from "./services/queries";
import './styles.css'

const PermissionList: React.FC = () => {

    useMutation(DELETE_PERMISSION, {
        refetchQueries: [{ query: GET_PERMISSIONS }]
    });
    const [permissionList, setPermissionList] = useRecoilState(permissionsListAtom);
    useQuery(GET_PERMISSIONS, {
        onCompleted: (data) => {
            setPermissionList(data?.getPermissions);
        },
    });
    return (
        <>
        <TableToolBar text="All Permissions" searchLabel="Search Permissions" buttonLabel="Add Permission"/>
        <ul className="permission-list">
            {permissionList?.map((permission: any) => (
                <li><Chip className="permissions" label={permission?.name} /></li>
            ))}
        </ul>
        </>
    )
}
export default PermissionList
