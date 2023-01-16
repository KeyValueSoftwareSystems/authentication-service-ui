import {
  GridColumns,
  GridRowId,
  GridRowParams,
  GridRowsProp,
} from "@mui/x-data-grid";
import { DocumentNode } from "graphql";
import { SetterOrUpdater } from "recoil";

export interface TableProps {
  field: string;
  rows: GridRowsProp;
  columns: GridColumns;
  buttonLabel: string;
  count: number;
  searchLabel: string;
  setItemList: (data: any) => void;
  deleteMutation: DocumentNode;
  refetchQuery: DocumentNode;
  editPermission?: string;
  deletePermission?: string;
  isViewVerified?: boolean;
  isAddVerified?: boolean;
  filterName?: string[];
  handleRowClick?: (params: GridRowParams) => void;
  onAdd: () => void;
  onEdit: (id: GridRowId) => void;
  currentFilters?: never[][];
  handleClickFilter?: (
    event: any,
    setAnchorEl: (value: React.SetStateAction<null>) => void
  ) => void;
  handleCancel?: (
    setAnchorEl: (value: React.SetStateAction<null>) => void
  ) => void;
  filters?: (string | never)[][];
  checkedFilters?: never[][];
  setCheckedFilters?: SetterOrUpdater<never[]>[];
  viewFiltersVerified?: boolean[];
}
