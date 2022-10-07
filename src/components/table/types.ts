import { GridColumns, GridRowsProp } from "@mui/x-data-grid";
import { DocumentNode } from "graphql";

export interface TableProps {
  rows: GridRowsProp;
  columns: GridColumns;
  buttonLabel: string;
  text: string;
  onClick?: any;
  searchLabel: string;
  deleteMutation: DocumentNode;
  refetchQuery: DocumentNode;
}