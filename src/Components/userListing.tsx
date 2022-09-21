// import { ThemeProvider } from '@emotion/react';
// import { Button, createMuiTheme, InputBase, makeStyles, Typography } from '@mui/material';
// import { createTheme } from '@mui/system';
// import { DataGrid, GridColDef, GridSearchIcon } from '@mui/x-data-grid';
// import "./userListing.css";
// import SortIcon from '@mui/icons-material/Sort';

// const columns: GridColDef[] = [
//   {
//     field: 'user', headerName: 'User', width: 200, headerClassName: 'user-list-header', renderCell: (params) => (
//       <div className='user-options'>
//         <img className="display-picture" src={params.value.displaypicture} />
//         <Typography className='user-name'>{params.value.name}</Typography>
//       </div>
//     )
//   },
//   {
//     field: 'groups', headerName: 'Groups', headerClassName: 'user-list-header', width: 500, renderCell: (params) => (
//       <div className='groups'>
//         <ThemeProvider theme={theme}>
//           <Typography>{params.value.group1}</Typography>
//           <Typography>{params.value.group2}</Typography>
//           <Typography>{params.value.group3}</Typography>
//           <Typography>{params.value.group4}</Typography>
//           <Typography>{params.value.group5}</Typography>
//         </ThemeProvider>
//       </div>
//     )
//   },
//   {
//     field: 'actions', headerName: 'Actions', width: 200, headerClassName: 'user-list-header', renderCell: (params) => (
//       <div className='options'>
//         <div className='option'>
//           <ThemeProvider theme={theme}>
//             <Typography>{params.value.option1}</Typography>
//           </ThemeProvider>
//         </div>
//         <div className='option'>
//           <ThemeProvider theme={theme}>
//             <Typography>{params.value.option2}</Typography>
//           </ThemeProvider>
//         </div>
//         <div className='option'>
//           <ThemeProvider theme={theme}>
//             <Typography>{params.value.option3}</Typography>
//           </ThemeProvider>
//         </div>
//       </div>
//     )
//   },



// ];

// const rows = [
//   { id: 1, groups: { group1: 'snow',group2: 'snow',group3: 'snow',group4: 'snow',group5: 'snow' }, user: { name: 'Jon', displaypicture: "dp1.png" }, actions: { option1: "Edit", option2: "Delete", option3: "Add to Group" } },
//   { id: 2, groups: { group1: 'snow',group2: 'snow' }, user: { name: 'Jon', displaypicture: "dp1.png" }, actions: { option1: "Edit", option2: "Delete", option3: "Add to Group" } },
//   { id: 3, groups: { group1: 'snow' }, user: { name: 'Jon', displaypicture: "dp1.png" }, actions: { option1: "Edit", option2: "Delete", option3: "Add to Group" } },
//   { id: 4, groups: { group1: 'snow',group2: 'snow',group3: 'snow',group4: 'snow', }, user: { name: 'Jon', displaypicture: "dp1.png" }, actions: { option1: "Edit", option2: "Delete", option3: "Add to Group" } },
//   { id: 5, groups: { group1: 'snow',group2: 'snow' }, user: { name: 'Jon', displaypicture: "dp1.png" }, actions: { option1: "Edit", option2: "Delete", option3: "Add to Group" } },
//   { id: 6, groups: { group1: 'snow' }, user: { name: 'Jon', displaypicture: "dp1.png" }, actions: { option1: "Edit", option2: "Delete", option3: "Add to Group" } },
//   { id: 7, groups: { group1: 'snow' }, user: { name: 'Jon', displaypicture: "dp1.png" }, actions: { option1: "Edit", option2: "Delete", option3: "Add to Group" } },
//   { id: 8, groups: { group1: 'snow' }, user: { name: 'Jon', displaypicture: "dp1.png" }, actions: { option1: "Edit", option2: "Delete", option3: "Add to Group" } },
//   { id: 9, groups: { group1: 'snow' }, user: { name: 'Jon', displaypicture: "dp1.png" }, actions: { option1: "Edit", option2: "Delete", option3: "Add to Group" } },
//   { id: 10, groups: { group1: 'snow' }, user: { name: 'Jon', displaypicture: "dp1.png" }, actions: { option1: "Edit", option2: "Delete", option3: "Add to Group" } },


// ];

// const theme = createTheme({
//   typography: {
//     fontSize: 1,
//   },
//   spacing:4,
  
// });






// export default function DataTable() {

//   return (
//     <>
//       <div className='table-tool-bar'>
//         <legend className='legend-title'>All Users</legend>
//         <div className='sort-search-button'>
//           <div className='sort'>
//             <div className='sort-icon'>
//               <SortIcon sx={{ color: 'grey', }} />
//             </div>
//             <div className='sort-text'>Sort</div>
//           </div>
//           <div className='search'>
//             <div className='search-bar'>
//               <InputBase placeholder='Search User'
//                 sx={{
//                   borderRadius: 5,
//                   bgcolor: '#f4f8fb',
//                   paddingLeft: 2,
//                   fontSize:13,
//                 }} />
//             </div>
//             <div className='search-icon'>
//               <GridSearchIcon style={{ color: "#4a4a4a6e" }} />
//             </div>
//           </div>
//             <Button variant="outlined" sx={{
//               boxShadow: 1,
//               border: 1,
//               borderBlockColor: 'grey',
//               color: '#636363',
//               borderRadius: 10,
//               height:40,
//               marginTop: '11px',
//               marginRight:'17px',

//             }}>Add User</Button>
         
//         </div>
//       </div>

//       <div className='table-listing-users' style={{ height: 650, width: '53%' }}>
//         <DataGrid
//           rows={rows}
//           columns={columns}
//           pageSize={10}
//           rowsPerPageOptions={[10]}
//           checkboxSelection />
//       </div>
//     </>
//   );
// }
export{}
