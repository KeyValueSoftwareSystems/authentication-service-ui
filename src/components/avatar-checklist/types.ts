import { DocumentNode } from 'graphql';

import { User } from 'types/user';

export interface ChecklistProps {
  mapList: User[];
  currentCheckedItems: User[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>, item?: User) => void;
  setItemList: (items: User[]) => void;
  searchQuery: DocumentNode;
}
