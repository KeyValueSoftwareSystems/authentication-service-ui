import { GridColumns, GridRowsProp } from "@mui/x-data-grid";

export interface TableProps {
    rows: GridRowsProp;
    columns: GridColumns;
    buttonlabel: string;
    text: string;
    searchlabel: string;
  }
  