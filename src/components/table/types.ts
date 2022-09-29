import { GridColumns, GridRowsProp } from "@mui/x-data-grid";
import { DocumentNode } from "graphql";

export interface TableProps {
    rows: GridRowsProp;
    columns: GridColumns;
    buttonlabel: string;
    text: string;
    searchlabel: string;
    deleteMutation: DocumentNode;
    refetchQuery: DocumentNode;
  }
  