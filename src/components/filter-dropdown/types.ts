import { DocumentNode } from 'graphql';
import { SetterOrUpdater } from 'recoil';

export interface FilterDropdownProps {
  filterQuery: DocumentNode;
  setItemList: any;
  field: string;
  open: boolean;
  anchorEl: any;
  onApply: (count: number) => void;
  filterName: string[];
  currentFilters: string[][];
  filters: string[][];
  checkedFilters: string[][];
  setCheckedFilters: SetterOrUpdater<string[]>[];
  viewFiltersVerified: boolean[];
}
