
import {  Button,  InputBase } from '@mui/material';
import { DataGrid, GridColumns, GridRowsProp, GridSearchIcon } from '@mui/x-data-grid';
import "./tableListing.css";
import SortIcon from '@mui/icons-material/Sort';
import { FC } from 'react';

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
          <div className='button'>
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
      </div>



      <div className='table-listing-users' style={{ height: 650, width: '60%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
      
          />
      </div>
    </div>

  );
}
export default TableListing;
