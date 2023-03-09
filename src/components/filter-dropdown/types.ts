import { DocumentNode } from 'graphql';
import { SetterOrUpdater } from 'recoil';

export interface FilterDropdownProps {
  filterQuery: DocumentNode;
  setItemList: (data: any) => void;
  field: string;
  open: boolean;
  anchorEl: HTMLElement | null;
  onApply: (count: number) => void;
  filterName: string[];
  currentFilters: string[][];
  filters: string[][];
  checkedFilters: string[][];
  setCheckedFilters: SetterOrUpdater<string[]>[];
  viewFiltersVerified: boolean[];
}
