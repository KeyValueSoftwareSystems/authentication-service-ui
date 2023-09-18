import { DocumentNode } from 'graphql';
import { SetStateAction } from 'react';
import { SetterOrUpdater } from 'recoil';

export interface TableToolBarProps {
  field: string;
  buttonLabel: string;
  searchLabel: string;
  searchQuery: DocumentNode;
  appliedFilters?: string[][];
  handleClickFilter?: (event: React.MouseEvent, setAnchorEl: (value: React.SetStateAction<null>) => void) => void;
  handleCancel?: (setAnchorEl: (value: React.SetStateAction<null>) => void) => void;
  allFilters?: string[][];
  checkedFilters?: string[][];
  setCheckedFilters?: SetterOrUpdater<string[]>[];
  viewFiltersVerified?: boolean[];
  setItemList: (data: any) => void;
  filterName?: string[];
  isAddVerified?: boolean;
  onAdd?: () => void;
}
