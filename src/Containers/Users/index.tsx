import { Avatar, createTheme, ThemeProvider, Typography } from "@mui/material";
import { GridColDef, GridSaveAltIcon } from "@mui/x-data-grid";
import TableListing from "../../Components/Table/tableListing";


const handleEdit=()=>{
  alert('EDit');
}

const columns: GridColDef[] = [
  {
    field: 'user', headerName: 'User', width: 200, headerClassName: 'user-list-header', renderCell: (params) => (
      <div className='user-options'>
        <Avatar src="dp1.png" />
        <Typography className='user-name'>{params.value.name}</Typography>
      </div>
    )
  },
  {
    field: 'groups', headerName: 'Member Of', headerClassName: 'user-list-header', width: 520,
    renderCell: (params) => (

      <div className="groups">
        {groupvalues[params.value.i].map((gv) =>
          <div className="groupsvalue">
            {gv}
          </div>
        )}




        {/* {groupvalues[params.value.i][params.value.i]} */}

      </div>


    )
    // valueGetter: (params) => {
    //     return params.getValue(params.id, "attributes").groups;
    // }
  },

  {
    field: 'actions', headerName: 'Actions', width: 300, headerClassName: 'user-list-header', renderCell: (params) => (
      <div className='options'>
        <div className='option' onClick={handleEdit} >
          {params.value.option1}
        </div>
        <div className='option'>
          {params.value.option2}
        </div>
        <div className='option'>
         {params.value.option3}
        </div>
      </div>
    )
  },
];

const groupvalues = [
  ['aaa', 'bbb'],
  ['ccc', 'ddd', 'eee'],
  ['fff', 'ggg', 'hhh', 'iii'],
  ['ccc', 'ddd', 'eee'],
  ['aaa', 'bbb'],
  ['fff', 'ggg', 'hhh', 'iii'],
  ['aaa', 'bbb'],
  ['ccc', 'ddd', 'eee'],
  ['ccc', 'ddd', 'eee'],
  ['fff', 'ggg', 'hhh', 'iii', 'kkk']
];

let i: number;

const rows = [
  { id: 1, user: { name: 'Jon', displaypicture: "dp1.png" }, actions: { option1: "Edit", option2: "Delete", option3: "Add to Group" }, groups: { i: 0 } },
  { id: 2, user: { name: 'Jon', displaypicture: "dp1.png" }, actions: { option1: "Edit", option2: "Delete", option3: "Add to Group" }, groups: { i: 1 } },
  { id: 3, user: { name: 'Jon', displaypicture: "dp1.png" }, actions: { option1: "Edit", option2: "Delete", option3: "Add to Group" }, groups: { i: 2 } },
  { id: 4, user: { name: 'Jon', displaypicture: "dp1.png" }, actions: { option1: "Edit", option2: "Delete", option3: "Add to Group" }, groups: { i: 3 } },
  { id: 5, user: { name: 'Jon', displaypicture: "dp1.png" }, actions: { option1: "Edit", option2: "Delete", option3: "Add to Group" }, groups: { i: 4 } },
  { id: 6, user: { name: 'Jon', displaypicture: "dp1.png" }, actions: { option1: "Edit", option2: "Delete", option3: "Add to Group" }, groups: { i: 5 } },
  { id: 7, user: { name: 'Jon', displaypicture: "dp1.png" }, actions: { option1: "Edit", option2: "Delete", option3: "Add to Group" }, groups: { i: 6 } },
  { id: 8, user: { name: 'Jon', displaypicture: "dp1.png" }, actions: { option1: "Edit", option2: "Delete", option3: "Add to Group" }, groups: { i: 7 } },
  { id: 9, user: { name: 'Jon', displaypicture: "dp1.png" }, actions: { option1: "Edit", option2: "Delete", option3: "Add to Group" }, groups: { i: 8 } },
  { id: 10, user: { name: 'Jon', displaypicture: "dp1.png" }, actions: { option1: "Edit", option2: "Delete", option3: "Add to Group" }, groups: { i: 9 } },


];



const UserListing = () => {

  return (
    <div>
      <TableListing rows={rows} columns={columns} text="All Users" buttonlabel="Add User" searchlabel="Search User" />
    </div>
  )
}
export default UserListing;
