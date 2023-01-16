import { DocumentNode } from "graphql";
import { SetterOrUpdater } from "recoil";

export interface FilterDropdownProps {
  filterQuery: DocumentNode;
  setItemList: any;
  field: string;
  open: boolean;
  anchorEl: any;
  onApply: (count: number) => void;
  filterName: string[];
  currentFilters: never[][];
  filters: (string | never)[][];
  checkedFilters: never[][];
  setCheckedFilters: SetterOrUpdater<never[]>[];
  viewFiltersVerified: boolean[];
}
