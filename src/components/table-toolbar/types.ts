import { DocumentNode } from "graphql";
import { SetterOrUpdater } from "recoil";

export interface TableToolBarProps {
  field: string;
  buttonLabel: string;
  searchLabel: string;
  searchQuery: DocumentNode;
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
  setItemList: any;
  filterName?: string[];
  isAddVerified?: boolean;
  onAdd?: () => void;
}
