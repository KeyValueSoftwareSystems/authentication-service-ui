
import { AppBar, Button, createMuiTheme, IconButton, InputBase, makeStyles, Toolbar, Typography } from '@mui/material';
import { createTheme } from '@mui/system';
import { DataGrid, GridColDef, GridColumns, GridMenuIcon, GridRowsProp, GridSearchIcon, GridValidRowModel } from '@mui/x-data-grid';
import "./tableListing.css";
import SortIcon from '@mui/icons-material/Sort';
import { FC, useState } from 'react';

interface TableProps {
  rows: GridRowsProp;
  columns: GridColumns;
  buttonlabel: string;
  text: string;
  searchlabel: string;
}


const TableListing: FC<TableProps> = ({ rows, columns, text, buttonlabel, searchlabel }) => {


  return (
    
    <div className='table-component'>
      <div className='table-tool-bar'>
        <legend className='legend-title'>{text}</legend>
        <div className='sort-search-button'>
          <div className='sort'>
            <div className='sort-icon'>
              <SortIcon sx={{ color: 'grey', }} />
            </div>
            <div className='sort-text'>Sort</div>
          </div>
          <div className='search'>
            <div className='search-bar'>
              <InputBase placeholder={searchlabel}
                sx={{
                  borderRadius: 5,
                  bgcolor: '#f4f8fb',
                  paddingLeft: 2,
                  fontSize: 13,
                }} />
            </div>
            <div className='search-icon'>
              <GridSearchIcon style={{ color: "#4a4a4a6e" }} />
            </div>
          </div>
          <Button variant="outlined" sx={{
            boxShadow: 1,
            border: 1,
            borderBlockColor: 'grey',
            color: '#636363',
            borderRadius: 10,
            height: 40,
            marginTop: '11px',
            marginRight: '17px',

          }}>{buttonlabel}</Button>

        </div>
      </div>

      {/* <AppBar position="static" sx={{ width: '53%', marginTop: '20px', marginRight: '20px', marginLeft: '20px', backgroundColor: 'white', }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'black', fontWeight: 'bolder' }}>
            {text}
          </Typography>
          <IconButton
            size="large"
            edge="start"
            aria-label="menu"
            sx={{ mr: 2, color: '#4a4a4a6e' }}
          >
          <SortIcon sx={{ color: 'grey', }} />
          </IconButton>
          <Typography component="div" sx={{ flexGrow: 1, color: 'black', fontWeight: 'lighter' }}>
            Sort
          </Typography>
          <InputBase placeholder={searchlabel}
            sx={{
              borderRadius: 5,
              bgcolor: '#f4f8fb',
              paddingLeft: 2,
              fontSize: 13,
              width:'30%',
              height:'40px',
            }} />
          <IconButton
            size="large"
            edge="start"
            aria-label="menu"
            sx={{ mr: 2, color: '#4a4a4a6e' }}
          >
            <GridSearchIcon />
          </IconButton>
          <Button variant="outlined" sx={{
            boxShadow: 1,
            border: 1,
            borderBlockColor: 'grey',
            color: '#636363',
            borderRadius: 10,
            height: 40,
            marginTop: '2px',
            marginRight: '17px',

          }}>{buttonlabel}</Button>
        </Toolbar>
      </AppBar> */}

      <div className='table-listing-users' style={{ height: 650, width: '53%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          checkboxSelection />
      </div>
      </div>
    
  );
}
export default TableListing;
